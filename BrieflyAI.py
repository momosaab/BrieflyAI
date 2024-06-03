from flask import Flask, request, jsonify
from transformers import BartTokenizer, BartForConditionalGeneration
import torch
import PyPDF2
from flask_cors import CORS
import spacy
import concurrent.futures

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load pre-trained BART model and tokenizer
model_name = 'facebook/bart-large-cnn'
tokenizer = BartTokenizer.from_pretrained(model_name)
model = BartForConditionalGeneration.from_pretrained(model_name)

# Load SpaCy model
nlp = spacy.load('en_core_web_sm')

# Function to split text into smaller segments
def split_text(text, segment_length=2048):
    segments = []
    num_segments = len(text) // segment_length + 1
    for i in range(num_segments):
        start = i * segment_length
        end = min((i + 1) * segment_length, len(text))
        segments.append(text[start:end])
    return segments

# Function to summarize text with BART
def summarize_text_with_bart(text):
    inputs = tokenizer([text], max_length=1024, return_tensors='pt', truncation=True)
    summary_ids = model.generate(inputs['input_ids'], num_beams=4, max_length=150, early_stopping=True)
    summary_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary_text

# Function to read text from PDF file
def read_pdf(file):
    text = ""
    pdf_reader = PyPDF2.PdfReader(file)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

# Function to extract topic names from text
def extract_topic_name(text):
    doc = nlp(text)
    entities = [ent.text for ent in doc.ents if ent.label_ in {'ORG', 'PERSON', 'GPE', 'LOC', 'PRODUCT'}]
    if entities:
        return ', '.join(set(entities[:3]))  # Return up to 3 unique entities
    words = text.split()
    return ' '.join(words[:5])

# Post-processing function to clean up the summary output
def post_process_summary(summary):
    sentences = summary.split('. ')
    processed_summary = '. '.join(sentence.strip().capitalize() for sentence in sentences)
    if processed_summary and not processed_summary.endswith('.'):
        processed_summary += '.'
    return processed_summary

# Asynchronous summarization function
def summarize_segment(segment):
    summary = summarize_text_with_bart(segment)
    processed_summary = post_process_summary(summary)
    topic_name = extract_topic_name(processed_summary)
    return {'topic_name': topic_name, 'summary': processed_summary}

# Route to handle file upload and text summarization with BART
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = file.filename.lower()
        if filename.endswith('.txt'):
            text = file.read().decode('utf-8')
        elif filename.endswith('.pdf'):
            text = read_pdf(file)
        else:
            return jsonify({'error': 'Unsupported file format'}), 400

        segments = split_text(text)

        # Asynchronous processing of segments
        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = [executor.submit(summarize_segment, segment) for segment in segments]
            topic_summaries = [future.result() for future in concurrent.futures.as_completed(futures)]

        overall_summary = summarize_text_with_bart(text)
        processed_overall_summary = post_process_summary(overall_summary)

        return jsonify({'topic_summaries': topic_summaries, 'overall_summary': processed_overall_summary})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  


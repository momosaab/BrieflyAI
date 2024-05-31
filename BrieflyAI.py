from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS  # Import CORS
import PyPDF2

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

summarizer = pipeline('summarization')

# Function to summarize text
def summarize_text(text):
    summary = summarizer(text, do_sample=False)
    return summary[0]['summary_text']

# Function to read text from PDF file
def read_pdf(file):
    text = ""
    pdf_reader = PyPDF2.PdfReader(file)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

# Route to handle file upload and summarization
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # Check file extension
        filename = file.filename.lower()
        if filename.endswith('.txt'):
            text = file.read().decode('utf-8')
        elif filename.endswith('.pdf'):
            text = read_pdf(file)
        else:
            return jsonify({'error': 'Unsupported file format'}), 400

        # Summarize the text
        summary = summarize_text(text)
        # Return the summary as JSON
        return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

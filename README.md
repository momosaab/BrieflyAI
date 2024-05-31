# Briefly AI

Briefly AI is a web application that allows users to upload text or PDF files to generate summaries. The application consists of a React frontend for file upload and display, and a Python backend using Flask and Hugging Face's Transformers library for text summarization.

## Features

- Upload text or PDF files
- Generate summaries using advanced natural language processing
- Display summaries in a user-friendly interface
- **Coming Soon**: Highlight specific text portions for targeted summarization

## Technologies Used

### Frontend
- React
- Axios for HTTP requests
- Custom CSS for styling
- LDRS for loading animations

### Backend
- Python
- Flask for the web framework
- Hugging Face's Transformers for the summarization pipeline
- PyPDF2 for PDF text extraction

## Installation

### Prerequisites

- Node.js and npm installed
- Python 3 installed
- Virtual environment setup for Python

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/BrieflyAI.git
    cd BrieflyAI/backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask server:
    ```bash
    flask run
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the required npm packages:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

## Usage

1. Ensure both the Flask server and React development server are running.
2. Open your browser and navigate to `http://localhost:3000`.
3. Use the file input to upload a text or PDF file.
4. Click the "Upload File" button.
5. Wait for the file to be processed. The summary will be displayed on the screen.

## Example

![Screenshot](screenshot.png)

## Planned Features

- **Highlight Summarization**: Users will be able to highlight specific portions of text to generate targeted summaries. This feature will enhance the precision and relevance of the summaries.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, please open an issue or contact the maintainer at your.email@example.com.

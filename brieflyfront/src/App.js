import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LoadingScreen from './LoadingScreen';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:5000/upload', formData)
      .then(response => {
        const { summary } = response.data;
        setSummary(summary);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
        alert('File upload failed!');
      });
  };

  return (
    <div className="App">
      {loading ? (
        <LoadingScreen /> // Render loading screen covering the entire screen
      ) : (
        <>
          <header className="App-header">
            <h1>Briefly AI</h1>
            <p>Effortlessly Summarize</p>
          </header>
          <div className="button-container">
            <input
              type="file"
              id="fileInput"
              className="file-input"
              onChange={handleFileChange}
            />
            <button className="button" onClick={() => document.getElementById('fileInput').click()}>
              Choose File
            </button>
            {selectedFile && (
              <button className="button" onClick={handleUpload}>
                Upload File
              </button>
            )}
          </div>
          {summary && (
            <div className="summary">
              <h2>Summary</h2>
              <p>{summary}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
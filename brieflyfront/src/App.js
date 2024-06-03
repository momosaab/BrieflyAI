import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LoadingScreen from './LoadingScreen';
import Summary from './Summary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHighlighter, faHistory } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [iconClicked, setIconClicked] = useState(false);

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

    axios.post('http://localhost:5000/upload', formData) // Use relative URL to communicate with the server
      .then(response => {
        const summaryData = response.data;
        setSummary(summaryData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
        alert('File upload failed!');
      });
  };

  const handleIconClick = () => {
    setIconClicked(!iconClicked);
  };

  return (
    <div className="App">
      {loading ? (
        <LoadingScreen />
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
            <Summary summary={summary} />
          )}
          {/* FontAwesome icon with click event handling */}
          <div className={`icon-container ${iconClicked ? 'deeper' : ''}`}>
            <FontAwesomeIcon
              icon={faHighlighter}
              className="highlight-icon"
              onClick={handleIconClick}
              size="3x"
              style={{ color: iconClicked ? 'red' : 'inherit' }}
            />
          </div>
          {/* FontAwesome icon for history */}
          <div className="history-icon-container">
            <FontAwesomeIcon icon={faHistory} className="history-icon" size="3x" />
          </div>
        </>
      )}
    </div>
  );
}

export default App;

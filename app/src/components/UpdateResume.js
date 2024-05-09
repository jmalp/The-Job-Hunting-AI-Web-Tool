import React, { useState, useRef } from 'react';
import url from "../api_url.json";
import "../pages/Settings.css";

const UpdateResume = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const inputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    selectFile(file);
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    selectFile(file);
  };

  const selectFile = (file) => {
    setSelectedFile(file);
    setIsFilePicked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('resume', selectedFile);

      const response = await fetch(url['api_url'] + '/update-resume', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Resume updated successfully');
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000);
      } else {
        console.error('Failed to update resume');
      }
    } catch (error) {
      console.error('Error updating resume:', error);
    }
  };

  return (
    <div>
      {updateSuccess && (
        <div className="success-message">
          Resume updated successfully!
        </div>
      )}
      <div className="resume-dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
        <p>Drag and drop a PDF to upload, or click to select a file.</p>
        <input
          type="file"
          onChange={handleChange}
          hidden
          accept=".pdf"
          ref={inputRef}
        />
        <button onClick={() => inputRef.current && inputRef.current.click()} className="resume-select-button">
          Select Files
        </button>
        {isFilePicked && <p className="file-loaded-message">File loaded successfully!</p>}
      </div>
      <button onClick={handleSubmit} className="resume-submit-button">
        Update Resume
      </button>
    </div>
  );
};

export default UpdateResume;
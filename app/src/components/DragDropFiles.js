import { useState, useRef } from "react";
import { Button, Container, Card } from "react-bootstrap";
import "../App.css";

const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files)
  };
  
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("Files", files);
    console.log(formData.getAll())
  };

  return (
    <div className="d-flex justify-content-center align-items-center container-style">
      {files ? (
        <div className="text-center file-display">
          <div>
            <ul>
              {Array.from(files).map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          </div>
          <div className="file-actions d-flex justify-content-between">
            <button className="button-secondary" onClick={() => setFiles(null)}>Cancel</button>
            <button className="button-primary" onClick={handleUpload}>Upload</button>
          </div>
        </div>
      ) : (
        <div
          className="dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div>
            <p>Drag and drop a PDF to upload</p>
            <input
              type="file"
              multiple
              onChange={(event) => setFiles(event.target.files)}
              hidden
              accept="application/pdf"
              ref={inputRef}
            />
            <button onClick={() => inputRef.current.click()} className="submit-button">Select Files</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropFiles;
import { useState, useRef } from "react";
import "../App.css";

const DragDropFiles = ({ onFileSelect }) => {
  const inputRef = useRef(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    onFileSelect(file);
    setIsFilePicked(true);
  };

  const handleChange = (event) => {
    onFileSelect(event.target.files[0]);
  };

  return (
    <div className="dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
      <p>Drag and drop a PDF to upload, or click to select a file.</p>
      <input
        type="file"
        onChange={handleChange} 
        hidden 
        accept="application/pdf" 
        ref={inputRef}
      />
      <button onClick={() => inputRef.current && inputRef.current.click()} className="file-submit-button">
        Select Files
      </button>
      {isFilePicked && <p>File loaded successfully!</p>}
    </div>
  );
};

export default DragDropFiles;

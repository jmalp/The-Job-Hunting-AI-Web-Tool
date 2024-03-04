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
    <Container className="d-flex justify-content-center align-items-center">
      {files ? (
        <Card className="text-center">
          <Card.Body>
            <ul>
              {Array.from(files).map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => setFiles(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleUpload}>Upload</Button>
          </Card.Footer>
        </Card>
      ) : (
        <div
          className="dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Card>
            <Card.Body>
              <p>Drag and Drop a PDF to Upload</p>
              <input
                type="file"
                multiple
                onChange={(event) => setFiles(event.target.files)}
                hidden
                accept="application/pdf"
                ref={inputRef}
              />
              <Button onClick={() => inputRef.current.click()} className="submit">Select Files</Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default DragDropFiles;
import React, { useState } from 'react';
import './FileUpload.css';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const validTypes = ['application/pdf', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or TXT file');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    onFileSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    onFileSelect(null as any);
  };

  return (
    <div className="file-upload-container">
      <div className="upload-card">
        <h2>
          <i className="fas fa-upload"></i>
          Upload Resume
        </h2>
        
        {!selectedFile ? (
          <div
            className={`file-upload-area ${isDragging ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="resumeFile"
              accept=".pdf,.txt"
              onChange={handleInputChange}
              hidden
            />
            <label htmlFor="resumeFile" className="file-upload-label">
              <i className="fas fa-cloud-upload-alt"></i>
              <span>Click to upload or drag and drop</span>
              <small>PDF or TXT files (Max 10MB)</small>
            </label>
          </div>
        ) : (
          <div className="file-info">
            <i className="fas fa-file-pdf"></i>
            <span>{selectedFile.name}</span>
            <button type="button" className="remove-btn" onClick={removeFile}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

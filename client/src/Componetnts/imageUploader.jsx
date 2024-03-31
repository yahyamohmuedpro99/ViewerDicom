import React from 'react';

function ImageUploader({ onFileLoaded,onAnalysisComplete }) {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append('file', file); 

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json(); 
      onAnalysisComplete(result);
      console.log('Upload successful:', result);
      onFileLoaded(file); 
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
    }
  };

  return (
    <input
        type="file"
        onChange={handleFileChange}
        accept=".dcm"
        style={{
          margin: '20px 0',
          padding: '10px',
          border: '2px dashed #007bff',
          borderRadius: '5px',
          cursor: 'pointer',
          width: 'calc(100% - 40px)', 
          display: 'block',
        }}
      />
  );
}

export default ImageUploader;

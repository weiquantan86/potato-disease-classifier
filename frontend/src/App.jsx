import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setData(null);
  };

  const handlePredict = async () => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    
    setIsLoading(true);
    try {
      // Points to your FastAPI 'Gatekeeper'
      const res = await axios.post("http://localhost:8000/predict", formData);
      setData(res.data);
    } catch (err) {
      console.error("Prediction Error:", err);
      alert("Failed to connect to FastAPI. Is it running?");
    }
    setIsLoading(false);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#2d5a27" }}>🥔 Potato Disease Classifier</h1>
      <p>Upload a leaf image to detect Early Blight, Late Blight, or Healthy status.</p>
      
      <div style={{ margin: "20px 0" }}>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>

      {preview && (
        <div style={{ marginBottom: "20px" }}>
          <img src={preview} width="300" alt="preview" style={{ borderRadius: '15px', boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }} />
        </div>
      )}
      
      <button 
        onClick={handlePredict} 
        disabled={!selectedFile || isLoading}
        style={{
          padding: "10px 25px",
          fontSize: "16px",
          backgroundColor: isLoading ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {isLoading ? "Processing..." : "Run AI Analysis"}
      </button>

      {data && (
  <div style={{ 
    marginTop: "30px", 
    padding: "20px", 
    backgroundColor: "#f9f9f9", 
    borderRadius: "15px", 
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    display: "inline-block",
    minWidth: "300px"
  }}>
    <h2 style={{ margin: "0 0 10px 0", color: "#333" }}>
      Analysis Result
    </h2>
    
    <div style={{ fontSize: "24px", fontWeight: "bold", color: "#d32f2f", marginBottom: "10px" }}>
      {data.class}
    </div>

    {/* Confidence Meter */}
    <div style={{ marginBottom: "5px", fontSize: "14px", color: "#666" }}>
      Confidence Level: <strong>{(data.confidence * 100).toFixed(2)}%</strong>
    </div>
    
    <div style={{ 
      width: "100%", 
      backgroundColor: "#e0e0e0", 
      borderRadius: "10px", 
      height: "10px",
      overflow: "hidden" 
    }}>
      <div style={{ 
        width: `${data.confidence * 100}%`, 
        backgroundColor: data.confidence > 0.8 ? "#4CAF50" : "#ff9800", 
        height: "100%",
        transition: "width 0.5s ease-in-out"
      }} />
    </div>
  </div>
)}
    </div>
  );
}

export default App;
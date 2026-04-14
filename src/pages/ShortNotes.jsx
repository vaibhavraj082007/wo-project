import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ShortNotes.css';

const ShortNotes = () => {
  const { classId, subjectId } = useParams();

  const handleUpload = (e) => {
    e.preventDefault();
    alert("Notes uploaded successfully!");
  }

  return (
    <div className="short-notes-page animate-enter">
      <div className="short-notes-container">
        <h1 className="game-title">Short Notes Hub</h1>
        <div className="upload-section game-card card-white">
          <div className="card-icon" style={{fontSize: '3rem', margin: '20px 0'}}>📤</div>
          <h2 style={{color: '#333', marginBottom: '15px'}}>Upload Your Notes</h2>
          <p style={{color: '#666', fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.5'}}>
            Upload your notes that you made for yourself while learning.
          </p>
          
          <form onSubmit={handleUpload} className="upload-form">
            <input 
              type="file" 
              id="notes-upload" 
              className="file-input"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            />
            <label htmlFor="notes-upload" className="file-label game-button btn-secondary">
              Choose File
            </label>
            <button type="submit" className="game-button btn-primary btn-lg submit-btn">
              Submit Notes
            </button>
          </form>
        </div>
        
        <div className="back-action">
          <Link to={`/classes/${classId}/options/${subjectId}`}>
            <button className="game-button btn-white btn-lg">⬅️ Back to Options</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShortNotes;

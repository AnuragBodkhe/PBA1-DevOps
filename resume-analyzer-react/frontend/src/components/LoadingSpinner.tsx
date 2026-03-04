import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Analyzing your resume with AI...</p>
    </div>
  );
};

export default LoadingSpinner;

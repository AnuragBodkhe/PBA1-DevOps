import React from 'react';
import './JobDescription.css';

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ value, onChange }) => {
  return (
    <div className="job-description-container">
      <div className="job-description-card">
        <h2>
          <i className="fas fa-briefcase"></i>
          Job Description (Optional)
        </h2>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the job description here to get personalized matching analysis..."
          rows={6}
          className="job-description-textarea"
        />
      </div>
    </div>
  );
};

export default JobDescription;

import React from 'react';
import './ScoreDashboard.css';

interface AnalysisResult {
  jobMatchScore?: string;
  missingSkills?: string[];
  improvementSuggestions?: string[];
  skillGaps?: string[];
  atsOptimization?: string[];
  overallScore?: string;
  skillsMatch?: string;
  experienceQuality?: string;
  rewrittenSummary?: string;
  keywordsToAdd?: string[];
  rawAnalysis?: string;
  note?: string;
}

interface ScoreDashboardProps {
  results: AnalysisResult;
}

const ScoreDashboard: React.FC<ScoreDashboardProps> = ({ results }) => {
  return (
    <div className="score-dashboard">
      <h2>
        <i className="fas fa-chart-line"></i>
        Resume Score Dashboard
      </h2>
      <div className="score-grid">
        <div className="score-item">
          <div className="score-value">{results.overallScore || 'N/A'}</div>
          <div className="score-label">Overall Score</div>
        </div>
        <div className="score-item">
          <div className="score-value">{results.skillsMatch || 'N/A'}</div>
          <div className="score-label">Skills Match</div>
        </div>
        <div className="score-item">
          <div className="score-value">{results.jobMatchScore || 'N/A'}</div>
          <div className="score-label">Job Match</div>
        </div>
        <div className="score-item">
          <div className="score-value">{results.experienceQuality || 'N/A'}</div>
          <div className="score-label">Experience Quality</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDashboard;

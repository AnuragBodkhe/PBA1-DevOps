import React, { useState } from 'react';
import ScoreDashboard from './ScoreDashboard';
import AnalysisTabs from './AnalysisTabs';
import './ResultsDisplay.css';

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

interface ResultsDisplayProps {
  results: AnalysisResult | null;
  improvedResume: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, improvedResume }) => {
  const [activeTab, setActiveTab] = useState<string>('analysis');

  const downloadImprovedResume = () => {
    const blob = new Blob([improvedResume], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'improved_resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="results-section">
      {results && (
        <>
          <ScoreDashboard results={results} />
          <AnalysisTabs 
            results={results} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </>
      )}
      
      {improvedResume && (
        <div className="improved-resume-section">
          <h3>
            <i className="fas fa-file-alt"></i>
            Improved Resume
          </h3>
          <div className="improved-resume-content">
            {improvedResume}
          </div>
          <button className="btn btn-success" onClick={downloadImprovedResume}>
            <i className="fas fa-download"></i>
            Download Improved Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;

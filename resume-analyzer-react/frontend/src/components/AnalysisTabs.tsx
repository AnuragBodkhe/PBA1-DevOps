import React from 'react';
import './AnalysisTabs.css';

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

interface AnalysisTabsProps {
  results: AnalysisResult;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AnalysisTabs: React.FC<AnalysisTabsProps> = ({ results, activeTab, onTabChange }) => {
  const renderList = (items: string[] | undefined, title: string) => {
    if (!items || items.length === 0) {
      return <li>No {title.toLowerCase()} found</li>;
    }
    return items.map((item, index) => <li key={index}>{item}</li>);
  };

  const renderKeywords = (keywords: string[] | undefined) => {
    if (!keywords || keywords.length === 0) {
      return <p>No keywords suggested</p>;
    }
    return keywords.map((keyword, index) => (
      <span key={index} className="keyword-tag">{keyword}</span>
    ));
  };

  return (
    <div className="analysis-tabs">
      <div className="tab-buttons">
        <button 
          className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => onTabChange('analysis')}
        >
          Analysis
        </button>
        <button 
          className={`tab-btn ${activeTab === 'improvements' ? 'active' : ''}`}
          onClick={() => onTabChange('improvements')}
        >
          Improvements
        </button>
        <button 
          className={`tab-btn ${activeTab === 'keywords' ? 'active' : ''}`}
          onClick={() => onTabChange('keywords')}
        >
          Keywords
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'analysis' && (
          <div className="tab-pane active">
            <div className="analysis-section">
              <h3>
                <i className="fas fa-exclamation-triangle"></i>
                Skill Gaps
              </h3>
              <ul>
                {renderList(results.skillGaps, 'Skill Gaps')}
              </ul>
            </div>

            <div className="analysis-section">
              <h3>
                <i className="fas fa-cogs"></i>
                ATS Optimization
              </h3>
              <ul>
                {renderList(results.atsOptimization, 'ATS Optimization Tips')}
              </ul>
            </div>

            {results.rawAnalysis && (
              <div className="analysis-section">
                <h3>
                  <i className="fas fa-info-circle"></i>
                  Raw Analysis
                </h3>
                <div className="raw-analysis">
                  {results.rawAnalysis}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'improvements' && (
          <div className="tab-pane active">
            <div className="analysis-section">
              <h3>
                <i className="fas fa-lightbulb"></i>
                Improvement Suggestions
              </h3>
              <ul>
                {renderList(results.improvementSuggestions, 'Improvement Suggestions')}
              </ul>
            </div>

            {results.rewrittenSummary && (
              <div className="analysis-section">
                <h3>
                  <i className="fas fa-edit"></i>
                  Rewritten Summary
                </h3>
                <div className="summary-box">
                  {results.rewrittenSummary}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="tab-pane active">
            <div className="analysis-section">
              <h3>
                <i className="fas fa-key"></i>
                Missing Skills
              </h3>
              <ul>
                {renderList(results.missingSkills, 'Missing Skills')}
              </ul>
            </div>

            <div className="analysis-section">
              <h3>
                <i className="fas fa-tags"></i>
                Keywords to Add
              </h3>
              <div className="keywords-container">
                {renderKeywords(results.keywordsToAdd)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisTabs;

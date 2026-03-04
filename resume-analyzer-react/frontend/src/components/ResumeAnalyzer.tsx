import React, { useState } from 'react';
import FileUpload from './FileUpload';
import JobDescription from './JobDescription';
import ActionButtons from './ActionButtons';
import LoadingSpinner from './LoadingSpinner';
import ResultsDisplay from './ResultsDisplay';
import { analyzeResume, improveResume } from '../services/api';
import { AnalysisResult } from '../types';

const ResumeAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [improvedResume, setImprovedResume] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError('');
    setResults(null);
    setImprovedResume('');
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError('');

    try {
      const response = await analyzeResume(selectedFile, jobDescription);
      if (response.success) {
        setResults(response.analysis);
      } else {
        setError(response.error || 'Analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  const handleImprove = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError('');

    try {
      const response = await improveResume(selectedFile);
      if (response.success && response.improvedResume) {
        setImprovedResume(response.improvedResume);
      } else {
        setError(response.error || 'Resume improvement failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during improvement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-analyzer">
      <header className="analyzer-header">
        <h1>
          <i className="fas fa-file-alt"></i>
          AI Resume Analyzer
        </h1>
        <p>
          Upload your resume and get instant AI-powered analysis and improvement suggestions
        </p>
      </header>

      <main className="analyzer-main">
        <div className="upload-section">
          <FileUpload onFileSelect={handleFileSelect} selectedFile={selectedFile} />
          <JobDescription 
            value={jobDescription} 
            onChange={setJobDescription} 
          />
        </div>

        <ActionButtons
          onAnalyze={handleAnalyze}
          onImprove={handleImprove}
          disabled={!selectedFile || loading}
          loading={loading}
        />

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {loading && <LoadingSpinner />}

        {(results || improvedResume) && (
          <ResultsDisplay 
            results={results} 
            improvedResume={improvedResume}
          />
        )}
      </main>
    </div>
  );
};

export default ResumeAnalyzer;

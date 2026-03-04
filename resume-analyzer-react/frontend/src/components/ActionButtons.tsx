import React from 'react';
import './ActionButtons.css';

interface ActionButtonsProps {
  onAnalyze: () => void;
  onImprove: () => void;
  disabled: boolean;
  loading: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAnalyze,
  onImprove,
  disabled,
  loading
}) => {
  return (
    <div className="action-buttons">
      <button
        className="btn btn-primary"
        onClick={onAnalyze}
        disabled={disabled || loading}
      >
        <i className="fas fa-search"></i>
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
      <button
        className="btn btn-secondary"
        onClick={onImprove}
        disabled={disabled || loading}
      >
        <i className="fas fa-magic"></i>
        {loading ? 'Improving...' : 'Generate Improved Resume'}
      </button>
    </div>
  );
};

export default ActionButtons;

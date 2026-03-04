import axios from 'axios';
import { AnalysisResult, ApiResponse, FileUploadResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
});

export const analyzeResume = async (file: File, jobDescription?: string): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append('resume', file);
  if (jobDescription) {
    formData.append('jobDescription', jobDescription);
  }

  try {
    const response = await api.post('/api/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to analyze resume');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const improveResume = async (file: File): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await api.post('/api/improve-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to improve resume');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const checkHealth = async (): Promise<{ status: string; message: string }> => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    throw new Error('Health check failed');
  }
};

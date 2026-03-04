export interface AnalysisResult {
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

export interface ApiResponse {
  success: boolean;
  analysis: AnalysisResult;
  improvedResume?: string;
  error?: string;
}

export interface FileUploadResponse {
  success: boolean;
  improvedResume?: string;
  error?: string;
}

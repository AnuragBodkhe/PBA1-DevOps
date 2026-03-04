# React + Express AI Resume Analyzer

A modern full-stack web application built with React and Express.js that uses Google's Gemini AI to analyze resumes, provide improvement suggestions, and calculate job match scores.

## Features

### Core Features
- **Resume Upload**: Drag-and-drop support for PDF and text files
- **AI Analysis**: Comprehensive resume analysis using Gemini AI
- **Job Matching**: Compare resume with job descriptions for personalized feedback
- **Score Dashboard**: Visual representation of resume quality metrics
- **ATS Optimization**: Tips to improve resume performance with applicant tracking systems

### Advanced Features
- **Skill Gap Detection**: Identify missing skills and competencies
- **Improvement Suggestions**: Actionable recommendations to enhance resume
- **Keyword Optimization**: Suggest relevant keywords for better ATS performance
- **Resume Improvement Generator**: AI-powered resume rewriting
- **Download Improved Resume**: Export improved resume as text file

## Tech Stack

### Frontend (React + TypeScript)
- **React 18**: Modern UI framework with hooks
- **TypeScript**: Type-safe development
- **Axios**: HTTP client for API communication
- **CSS3**: Modern styling with animations and responsive design
- **Font Awesome**: Professional icons

### Backend (Node.js + Express)
- **Node.js**: Server runtime environment
- **Express.js**: Web framework for REST API
- **Multer**: File upload handling
- **PDF-Parse**: PDF text extraction
- **CORS**: Cross-origin resource sharing
- **Dotenv**: Environment variable management

### AI Integration
- **Google Generative AI**: Gemini API for resume analysis
- **Advanced Prompting**: Structured prompts for consistent AI responses

## Project Structure

```
resume-analyzer-react/
├── backend/                    # Express.js API server
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables
│   └── uploads/               # Temporary file storage
├── frontend/                   # React TypeScript frontend
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ResumeAnalyzer.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── JobDescription.tsx
│   │   │   ├── ActionButtons.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ResultsDisplay.tsx
│   │   │   ├── ScoreDashboard.tsx
│   │   │   └── AnalysisTabs.tsx
│   │   ├── services/          # API services
│   │   │   └── api.ts
│   │   ├── types/             # TypeScript definitions
│   │   │   └── index.ts
│   │   ├── App.tsx            # Main App component
│   │   ├── App.css            # Global styles
│   │   └── index.tsx          # Entry point
│   ├── package.json           # Frontend dependencies
│   └── .env                   # Frontend environment variables
└── README.md                  # This file
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (Node Package Manager)
- Google AI Studio API Key

### Setup Steps

1. **Clone or download the project**
   ```bash
   cd resume-analyzer-react
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Get Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com)
   - Click "Get API Key"
   - Copy your API key

5. **Configure environment variables**
   
   **Backend (.env):**
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   **Frontend (.env):**
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The API will run on `http://localhost:5000`

2. **Start the React frontend**
   ```bash
   cd frontend
   npm start
   ```
   The app will open on `http://localhost:3000`

### Production Build

1. **Build the React frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Serve the production build**
   - Deploy the `build` folder to your preferred hosting service
   - Configure the backend to serve static files if needed

## API Endpoints

### POST /api/analyze
Analyzes uploaded resume and optionally compares with job description.

**Request:**
- `resume`: File (PDF/TXT)
- `jobDescription`: String (optional)

**Response:**
```json
{
  "success": true,
  "analysis": {
    "overallScore": "78/100",
    "skillsMatch": "65%",
    "jobMatchScore": "72%",
    "experienceQuality": "High",
    "skillGaps": ["skill1", "skill2"],
    "improvementSuggestions": ["suggestion1", "suggestion2"],
    "atsOptimization": ["tip1", "tip2"],
    "missingSkills": ["skill1", "skill2"],
    "rewrittenSummary": "Improved professional summary",
    "keywordsToAdd": ["keyword1", "keyword2"]
  }
}
```

### POST /api/improve-resume
Generates an improved version of the uploaded resume.

**Request:**
- `resume`: File (PDF/TXT)

**Response:**
```json
{
  "success": true,
  "improvedResume": "Improved resume content..."
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Resume Analyzer API is running"
}
```

## Component Architecture

### React Components

1. **ResumeAnalyzer**: Main container component managing state and API calls
2. **FileUpload**: Handles file selection with drag-and-drop support
3. **JobDescription**: Textarea for job description input
4. **ActionButtons**: Analyze and improve buttons with loading states
5. **LoadingSpinner**: Loading indicator during API calls
6. **ResultsDisplay**: Container for analysis results and improved resume
7. **ScoreDashboard**: Visual score metrics display
8. **AnalysisTabs**: Tabbed interface for different analysis views

### State Management
- React hooks (useState, useEffect) for local state
- Props drilling for component communication
- No external state management library required

## Styling

### CSS Architecture
- Component-specific CSS files for maintainability
- Responsive design with CSS Grid and Flexbox
- Modern animations and transitions
- Professional gradient backgrounds
- Mobile-first responsive approach

### Design Features
- Modern gradient backgrounds
- Smooth animations and transitions
- Hover effects and micro-interactions
- Professional color scheme
- Accessible design patterns

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| Backend `GEMINI_API_KEY` | Google AI Studio API key | Yes |
| Backend `PORT` | Server port (default: 5000) | No |
| Frontend `REACT_APP_API_URL` | Backend API URL | Yes |

## Security Considerations

- API keys stored in environment variables
- File type validation (PDF/TXT only)
- File size limits (10MB max)
- Input sanitization and validation
- CORS configuration
- Temporary file cleanup after processing

## Error Handling

- Comprehensive error boundaries in React
- API error handling with user-friendly messages
- File upload validation
- Network error handling
- Graceful degradation for unsupported features

## Performance Optimization

- React.memo for component optimization
- Lazy loading for large components
- Efficient state management
- Optimized bundle size
- Image and asset optimization

## Deployment

### Frontend Deployment Options

#### Vercel
1. Connect your GitHub repository
2. Configure build command: `npm run build`
3. Set environment variables
4. Deploy automatically

#### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Add redirect rules for API calls

#### AWS S3 + CloudFront
1. Build the React app
2. Upload to S3 bucket
3. Configure CloudFront distribution
4. Set up custom domain

### Backend Deployment Options

#### Render
1. Connect repository
2. Set build command: `npm install`
3. Start command: `npm start`
4. Add environment variables

#### Railway
1. Import project from GitHub
2. Configure environment variables
3. Deploy automatically

#### AWS
1. Use AWS Lambda for serverless
2. Or EC2 for traditional server
3. Configure API Gateway if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Future Enhancements

- User authentication and profiles
- Resume history and comparisons
- Multiple resume templates
- Advanced analytics dashboard
- Email notifications
- Integration with job boards
- Mobile app development
- Real-time collaboration features

## Troubleshooting

### Common Issues

**CORS Errors**
- Ensure backend CORS is configured correctly
- Check frontend API URL environment variable

**File Upload Issues**
- Verify file type (PDF/TXT only)
- Check file size (max 10MB)
- Ensure uploads directory permissions

**API Key Issues**
- Verify Gemini API key is correct
- Check API key permissions and quotas
- Ensure .env file is properly configured

**Build Errors**
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all dependencies are installed

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React, Express.js, and Google Gemini AI**

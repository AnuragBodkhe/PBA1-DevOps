# React + Express AI Resume Analyzer - Quick Start Guide

## 🚀 Quick Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

**Backend (.env):**
```
GEMINI_API_KEY=your_gemini_api_key_here
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000
```

### 3. Get Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com)
2. Click "Get API Key"
3. Copy and paste into backend .env file

### 4. Run the Application

**Start Backend (Terminal 1):**
```bash
cd backend
npm start
```
Server runs on http://localhost:5000

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm start
```
App opens on http://localhost:3000

## 📁 Project Structure
```
resume-analyzer-react/
├── backend/          # Express API server
├── frontend/         # React TypeScript app
└── README.md        # Full documentation
```

## ✨ Features
- 📄 Resume upload (PDF/TXT)
- 🤖 AI-powered analysis
- 📊 Score dashboard
- 💡 Improvement suggestions
- 🔍 Job matching
- 📱 Responsive design

## 🛠️ Tech Stack
- **Frontend:** React 18 + TypeScript + CSS3
- **Backend:** Node.js + Express.js
- **AI:** Google Gemini API
- **Styling:** Modern CSS with animations

For detailed documentation, see the main [README.md](README.md).

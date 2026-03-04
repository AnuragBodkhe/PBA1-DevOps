const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ 
    dest: "uploads/",
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'text/plain'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF and TXT files are allowed.'), false);
        }
    }
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/analyze", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No resume file uploaded" });
        }

        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);
        const resumeText = pdfData.text;

        const jobDescription = req.body.jobDescription || "";

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        let prompt;
        if (jobDescription) {
            prompt = `
Act as an HR recruiter and compare the resume with this job description.

Job description:
${jobDescription}

Resume:
${resumeText}

Provide a detailed analysis in JSON format with the following structure:
{
    "jobMatchScore": "0-100%",
    "missingSkills": ["skill1", "skill2"],
    "improvementSuggestions": ["suggestion1", "suggestion2"],
    "skillGaps": ["gap1", "gap2"],
    "atsOptimization": ["tip1", "tip2"],
    "overallScore": "score/100",
    "skillsMatch": "percentage%",
    "experienceQuality": "High/Medium/Low",
    "rewrittenSummary": "Improved professional summary",
    "keywordsToAdd": ["keyword1", "keyword2"]
}
            `;
        } else {
            prompt = `
Act as an HR recruiter and analyze this resume.

Resume:
${resumeText}

Provide a detailed analysis in JSON format with the following structure:
{
    "skillGaps": ["gap1", "gap2"],
    "improvementSuggestions": ["suggestion1", "suggestion2"],
    "atsOptimization": ["tip1", "tip2"],
    "overallScore": "score/100",
    "skillsMatch": "percentage%",
    "experienceQuality": "High/Medium/Low",
    "rewrittenSummary": "Improved professional summary",
    "keywordsToAdd": ["keyword1", "keyword2"]
}
            `;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysisText = response.text();

        try {
            const analysis = JSON.parse(analysisText);
            res.json({ success: true, analysis });
        } catch (parseError) {
            res.json({ 
                success: true, 
                analysis: { 
                    rawAnalysis: analysisText,
                    note: "AI response could not be parsed as JSON"
                }
            });
        }

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

    } catch (error) {
        console.error("Error analyzing resume:", error);
        res.status(500).json({ error: "Failed to analyze resume" });
    }
});

app.post("/api/improve-resume", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No resume file uploaded" });
        }

        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);
        const resumeText = pdfData.text;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
Act as a professional resume writer. Rewrite and improve this resume to make it more impactful and ATS-friendly.

Resume:
${resumeText}

Provide the improved resume in a clean, professional format that highlights achievements, uses action verbs, and includes relevant keywords.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const improvedResume = response.text();

        res.json({ 
            success: true, 
            improvedResume 
        });

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

    } catch (error) {
        console.error("Error improving resume:", error);
        res.status(500).json({ error: "Failed to improve resume" });
    }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Resume Analyzer API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

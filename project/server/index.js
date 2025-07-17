const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { analyzeResume } = require('./services/resumeAnalyzer');
const { parseResumeFile } = require('./utils/fileParser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'));
    }
  }
});

// In-memory storage for user analysis status (in production, use a database)
const userAnalysisStatus = new Map();

// Routes
app.post('/api/analyze-resume', upload.single('resume'), async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Check if user has already analyzed a resume
    if (userAnalysisStatus.has(userId)) {
      return res.status(403).json({ 
        error: 'Resume analysis limit reached. You can only analyze one resume per account.',
        hasAnalyzed: true
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Parse the uploaded file
    const resumeText = await parseResumeFile(req.file);
    
    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ error: 'Resume content is too short or could not be extracted' });
    }

    // Analyze resume with OpenAI
    const analysis = await analyzeResume(resumeText);
    
    // Mark user as having analyzed their resume
    userAnalysisStatus.set(userId, {
      analyzedAt: new Date(),
      fileName: req.file.originalname
    });

    // Clean up uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.json({
      success: true,
      analysis,
      fileName: req.file.originalname
    });

  } catch (error) {
    console.error('Resume analysis error:', error);
    
    // Clean up file if it exists
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({ 
      error: error.message || 'Failed to analyze resume. Please try again.' 
    });
  }
});

// Check if user has already analyzed a resume
app.get('/api/analysis-status/:userId', (req, res) => {
  const { userId } = req.params;
  const status = userAnalysisStatus.get(userId);
  
  res.json({
    hasAnalyzed: !!status,
    analyzedAt: status?.analyzedAt,
    fileName: status?.fileName
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

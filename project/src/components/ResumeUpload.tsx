import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, Loader, X, Sparkles, User, Award, Target, Briefcase, AlertCircle, Star } from 'lucide-react';

interface ResumeUploadProps {
  onResumeAnalyzed: (analysis: ResumeAnalysis) => void;
  onBack: () => void;
}

interface ResumeAnalysis {
  summary: string;
  strengths: string[];
  improvements: string[];
  talkingPoints: string[];
  score: number;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onResumeAnalyzed, onBack }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // Check analysis status on component mount
  React.useEffect(() => {
    checkAnalysisStatus();
  }, []);

  const checkAnalysisStatus = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/analysis-status/${userId}`);
      const data = await response.json();
      setHasAnalyzed(data.hasAnalyzed);
    } catch (error) {
      console.error('Error checking analysis status:', error);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setError(null);
    setUploadedFile(file);
  };

  const analyzeResume = async () => {
    if (!uploadedFile) return;

    if (hasAnalyzed) {
      setError('You have already analyzed a resume. Only one analysis per account is allowed.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('resume', uploadedFile);
      formData.append('userId', userId);

      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/analyze-resume`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.hasAnalyzed) {
          setHasAnalyzed(true);
        }
        throw new Error(data.error || 'Failed to analyze resume');
      }

      setAnalysis(data.analysis);
      setHasAnalyzed(true);
      onResumeAnalyzed(data.analysis);
      
    } catch (error) {
      console.error('Resume analysis error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        setError('Unable to connect to the server. Please ensure both frontend and backend servers are running. Try running "npm run dev:full" in your terminal.');
      } else {
        setError(error.message || 'Failed to analyze resume. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Upload Your Resume
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Let our AI analyze your resume to create personalized insights and talking points for your video introduction.
          </p>
          <div className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-purple-300">
            <Sparkles className="w-5 h-5 mr-2" />
            <span>Premium Feature - AI-Powered Analysis</span>
          </div>
          {hasAnalyzed && (
            <div className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full text-red-300">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>Analysis limit reached - One analysis per account</span>
            </div>
          )}
        </div>

        {!analysis ? (
          <div className="space-y-8">
            {/* File Upload Area */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-500/10'
                    : uploadedFile
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-white/30 hover:border-white/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {uploadedFile ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">File Uploaded Successfully</h3>
                      <p className="text-white/80">{uploadedFile.name}</p>
                      <p className="text-white/60 text-sm">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={removeFile}
                      className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Remove file</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 text-white/50 mx-auto" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Drop your resume here, or click to browse
                      </h3>
                      <p className="text-white/60">
                        Supports PDF, DOC, and DOCX files up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
                  {error}
                </div>
              )}
            </div>

            {/* Analyze Button */}
            {uploadedFile && !isAnalyzing && !hasAnalyzed && (
              <div className="text-center">
                <button
                  onClick={analyzeResume}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Resume with AI</span>
                </button>
              </div>
            )}

            {/* Loading State */}
            {isAnalyzing && (
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-12 border border-blue-500/30 text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto">
                    <div className="w-full h-full border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">Processing Your Resume</h3>
                <p className="text-white/80 mb-6">
                  Our AI is analyzing your experience and generating personalized insights...
                </p>
                
                {/* Progress Steps */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-white/90">Extracting key achievements and skills</span>
                    </div>
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-white/90">Analyzing professional strengths</span>
                    </div>
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-white/90">Identifying growth opportunities</span>
                    </div>
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                        <Loader className="w-3 h-3 text-white animate-spin" />
                      </div>
                      <span className="text-blue-300 font-medium">Generating personalized talking points...</span>
                    </div>
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white/50 text-sm">○</span>
                      </div>
                      <span className="text-white/50">Creating your AI-powered insights</span>
                    </div>
                  </div>
                </div>
                
                {/* Time Estimate */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-center space-x-2 text-white/80">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Estimated time: 5-10 seconds</span>
                  </div>
                </div>
                
                {/* Fun Fact */}
                <div className="mt-6 text-white/60 text-sm italic">
                  💡 Did you know? Our AI analyzes over 50 different resume elements to create your personalized insights!
                </div>
              </div>
            )}

            {/* Analysis Limit Reached */}
            {hasAnalyzed && !analysis && (
              <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-12 border border-red-500/30 text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Analysis Limit Reached</h3>
                <p className="text-white/80 mb-6">
                  You have already analyzed a resume with this account. Each user gets one free AI analysis to ensure fair usage.
                </p>
                <button
                  onClick={onBack}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue to Templates
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-8 border border-green-500/30 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Analysis Complete!</h2>
              <p className="text-white/80">
                Here are your personalized insights and recommendations
              </p>
            </div>

            {/* Resume Summary */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Professional Summary</h3>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            {/* Core Strengths */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <Award className="w-6 h-6 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Key Strengths</h3>
              </div>
              <div className="grid md:grid-cols-1 gap-4">
                {analysis.strengths.map((strength, index) => (
                  <div key={index} className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                    <span className="text-white font-medium">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Growth */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Areas for Growth</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {analysis.improvements.map((improvement, index) => (
                  <div key={index} className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                    <span className="text-white font-medium">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Score */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <Star className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Resume Score</h3>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-yellow-400 mb-4">{analysis.score}</div>
                <div className="text-white/80 text-lg mb-4">out of 100</div>
                <div className="w-full bg-white/10 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-green-400 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${analysis.score}%` }}
                  />
                </div>
                <p className="text-white/70">
                  {analysis.score >= 90 ? 'Excellent! Your resume shows strong professional presentation.' :
                   analysis.score >= 85 ? 'Great work! Your resume demonstrates solid experience and skills.' :
                   analysis.score >= 80 ? 'Good foundation! Consider the improvement suggestions to enhance your profile.' :
                   'Solid start! Focus on the growth areas to strengthen your presentation.'}
                </p>
              </div>
            </div>

            {/* Talking Points */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <Briefcase className="w-6 h-6 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Recommended Talking Points</h3>
              </div>
              <div className="space-y-4">
                {analysis.talkingPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-white/80">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBack}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Continue to Templates
              </button>
            </div>
          </div>
        )}

        {/* Legal Text */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-xs">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-blue-400 hover:text-blue-300 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
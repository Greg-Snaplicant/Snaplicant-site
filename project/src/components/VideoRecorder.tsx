import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, Square, Play, Pause, RotateCcw, Download, Share2, Mic, MicOff, FileText, Edit3, Eye, EyeOff } from 'lucide-react';

interface VideoRecorderProps {
  selectedTemplate: any;
  selectedTier: string;
  resumeAnalysis?: {
    highlights: string[];
    strengths: string[];
    talkingPoints: string[];
    suggestedScript: string;
    summary: string;
  };
  onBack: () => void;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({ selectedTemplate, selectedTier, resumeAnalysis, onBack }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [aiCoaching, setAiCoaching] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const [scriptMode, setScriptMode] = useState<'ai' | 'custom'>('ai');
  const [customScript, setCustomScript] = useState('');
  const [currentScript, setCurrentScript] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const maxRecordingTime = selectedTier === 'free' ? 120 : 300;

  const recordingSteps = [
    {
      title: "Personal Introduction",
      prompt: "Start with a warm greeting and introduce yourself. Mention your name and current role or the position you're seeking.",
      time: 30
    },
    {
      title: "Professional Experience",
      prompt: "Share your most relevant work experience and key achievements. Focus on results and impact you've made.",
      time: 60
    },
    {
      title: "Skills & Expertise",
      prompt: "Highlight your core skills and technical competencies. What makes you unique in your field?",
      time: 45
    },
    {
      title: "Career Goals",
      prompt: "Explain what you're looking for in your next role and how you can contribute to a potential employer.",
      time: 45
    }
  ];

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (selectedTier === 'paid' || selectedTier === 'paid-quarterly') {
      setAiCoaching(true);
      if (resumeAnalysis) {
        setCurrentScript(resumeAnalysis.suggestedScript);
      }
    }
  }, [selectedTier, resumeAnalysis]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: audioEnabled
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
    };

    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);
    
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= maxRecordingTime) {
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };

  const resetRecording = () => {
    setRecordedVideo(null);
    setRecordingTime(0);
    setCurrentStep(1);
    setIsRecording(false);
    setIsPaused(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextStep = () => {
    if (currentStep < recordingSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleScriptModeChange = (mode: 'ai' | 'custom') => {
    setScriptMode(mode);
    if (mode === 'ai' && resumeAnalysis) {
      setCurrentScript(resumeAnalysis.suggestedScript);
    } else if (mode === 'custom') {
      setCurrentScript(customScript);
    }
  };

  const handleCustomScriptChange = (text: string) => {
    setCustomScript(text);
    if (scriptMode === 'custom') {
      setCurrentScript(text);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Templates</span>
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Record Your Introduction
          </h1>
          <p className="text-xl text-white/80">
            Using {selectedTemplate.name} template
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Video Recording Area */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {recordedVideo ? (
                  <video
                    src={recordedVideo}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                    style={{
                      transform: 'scaleX(-1)',
                      filter: `blur(${selectedTemplate.id === 'corporate' ? '0px' : '2px'})`
                    }}
                  />
                )}
                
                {/* Script Overlay */}
                {showScript && currentScript && (selectedTier === 'paid' || selectedTier === 'paid-quarterly') && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg border border-white/20">
                    <div className="max-h-24 overflow-y-auto">
                      <p className="text-sm leading-relaxed">
                        {currentScript}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Recording Overlay */}
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-sm font-medium">REC</span>
                  </div>
                )}
                
                {/* Timer */}
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full">
                  <span className="text-sm font-mono">
                    {formatTime(recordingTime)} / {formatTime(maxRecordingTime)}
                  </span>
                </div>
              </div>
              
              {/* Recording Controls */}
              <div className="flex items-center justify-center space-x-4 mt-6">
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`p-3 rounded-full transition-colors ${
                    audioEnabled 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {audioEnabled ? (
                    <Mic className="w-5 h-5 text-white" />
                  ) : (
                    <MicOff className="w-5 h-5 text-white" />
                  )}
                </button>
                
                {!recordedVideo && (
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-4 rounded-full transition-all duration-300 ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    }`}
                  >
                    {isRecording ? (
                      <Square className="w-6 h-6 text-white" />
                    ) : (
                      <Camera className="w-6 h-6 text-white" />
                    )}
                  </button>
                )}
                
                <button
                  onClick={resetRecording}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <RotateCcw className="w-5 h-5 text-white" />
                </button>
                
                {(selectedTier === 'paid' || selectedTier === 'paid-quarterly') && (
                  <button
                    onClick={() => setShowScript(!showScript)}
                    className={`p-3 rounded-full transition-colors ${
                      showScript 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {showScript ? (
                      <EyeOff className="w-5 h-5 text-white" />
                    ) : (
                      <Eye className="w-5 h-5 text-white" />
                    )}
                  </button>
                )}
              </div>
              
              {recordedVideo && (
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Guidance Panel */}
          <div className="space-y-6">
            {/* Script Panel - Premium Feature */}
            {(selectedTier === 'paid' || selectedTier === 'paid-quarterly') && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Script Assistant</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleScriptModeChange('ai')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        scriptMode === 'ai'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      AI Generated
                    </button>
                    <button
                      onClick={() => handleScriptModeChange('custom')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        scriptMode === 'custom'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      Custom
                    </button>
                  </div>
                </div>
                
                {scriptMode === 'ai' && resumeAnalysis ? (
                  <div className="space-y-4">
                    <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
                        <span>AI-Generated Script</span>
                        <span className="text-xs bg-purple-500 px-2 py-1 rounded-full">Based on Resume</span>
                      </h4>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {resumeAnalysis.suggestedScript}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowScript(!showScript)}
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        showScript
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {showScript ? 'Hide Script During Recording' : 'Show Script During Recording'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Write Your Custom Script
                      </label>
                      <textarea
                        value={customScript}
                        onChange={(e) => handleCustomScriptChange(e.target.value)}
                        placeholder="Write your own script here..."
                        className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      />
                    </div>
                    <button
                      onClick={() => setShowScript(!showScript)}
                      disabled={!customScript.trim()}
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        !customScript.trim()
                          ? 'bg-white/10 text-white/50 cursor-not-allowed'
                          : showScript
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {showScript ? 'Hide Script During Recording' : 'Show Script During Recording'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step Progress */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Recording Guide</h3>
              
              {/* Resume-based talking points for paid users */}
              {resumeAnalysis && (selectedTier === 'paid' || selectedTier === 'paid-quarterly') && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg">
                  <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Personalized Talking Points</span>
                    <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">From Your Resume</span>
                  </h4>
                  <ul className="space-y-2 text-white/80 text-sm">
                    {resumeAnalysis.talkingPoints.slice(0, 4).map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="space-y-4">
                {recordingSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      currentStep === index + 1
                        ? 'bg-blue-500/20 border-blue-500'
                        : currentStep > index + 1
                        ? 'bg-green-500/20 border-green-500'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">
                        Step {index + 1}: {step.title}
                      </h4>
                      <span className="text-sm text-white/60">
                        {step.time}s
                      </span>
                    </div>
                    <p className="text-white/80 text-sm">{step.prompt}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep === recordingSteps.length}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>

            {/* AI Coaching Panel */}
            {aiCoaching && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">AI Coaching</h3>
                <div className="space-y-4">
                  {resumeAnalysis && (
                    <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Your Key Strengths</h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeAnalysis.strengths.slice(0, 3).map((strength, index) => (
                          <span key={index} className="bg-green-500/30 text-green-300 px-2 py-1 rounded-full text-xs">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Speaking Tips</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Maintain eye contact with the camera</li>
                      <li>• Speak clearly and at a moderate pace</li>
                      <li>• Use confident body language</li>
                      <li>• Include specific examples and metrics</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Current Feedback</h4>
                    <p className="text-white/80 text-sm">
                      Great energy! Try to slow down slightly and emphasize your key achievements.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Recording Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Session Info</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{formatTime(recordingTime)}</div>
                  <div className="text-white/60 text-sm">Duration</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{currentStep}/{recordingSteps.length}</div>
                  <div className="text-white/60 text-sm">Progress</div>
                </div>
                {(selectedTier === 'paid' || selectedTier === 'paid-quarterly') && (
                  <div>
                    <div className="text-2xl font-bold text-white">{showScript ? 'ON' : 'OFF'}</div>
                    <div className="text-white/60 text-sm">Script Display</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;
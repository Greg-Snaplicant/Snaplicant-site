import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Play, Camera, Sparkles, CheckCircle, User, Building, Coffee, Briefcase, Monitor, Palette, Users } from 'lucide-react';

interface InteractiveDemoProps {
  onClose: () => void;
  onGetStarted: () => void;
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ onClose, onGetStarted }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Welcome to Snaplicant",
      subtitle: "Transform your job search with video introductions",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto">
            <Camera className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Ready to stand out?</h3>
            <p className="text-white/80 text-lg">
              Let's walk through how easy it is to create a professional video introduction that gets you noticed by employers.
            </p>
            <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                ✨ This demo takes just 2 minutes and shows you the complete process
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 1: Choose Your Plan",
      subtitle: "Select the features that work for you",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <h4 className="text-lg font-semibold text-white">Free Plan</h4>
              </div>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>• 1 basic video profile</li>
                <li>• 2 standard templates</li>
                <li>• Basic video quality</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6 border border-purple-500 ring-2 ring-purple-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white">Paid Plan</h4>
                <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs">Selected</span>
              </div>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>• Unlimited video profiles</li>
                <li>• All premium templates</li>
                <li>• AI coaching & scripts</li>
                <li>• HD video quality</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <p className="text-white/80">For this demo, we'll use the Paid plan features</p>
          </div>
        </div>
      )
    },
    {
      title: "Step 2: AI Resume Analysis",
      subtitle: "Upload your resume for personalized insights",
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Resume_Sarah_Johnson.pdf</h4>
                <p className="text-white/60 text-sm">Uploaded and analyzed</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-white/60 text-sm">Key Highlights</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-white/60 text-sm">Core Strengths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">92</div>
                <div className="text-white/60 text-sm">AI Score</div>
              </div>
            </div>
            
            <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4">
              <h5 className="text-white font-medium mb-2">AI-Generated Script Preview:</h5>
              <p className="text-blue-300 text-sm italic">
                "Hi, I'm Sarah, a Senior Software Engineer with 5+ years of experience building scalable web applications..."
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 3: Choose Your Template",
      subtitle: "Select a background that matches your style",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Corporate Professional', icon: <Building className="w-5 h-5" />, selected: true },
              { name: 'Casual Workspace', icon: <Coffee className="w-5 h-5" />, selected: false },
              { name: 'Executive Suite', icon: <Briefcase className="w-5 h-5" />, selected: false },
              { name: 'Creative Studio', icon: <Palette className="w-5 h-5" />, selected: false },
              { name: 'Tech Hub', icon: <Monitor className="w-5 h-5" />, selected: false },
              { name: 'Team Space', icon: <Users className="w-5 h-5" />, selected: false }
            ].map((template, index) => (
              <div
                key={index}
                className={`relative rounded-lg p-4 border transition-all ${
                  template.selected
                    ? 'bg-blue-500/20 border-blue-500 ring-2 ring-blue-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-blue-400">{template.icon}</div>
                  <span className="text-white text-sm font-medium">{template.name}</span>
                </div>
                {template.selected && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-white/80">Corporate Professional template selected - perfect for tech roles!</p>
          </div>
        </div>
      )
    },
    {
      title: "Step 4: Record Your Video",
      subtitle: "AI coaching guides you through the perfect introduction",
      content: (
        <div className="space-y-6">
          <div className="bg-black rounded-xl p-6 border border-white/10">
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center mb-4 relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <p className="text-white/80">Camera Preview</p>
              </div>
              
              {/* Recording indicator */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-medium">REC</span>
              </div>
              
              {/* Timer */}
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full">
                <span className="text-sm font-mono">1:23 / 3:00</span>
              </div>
              
              {/* AI Script overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg border border-white/20">
                <p className="text-sm">
                  💡 <strong>AI Tip:</strong> Great energy! Now mention your specific achievements with metrics.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <button className="p-3 bg-green-500 rounded-full">
                <Camera className="w-5 h-5 text-white" />
              </button>
              <button className="p-3 bg-red-500 rounded-full">
                <div className="w-5 h-5 bg-white rounded-sm" />
              </button>
            </div>
          </div>
          
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
            <h5 className="text-white font-medium mb-2">AI Coaching Active:</h5>
            <ul className="text-green-300 text-sm space-y-1">
              <li>✓ Good eye contact and posture</li>
              <li>✓ Clear speech and pacing</li>
              <li>→ Consider adding specific project examples</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Step 5: Share & Get Hired",
      subtitle: "Your professional video profile is ready!",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <h4 className="text-xl font-bold text-white">Video Profile Complete!</h4>
                <p className="text-white/80">Ready to share with employers</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2:34</div>
                <div className="text-white/60 text-sm">Video Length</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">HD</div>
                <div className="text-white/60 text-sm">Quality</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">95%</div>
                <div className="text-white/60 text-sm">AI Score</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                <span className="text-white">Share URL:</span>
                <code className="text-blue-300 text-sm">snaplicant.com/v/sarah-johnson</code>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                  Copy Link
                </button>
                <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-colors">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h5 className="text-white font-semibold mb-2">What happens next?</h5>
            <ul className="text-white/80 text-sm space-y-1">
              <li>📧 Share your video profile with employers</li>
              <li>👀 Track views and engagement in your dashboard</li>
              <li>📞 Get contacted directly by interested recruiters</li>
              <li>🎯 Land interviews 3x faster than traditional resumes</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = demoSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-900/95 to-purple-900/95 backdrop-blur-sm rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Interactive Demo</h2>
              <p className="text-white/60 text-sm">Step {currentStep + 1} of {demoSteps.length}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">{currentStepData.title}</h3>
            <p className="text-white/80">{currentStepData.subtitle}</p>
          </div>
          
          <div className="mb-8">
            {currentStepData.content}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/10">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          <div className="flex space-x-2">
            {demoSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-500' : 
                  index < currentStep ? 'bg-green-500' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          
          {currentStep === demoSteps.length - 1 ? (
            <button
              onClick={onGetStarted}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-colors font-semibold"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
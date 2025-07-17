import React, { useState } from 'react';
import { Video, Users, Star, Camera, Sparkles, Play, CheckCircle, Building2 } from 'lucide-react';
import LandingPage from './components/LandingPage';
import Discover from './components/Discover';
import HowItWorks from './components/HowItWorks';
import ForEmployers from './components/ForEmployers';
import PricingPage from './components/PricingPage';
import TemplateSelection from './components/TemplateSelection';
import VideoRecorder from './components/VideoRecorder';
import PricingTiers from './components/PricingTiers';
import EmployerLogin from './components/EmployerLogin';
import EmployerDashboard from './components/EmployerDashboard';
import EmployerPricing from './components/EmployerPricing';
import EmployerAIMatching from './components/EmployerAIMatching';
import ResumeUpload from './components/ResumeUpload';
import UserDashboard from './components/UserDashboard';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import SignUp from './components/SignUp';

function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [userType, setUserType] = useState<'candidate' | 'employer' | 'discover' | 'how-it-works' | 'for-employers' | 'pricing' | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [isEmployerLoggedIn, setIsEmployerLoggedIn] = useState(false);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleGetStarted = (type: 'candidate' | 'employer' | 'discover' | 'how-it-works' | 'for-employers' | 'pricing' | 'privacy-policy' | 'terms-of-service' | 'signup') => {
    setUserType(type);
    if (type === 'privacy-policy') {
      setCurrentStep('privacy-policy');
    } else if (type === 'terms-of-service') {
      setCurrentStep('terms-of-service');
    } else if (type === 'signup') {
      setCurrentStep('signup');
    } else if (type === 'candidate') {
      setCurrentStep('candidate-pricing');
    } else {
      setCurrentStep('employer-login');
    }
  };

  const handleCandidateGetStarted = () => {
    setUserType('candidate');
    // Check if user is logged in, if so go to dashboard
    if (isUserLoggedIn) {
      setCurrentStep('user-dashboard');
    } else {
      setCurrentStep('candidate-pricing');
    }
  };

  const handleEmployerLogin = () => {
    setIsEmployerLoggedIn(true);
    setCurrentStep('employer-dashboard');
  };

  const handleEmployerPricing = () => {
    setCurrentStep('employer-pricing');
  };

  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
    // For paid tiers, show resume upload option first
    if (tier === 'paid' || tier === 'paid-quarterly') {
      setCurrentStep('resume-upload');
    } else {
      setCurrentStep('templates');
    }
  };

  const handlePricingSelect = (plan: string, planUserType: 'candidate' | 'employer') => {
    if (planUserType === 'candidate') {
      setSelectedTier(plan);
      // For paid plans, show resume upload option first
      if (plan === 'paid' || plan === 'paid-quarterly') {
        setCurrentStep('resume-upload');
      } else {
        setCurrentStep('templates');
      }
    } else {
      setCurrentStep('employer-login');
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentStep('recorder');
  };

  const handleResumeAnalyzed = (analysis) => {
    setResumeAnalysis(analysis);
    setCurrentStep('templates');
  };

  const handleUserLogin = () => {
    setIsUserLoggedIn(true);
    setCurrentStep('user-dashboard');
  };

  const handleSignUp = () => {
    setIsUserLoggedIn(true);
    setCurrentStep('user-dashboard');
  };

  const handleCreateNewVideo = () => {
    setCurrentStep('candidate-pricing');
  };

  const handleEmployerAIMatching = () => {
    setCurrentStep('employer-ai-matching');
  };
  
  const handleBackToLanding = () => {
    setCurrentStep('landing');
    setSelectedTemplate(null);
    setSelectedTier(null);
    setUserType(null);
    setIsEmployerLoggedIn(false);
    setResumeAnalysis(null);
    setIsUserLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {currentStep === 'landing' && (
        <LandingPage 
          onGetStarted={handleGetStarted}
          onCandidateGetStarted={handleCandidateGetStarted}
        />
      )}
      
      {currentStep === 'privacy-policy' && (
        <PrivacyPolicy 
          onBack={handleBackToLanding}
        />
      )}
      
      {currentStep === 'terms-of-service' && (
        <TermsOfService 
          onBack={handleBackToLanding}
        />
      )}
      
      {currentStep === 'signup' && (
        <SignUp 
          onBack={handleBackToLanding}
          onSignUp={handleSignUp}
        />
      )}
      
      {currentStep === 'discover' && (
        <Discover 
          onBack={handleBackToLanding}
        />
      )}
      
      {currentStep === 'how-it-works' && (
        <HowItWorks 
          onBack={handleBackToLanding}
        />
      )}
      
      {currentStep === 'for-employers' && (
        <ForEmployers 
          onBack={handleBackToLanding}
          onGetStarted={() => setCurrentStep('employer-login')}
        />
      )}
      
      {currentStep === 'pricing' && (
        <PricingPage 
          onBack={handleBackToLanding}
          onSelectPlan={handlePricingSelect}
        />
      )}
      
      {currentStep === 'employer-login' && (
        <EmployerLogin 
          onLogin={handleEmployerLogin}
          onPricing={handleEmployerPricing}
          onBack={handleBackToLanding}
        />
      )}
      
      {currentStep === 'employer-pricing' && (
        <EmployerPricing 
          onBack={() => setCurrentStep('employer-login')}
          onSelectPlan={handleEmployerLogin}
        />
      )}
      
      {currentStep === 'employer-dashboard' && (
        <EmployerDashboard 
          onBack={handleBackToLanding}
          onAIMatching={handleEmployerAIMatching}
        />
      )}
      
      {currentStep === 'employer-ai-matching' && (
        <EmployerAIMatching 
          onBack={() => setCurrentStep('employer-dashboard')}
        />
      )}
      
      {currentStep === 'candidate-pricing' && (
        <PricingTiers 
          onTierSelect={handleTierSelect} 
          onBack={handleBackToLanding}
        />
      )}
      
      {currentStep === 'user-dashboard' && (
        <UserDashboard 
          onBack={handleBackToLanding}
          onCreateNew={handleCreateNewVideo}
          onNavigate={setCurrentView}
        />
      )}
      
      {currentStep === 'resume-upload' && (
        <ResumeUpload 
          onResumeAnalyzed={handleResumeAnalyzed}
          onBack={() => setCurrentStep('templates')}
        />
      )}
      
      {currentStep === 'templates' && (
        <TemplateSelection 
          onTemplateSelect={handleTemplateSelect}
          selectedTier={selectedTier}
          onBack={() => {
            if (selectedTier === 'paid' || selectedTier === 'paid-quarterly') {
              setCurrentStep('resume-upload');
            } else {
              setCurrentStep('candidate-pricing');
            }
          }}
        />
      )}
      
      {currentStep === 'recorder' && (
        <VideoRecorder 
          selectedTemplate={selectedTemplate}
          selectedTier={selectedTier}
          resumeAnalysis={resumeAnalysis}
          onBack={() => setCurrentStep('templates')}
        />
      )}
    </div>
  );
}

export default App;
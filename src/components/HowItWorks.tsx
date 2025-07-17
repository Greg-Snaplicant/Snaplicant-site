import React, { useState } from 'react';
import { ArrowLeft, Video, Users, Star, Camera, Sparkles, Play, CheckCircle, ArrowRight, Building2, User, Search, Upload, Share2 } from 'lucide-react';

interface HowItWorksProps {
  onBack: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'seekers' | 'employers'>('seekers');

  const seekerSteps = [
    {
      icon: <User className="w-8 h-8 text-blue-400" />,
      title: "Create Your Profile",
      description: "Sign up and choose your plan. Set up your professional profile with basic information.",
      visual: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Camera className="w-8 h-8 text-purple-400" />,
      title: "Record Your Video",
      description: "Use our AI-powered script generator and professional templates to create compelling video introductions.",
      visual: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-indigo-400" />,
      title: "Enhance & Customize",
      description: "Add custom branding, choose from premium templates, and get AI coaching to perfect your presentation.",
      visual: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Share2 className="w-8 h-8 text-green-400" />,
      title: "Share & Get Hired",
      description: "Share your video profile via URL or PDF. Get discovered by employers and land your dream job.",
      visual: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const employerSteps = [
    {
      icon: <Building2 className="w-8 h-8 text-blue-400" />,
      title: "Sign Up & Choose Plan",
      description: "Create your employer account and select the plan that fits your hiring needs.",
      visual: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Search className="w-8 h-8 text-purple-400" />,
      title: "Browse Candidates",
      description: "Use advanced filters to find candidates that match your requirements. View video introductions instantly.",
      visual: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Video className="w-8 h-8 text-indigo-400" />,
      title: "Quick Assessment",
      description: "Evaluate candidates 3x faster with video introductions. See personality and communication skills immediately.",
      visual: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Users className="w-8 h-8 text-green-400" />,
      title: "Connect & Hire",
      description: "Use contact credits to reach out to promising candidates. Streamline your hiring process.",
      visual: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const currentSteps = activeTab === 'seekers' ? seekerSteps : employerSteps;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How Snaplicant Works
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Revolutionizing talent acquisition through video-first introductions
          </p>

          {/* Tab Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
              <button
                onClick={() => setActiveTab('seekers')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'seekers'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                For Job Seekers
              </button>
              <button
                onClick={() => setActiveTab('employers')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'employers'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                For Employers
              </button>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {currentSteps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-white/60">
                    Step {index + 1}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white">{step.title}</h3>
                <p className="text-xl text-white/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <img
                    src={step.visual}
                    alt={step.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {activeTab === 'seekers' 
                ? 'Transform your job search with professional video introductions'
                : 'Streamline your hiring process and find better candidates faster'
              }
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto">
              <span>
                {activeTab === 'seekers' ? 'Start Recording' : 'View Employer Plans'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
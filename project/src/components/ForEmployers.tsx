import React from 'react';
import { ArrowLeft, Building2, Users, Clock, TrendingUp, Eye, Star, CheckCircle, ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react';

interface ForEmployersProps {
  onBack: () => void;
  onGetStarted: () => void;
}

const ForEmployers: React.FC<ForEmployersProps> = ({ onBack, onGetStarted }) => {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-blue-400" />,
      title: "3x Faster Screening",
      description: "Reduce initial screening time by 70% with instant video introductions that show personality and communication skills."
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "AI-Powered Matching",
      description: "Describe your ideal candidate in plain English and get intelligent matches from our video profile database."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "85% Higher Response Rate",
      description: "Video profiles generate significantly more engagement than traditional resumes, leading to better candidate responses."
    },
    {
      icon: <Eye className="w-8 h-8 text-purple-400" />,
      title: "Better Quality Matches",
      description: "See beyond the resume with video introductions that reveal communication skills, personality, and cultural fit."
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Advanced Filtering",
      description: "Filter by role, location, experience, skills, and more to find your ideal candidates quickly."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-400" />,
      title: "Verified Profiles",
      description: "All candidate profiles are verified and professionally curated for quality assurance."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
      title: "Analytics Dashboard",
      description: "Track your hiring metrics, candidate engagement, and optimize your recruitment strategy."
    }
  ];

  const plans = [
    {
      name: 'Basic',
      price: '$49',
      period: '/month',
      description: 'Perfect for small teams',
      features: [
        'View up to 50 candidate profiles',
        '10 contact credits per month',
        'Basic filtering tools',
        'Quick view feature',
        'Email support'
      ]
    },
    {
      name: 'Pro',
      price: '$99',
      period: '/month',
      description: 'For growing companies',
      popular: true,
      features: [
        'View up to 100 candidate profiles',
        '25 contact credits per month',
        'Advanced filtering & search',
        'Candidate tagging & bookmarks',
        'Analytics dashboard',
        'Priority support'
      ]
    },
    {
      name: 'Elite',
      price: '$249',
      period: '/month',
      description: 'For enterprise organizations',
      features: [
        'Unlimited candidate profiles',
        '150+ contact credits per month',
        'AI-powered matching',
        'Custom branded dashboard',
        'Dedicated account manager',
        'API access'
      ]
    }
  ];

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

        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Hire Better,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Hire Faster</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Transform your recruitment process with video-first candidate profiles. See personality, communication skills, and cultural fit before the first interview.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Access Your Employer Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Top Companies Choose Snaplicant
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Demo Section */}
        <div className="mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Powerful Dashboard & Tools
              </h2>
              <p className="text-xl text-white/80">
                Everything you need to streamline your hiring process
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    {feature.icon}
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Mock Dashboard Preview */}
            <div className="bg-black/20 rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Candidate Dashboard Preview</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-500/20 rounded p-3 text-center">
                  <div className="text-2xl font-bold text-white">1,247</div>
                  <div className="text-white/60 text-sm">Total Candidates</div>
                </div>
                <div className="bg-green-500/20 rounded p-3 text-center">
                  <div className="text-2xl font-bold text-white">89</div>
                  <div className="text-white/60 text-sm">Profile Views</div>
                </div>
                <div className="bg-purple-500/20 rounded p-3 text-center">
                  <div className="text-2xl font-bold text-white">23</div>
                  <div className="text-white/60 text-sm">Bookmarked</div>
                </div>
              </div>
              <div className="text-center text-white/60 text-sm">
                Interactive dashboard with real-time analytics and candidate management
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-white/80">
              All plans include a 14-day free trial
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:bg-white/10 ${
                  plan.popular 
                    ? 'border-purple-500 ring-2 ring-purple-500/30' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onGetStarted}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  Access Your Employer Dashboard
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              For large enterprises with specific requirements, we offer custom solutions with dedicated support and white-label options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Access Your Employer Dashboard
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForEmployers;
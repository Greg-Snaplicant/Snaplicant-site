import React, { useState } from 'react';
import { ArrowLeft, Check, Star, Sparkles, Crown, Building2, User } from 'lucide-react';

interface PricingPageProps {
  onBack: () => void;
  onSelectPlan: (plan: string, userType: 'candidate' | 'employer') => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBack, onSelectPlan }) => {
  const [activeTab, setActiveTab] = useState<'candidate' | 'employer'>('candidate');

  const candidatePlans = [
    {
      id: 'free',
      name: 'Free',
      price: 'Free',
      description: 'Get started with basic features',
      icon: <Star className="w-6 h-6 text-blue-400" />,
      features: [
        '1 basic Snaplicant profile/video',
        'AI script generator (limited prompts)',
        'Access to 2 standard templates',
        'No profile customization',
        'Basic video quality',
        'Email support'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'bg-white/10 hover:bg-white/20 text-white'
    },
    {
      id: 'paid',
      name: 'Paid',
      price: '$10',
      period: '/month',
      description: 'Unlock premium features',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      features: [
        'Create multiple Snaplicants',
        'Custom branding & video styles',
        'Access to premium AI scripts',
        'Voiceover guidance & coaching',
        'HD video quality',
        'Download/share as PDF or private URL',
        '"Featured Candidate" badge',
        'Enhanced profile visibility',
        'Priority support',
        'Profile customization options'
      ],
      buttonText: 'Upgrade to Paid',
      buttonStyle: 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white',
      popular: true
    }
  ];

  const employerPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$49',
      period: '/month',
      description: 'Perfect for small teams',
      icon: <Star className="w-6 h-6 text-blue-400" />,
      features: [
        'View up to 50 candidate profiles',
        '10 contact credits per month',
        'Basic filtering tools',
        'Quick view feature',
        'Email support',
        'Export candidate data'
      ],
      buttonText: 'Start Basic Plan',
      buttonStyle: 'bg-white/10 hover:bg-white/20 text-white'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$99',
      period: '/month',
      description: 'For growing companies',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      features: [
        'View up to 100 candidate profiles',
        '25 contact credits per month',
        'Advanced filtering & search',
        'Quick view feature',
        'Candidate tagging & bookmarks',
        'Priority support',
        'Analytics dashboard',
        'Team collaboration tools'
      ],
      buttonText: 'Start Pro Plan',
      buttonStyle: 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white',
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '$249',
      period: '/month',
      description: 'For enterprise organizations',
      icon: <Crown className="w-6 h-6 text-yellow-400" />,
      features: [
        'Unlimited candidate profiles',
        '150+ contact credits per month',
        'Advanced AI-powered matching',
        'Custom branded dashboard',
        'White-label solutions',
        'Dedicated account manager',
        'API access',
        'Custom integrations',
        'Advanced analytics & reporting',
        'Priority phone support'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
    }
  ];

  const currentPlans = activeTab === 'candidate' ? candidatePlans : employerPlans;

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
            Choose Your Plan
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>

          {/* Tab Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
              <button
                onClick={() => setActiveTab('candidate')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'candidate'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Job Seekers</span>
              </button>
              <button
                onClick={() => setActiveTab('employer')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'employer'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Employers</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentPlans.map((plan) => (
            <div
              key={plan.id}
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
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/60 ml-1">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPlan(plan.id, activeTab)}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Special Offers */}
        {activeTab === 'candidate' && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30 max-w-4xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Special Offer!</h3>
              <p className="text-xl text-white/80 mb-6">
                Get 3 months of Paid features for just <span className="text-purple-400 font-bold">$25</span>
              </p>
              <button
                onClick={() => onSelectPlan('paid-quarterly', 'candidate')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Get 3-Month Deal
              </button>
            </div>
          </div>
        )}

        {/* All Plans Include */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">All Plans Include:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-white/80">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Secure data hosting</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Mobile-friendly interface</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Real-time notifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>GDPR compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Regular platform updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
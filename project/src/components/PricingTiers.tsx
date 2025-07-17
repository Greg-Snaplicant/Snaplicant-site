import React from 'react';
import { Check, Star, Sparkles, Crown, ArrowLeft, CheckCircle } from 'lucide-react';

interface PricingTiersProps {
  onTierSelect: (tier: string) => void;
  onBack: () => void;
}

const PricingTiers: React.FC<PricingTiersProps> = ({ onTierSelect, onBack }) => {
  const tiers = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Get started with basic features',
      icon: <Star className="w-6 h-6 text-blue-400" />,
      features: [
        '1 basic video profile',
        'AI script generator (5 prompts)',
        'Access to 2 standard templates',
        'Basic video quality',
        'Standard sharing options',
        'Email support',
        'No resume analysis'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'bg-white/10 hover:bg-white/20 text-white'
    },
    {
      id: 'paid',
      name: 'Paid',
      price: '$10/month',
      description: 'Unlock all premium features',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      features: [
        'Unlimited video profiles',
        'Unlimited AI script prompts',
        'Access to all premium templates',
        'AI resume analysis & insights',
        'Custom branding & video styles',
        'Voiceover guidance & coaching',
        'HD video quality',
        'Advanced sharing & analytics',
        '"Featured Candidate" badge',
        'Priority support',
        'Export as PDF'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white',
      popular: true
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

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Start with our free plan or unlock premium features for just $10/month.
          </p>
          <div className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full text-green-300">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>14-day free trial on all paid plans</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-10 border transition-all duration-300 hover:bg-white/10 ${
                  tier.popular 
                    ? 'border-purple-500 ring-2 ring-purple-500/30' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-10">
                  <div className="flex justify-center mb-4">
                    {tier.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">{tier.name}</h3>
                  <p className="text-white/60 mb-6 text-lg">{tier.description}</p>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-white">{tier.price}</span>
                    {tier.period && <span className="text-white/60 ml-2 text-xl">{tier.period}</span>}
                  </div>
                </div>

                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onTierSelect(tier.id)}
                  className={`w-full py-4 rounded-xl font-semibold text-xl transition-all duration-300 transform hover:scale-105 ${tier.buttonStyle}`}
                >
                  {tier.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            {/* Special Offer */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-10 border border-purple-500/30 max-w-4xl mx-auto mb-12">
              <h3 className="text-3xl font-bold text-white mb-6">Special Offer!</h3>
              <p className="text-xl text-white/80 mb-8">
                Get 3 months of Paid features for just <span className="text-purple-400 font-bold">$25</span>
              </p>
              <button
                onClick={() => onTierSelect('paid-quarterly')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Get 3-Month Deal
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-10 border border-white/10 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-8">All Plans Include:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-white/80">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Secure profile hosting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Mobile-friendly recording</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Profile analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Privacy controls</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTiers;
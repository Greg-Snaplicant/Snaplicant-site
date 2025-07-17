import React from 'react';
import { ArrowLeft, Check, Star, Sparkles, Crown, Building2 } from 'lucide-react';

interface EmployerPricingProps {
  onBack: () => void;
  onSelectPlan: (plan: string) => void;
}

const EmployerPricing: React.FC<EmployerPricingProps> = ({ onBack, onSelectPlan }) => {
  const plans = [
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
        'Export candidate data',
        'Basic AI candidate matching'
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
        'Team collaboration tools',
        'Advanced AI candidate matching',
        'Natural language search queries'
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
        'Priority phone support',
        'Premium AI matching with detailed insights',
        'Custom matching algorithms'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
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
            <span>Back to Login</span>
          </button>
        </div>

        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Employer Pricing Plans
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Find the perfect plan for your hiring needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
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
                  <span className="text-white/60 ml-1">{plan.period}</span>
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
                onClick={() => onSelectPlan(plan.id)}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

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
                <span>Secure candidate data</span>
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

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h3>
            <p className="text-white/80 mb-6">
              For large enterprises with specific requirements, we offer custom solutions with dedicated support.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerPricing;
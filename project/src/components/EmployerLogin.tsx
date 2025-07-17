import React, { useState } from 'react';
import { ArrowLeft, Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface EmployerLoginProps {
  onLogin: () => void;
  onPricing: () => void;
  onBack: () => void;
}

const EmployerLogin: React.FC<EmployerLoginProps> = ({ onLogin, onPricing, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company: '',
    firstName: '',
    lastName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            <span>Back to Home</span>
          </button>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join Snaplicant'}
              </h1>
              <p className="text-white/80">
                {isLogin 
                  ? 'Access your employer dashboard' 
                  : 'Start your 14-day free trial today'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Acme Corporation"
                      required
                    />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {isLogin ? 'Sign In' : 'Start Free Trial'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>

            {!isLogin && (
            <>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="marketingConsent"
                  defaultChecked={true}
                  className="w-4 h-4 mt-1 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                />
                <label htmlFor="marketingConsent" className="text-white/80 text-sm">
                  Keep me updated about Snaplicant news and job-seeking tips.
                </label>
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
                <h4 className="font-semibold text-white mb-2">14-Day Free Trial Includes:</h4>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Access to all candidate profiles</li>
                  <li>• 5 contact credits</li>
                  <li>• Advanced filtering tools</li>
                  <li>• Quick view feature</li>
                  <li>• No commitment required</li>
                </ul>
                <div className="mt-4 text-center">
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
            </>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={onPricing}
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                View Pricing Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerLogin;
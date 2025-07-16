import React from 'react';
import { Video, Users, Star, Camera, Sparkles, Play, CheckCircle, ArrowRight, Building2, User, X } from 'lucide-react';
import InteractiveDemo from './InteractiveDemo';
import NewsletterSignup from './NewsletterSignup';

interface LandingPageProps {
  onGetStarted: (type: 'candidate' | 'employer' | 'discover' | 'how-it-works' | 'for-employers' | 'pricing' | 'privacy-policy') => void;
  onCandidateGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onCandidateGetStarted }) => {
  const [selectedFeature, setSelectedFeature] = React.useState<string | null>(null);
  const [showDemo, setShowDemo] = React.useState(false);
  const [showNewsletter, setShowNewsletter] = React.useState(false);

  const features = [
    {
      id: 'video-intro',
      icon: <Video className="w-8 h-8 text-blue-400" />,
      title: "Professional Video Introductions",
      description: "Replace static resumes with dynamic video presentations that showcase your personality and communication skills.",
      detailedDescription: "Ditch the dull paper resume. Snaplicant lets you create polished, 60-second video intros that showcase your personality, confidence, and communication skills — the things hiring managers actually want to see. No experience? No problem — we guide you every step."
    },
    {
      id: 'templates',
      icon: <Camera className="w-8 h-8 text-purple-400" />,
      title: "Multiple Template Options",
      description: "Choose from professional, casual, or branded backgrounds to match your industry and personal style."
    },
    {
      id: 'ai-assistance',
      icon: <Sparkles className="w-8 h-8 text-indigo-400" />,
      title: "AI-Powered Assistance",
      description: "Get real-time coaching and suggestions to help you create the perfect video introduction."
    },
    {
      id: 'employer-friendly',
      icon: <Users className="w-8 h-8 text-cyan-400" />,
      title: "Employer-Friendly Format",
      description: "Streamlined video format that helps employers make faster, more informed hiring decisions."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "This platform completely changed how we evaluate candidates. We can see personality and communication skills immediately.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      company: "Startup Inc",
      content: "I landed my dream job within a week of creating my video introduction. The AI coaching was incredibly helpful.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "HR Manager",
      company: "Global Solutions",
      content: "We've reduced our initial screening time by 70% while finding better-fit candidates. Game-changer!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img src="/Snaplicant logo - FINAL.png" alt="Snaplicant" className="h-8" />
                <div>
                  <span className="text-xl font-bold text-white">Snaplicant</span>
                  <div className="text-xs text-white/80 font-medium">Snap. Stand Out. Get Hired.</div>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => onGetStarted('discover')}
                className="text-white/80 hover:text-white transition-colors"
              >
                Discover
              </button>
              <button 
                onClick={() => onGetStarted('how-it-works')}
                className="text-white/80 hover:text-white transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => onGetStarted('for-employers')}
                className="text-white/80 hover:text-white transition-colors"
              >
                For Employers
              </button>
              <button 
                onClick={() => onGetStarted('pricing')}
                className="text-white/80 hover:text-white transition-colors"
              >
                Pricing
              </button>
            </nav>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => onGetStarted('employer')}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Login/Access Your Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Revolutionize Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Job Search</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Transform static resumes into dynamic video introductions. Show employers who you really are with professional video presentations that highlight your skills, experience, and personality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onCandidateGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>Start Recording</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onGetStarted('employer')}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center justify-center space-x-2"
              >
                <Building2 className="w-5 h-5" />
                <span>I'm an Employer</span>
              </button>
              <button 
                onClick={onCandidateGetStarted}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center justify-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>Login/Dashboard</span>
              </button>
              <button 
                onClick={() => setShowDemo(true)}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Snaplicant?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Stand out from the crowd with professional video introductions that showcase your unique value proposition.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => feature.id === 'video-intro' ? setSelectedFeature('video-intro') : feature.id === 'templates' ? setSelectedFeature('templates') : null}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl w-full relative">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            {selectedFeature === 'video-intro' && (
              <>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Professional Video Introductions</h3>
                    <p className="text-blue-400">Transform your job search</p>
                  </div>
                </div>
                
                <p className="text-lg text-white/90 leading-relaxed mb-8">
                  Ditch the dull paper resume. Snaplicant lets you create polished, 60-second video intros that showcase your personality, confidence, and communication skills — the things hiring managers actually want to see. No experience? No problem — we guide you every step.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onCandidateGetStarted}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Start Recording</span>
                  </button>
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
            
            {selectedFeature === 'templates' && (
              <>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Multiple Template Options</h3>
                    <p className="text-purple-400">Perfect style for every industry</p>
                  </div>
                </div>
                
                <p className="text-lg text-white/90 leading-relaxed mb-8">
                  From minimalist and modern to creative and bold — choose from a variety of professionally designed templates that align with your industry, goals, and personal style. Whether you're applying for corporate roles or creative gigs, we've got a format that fits.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onCandidateGetStarted}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Explore Templates</span>
                  </button>
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Interactive Demo Modal */}
      {showDemo && (
        <InteractiveDemo 
          onClose={() => setShowDemo(false)}
          onGetStarted={onCandidateGetStarted}
        />
      )}
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-white/80">Join thousands of professionals who've transformed their job search</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-white/60">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of professionals who've already revolutionized their job search with video introductions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onCandidateGetStarted}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* Newsletter Modal */}
      {showNewsletter && (
        <NewsletterSignup 
          isModal={true}
          onClose={() => setShowNewsletter(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/Snaplicant logo - FINAL.png" alt="Snaplicant" className="h-6" />
                <span className="text-lg font-bold text-white">Snaplicant</span>
              </div>
              <p className="text-white/60">Revolutionizing talent acquisition through video introductions.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><button onClick={() => onGetStarted('privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 mt-8 text-center text-white/60">
            <p>&copy; 2024 Snaplicant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
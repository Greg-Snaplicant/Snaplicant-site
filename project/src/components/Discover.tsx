import React from 'react';
import { ArrowLeft, Lightbulb, Heart, Users, Star, Video, Sparkles, Shield, Zap, Award, Quote, Clock } from 'lucide-react';

interface DiscoverProps {
  onBack: () => void;
}

const Discover: React.FC<DiscoverProps> = ({ onBack }) => {
  const originStory = {
    title: "Why Snaplicant Was Born",
    subtitle: "From Frustration to Innovation",
    story: [
      {
        icon: <Heart className="w-8 h-8 text-red-400" />,
        title: "The Problem We Saw",
        description: "Traditional resumes weren't telling the full story. Talented individuals were being overlooked because a piece of paper couldn't capture their personality, passion, or communication skills."
      },
      {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: "The Breakthrough Moment",
        description: "We realized that in a world where video calls became the norm, why were we still hiring based on static documents? People deserve to be seen and heard, not just read."
      },
      {
        icon: <Users className="w-8 h-8 text-blue-400" />,
        title: "Our Mission Today",
        description: "To revolutionize talent acquisition by putting the human back in human resources. Every person has a story worth telling, and every employer deserves to see the real person behind the resume."
      }
    ]
  };

  const exclusiveFeatures = [
    {
      icon: <Video className="w-8 h-8 text-purple-400" />,
      title: "AI-Powered Video Coaching",
      description: "Real-time feedback and suggestions to help you create the perfect video introduction. Our AI analyzes speech patterns, body language, and content quality.",
      exclusive: "Only on Snaplicant"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-indigo-400" />,
      title: "Dynamic Template Engine",
      description: "Industry-specific templates that adapt to your profession. From corporate boardrooms to creative studios, we have the perfect backdrop for your story.",
      exclusive: "Patent Pending"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Privacy-First Sharing",
      description: "Complete control over who sees your profile. Share via private URLs, set expiration dates, and track viewer analytics while maintaining your privacy.",
      exclusive: "Industry Leading"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Instant Employer Matching",
      description: "Our proprietary algorithm matches your video profile with employer preferences in real-time, increasing your visibility to the right opportunities.",
      exclusive: "Snaplicant Exclusive"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-400" />,
      title: "Featured Candidate Program",
      description: "Top-performing video profiles get featured placement in employer searches, dramatically increasing your chances of being discovered.",
      exclusive: "Premium Feature"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      content: "I was skeptical about video resumes until I tried Snaplicant. Within two weeks, I had three interview requests from companies that said they were impressed by my communication skills and passion for coding. The AI coaching helped me present my best self.",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      outcome: "Landed dream job at Google"
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director",
      company: "Spotify",
      content: "As someone who struggled with traditional interviews due to anxiety, Snaplicant was a game-changer. I could record my introduction in a comfortable environment and really showcase my creativity and strategic thinking. The results speak for themselves.",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      outcome: "3x more interview invitations"
    },
    {
      name: "Dr. Emily Watson",
      role: "Data Scientist",
      company: "Microsoft",
      content: "The platform helped me transition from academia to tech. The AI script generator helped me translate my research experience into business value, and the professional templates gave me confidence. I received offers from 4 major tech companies.",
      rating: 5,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
      outcome: "Career transition success"
    },
    {
      name: "James Park",
      role: "HR Director",
      company: "Tesla",
      content: "From an employer perspective, Snaplicant has revolutionized our hiring process. We can assess cultural fit and communication skills before the first interview, saving us countless hours and helping us find candidates who truly align with our values.",
      rating: 5,
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
      outcome: "70% reduction in screening time"
    },
    {
      name: "Lisa Thompson",
      role: "UX Designer",
      company: "Airbnb",
      content: "The creative templates and customization options allowed me to showcase my design aesthetic right in my introduction. Employers could see my attention to detail and creative thinking before even looking at my portfolio. It's brilliant!",
      rating: 5,
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150",
      outcome: "Portfolio views increased 400%"
    },
    {
      name: "David Kim",
      role: "Sales Manager",
      company: "Salesforce",
      content: "In sales, personality and communication are everything. Snaplicant let me demonstrate these skills upfront. The featured candidate program got me noticed by top companies, and I closed my dream job offer in record time.",
      rating: 5,
      image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150",
      outcome: "Dream job in 2 weeks"
    }
  ];

  const impactStats = [
    { number: "50,000+", label: "Success Stories", description: "Professionals who found their dream jobs" },
    { number: "2,000+", label: "Partner Companies", description: "Leading employers using our platform" },
    { number: "85%", label: "Success Rate", description: "Users who get interviews within 30 days" },
    { number: "3x", label: "Faster Hiring", description: "Average time reduction in recruitment process" }
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Our Story</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            The journey from frustration to innovation, and how we're changing the future of talent acquisition
          </p>
        </div>

        {/* Origin Story Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {originStory.title}
            </h2>
            <p className="text-xl text-white/80">
              {originStory.subtitle}
            </p>
          </div>

          <div className="space-y-16">
            {originStory.story.map((chapter, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                        {chapter.icon}
                      </div>
                      <div className="text-2xl font-bold text-white/60">
                        Chapter {index + 1}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{chapter.title}</h3>
                    <p className="text-lg text-white/80 leading-relaxed">
                      {chapter.description}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 flex items-center justify-center">
                      <div className="text-6xl opacity-20">
                        {chapter.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-24">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold text-blue-400 mb-2">{stat.label}</div>
                  <div className="text-white/70">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exclusive Features */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Exclusive Features
            </h2>
            <p className="text-xl text-white/80">
              Innovation that sets us apart from the competition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exclusiveFeatures.map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 relative">
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    {feature.exclusive}
                  </span>
                </div>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Testimonials */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-white/80">
              Amazing stories from our community
            </p>
          </div>

          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-16 border border-white/10 text-center max-w-2xl">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">Coming Soon</h3>
              <p className="text-xl text-white/80 mb-6">
                We're collecting amazing success stories from our early users. Check back soon to see how Snaplicant is transforming careers!
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-white/10 rounded-full text-white/70">
                <Clock className="w-5 h-5 mr-2" />
                <span>Stories launching with our public beta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of professionals who've transformed their careers with Snaplicant
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Start Your Journey Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
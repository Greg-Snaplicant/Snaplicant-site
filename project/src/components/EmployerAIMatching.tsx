import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Search, User, MapPin, Briefcase, Star, Video, Eye, Mail, Bookmark, Brain, Zap, Target, Users, TrendingUp, Filter } from 'lucide-react';

interface EmployerAIMatchingProps {
  onBack: () => void;
}

const EmployerAIMatching: React.FC<EmployerAIMatchingProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<'input' | 'generating' | 'results'>('input');
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setCurrentStep('generating');
    
    // Simulate AI processing
    setTimeout(() => {
      const mockMatches = [
        {
          id: 1,
          name: 'Sarah Chen',
          role: 'Senior Frontend Developer',
          location: 'San Francisco, CA',
          experience: '6 years',
          skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
          education: 'BS Computer Science - Stanford',
          previousCompanies: ['Google', 'Stripe'],
          matchScore: 94,
          matchReasons: [
            'Strong React and TypeScript expertise matches your requirements',
            'Previous experience at top-tier tech companies',
            'Located in San Francisco as preferred',
            'Leadership experience managing frontend teams'
          ],
          videoThumbnail: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
          rating: 4.9,
          lastActive: '2 hours ago',
          isRemote: true,
          salary: '$140k - $180k',
          availability: 'Available immediately'
        },
        {
          id: 2,
          name: 'Marcus Rodriguez',
          role: 'Full Stack Engineer',
          location: 'Austin, TX',
          experience: '5 years',
          skills: ['React', 'Python', 'Django', 'PostgreSQL'],
          education: 'MS Software Engineering - UT Austin',
          previousCompanies: ['Microsoft', 'Shopify'],
          matchScore: 91,
          matchReasons: [
            'Full-stack capabilities with React frontend expertise',
            'Strong backend experience with Python/Django',
            'Experience scaling applications at Microsoft',
            'Open to remote work arrangements'
          ],
          videoThumbnail: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
          rating: 4.8,
          lastActive: '1 day ago',
          isRemote: true,
          salary: '$120k - $160k',
          availability: '2 weeks notice'
        },
        {
          id: 3,
          name: 'Emily Watson',
          role: 'Frontend Developer',
          location: 'Seattle, WA',
          experience: '4 years',
          skills: ['React', 'Vue.js', 'JavaScript', 'CSS'],
          education: 'BS Computer Science - University of Washington',
          previousCompanies: ['Amazon', 'Zillow'],
          matchScore: 88,
          matchReasons: [
            'Solid React experience with modern JavaScript',
            'Experience at Amazon with large-scale applications',
            'Strong CSS and UI/UX sensibilities',
            'Pacific timezone alignment'
          ],
          videoThumbnail: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
          rating: 4.7,
          lastActive: '3 hours ago',
          isRemote: false,
          salary: '$110k - $140k',
          availability: 'Available immediately'
        },
        {
          id: 4,
          name: 'David Kim',
          role: 'Senior React Developer',
          location: 'New York, NY',
          experience: '7 years',
          skills: ['React', 'Redux', 'TypeScript', 'GraphQL'],
          education: 'BS Computer Science - NYU',
          previousCompanies: ['Facebook', 'Airbnb'],
          matchScore: 92,
          matchReasons: [
            'Extensive React ecosystem experience (Redux, GraphQL)',
            'Senior-level experience at top tech companies',
            'Strong TypeScript skills for scalable codebases',
            'Proven track record with complex frontend architectures'
          ],
          videoThumbnail: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300',
          rating: 4.9,
          lastActive: '5 hours ago',
          isRemote: true,
          salary: '$150k - $190k',
          availability: '1 month notice'
        },
        {
          id: 5,
          name: 'Lisa Thompson',
          role: 'Frontend Engineer',
          location: 'Denver, CO',
          experience: '5 years',
          skills: ['React', 'Next.js', 'Tailwind CSS', 'Jest'],
          education: 'BS Software Engineering - Colorado State',
          previousCompanies: ['Spotify', 'Twilio'],
          matchScore: 89,
          matchReasons: [
            'Modern React stack with Next.js experience',
            'Strong testing practices with Jest',
            'Experience at Spotify with music streaming applications',
            'Mountain timezone flexibility'
          ],
          videoThumbnail: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300',
          rating: 4.8,
          lastActive: '1 day ago',
          isRemote: true,
          salary: '$125k - $155k',
          availability: '3 weeks notice'
        }
      ];
      
      setMatches(mockMatches);
      setCurrentStep('results');
    }, 3000);
  };

  const handleNewSearch = () => {
    setCurrentStep('input');
    setSearchQuery('');
    setMatches([]);
  };

  const CandidateCard = ({ candidate }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={candidate.videoThumbnail}
              alt={candidate.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Video className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
            <p className="text-blue-400">{candidate.role}</p>
            <div className="flex items-center space-x-2 text-white/60 text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span>{candidate.location}</span>
              {candidate.isRemote && (
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">Remote OK</span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 mb-2">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{candidate.matchScore}%</span>
          </div>
          <div className="text-white/60 text-sm">Match Score</div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <Briefcase className="w-4 h-4" />
          <span>{candidate.experience} experience • {candidate.salary}</span>
        </div>
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{candidate.rating}/5.0 • {candidate.availability}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-white font-medium mb-2">Why this candidate matches:</h4>
        <ul className="space-y-1">
          {candidate.matchReasons.slice(0, 2).map((reason, index) => (
            <li key={index} className="flex items-start space-x-2 text-white/70 text-sm">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {candidate.skills.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
        {candidate.skills.length > 4 && (
          <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
            +{candidate.skills.length - 4} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white/60 text-xs">
          <span>Active {candidate.lastActive}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <Bookmark className="w-4 h-4 text-white/60" />
          </button>
          <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
            <Eye className="w-4 h-4 mr-1" />
            View Profile
          </button>
          <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm rounded-lg transition-colors">
            <Mail className="w-4 h-4 mr-1" />
            Contact
          </button>
        </div>
      </div>
    </div>
  );

  if (currentStep === 'input') {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI Candidate Matching
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Describe your ideal candidate in plain English and let our AI find the perfect matches from our video profile database.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="mb-6">
              <label className="block text-white/80 text-lg font-medium mb-4">
                Describe your ideal candidate:
              </label>
              <textarea
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Example: I'm looking for a senior React developer with 5+ years of experience, preferably with TypeScript and Node.js background. They should have experience at tech companies and be comfortable working remotely. Leadership experience is a plus."
                className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => setSearchQuery("I need a senior frontend developer with React expertise, 5+ years experience, and leadership skills for a remote position.")}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors"
              >
                <h4 className="text-white font-medium mb-2">Senior Frontend Developer</h4>
                <p className="text-white/60 text-sm">React, leadership, remote-friendly</p>
              </button>
              <button
                onClick={() => setSearchQuery("Looking for a full-stack engineer with Python/Django backend and React frontend experience, 3-6 years, startup experience preferred.")}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors"
              >
                <h4 className="text-white font-medium mb-2">Full-Stack Engineer</h4>
                <p className="text-white/60 text-sm">Python, React, startup experience</p>
              </button>
              <button
                onClick={() => setSearchQuery("I need a mobile developer with React Native experience, iOS/Android knowledge, 4+ years experience, and experience with app store deployments.")}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors"
              >
                <h4 className="text-white font-medium mb-2">Mobile Developer</h4>
                <p className="text-white/60 text-sm">React Native, iOS/Android</p>
              </button>
            </div>

            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Find Matching Candidates</span>
            </button>
          </div>

          <div className="mt-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-bold text-white mb-4">How AI Matching Works:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <Brain className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <h4 className="text-white font-medium">Natural Language Processing</h4>
                  <p className="text-white/70 text-sm">AI understands your requirements in plain English</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="text-white font-medium">Smart Matching</h4>
                  <p className="text-white/70 text-sm">Analyzes skills, experience, and preferences</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h4 className="text-white font-medium">Ranked Results</h4>
                  <p className="text-white/70 text-sm">Candidates ranked by match score and relevance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'generating') {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-6">
              AI is Finding Your Perfect Matches
            </h1>
            <p className="text-xl text-white/80 mb-12">
              Analyzing thousands of video profiles to find candidates that match your requirements...
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>Processing your requirements...</span>
                </div>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>Analyzing candidate profiles and skills...</span>
                </div>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>Calculating match scores and compatibility...</span>
                </div>
                <div className="flex items-center space-x-4 text-blue-400">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <span>Ranking candidates by relevance...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="h-6 w-px bg-white/20" />
            <h1 className="text-2xl font-bold text-white">AI Match Results</h1>
          </div>
          <button
            onClick={handleNewSearch}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>New Search</span>
          </button>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-green-500/30 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Found {matches.length} Matching Candidates</h2>
          </div>
          <p className="text-white/80 mb-4">
            <strong>Your search:</strong> "{searchQuery}"
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-white/80">{matches.length} candidates found</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-white/80">Average match score: {Math.round(matches.reduce((acc, m) => acc + m.matchScore, 0) / matches.length)}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {matches.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            Load More Candidates
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerAIMatching;
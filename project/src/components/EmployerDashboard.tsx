import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Filter, Eye, Bookmark, Tag, Mail, 
  MapPin, Briefcase, GraduationCap, Star, Clock, 
  Users, TrendingUp, Download, Settings, Bell, X, ChevronDown, Brain, Sparkles
} from 'lucide-react';

interface EmployerDashboardProps {
  onBack: () => void;
  onAIMatching: () => void;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ onBack, onAIMatching }) => {
  const [activeTab, setActiveTab] = useState('candidates');
  const [searchTerm, setSearchTerm] = useState('');
  const [keywordSearch, setKeywordSearch] = useState('');
  const [employerSearch, setEmployerSearch] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    role: '',
    location: '',
    country: '',
    state: '',
    city: '',
    remote: false,
    experience: '',
    education: '',
    industry: '',
    background: '',
    skills: [],
    previousEmployers: []
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter options
  const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Engineer', 'UX/UI Designer', 'Data Scientist', 'Product Manager', 'DevOps Engineer', 'Mobile Developer'];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'Australia', 'Netherlands', 'France', 'Singapore'];
  const states = ['California', 'New York', 'Texas', 'Florida', 'Washington', 'Illinois', 'Massachusetts', 'Colorado'];
  const cities = ['San Francisco', 'New York', 'Los Angeles', 'Seattle', 'Austin', 'Boston', 'Chicago', 'Denver'];
  const experienceLevels = ['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (6-10 years)', 'Lead/Principal (10+ years)'];
  const educationLevels = ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Bootcamp/Certification'];
  const industries = ['Technology', 'Finance', 'Healthcare', 'E-commerce', 'Education', 'Media', 'Gaming', 'Consulting', 'Startup'];
  const backgrounds = ['Corporate', 'Startup', 'Freelance', 'Agency', 'Non-profit', 'Government', 'Academic'];
  const popularEmployers = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 'Tesla', 'Uber', 'Airbnb', 'Spotify'];
  // Mock candidate data
  const candidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      location: 'San Francisco, CA',
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
      experience: '5 years',
      experienceLevel: 'Senior Level (6-10 years)',
      skills: ['React', 'TypeScript', 'CSS'],
      education: 'BS Computer Science',
      educationLevel: 'Bachelor\'s Degree',
      industry: 'Technology',
      background: 'Startup',
      previousEmployers: ['Stripe', 'Airbnb'],
      rating: 4.8,
      videoThumbnail: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      isBookmarked: false,
      tags: ['Frontend', 'React Expert'],
      lastActive: '2 hours ago',
      isRemote: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Full Stack Engineer',
      location: 'New York, NY',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      experience: '7 years',
      experienceLevel: 'Senior Level (6-10 years)',
      skills: ['Node.js', 'Python', 'AWS'],
      education: 'MS Software Engineering',
      educationLevel: 'Master\'s Degree',
      industry: 'Finance',
      background: 'Corporate',
      previousEmployers: ['Goldman Sachs', 'JPMorgan'],
      rating: 4.9,
      videoThumbnail: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      isBookmarked: true,
      tags: ['Full Stack', 'Cloud'],
      lastActive: '1 day ago',
      isRemote: false
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      location: 'Austin, TX',
      country: 'United States',
      state: 'Texas',
      city: 'Austin',
      experience: '4 years',
      experienceLevel: 'Mid Level (3-5 years)',
      skills: ['Figma', 'User Research', 'Prototyping'],
      education: 'BA Design',
      educationLevel: 'Bachelor\'s Degree',
      industry: 'Technology',
      background: 'Agency',
      previousEmployers: ['IDEO', 'Frog Design'],
      rating: 4.7,
      videoThumbnail: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      isBookmarked: false,
      tags: ['UX', 'Design Systems'],
      lastActive: '3 hours ago',
      isRemote: true
    }
  ];

  const handleFilterChange = (filterType: string, value: string | boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSkillAdd = (skill: string) => {
    if (!selectedFilters.skills.includes(skill)) {
      setSelectedFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleEmployerAdd = (employer: string) => {
    if (!selectedFilters.previousEmployers.includes(employer)) {
      setSelectedFilters(prev => ({
        ...prev,
        previousEmployers: [...prev.previousEmployers, employer]
      }));
    }
  };

  const handleEmployerRemove = (employer: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      previousEmployers: prev.previousEmployers.filter(e => e !== employer)
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      role: '',
      location: '',
      country: '',
      state: '',
      city: '',
      remote: false,
      experience: '',
      education: '',
      industry: '',
      background: '',
      skills: [],
      previousEmployers: []
    });
    setSearchTerm('');
    setKeywordSearch('');
    setEmployerSearch('');
  };
  const stats = [
    { label: 'Total Candidates', value: '1,247', icon: <Users className="w-6 h-6" />, change: '+12%' },
    { label: 'Profile Views', value: '89', icon: <Eye className="w-6 h-6" />, change: '+8%' },
    { label: 'Contact Credits', value: '15', icon: <Mail className="w-6 h-6" />, change: '-5' },
    { label: 'Bookmarked', value: '23', icon: <Bookmark className="w-6 h-6" />, change: '+3' }
  ];

  const CandidateCard = ({ candidate, isQuickView = false }) => (
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
              <Eye className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
            <p className="text-blue-400">{candidate.role}</p>
            <div className="flex items-center space-x-2 text-white/60 text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span>{candidate.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <Bookmark className={`w-4 h-4 ${candidate.isBookmarked ? 'text-yellow-400' : 'text-white/60'}`} />
          </button>
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <Tag className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <Briefcase className="w-4 h-4" />
          <span>{candidate.experience} experience</span>
        </div>
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <GraduationCap className="w-4 h-4" />
          <span>{candidate.education}</span>
        </div>
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{candidate.rating}/5.0</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {candidate.skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
        {candidate.skills.length > 3 && (
          <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
            +{candidate.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white/60 text-xs">
          <Clock className="w-3 h-3" />
          <span>Active {candidate.lastActive}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
            Quick View
          </button>
          <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm rounded-lg transition-colors">
            Contact
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="h-6 w-px bg-white/20" />
            <h1 className="text-2xl font-bold text-white">Employer Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={onAIMatching}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Brain className="w-4 h-4" />
              <span>AI Matching</span>
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="text-blue-400">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-2">
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
                <span className="text-white/60 text-sm ml-1">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Matching Quick Access */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border border-purple-500/30 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AI-Powered Candidate Matching</h3>
                <p className="text-white/80">Describe your ideal candidate and let AI find perfect matches</p>
              </div>
            </div>
            <button
              onClick={onAIMatching}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>Try AI Matching</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
          <div className="space-y-6">
            {/* Main Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search candidates by name, role, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Quick Filters Row */}
            <div className="flex flex-wrap items-center gap-4">
                value={selectedFilters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
              <select className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              
                value={selectedFilters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              <select className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Locations</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
                <option value="remote">Remote</option>
              </select>
              
              <select 
                value={selectedFilters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Experience</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              <button className="flex items-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span>Advanced Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {(Object.values(selectedFilters).some(v => Array.isArray(v) ? v.length > 0 : v) || searchTerm || keywordSearch || employerSearch) && (
                <button 
                  onClick={clearAllFilters}
                  className="flex items-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
            
            {/* Advanced Filters Panel */}
            {showAdvancedFilters && (
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-6">
                <h3 className="text-lg font-semibold text-white mb-4">Advanced Search & Filters</h3>
                
                {/* Keyword and Employer Search */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Keyword Search</label>
                    <input
                      type="text"
                      placeholder="e.g., machine learning, agile, leadership..."
                      value={keywordSearch}
                      onChange={(e) => setKeywordSearch(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Previous Employer Search</label>
                    <input
                      type="text"
                      placeholder="e.g., Google, Microsoft, Apple..."
                      value={employerSearch}
                      onChange={(e) => setEmployerSearch(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                {/* Geographic Filters */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-3">Geographic Location</label>
                  <div className="grid md:grid-cols-4 gap-4">
                    <select 
                      value={selectedFilters.country}
                      onChange={(e) => handleFilterChange('country', e.target.value)}
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">All Countries</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    <select 
                      value={selectedFilters.state}
                      onChange={(e) => handleFilterChange('state', e.target.value)}
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">All States</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <select 
                      value={selectedFilters.city}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">All Cities</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <label className="flex items-center space-x-2 px-4 py-3 bg-white/10 border border-white/20 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.remote}
                        onChange={(e) => handleFilterChange('remote', e.target.checked)}
                        className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                      />
                      <span className="text-white">Remote OK</span>
                    </label>
                  </div>
                </div>
                
                {/* Professional Filters */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Education Level</label>
                    <select 
                      value={selectedFilters.education}
                      onChange={(e) => handleFilterChange('education', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">All Education</option>
                      {educationLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Industry</label>
                    <select 
                      value={selectedFilters.industry}
                      onChange={(e) => handleFilterChange('industry', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">All Industries</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Background</label>
                    <select 
                      value={selectedFilters.background}
                      onChange={(e) => handleFilterChange('background', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">All Backgrounds</option>
                      {backgrounds.map(background => (
                        <option key={background} value={background}>{background}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Skills Filter */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedFilters.skills.map(skill => (
                      <span key={skill} className="flex items-center space-x-1 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                        <span>{skill}</span>
                        <button onClick={() => handleSkillRemove(skill)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Python', 'AWS', 'Node.js', 'Figma', 'SQL', 'Docker'].map(skill => (
                      <button
                        key={skill}
                        onClick={() => handleSkillAdd(skill)}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition-colors"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Previous Employers Filter */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Previous Employers</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedFilters.previousEmployers.map(employer => (
                      <span key={employer} className="flex items-center space-x-1 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        <span>{employer}</span>
                        <button onClick={() => handleEmployerRemove(employer)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularEmployers.map(employer => (
                      <button
                        key={employer}
                        onClick={() => handleEmployerAdd(employer)}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition-colors"
                      >
                        + {employer}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            Load More Candidates
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
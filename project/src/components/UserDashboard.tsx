import React, { useState } from 'react';
import { 
  ArrowLeft, User, Video, BarChart3, Settings, CreditCard, 
  FileText, Share2, Eye, Download, Plus, Edit3, Trash2, 
  Calendar, MapPin, Briefcase, Star, TrendingUp, Users,
  Bell, Search, Filter, Grid, List, Play, ExternalLink,
  Copy, Mail, MessageSquare, Heart, Bookmark, Clock
} from 'lucide-react';

interface UserDashboardProps {
  onBack: () => void;
  onCreateNew: () => void;
  onNavigate?: (view: string) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onBack, onCreateNew, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    plan: 'Paid',
    memberSince: 'March 2024',
    location: 'San Francisco, CA',
    title: 'Senior Software Engineer'
  };

  const stats = [
    { label: 'Total Videos', value: '4', icon: <Video className="w-6 h-6" />, change: '+1 this month' },
    { label: 'Profile Views', value: '1,247', icon: <Eye className="w-6 h-6" />, change: '+23% vs last month' },
    { label: 'Employer Contacts', value: '18', icon: <Mail className="w-6 h-6" />, change: '+5 this week' },
    { label: 'Share Links', value: '12', icon: <Share2 className="w-6 h-6" />, change: '8 active' }
  ];

  const videos = [
    {
      id: 1,
      title: 'Senior Software Engineer Introduction',
      template: 'Corporate Professional',
      createdAt: '2024-03-15',
      views: 342,
      shares: 8,
      contacts: 5,
      duration: '2:34',
      thumbnail: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      shareUrl: 'https://snaplicant.com/v/abc123',
      isPublic: true,
      tags: ['Software Engineering', 'Leadership', 'React']
    },
    {
      id: 2,
      title: 'Product Manager Role Application',
      template: 'Executive Suite',
      createdAt: '2024-03-10',
      views: 156,
      shares: 3,
      contacts: 2,
      duration: '1:58',
      thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      shareUrl: 'https://snaplicant.com/v/def456',
      isPublic: true,
      tags: ['Product Management', 'Strategy']
    },
    {
      id: 3,
      title: 'Tech Lead Position Intro',
      template: 'Tech Hub',
      createdAt: '2024-03-05',
      views: 89,
      shares: 2,
      contacts: 1,
      duration: '2:12',
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'draft',
      shareUrl: null,
      isPublic: false,
      tags: ['Technical Leadership', 'Architecture']
    },
    {
      id: 4,
      title: 'Startup CTO Application',
      template: 'Creative Studio',
      createdAt: '2024-02-28',
      views: 234,
      shares: 6,
      contacts: 4,
      duration: '2:45',
      thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'archived',
      shareUrl: 'https://snaplicant.com/v/ghi789',
      isPublic: false,
      tags: ['CTO', 'Startup', 'Innovation']
    }
  ];

  const activities = [
    {
      type: 'view',
      message: 'Your "Senior Software Engineer Introduction" was viewed by TechCorp recruiter',
      time: '2 hours ago',
      icon: <Eye className="w-4 h-4 text-blue-400" />
    },
    {
      type: 'contact',
      message: 'New contact request from StartupXYZ for Product Manager role',
      time: '5 hours ago',
      icon: <Mail className="w-4 h-4 text-green-400" />
    },
    {
      type: 'share',
      message: 'Your video was shared via LinkedIn',
      time: '1 day ago',
      icon: <Share2 className="w-4 h-4 text-purple-400" />
    },
    {
      type: 'view',
      message: '15 new profile views this week',
      time: '2 days ago',
      icon: <TrendingUp className="w-4 h-4 text-yellow-400" />
    }
  ];

  const resumes = [
    {
      id: 1,
      name: 'Senior_Software_Engineer_Resume_2024.pdf',
      uploadedAt: '2024-03-15',
      analysis: {
        highlights: 5,
        strengths: 4,
        score: 92
      }
    },
    {
      id: 2,
      name: 'Product_Manager_Resume.pdf',
      uploadedAt: '2024-03-10',
      analysis: {
        highlights: 4,
        strengths: 3,
        score: 88
      }
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const VideoCard = ({ video, isListView = false }) => (
    <div className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 ${
      isListView ? 'flex items-center space-x-6 p-4' : 'p-6'
    }`}>
      <div className={`relative ${isListView ? 'w-32 h-20' : 'aspect-video mb-4'} bg-black rounded-lg overflow-hidden`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Play className="w-8 h-8 text-white" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
          {video.duration}
        </div>
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
          video.status === 'active' ? 'bg-green-500 text-white' :
          video.status === 'draft' ? 'bg-yellow-500 text-black' :
          'bg-gray-500 text-white'
        }`}>
          {video.status}
        </div>
      </div>
      
      <div className={`${isListView ? 'flex-1' : ''}`}>
        <div className={`${isListView ? 'flex items-start justify-between' : ''}`}>
          <div className={`${isListView ? 'flex-1' : ''}`}>
            <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
            <p className="text-white/60 text-sm mb-3">{video.template} • Created {video.createdAt}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {video.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className={`grid grid-cols-3 gap-4 text-center mb-4 ${isListView ? 'max-w-xs' : ''}`}>
              <div>
                <div className="text-lg font-bold text-white">{video.views}</div>
                <div className="text-white/60 text-xs">Views</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{video.shares}</div>
                <div className="text-white/60 text-xs">Shares</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{video.contacts}</div>
                <div className="text-white/60 text-xs">Contacts</div>
              </div>
            </div>
          </div>
          
          <div className={`${isListView ? 'ml-6' : ''}`}>
            <div className="flex items-center space-x-2 mb-3">
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Download className="w-4 h-4 text-white" />
              </button>
              {video.shareUrl && (
                <button 
                  onClick={() => copyToClipboard(video.shareUrl)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4 text-white" />
                </button>
              )}
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
            
            {video.shareUrl && (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={video.shareUrl}
                  readOnly
                  className="bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-sm flex-1"
                />
                <button className="p-1 bg-blue-500 hover:bg-blue-600 rounded transition-colors">
                  <ExternalLink className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-blue-400">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </div>
                  <div className="text-white/60 text-sm mb-2">{stat.label}</div>
                  <div className="text-green-400 text-xs">{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="mt-1">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-white/80">{activity.message}</p>
                      <p className="text-white/50 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={onCreateNew}
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Create New Video</span>
                </button>
                <button className="flex items-center space-x-3 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <FileText className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Upload Resume</span>
                </button>
                <button className="flex items-center space-x-3 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <BarChart3 className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="space-y-6">
            {/* Header with controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">My Videos</h2>
                <p className="text-white/60">Manage your video introductions</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={onCreateNew}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Video</span>
                </button>
              </div>
            </div>

            {/* Videos Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} isListView={viewMode === 'list'} />
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h2>
              <p className="text-white/60">Track your profile performance and engagement</p>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Total Views</h3>
                  <Eye className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">1,247</div>
                <div className="text-green-400 text-sm">+23% from last month</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Engagement Rate</h3>
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">8.4%</div>
                <div className="text-green-400 text-sm">+1.2% from last month</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Contact Rate</h3>
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">1.4%</div>
                <div className="text-green-400 text-sm">+0.3% from last month</div>
              </div>
            </div>

            {/* Top Performing Videos */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Top Performing Videos</h3>
              <div className="space-y-4">
                {videos.slice(0, 3).map((video, index) => (
                  <div key={video.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white/60">#{index + 1}</div>
                    <img src={video.thumbnail} alt={video.title} className="w-16 h-10 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{video.title}</h4>
                      <p className="text-white/60 text-sm">{video.views} views • {video.contacts} contacts</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{((video.contacts / video.views) * 100).toFixed(1)}%</div>
                      <div className="text-white/60 text-sm">Contact Rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'resumes':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Resume Library</h2>
                <p className="text-white/60">Manage your uploaded resumes and AI analyses</p>
              </div>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                <span>Upload Resume</span>
              </button>
            </div>

            <div className="grid gap-6">
              {resumes.map((resume) => (
                <div key={resume.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{resume.name}</h3>
                        <p className="text-white/60 text-sm mb-4">Uploaded on {resume.uploadedAt}</p>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{resume.analysis.highlights}</div>
                            <div className="text-white/60 text-xs">Highlights</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{resume.analysis.strengths}</div>
                            <div className="text-white/60 text-xs">Strengths</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-400">{resume.analysis.score}</div>
                            <div className="text-white/60 text-xs">AI Score</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Account Settings</h2>
              <p className="text-white/60">Manage your profile and preferences</p>
            </div>

            {/* Profile Settings */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Professional Title</label>
                  <input
                    type="text"
                    value={user.title}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={user.location}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg transition-colors">
                Save Changes
              </button>
            </div>

            {/* Subscription */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Subscription</h3>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg">
                <div>
                  <div className="text-lg font-semibold text-white">{user.plan} Plan</div>
                  <div className="text-white/60">$10/month • Next billing: April 15, 2024</div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                  Manage Subscription
                </button>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Privacy & Sharing</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Public Profile</div>
                    <div className="text-white/60 text-sm">Allow your profile to be discovered by employers</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Email Notifications</div>
                    <div className="text-white/60 text-sm">Receive notifications about profile views and contacts</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-white">{user.name}</h1>
                <p className="text-white/60 text-sm">{user.title}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={onCreateNew}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Video</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10 mb-8">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'videos', label: 'My Videos', icon: <Video className="w-4 h-4" /> },
              { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'resumes', label: 'Resumes', icon: <FileText className="w-4 h-4" /> },
              { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserDashboard;

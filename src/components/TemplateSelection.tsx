import React from 'react';
import { ArrowLeft, Building, Coffee, Briefcase, Users, Monitor, Palette } from 'lucide-react';

interface TemplateSelectionProps {
  onTemplateSelect: (template: any) => void;
  selectedTier: string;
  onBack: () => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ onTemplateSelect, selectedTier, onBack }) => {
  const templates = [
    {
      id: 'corporate',
      name: 'Corporate Professional',
      description: 'Clean office environment with modern design',
      icon: <Building className="w-6 h-6 text-blue-400" />,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      preview: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800',
      tier: 'free'
    },
    {
      id: 'casual',
      name: 'Casual Workspace',
      description: 'Relaxed coffee shop atmosphere',
      icon: <Coffee className="w-6 h-6 text-amber-400" />,
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      preview: 'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&w=800',
      tier: 'free'
    },
    {
      id: 'executive',
      name: 'Executive Suite',
      description: 'Luxury office setting for senior roles',
      icon: <Briefcase className="w-6 h-6 text-purple-400" />,
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      preview: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      tier: 'paid'
    },
    {
      id: 'creative',
      name: 'Creative Studio',
      description: 'Vibrant space for creative professionals',
      icon: <Palette className="w-6 h-6 text-pink-400" />,
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      preview: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      tier: 'paid'
    },
    {
      id: 'tech',
      name: 'Tech Hub',
      description: 'Modern technology workspace',
      icon: <Monitor className="w-6 h-6 text-green-400" />,
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      preview: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
      tier: 'paid'
    },
    {
      id: 'team',
      name: 'Collaborative Space',
      description: 'Team-oriented environment',
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      preview: 'https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=800',
      tier: 'paid'
    }
  ];

  const getTierAccess = (templateTier: string) => {
    const tierHierarchy = { free: 1, paid: 2, 'paid-quarterly': 2 };
    return tierHierarchy[selectedTier] >= tierHierarchy[templateTier];
  };

  const availableTemplates = templates.filter(template => getTierAccess(template.tier));
  const lockedTemplates = templates.filter(template => !getTierAccess(template.tier));

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Pricing</span>
          </button>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Template
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Select the perfect background that matches your industry and personal style.
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-white/80">
            <span className="capitalize">{selectedTier}</span> Plan Selected
          </div>
          
          {selectedTier === 'free' && (
            <div className="mt-4 p-4 bg-blue-500/20 border border-blue-500 rounded-lg max-w-2xl mx-auto">
              <h4 className="font-semibold text-white mb-2">💡 Want AI Resume Analysis?</h4>
              <p className="text-blue-300 text-sm mb-3">
                Upgrade to a paid plan to get personalized AI insights, talking points, and script generation based on your resume.
              </p>
              <button 
                onClick={onBack}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                ← Back to Upgrade
              </button>
            </div>
          )}
        </div>

        {availableTemplates.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Available Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => onTemplateSelect(template)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        {template.icon}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-white/70 mb-4">{template.description}</p>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-300">
                      Select Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {lockedTemplates.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Premium Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lockedTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 opacity-60 relative"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover filter grayscale"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        {template.icon}
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                        <div className="text-white font-semibold mb-2">Premium Required</div>
                        <p className="text-white/80 text-sm">
                          Upgrade to {template.tier} plan
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-white/70 mb-4">{template.description}</p>
                    <button className="w-full bg-white/10 text-white py-3 rounded-lg font-semibold cursor-not-allowed">
                      Upgrade to Access
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelection;
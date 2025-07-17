import React, { useState } from 'react';
import { Mail, CheckCircle, Loader, X } from 'lucide-react';

interface NewsletterSignupProps {
  onClose?: () => void;
  isModal?: boolean;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ onClose, isModal = false }) => {
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!marketingConsent) {
      setError('Please consent to receive marketing emails');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // MailerLite API integration - Updated endpoint and payload
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_MAILERLITE_API_KEY}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          fields: {
            name: email.split('@')[0], // Use email prefix as name fallback
            source: 'website'
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('MailerLite API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`Failed to subscribe: ${response.status} ${response.statusText}`);
      }

      setIsSuccess(true);
      setEmail('');
      
      // Auto-close modal after success
      if (isModal && onClose) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }

    } catch (error) {
      console.error('Newsletter signup error:', error);
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Stay in the Loop</h3>
        <p className="text-white/80">
          Get weekly Snaplicant updates, job search tips, and career insights delivered to your inbox.
        </p>
      </div>

      {isSuccess ? (
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Welcome to the Newsletter!</h4>
            <p className="text-white/80">
              You'll receive your first email soon with exclusive job search tips and Snaplicant updates.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="newsletterConsent"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="w-4 h-4 mt-1 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              required
            />
            <label htmlFor="newsletterConsent" className="text-white/80 text-sm">
              I consent to receive marketing emails from Snaplicant with job search tips, product updates, and career insights. I can unsubscribe at any time.
            </label>
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !marketingConsent}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>Subscribe to Newsletter</span>
              </>
            )}
          </button>
        </form>
      )}

      <div className="text-center">
        <p className="text-white/60 text-xs">
          By subscribing, you agree to our{' '}
          <span className="text-blue-400">
            Terms of Service
          </span>{' '}
          and{' '}
          <span className="text-blue-400">
            Privacy Policy
          </span>
          . We respect your privacy and will never spam you.
        </p>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-blue-900/95 to-purple-900/95 backdrop-blur-sm rounded-2xl border border-white/20 max-w-md w-full p-6 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
      {content}
    </div>
  );
};

export default NewsletterSignup;
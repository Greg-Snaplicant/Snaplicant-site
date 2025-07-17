import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="text-white/80 space-y-6">
              <p className="text-lg">
                <strong>Terms of Service</strong><br />
                Last updated: January 16, 2025
              </p>
              
              <p>
                These Terms of Service ("Terms") govern your use of the Snaplicant website and services (the "Service") operated by Snaplicant ("us", "we", or "our").
              </p>
              
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By creating an account or using Snaplicant, you confirm that you accept these Terms of Service and that you agree to comply with them. If you do not agree to these Terms, you must not use our Service.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Description of Service</h2>
              <p>
                Snaplicant is a platform that allows job seekers to create professional video introductions and enables employers to discover and connect with candidates through video profiles.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. User Accounts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>You may not use another person's account without permission</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. User Content</h2>
              <p>
                When you upload video content or other materials to Snaplicant:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You retain ownership of your content</li>
                <li>You grant us a license to host, display, and share your content as part of the Service</li>
                <li>You are responsible for ensuring your content does not violate any laws or third-party rights</li>
                <li>You must not upload inappropriate, offensive, or illegal content</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Prohibited Uses</h2>
              <p>You may not use Snaplicant to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Upload false, misleading, or deceptive information</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Use the Service for any commercial purpose without our consent</li>
                <li>Spam or send unsolicited communications to other users</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Subscription and Payments</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Some features of Snaplicant require a paid subscription</li>
                <li>Subscription fees are billed in advance on a recurring basis</li>
                <li>You may cancel your subscription at any time</li>
                <li>Refunds are handled on a case-by-case basis</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of Snaplicant and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Disclaimer</h2>
              <p>
                The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">11. Limitation of Liability</h2>
              <p>
                In no event shall Snaplicant, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">12. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">13. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <ul className="list-none space-y-1">
                <li>Email: support@snaplicant.com</li>
                <li>Website: http://www.snaplicant.com/support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
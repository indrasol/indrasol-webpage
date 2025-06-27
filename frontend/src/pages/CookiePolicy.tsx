import React from 'react';
import { Cookie, Settings, Info, Shield } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
              <Cookie className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
              <p className="text-gray-600 mt-1">How we use cookies and similar technologies</p>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <p className="text-orange-800 text-sm">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()} • 
              <strong> Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small text files that are stored on your device when you visit a website. They are 
              widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This Cookie Policy explains how Indrasol uses cookies and similar technologies on our website, 
              including our IndraBot chatbot service.
            </p>
          </section>

          {/* Important Notice */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-8">
            <div className="flex items-center mb-3">
              <Info className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-900">Important Notice About Our Chatbot</h3>
            </div>
            <p className="text-blue-800 text-sm">
              <strong>Our IndraBot chatbot does NOT use cookies for data storage.</strong> Instead, we use 
              local storage in your browser to keep your conversation history. This means your chat data 
              stays on your device and is never sent to our servers as cookies.
            </p>
          </div>

          {/* Types of Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center mb-2">
                  <Shield className="w-4 h-4 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-900">Essential Cookies</h3>
                </div>
                <p className="text-green-800 text-sm mb-2">
                  These cookies are necessary for the website to function properly. They cannot be disabled.
                </p>
                <ul className="space-y-1 text-green-800 text-sm">
                  <li>• <strong>Session cookies:</strong> Maintain your session while browsing</li>
                  <li>• <strong>Security cookies:</strong> Protect against security threats</li>
                  <li>• <strong>Load balancing:</strong> Distribute traffic across our servers</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center mb-2">
                  <Settings className="w-4 h-4 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-900">Functional Cookies</h3>
                </div>
                <p className="text-blue-800 text-sm mb-2">
                  These cookies enhance your experience by remembering your preferences.
                </p>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>• <strong>Language preferences:</strong> Remember your language choice</li>
                  <li>• <strong>Theme settings:</strong> Remember dark/light mode preferences</li>
                  <li>• <strong>Form data:</strong> Remember form inputs to improve user experience</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <div className="flex items-center mb-2">
                  <Info className="w-4 h-4 text-yellow-600 mr-2" />
                  <h3 className="font-semibold text-yellow-900">Analytics Cookies (Optional)</h3>
                </div>
                <p className="text-yellow-800 text-sm mb-2">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <ul className="space-y-1 text-yellow-800 text-sm">
                  <li>• <strong>Usage statistics:</strong> Track page views and user behavior</li>
                  <li>• <strong>Performance monitoring:</strong> Identify areas for improvement</li>
                  <li>• <strong>Error tracking:</strong> Help us fix technical issues</li>
                </ul>
                <p className="text-yellow-800 text-sm mt-2 font-medium">
                  Note: We only use analytics cookies with your explicit consent.
                </p>
              </div>
            </div>
          </section>

          {/* Chatbot Data Storage */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">IndraBot Data Storage</h2>
            
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">Local Storage vs. Cookies</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">❌ We DON'T Use</h4>
                  <ul className="space-y-1 text-purple-800 text-sm">
                    <li>• Cookies for chat history</li>
                    <li>• Server-side conversation storage</li>
                    <li>• Third-party tracking cookies</li>
                    <li>• Cross-site tracking</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">✅ We DO Use</h4>
                  <ul className="space-y-1 text-purple-800 text-sm">
                    <li>• Local browser storage</li>
                    <li>• Client-side data only</li>
                    <li>• User-controlled data</li>
                    <li>• Privacy-first approach</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Content Delivery Networks (CDNs)</h3>
                <p className="text-gray-700 text-sm">
                  We use CDNs to deliver website content faster. These may set technical cookies for 
                  performance optimization.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Security Services</h3>
                <p className="text-gray-700 text-sm">
                  Our security services may use cookies to protect against malicious attacks and spam.
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <h3 className="font-semibold text-red-900 mb-2">No Advertising Cookies</h3>
                <p className="text-red-800 text-sm">
                  We do not use advertising cookies or allow third-party advertisers to track you on our website.
                </p>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Browser Settings</h3>
                <p className="text-blue-800 text-sm mb-2">
                  You can control cookies through your browser settings:
                </p>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>• Block all cookies</li>
                  <li>• Block third-party cookies only</li>
                  <li>• Delete existing cookies</li>
                  <li>• Set cookies to expire when you close your browser</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Chatbot Data Management</h3>
                <p className="text-green-800 text-sm mb-2">
                  For IndraBot conversation data, use our built-in privacy controls:
                </p>
                <ul className="space-y-1 text-green-800 text-sm">
                  <li>• Access privacy settings through the chatbot</li>
                  <li>• Delete all conversation data instantly</li>
                  <li>• Export your data for review</li>
                  <li>• Update consent preferences</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookie Consent */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Consent</h2>
            
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 mb-4">
              <h3 className="font-semibold text-orange-900 mb-2">How We Obtain Consent</h3>
              <ul className="space-y-1 text-orange-800 text-sm">
                <li>• Essential cookies: No consent required (legally necessary)</li>
                <li>• Functional cookies: Implied consent through continued use</li>
                <li>• Analytics cookies: Explicit consent through cookie banner</li>
                <li>• Chatbot data: Explicit consent through privacy modal</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Withdrawing Consent</h3>
              <p className="text-gray-700 text-sm">
                You can withdraw your consent at any time by adjusting your browser settings, using our 
                cookie preferences center, or contacting us directly.
              </p>
            </div>
          </section>

          {/* Legal Basis */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Basis for Processing</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">GDPR Compliance</h3>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>• <strong>Legitimate interest:</strong> Essential cookies</li>
                  <li>• <strong>Consent:</strong> Analytics and functional cookies</li>
                  <li>• <strong>Transparency:</strong> Clear information about usage</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Your Rights</h3>
                <ul className="space-y-1 text-green-800 text-sm">
                  <li>• <strong>Access:</strong> Know what cookies we use</li>
                  <li>• <strong>Control:</strong> Manage your preferences</li>
                  <li>• <strong>Deletion:</strong> Remove stored data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-700 text-sm mb-2">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• <strong>Email:</strong> [Updated soon. Please contact us via contact us form in the website]</li>
                <li>• <strong>Address:</strong> [Updated soon. Please contact us via contact us form in the website]</li>
                <li>• <strong>Phone:</strong> [Updated soon. Please contact us via contact us form in the website]</li>
              </ul>
              <p className="text-gray-700 text-sm mt-3">
                For technical questions about managing cookies, please refer to your browser's help documentation.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy; 
import React from 'react';
import { Shield, Lock, Eye, Clock, Download, Trash2 } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600 mt-1">How we protect and handle your data</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <p className="text-blue-800 text-sm">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()} • 
              <strong> Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Indrasol, we take your privacy seriously. This Privacy Policy explains how our IndraBot chatbot 
              collects, uses, and protects your information when you interact with our website and services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our chatbot, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Data Collection */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Eye className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">What Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Chat Conversations</h3>
                <p className="text-gray-700 text-sm">
                  We collect the messages you send to our chatbot and our responses to provide better assistance 
                  and maintain conversation context.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Technical Information</h3>
                <p className="text-gray-700 text-sm">
                  We automatically generate a unique identifier for your session to maintain conversation history 
                  and provide personalized responses.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Contact Information (Optional)</h3>
                <p className="text-gray-700 text-sm">
                  If you choose to provide contact details for demos or consultations, we collect only 
                  the information you voluntarily share.
                </p>
              </div>
            </div>
          </section>

          {/* Data Storage */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Lock className="w-5 h-5 text-green-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">How We Store Your Data</h2>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">Local Storage Approach</h3>
              <ul className="space-y-2 text-green-800 text-sm">
                <li>• <strong>Your data stays on YOUR device only</strong> - Chat history is stored locally in your browser</li>
                <li>• <strong>No server-side storage</strong> - We don't save your conversations on our servers</li>
                <li>• <strong>Complete control</strong> - You can delete your data at any time</li>
                <li>• <strong>No tracking across devices</strong> - Data doesn't follow you to other devices</li>
              </ul>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-orange-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Data Retention</h2>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 mb-4">
              <h3 className="font-semibold text-orange-900 mb-2">Automatic Deletion</h3>
              <p className="text-orange-800 text-sm">
                Your chat data is automatically deleted after <strong>30 days</strong> to ensure your privacy 
                and keep storage minimal.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">Session Data</h4>
                <p className="text-gray-700 text-sm">Cleared when you close your browser or after 30 days</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">Contact Forms</h4>
                <p className="text-gray-700 text-sm">Processed immediately and stored securely for business purposes</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center mb-2">
                  <Download className="w-4 h-4 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-900">Data Export</h3>
                </div>
                <p className="text-blue-800 text-sm">
                  Download all your stored chat data in JSON format at any time through the chatbot settings.
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <div className="flex items-center mb-2">
                  <Trash2 className="w-4 h-4 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-900">Data Deletion</h3>
                </div>
                <p className="text-red-800 text-sm">
                  Permanently delete all your chat data immediately through the chatbot privacy settings.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center mb-2">
                  <Shield className="w-4 h-4 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-900">Consent Management</h3>
                </div>
                <p className="text-green-800 text-sm">
                  Update your consent preferences or withdraw consent at any time through the settings panel.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center mb-2">
                  <Eye className="w-4 h-4 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-purple-900">Data Transparency</h3>
                </div>
                <p className="text-purple-800 text-sm">
                  View exactly what data is stored and when it will be automatically deleted.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <p className="text-yellow-800 text-sm">
                <strong>No Third-Party Data Sharing:</strong> We do not share your chat data with any third-party 
                services or analytics platforms. Your conversations remain private between you and our chatbot.
              </p>
            </div>
          </section>

          {/* Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Data is stored locally in your browser using secure web storage APIs</li>
              <li>• No data transmission to external servers for chat history</li>
              <li>• Contact form submissions use encrypted HTTPS connections</li>
              <li>• Regular security updates and monitoring of our systems</li>
            </ul>
          </section>

          {/* GDPR & CCPA Compliance */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">GDPR & CCPA Compliance</h2>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-blue-800 text-sm mb-3">
                <strong>We are committed to complying with privacy regulations including GDPR and CCPA.</strong>
              </p>
              <ul className="space-y-1 text-blue-800 text-sm">
                <li>• <strong>Lawful basis:</strong> Legitimate interest and consent</li>
                <li>• <strong>Data minimization:</strong> We only collect necessary information</li>
                <li>• <strong>Right to erasure:</strong> Delete your data anytime</li>
                <li>• <strong>Data portability:</strong> Export your data in a standard format</li>
                <li>• <strong>Transparency:</strong> Clear information about data processing</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-700 text-sm mb-2">
                If you have any questions about this Privacy Policy or your data rights, please contact us:
              </p>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• <strong>Email:</strong> [Updated soon. Please contact us via contact us form in the website]</li>
                <li>• <strong>Address:</strong> [Updated soon. Please contact us via contact us form in the website]</li>
                <li>• <strong>Phone:</strong> [Updated soon. Please contact us via contact us form in the website]</li>
              </ul>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
            <p className="text-gray-700 text-sm">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to 
              review this Privacy Policy periodically for any changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 
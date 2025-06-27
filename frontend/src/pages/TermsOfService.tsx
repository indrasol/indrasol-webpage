import React from 'react';
import { FileText, AlertTriangle, Scale, Users } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600 mt-1">Legal terms governing the use of our services</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of Indrasol's website and IndraBot chatbot service 
              ("Service") operated by Indrasol ("us", "we", or "our").
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any 
              part of these terms, then you may not access the Service.
            </p>
          </section>

          {/* Use of Service */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Use of Service</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Permitted Use</h3>
                <ul className="space-y-1 text-gray-700 text-sm ml-4">
                  <li>• Use the chatbot for legitimate business inquiries</li>
                  <li>• Seek information about our products and services</li>
                  <li>• Request demos, consultations, or support</li>
                  <li>• Engage in professional communication</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <h3 className="font-semibold text-red-900 mb-2">Prohibited Use</h3>
                <ul className="space-y-1 text-red-800 text-sm">
                  <li>• Attempting to exploit, harm, or disrupt the service</li>
                  <li>• Sending spam, malware, or malicious content</li>
                  <li>• Impersonating others or providing false information</li>
                  <li>• Using the service for illegal or unauthorized purposes</li>
                  <li>• Attempting to reverse engineer or access source code</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Chatbot Service */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">IndraBot Chatbot Service</h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Service Description</h3>
                <p className="text-blue-800 text-sm">
                  IndraBot is an AI-powered chatbot designed to assist with inquiries about Indrasol's services, 
                  provide information, and facilitate business communications.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-medium text-gray-900 mb-2">Service Availability</h4>
                  <p className="text-gray-700 text-sm">
                    We strive to provide 24/7 availability but do not guarantee uninterrupted service.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-medium text-gray-900 mb-2">Response Accuracy</h4>
                  <p className="text-gray-700 text-sm">
                    While we aim for accuracy, AI responses may not always be perfect or complete.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data and Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data and Privacy</h2>
            
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 mb-4">
              <h3 className="font-semibold text-green-900 mb-2">Your Data Rights</h3>
              <p className="text-green-800 text-sm">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                use, and protect your information when using our chatbot service.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">
                  <strong>Local Storage:</strong> Chat conversations are stored locally on your device only
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">
                  <strong>Data Control:</strong> You can delete or export your data at any time
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">
                  <strong>No Third-Party Sharing:</strong> We do not share your chat data with third parties
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Our Rights</h3>
                <p className="text-gray-700 text-sm">
                  The Service and its original content, features, and functionality are and will remain the 
                  exclusive property of Indrasol and its licensors. The Service is protected by copyright, 
                  trademark, and other laws.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Your Content</h3>
                <p className="text-gray-700 text-sm">
                  You retain ownership of any content you provide through the chatbot. However, by using our 
                  Service, you grant us a limited license to use your content to provide and improve our services.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Disclaimers</h2>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Service "As Is"</h3>
              <p className="text-yellow-800 text-sm">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, 
                either express or implied.
              </p>
            </div>
            
            <div className="space-y-3 text-sm text-gray-700">
              <p><strong>No Professional Advice:</strong> Information provided by the chatbot is for general 
              purposes only and does not constitute professional advice.</p>
              <p><strong>AI Limitations:</strong> The chatbot uses artificial intelligence and may occasionally 
              provide inaccurate or incomplete responses.</p>
              <p><strong>No Guarantees:</strong> We do not guarantee that the service will be error-free, 
              secure, or continuously available.</p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Scale className="w-5 h-5 text-purple-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <p className="text-purple-800 text-sm">
                In no event shall Indrasol, its directors, employees, partners, agents, suppliers, or affiliates 
                be liable for any indirect, incidental, special, consequential, or punitive damages, including 
                without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting 
                from your use of the Service.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            
            <div className="space-y-3 text-sm text-gray-700">
              <p><strong>Your Right to Terminate:</strong> You may stop using our Service at any time.</p>
              <p><strong>Our Right to Terminate:</strong> We may terminate or suspend your access to the Service 
              immediately, without prior notice, for any reason, including breach of these Terms.</p>
              <p><strong>Effect of Termination:</strong> Upon termination, your right to use the Service will 
              cease immediately. Any data stored locally on your device will remain under your control.</p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 text-sm">
              These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without regard 
              to its conflict of law provisions. Any disputes arising from these Terms will be resolved in the 
              courts of [Your Jurisdiction].
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 text-sm mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days notice prior to any new 
              terms taking effect.
            </p>
            <p className="text-gray-700 text-sm">
              What constitutes a material change will be determined at our sole discretion. By continuing to 
              access or use our Service after those revisions become effective, you agree to be bound by the 
              revised terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-700 text-sm mb-2">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• <strong>Email:</strong> [Updated soon. Please contact us via contact us form in the website]</li>
                <li>• <strong>Address:</strong> [Updated soon. Please contact us via contact us form in the website]</li>
                <li>• <strong>Phone:</strong> [Updated soon. Please contact us via contact us form in the website]</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 
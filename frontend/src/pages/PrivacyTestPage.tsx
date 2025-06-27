import React, { useState, useEffect } from 'react';
import { chatService } from '../services/chatService';

const PrivacyTestPage: React.FC = () => {
  const [privacyStatus, setPrivacyStatus] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    updateStatus();
  }, []);

  const updateStatus = () => {
    setPrivacyStatus(chatService.getPrivacyStatus());
  };

  const handleClearData = () => {
    chatService.clearAllData();
    updateStatus();
    setMessage('All data cleared successfully!');
  };

  const handleExportData = () => {
    chatService.exportUserData();
    setMessage('Data exported successfully!');
  };

  const handleUpdateConsent = async () => {
    const result = await chatService.updateConsent();
    if (result) {
      updateStatus();
      setMessage('Consent updated successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Privacy Controls Test</h1>
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        {privacyStatus && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Privacy Status</h2>
            <div className="space-y-2">
              <p><strong>Has Consent:</strong> {privacyStatus.hasConsent ? 'Yes' : 'No'}</p>
              <p><strong>Data Age:</strong> {privacyStatus.dataAge} days</p>
              <p><strong>Max Retention:</strong> {privacyStatus.maxRetentionDays} days</p>
              <p><strong>Will Expire On:</strong> {privacyStatus.willExpireOn ? new Date(privacyStatus.willExpireOn).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleUpdateConsent}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Update Consent
          </button>
          
          <button
            onClick={handleExportData}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Export Data
          </button>
          
          <button
            onClick={handleClearData}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTestPage; 
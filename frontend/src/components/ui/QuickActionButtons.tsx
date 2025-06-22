import React from "react";

interface Props {
  onDemo: () => void;
  onCall: () => void;
}

const QuickActionButtons: React.FC<Props> = ({ onDemo, onCall }) => (
  <div className="flex flex-col items-center justify-center h-full animate-fadeIn">
    <div className="mb-6 flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-4 animate-pulse-slow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h4 className="text-gray-700 font-semibold mb-2 text-lg">Choose Your Preference</h4>
      <p className="text-gray-500 text-sm mb-6 text-center">How would you like to connect with our team?</p>
    </div>
    
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <button 
        onClick={onDemo}
        className="group bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400 hover:from-blue-100 hover:to-indigo-100 rounded-2xl p-5 text-left transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full"
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 mr-4 group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-lg group-hover:text-blue-700 transition-colors">Request Demo</h4>
          <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700">See our solutions in action</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
      
      <button 
        onClick={onCall}
        className="group bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 hover:border-emerald-400 hover:from-emerald-100 hover:to-teal-100 rounded-2xl p-5 text-left transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full"
      >
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 mr-4 group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-lg group-hover:text-emerald-700 transition-colors">Schedule Call</h4>
          <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700">Talk directly with our experts</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  </div>
);

export default QuickActionButtons; 
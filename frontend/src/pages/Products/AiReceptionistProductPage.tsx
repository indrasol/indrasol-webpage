import React, { useState } from "react";
import {
  ArrowRight,
  Brain,
  MessageCircle,
  Phone,
  Calendar,
  Clock,
  User,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Settings,
  FileText,
  BarChart,
  ChevronDown,
  ChevronRight,
  Mic,
  Languages,
  Bot,
  Headphones,
} from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { Link } from "react-router-dom";

// Hero section for AI Receptionist product
const AiReceptionistHero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <Navbar />
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-indrasol-gray opacity-80"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indrasol-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indrasol-orange/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-indrasol-blue transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/products" className="hover:text-indrasol-blue transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700">AI Receptionist</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-indrasol-blue/10 px-4 py-1 rounded-full mb-2">
              <span className="text-indrasol-blue font-semibold text-sm">
                AI-Powered Virtual Assistant
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  {/* Yellow Background with White Bot Icon */}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5 text-white">
                      <path d="M12 8V4H8"/>
                      <rect width="16" height="12" x="4" y="8" rx="2"/>
                      <path d="M2 14h2"/>
                      <path d="M20 14h2"/>
                      <path d="M15 13v2"/>
                      <path d="M9 13v2"/>
                    </svg>
                  </div>
                  {/* Green Call Icon - Top Right Corner */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 lg:h-3 lg:w-3 text-white">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0-0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                </div>
                <span className="font-sora font-bold text-yellow-500">AI Receptionist</span>
              </div>
            </h1>
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-indrasol-blue mb-4">
              Welcome. Assist. Connect.
            </div>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
              Intelligent virtual receptionist that provides 24/7 customer support and
              appointment scheduling  using advanced AI and natural language processing.
            </p>
            {/* Mobile image above buttons */}
            <div className="block lg:hidden w-full max-w-md mx-auto mb-4">
              <a 
                href="https://myaireceptionist.indrasol.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Click here"
                className="block aspect-video bg-gradient-to-br from-indrasol-blue/10 to-indrasol-orange/10 rounded-xl overflow-hidden p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <img 
                  src="/lovable-uploads/ai-receptionist-hero.png" 
                  alt="AI Receptionist Interface - Professional virtual assistant representatives"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                to="/contact"
                className="group px-6 py-3 bg-indrasol-blue text-white rounded-lg hover:bg-indrasol-blue/90 transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-indrasol-blue/20"
              >
                Request Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 stroke-2" />
              </Link>
            </div>
          </div>
          {/* Desktop image on the right */}
          <div className="hidden lg:block">
            <div className="relative">
              <a 
                href="https://myaireceptionist.indrasol.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Click here"
                className="block aspect-video bg-gradient-to-br from-indrasol-blue/10 to-indrasol-orange/10 rounded-xl overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <img 
                  src="/lovable-uploads/ai-receptionist-hero.png" 
                  alt="AI Receptionist Interface - Professional virtual assistant representatives"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// What is AI Receptionist section
const WhatIsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-indrasol-blue/5 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-indrasol-blue/10 px-4 py-1 rounded-full mb-4">
            <span className="text-indrasol-blue font-semibold text-sm">
              What is AI Receptionist?
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your 24/7 Virtual Assistant
          </h2>
          <p className="text-lg text-gray-700">
            AI Receptionist is an intelligent virtual assistant that handles customer
            inquiries, schedules appointments, and provides personalized support
            around the clock, ensuring your business never misses an opportunity.
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden p-6 md:p-12 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/ai-receptionist-capabilities.png" 
                  alt="AI Receptionist Capabilities" 
                  className="w-full max-w-md h-auto"
                />
              </div>
            </div>
            
            {/* Content Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Customer Inquiries</h3>
                    <p className="text-gray-600">Handles customer questions and requests with intelligent responses</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-full flex-shrink-0">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Appointment Scheduling</h3>
                    <p className="text-gray-600">Manages and schedules appointments with seamless calendar integration</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-full flex-shrink-0">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Personalized Support</h3>
                    <p className="text-gray-600">Offers tailored assistance to customers based on their needs</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-yellow-100 rounded-full flex-shrink-0">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">24/7 Availability</h3>
                    <p className="text-gray-600">Provides continuous service around the clock, never missing a customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Key Features section
const KeyFeaturesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-indrasol-blue/5 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-indrasol-blue/10 px-4 py-1 rounded-full mb-4">
            <span className="text-indrasol-blue font-semibold text-sm">
              Key Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Virtual Assistant Capabilities
          </h2>
          <p className="text-lg text-gray-700">
            AI Receptionist delivers intelligent customer service and support automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Appointment Scheduling */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="p-3 bg-indrasol-orange/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Calendar className="h-7 w-7 text-indrasol-orange" />
            </div>
            <h3 className="text-xl font-bold mb-3">Appointment Scheduling</h3>
            <p className="text-gray-600 mb-4">
              Intelligent appointment booking system that manages calendars,
              handles conflicts, and sends automated reminders.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-indrasol-orange mr-2 flex-shrink-0" />
                <span>Calendar integration</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-indrasol-orange mr-2 flex-shrink-0" />
                <span>Automated reminders</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-indrasol-orange mr-2 flex-shrink-0" />
                <span>Conflict resolution</span>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="p-3 bg-indrasol-blue/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Headphones className="h-7 w-7 text-indrasol-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
            <p className="text-gray-600 mb-4">
              Round-the-clock customer support with intelligent query routing
              and escalation to human agents when needed.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-indrasol-blue mr-2 flex-shrink-0" />
                <span>Always available</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-indrasol-blue mr-2 flex-shrink-0" />
                <span>Smart escalation</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-indrasol-blue mr-2 flex-shrink-0" />
                <span>Query analytics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};





// Main AI Receptionist Product Page component
export function AiReceptionistProductPage() {
  return (
    <div className="bg-white">
      <AiReceptionistHero />
      <WhatIsSection />
      <KeyFeaturesSection />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default AiReceptionistProductPage; 
import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Calendar,
  Bell,
  BarChart3,
  Target,
  Clock,
  AlertCircle,
  TrendingUp,
  Filter,
  ChevronDown,
  ChevronRight,
  Zap,
  Smartphone,
  Globe,
  Shield,
  Settings
} from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { Link } from "react-router-dom";

// Hero section for TasksMate product
const TasksMateHero = () => {
  return (
    <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <Navbar />
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-indrasol-gray opacity-80"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indrasol-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indrasol-orange/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb */}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          <Link to="/" className="hover:text-indrasol-blue transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/products" className="hover:text-indrasol-blue transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700">TasksMate</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-block bg-indrasol-blue/10 px-3 sm:px-4 py-1 rounded-full mb-2">
              <span className="text-indrasol-blue font-semibold text-xs sm:text-sm">
                Productivity & Task Management
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </div>
                <span className="font-sora font-bold text-black">TasksMate</span>
              </div>
              <span className="block mt-1">Organize. Track. Achieve.</span>
            </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl">
              Turn chaos into clarity. Empower your team with a unified workspace that keeps projects moving, ideas flowing, and bugs squashed — all in record time. <strong>Your Sidekick for every Tick.</strong>
            </p>
            
            {/* Mobile image above buttons */}
            <div className="block lg:hidden w-full max-w-sm sm:max-w-md mx-auto mb-4">
              <div className="bg-gradient-to-br from-indrasol-blue/10 to-indrasol-blue/5 rounded-xl p-6 sm:p-8 shadow-lg">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-indrasol-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                    <span className="font-sora font-bold text-xl text-black">TasksMate</span> - Task Management Made Simple
                  </h3>
                  <p className="text-sm text-gray-600">Organize, prioritize, and track your tasks efficiently</p>
                </div>
              </div>
              
              {/* Stats preview cards for mobile */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div className="bg-indrasol-blue/5 rounded-lg p-3 sm:p-4">
                  <div className="text-indrasol-blue font-bold text-xl sm:text-2xl">
                    99%
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm">Task Completion</div>
                </div>
                <div className="bg-indrasol-orange/5 rounded-lg p-3 sm:p-4">
                  <div className="text-indrasol-orange font-bold text-xl sm:text-2xl">
                    50%
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm">Time Saved</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-start pt-4 sm:pt-6">
              <a
                href="https://mytasksmate.netlify.app/index"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-4 sm:px-6 py-3 bg-indrasol-blue text-white rounded-lg hover:bg-indrasol-blue/90 transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-indrasol-blue/20 text-sm sm:text-base"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300 stroke-2" />
              </a>
            </div>
          </div>

          {/* Desktop image */}
          <div className="hidden lg:block">
            <a
              href="https://mytasksmate.netlify.app/index"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="/product-images/tasksmate_landing.png"
                alt="TasksMate Application Interface"
                className="w-full h-auto rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-105 cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// What is TasksMate section
const WhatIsSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-indrasol-blue/5 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-3 sm:px-4 py-1 bg-indrasol-blue/10 text-indrasol-blue font-medium rounded-full text-xs sm:text-sm mb-4">
              About TasksMate
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Your Ultimate Productivity Companion
            </h2>
            <p className="text-lg sm:text-xl text-gray-700">
              TasksMate is a comprehensive task management solution that transforms how you organize, 
              track, and complete your daily activities, whether you're working solo or with a team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indrasol-blue/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-indrasol-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Intuitive Task Organization</h3>
                  <p className="text-gray-600">Create, categorize, and prioritize tasks with our user-friendly drag-and-drop interface.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indrasol-blue/10 rounded-lg">
                  <Users className="h-6 w-6 text-indrasol-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
                  <p className="text-gray-600">Share tasks, assign responsibilities, and monitor collective progress in real-time.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indrasol-blue/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-indrasol-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Progress Analytics</h3>
                  <p className="text-gray-600">Track your productivity with detailed analytics and performance insights.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Key Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Increased productivity by up to 50%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Better task prioritization and time management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Enhanced team coordination and communication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Reduced stress through organized workflow</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Cross-platform accessibility</span>
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
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 bg-indrasol-blue/10 text-indrasol-blue font-medium rounded-full text-xs sm:text-sm mb-4">
            Key Features
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Everything You Need for Effective Task Management
          </h2>
          <p className="text-lg sm:text-xl text-gray-700">
            TasksMate provides a comprehensive suite of features designed to enhance your productivity 
            and streamline your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indrasol-blue/10 rounded-lg flex-shrink-0">
                <BarChart3 className="h-6 w-6 text-indrasol-blue" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Unified metrics dashboard</h3>
                <p className="text-gray-600">All your project, task & bug metrics in one powerful view — plus a scratchpad for quick notes.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indrasol-blue/10 rounded-lg flex-shrink-0">
                <Users className="h-6 w-6 text-indrasol-blue" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2. Comment & collaborate</h3>
                <p className="text-gray-600">Keep everyone in sync with threaded discussions.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indrasol-blue/10 rounded-lg flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-indrasol-blue" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">3. Projects, tasks & bugs united</h3>
                <p className="text-gray-600">Seamlessly manage your projects, tasks, and bug tracker in a single workspace.</p>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="order-first lg:order-last">
            <img
              src="/product-images/TasksMate1.png"
              alt="TasksMate Key Features Interface"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works section
const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Login",
      description: "Access your TasksMate workspace with secure authentication and get started instantly."
    },
    {
      number: "02", 
      title: "Create Project",
      description: "Set up your project with clear objectives, timelines, and team structure."
    },
    {
      number: "03",
      title: "Assign Project tasks and collaborate",
      description: "Distribute tasks to team members and work together with real-time collaboration tools."
    },
    {
      number: "04",
      title: "Monitor",
      description: "Track progress, analyze performance metrics, and ensure project success with unified dashboards."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-indrasol-blue/5 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 bg-indrasol-blue/10 text-indrasol-blue font-medium rounded-full text-xs sm:text-sm mb-4">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-lg sm:text-xl text-gray-700">
            TasksMate makes task management intuitive and efficient with our streamlined workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indrasol-blue text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto group-hover:bg-indrasol-blue/90 transition-colors">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-indrasol-blue/20 -translate-x-8"></div>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// TasksMate Image section
const TasksMateImageSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <img
          src="/product-images/TasksMate2.png"
          alt="TasksMate Interface Overview"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

// Main TasksMate Product Page component
export function TasksMateProductPage() {
  return (
    <div className="bg-white">
      <TasksMateHero />
      <WhatIsSection />
      <KeyFeaturesSection />
      <HowItWorksSection />
      <TasksMateImageSection />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default TasksMateProductPage;

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Clock, Award, ChevronRight, Users, Settings, CheckCircle, TrendingUp, Building, Globe, Star, ArrowRight, Eye, Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const companyStats = [
  {
    icon: Clock,
    number: "14+",
    label: "Years of Excellence",
    description: "Since 2010"
  },
  {
    icon: Globe,
    number: "4",
    label: "Global Offices",
    description: "USA, Mexico, Singapore & India"
  },
  {
    icon: Users,
    number: "100+",
    label: "Expert Team",
    description: "Certified professionals"
  },
  {
    icon: Building,
    number: "100+",
    label: "Projects Delivered",
    description: "Successful implementations"
  }
];

const coreValues = [
  {
    icon: TrendingUp,
    title: "Relentless Innovation",
    description: "We challenge the status quo, embrace emerging technologies, and continuously evolve to deliver future-ready solutions that redefine enterprise performance.",
    color: "from-indrasol-blue to-indrasol-lightblue"
  },
  {
    icon: Settings,
    title: "Extreme Ownership",
    description: "We act with accountability and urgency. Every challenge is ours to solve, and every success is shared.",
    color: "from-indrasol-blue to-indrasol-darkblue"
  },
  {
    icon: Users,
    title: "Customer Obsession",
    description: "We win by understanding and anticipating our customers' needs, delivering not just solutions — but measurable outcomes.",
    color: "from-indrasol-blue to-indrasol-darkblue"
  },
  {
    icon: ChevronRight,
    title: "Bias for Action",
    description: "We move fast, learn fast, and deliver fast — without compromising on quality. Momentum is our superpower.",
    color: "from-indrasol-darkblue to-indrasol-blue"
  },
  {
    icon: Award,
    title: "Mutual Respect",
    description: "We value every individual's voice, treat colleagues with dignity, and foster a culture where collaboration and diverse perspectives thrive.",
    color: "from-indrasol-lightblue to-indrasol-blue"
  },
  {
    icon: Globe,
    title: "Data-Driven Decisions",
    description: "We make decisions anchored in data, not assumptions.",
    color: "from-indrasol-blue to-indrasol-darkblue"
  }
];

const achievements = [
  "Oracle Gold Partner for 10+ years",
  "AWS Advanced Consulting Partner",
  "Microsoft Azure Certified",
  "99% Client Satisfaction Rate",
  "24/7 Global Support Coverage"
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(null);
  const [activeTab, setActiveTab] = useState('vision');
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-transition effect
  useEffect(() => {
    if (!isPaused) {
      const tabs = ['vision', 'mission', 'values'];
      let currentIndex = tabs.indexOf(activeTab);
      
      intervalRef.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % tabs.length;
        setActiveTab(tabs[currentIndex]);
      }, 7000); // 7 seconds interval
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeTab, isPaused]);

  // Navigation functions
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const statItem = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indrasol-gray/30">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-indrasol-blue/10 to-indrasol-orange/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-indrasol-gray/20 to-indrasol-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-indrasol-blue/5 via-transparent to-indrasol-orange/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indrasol-blue/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indrasol-blue/10 to-indrasol-lightblue/10 px-6 py-3 rounded-full mb-6 border border-indrasol-blue/20">
            <Star className="w-5 h-5 text-indrasol-blue" />
            <span className="text-indrasol-blue font-semibold">Our Story</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            About
            <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue bg-clip-text text-transparent relative">
              {" "}Indrasol
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            A global leader in innovative IT solutions, transforming businesses through cutting-edge technology and unparalleled expertise since 2010.
          </p>


        </motion.div>

        {/* Company Stats */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {companyStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statItem}
              initial={{ y: 0, scale: 1, rotateY: 0 }}
              animate={{ y: 0, scale: 1, rotateY: 0 }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1, ease: "easeOut" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indrasol-blue/5 via-indrasol-lightblue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              {/* Floating particles */}
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 bg-indrasol-lightblue/40 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />
              
              {/* Icon without animations */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indrasol-blue to-indrasol-lightblue rounded-xl mb-4 relative z-10 shadow-lg">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Number with counter animation */}
              <motion.div 
                className="text-4xl font-bold bg-gradient-to-r from-indrasol-blue to-indrasol-darkblue bg-clip-text text-transparent mb-2 relative z-10"
                initial={{ scale: 1 }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {stat.number}
              </motion.div>
              
              {/* Label and description */}
              <div className="relative z-10">
                <motion.div 
                  className="text-sm font-semibold text-gray-700 mb-1 group-hover:text-indrasol-blue transition-colors duration-300"
                  initial={{ y: 0 }}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {stat.label}
                </motion.div>
                <motion.div 
                  className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300"
                  initial={{ y: 0 }}
                  whileHover={{ 
                    y: -1,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {stat.description}
                </motion.div>
              </div>
              
              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indrasol-blue to-indrasol-lightblue rounded-full z-20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0 }}
                whileHover={{ 
                  scaleX: 1,
                  transition: { duration: 0.4, ease: "easeInOut" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100/50 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indrasol-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indrasol-orange/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Driving Digital Transformation Since 2010
              </h3>
              <p className="text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto">
                Founded in 2010, Indrasol is a global provider of consulting, implementation, and support services for Oracle solutions, data analytics, cloud consulting, and cybersecurity.
              </p>
            </div>

            {/* Tab Navigation */}
            <div 
              className="flex flex-wrap justify-center gap-6 mb-12"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {[
                { id: 'vision', label: 'Vision', icon: Eye },
                { id: 'mission', label: 'Mission', icon: Target },
                { id: 'values', label: 'Core Values', icon: Sparkles }
              ].map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 2000); // Resume after 2 seconds
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: activeTab === tab.id 
                      ? "0 0 30px rgba(59, 130, 246, 0.5)" 
                      : "0 0 20px rgba(156, 163, 175, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-700 ease-in-out overflow-hidden group ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indrasol-blue via-indrasol-lightblue to-indrasol-blue text-white shadow-2xl shadow-indrasol-blue/40 border-2 border-indrasol-lightblue/50'
                      : 'bg-gradient-to-r from-gray-100 via-white to-gray-100 text-gray-700 hover:from-gray-200 hover:via-gray-50 hover:to-gray-200 border-2 border-gray-200/50 hover:border-gray-300/50'
                  }`}
                >
                  {/* Futuristic glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-700 ease-in-out ${
                    activeTab === tab.id
                      ? 'from-indrasol-blue/20 via-indrasol-lightblue/20 to-indrasol-blue/20 opacity-100'
                      : 'from-gray-300/10 via-white/10 to-gray-300/10 opacity-0 group-hover:opacity-100'
                  }`}></div>
                  
                  {/* Animated border */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-700 ease-in-out ${
                    activeTab === tab.id
                      ? ''
                      : ''
                  }`}></div>
                  
                  {/* Progress indicator */}
                  {activeTab === tab.id && !isPaused && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indrasol-lightblue to-indrasol-blue rounded-full shadow-sm"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 7, ease: "linear" }}
                      key={`${tab.id}-progress`}
                    />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-3">
                    <tab.icon className={`w-6 h-6 transition-all duration-300 ${
                      activeTab === tab.id ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                    }`} />
                    <span className="relative">
                      {tab.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.4, 0.0, 0.2, 1],
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="min-h-[400px]"
            >
              {activeTab === 'vision' && (
                <div className="text-center space-y-12">
                  <div className="space-y-6">
                    <div className="inline-block">
                      <h4 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indrasol-darkblue via-indrasol-blue to-indrasol-lightblue bg-clip-text text-transparent mb-4">
                        Our Vision
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-indrasol-darkblue to-indrasol-lightblue mx-auto rounded-full"></div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indrasol-blue/5 via-indrasol-lightblue/5 to-indrasol-blue/5 rounded-3xl blur-xl"></div>
                      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-indrasol-blue/20 shadow-2xl">
                        <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-medium max-w-5xl mx-auto">
                          "To be the <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-darkblue bg-clip-text text-transparent font-bold">trusted partner</span> empowering organizations to 
                          <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-darkblue bg-clip-text text-transparent font-bold"> innovate, grow, and excel</span> with 
                          <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-darkblue bg-clip-text text-transparent font-bold"> AI, cloud, and security solutions</span>"
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50 hover:border-indrasol-blue/30 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">{achievement}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'mission' && (
                <div className="text-center space-y-12">
                  <div className="space-y-6">
                    <div className="inline-block">
                      <h4 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indrasol-darkblue via-indrasol-blue to-indrasol-lightblue bg-clip-text text-transparent mb-4">
                        Our Mission
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-indrasol-darkblue to-indrasol-lightblue mx-auto rounded-full"></div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indrasol-blue/5 via-indrasol-lightblue/5 to-indrasol-blue/5 rounded-3xl blur-xl"></div>
                      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-indrasol-blue/20 shadow-2xl">
                        <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-medium max-w-5xl mx-auto">
                          "At Indrasol, we help organizations <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-darkblue bg-clip-text text-transparent font-bold">innovate and grow</span> with 
                          <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-darkblue bg-clip-text text-transparent font-bold"> AI, cloud, and cybersecurity solutions</span> — combining 
                          <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-darkblue bg-clip-text text-transparent font-bold"> deep collaboration</span> and a commitment to quality for 
                          <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-darkblue bg-clip-text text-transparent font-bold"> long‑term success</span>"
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 hover:border-indrasol-blue/30 transition-all duration-500 ease-in-out group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indrasol-blue/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="relative">
                        <div className="text-5xl font-bold bg-gradient-to-r from-indrasol-blue to-indrasol-lightblue bg-clip-text text-transparent mb-3">14+</div>
                        <div className="text-gray-900 font-bold text-xl mb-2">Years of Excellence</div>
                        <div className="text-gray-600">Consistent delivery since 2010</div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 hover:border-indrasol-blue/30 transition-all duration-500 ease-in-out group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indrasol-blue/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="relative">
                        <div className="text-5xl font-bold bg-gradient-to-r from-indrasol-blue to-indrasol-lightblue bg-clip-text text-transparent mb-3">100+</div>
                        <div className="text-gray-900 font-bold text-xl mb-2">Projects Delivered</div>
                        <div className="text-gray-600">Successful implementations worldwide</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="space-y-12">
                  <div className="text-center space-y-6">
                    <div className="inline-block">
                      <h4 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indrasol-darkblue via-indrasol-blue to-indrasol-lightblue bg-clip-text text-transparent mb-4">
                        Our Core Values
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-indrasol-darkblue to-indrasol-lightblue mx-auto rounded-full"></div>
                    </div>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                      The principles that guide everything we do and define who we are
                    </motion.p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {coreValues.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        onMouseEnter={() => setActiveValue(index)}
                        onMouseLeave={() => setActiveValue(null)}
                        whileHover={{ scale: 1.03, y: -8 }}
                        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden"
                      >
                        {/* Animated background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                        
                        {/* Floating particle effect */}
                        <motion.div
                          className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r from-white/60 to-transparent"
                          animate={activeValue === index ? { 
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        <div className="relative">
                          <div className="flex items-start gap-6">
                            <div className={`p-4 bg-gradient-to-r ${value.color} rounded-2xl shadow-lg`}>
                              <value.icon className="w-7 h-7 text-white" />
                            </div>
                            
                            <div className="flex-1 space-y-4">
                              <h5 className="text-2xl font-bold text-gray-900 group-hover:text-indrasol-blue transition-colors duration-300">
                                {value.title}
                              </h5>
                              
                              <div className="w-12 h-1 bg-gradient-to-r from-gray-300 to-transparent group-hover:from-indrasol-blue group-hover:to-indrasol-lightblue transition-all duration-300 rounded-full"></div>
                              
                              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                {value.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Global Presence Cards */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <motion.div
            variants={item}
            initial={{ y: 0, scale: 1, rotateY: 0 }}
            animate={{ y: 0, scale: 1, rotateY: 0 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              rotateY: 5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1, ease: "easeOut" }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indrasol-blue/5 via-indrasol-lightblue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            
            {/* Floating particles */}
            <motion.div
              className="absolute top-2 right-2 w-2 h-2 bg-indrasol-lightblue/40 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0
              }}
            />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="p-4 bg-gradient-to-r from-indrasol-blue to-indrasol-lightblue rounded-xl mb-6 inline-block shadow-lg">
                <MapPin className="h-8 w-8 text-white" strokeWidth={2} />
              </div>
              
              {/* Title with hover animation */}
              <motion.h3 
                className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indrasol-blue transition-colors duration-300"
                initial={{ y: 0 }}
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Global Presence
              </motion.h3>
              
              {/* Description with hover animation */}
              <motion.p 
                className="text-gray-700 mb-4 group-hover:text-gray-800 transition-colors duration-300"
                initial={{ y: 0 }}
                whileHover={{ 
                  y: -1,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Strategic offices across four countries
              </motion.p>
              
              {/* Details with hover animation */}
              <motion.div 
                className="text-sm text-indrasol-blue font-medium"
                initial={{ y: 0 }}
                whileHover={{ 
                  y: -1,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                USA • Mexico • Singapore • India
              </motion.div>
            </div>
            
            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indrasol-blue to-indrasol-lightblue rounded-full z-20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 0 }}
              whileHover={{ 
                scaleX: 1,
                transition: { duration: 0.4, ease: "easeInOut" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          <motion.div
            variants={item}
            initial={{ y: 0, scale: 1, rotateY: 0 }}
            animate={{ y: 0, scale: 1, rotateY: 0 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              rotateY: 5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1, ease: "easeOut" }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indrasol-blue/5 via-indrasol-lightblue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            
            {/* Floating particles */}
            <motion.div
              className="absolute top-2 right-2 w-2 h-2 bg-indrasol-lightblue/40 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
            />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="p-4 bg-gradient-to-r from-indrasol-blue to-indrasol-lightblue rounded-xl mb-6 inline-block shadow-lg">
                <Clock className="h-8 w-8 text-white" strokeWidth={2} />
              </div>
              
              {/* Title with hover animation */}
              <motion.h3 
                className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indrasol-blue transition-colors duration-300"
                initial={{ y: 0 }}
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Established Legacy
              </motion.h3>
              
              {/* Description with hover animation */}
              <motion.p 
                className="text-gray-700 mb-4 group-hover:text-gray-800 transition-colors duration-300"
                initial={{ y: 0 }}
                whileHover={{ 
                  y: -1,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Over a decade of consistent excellence
              </motion.p>
              
              {/* Details with hover animation */}
              <motion.div 
                className="text-sm text-indrasol-blue font-medium"
                initial={{ y: 0 }}
                whileHover={{ 
                  y: -1,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Founded in 2010
              </motion.div>
            </div>
            
            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indrasol-blue to-indrasol-lightblue rounded-full z-20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 0 }}
              whileHover={{ 
                scaleX: 1,
                transition: { duration: 0.4, ease: "easeInOut" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          <motion.div
            variants={item}
            initial={{ y: 0, scale: 1, rotateY: 0 }}
            animate={{ y: 0, scale: 1, rotateY: 0 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              rotateY: 5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1, ease: "easeOut" }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indrasol-blue/5 via-indrasol-lightblue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            
            {/* Floating particles */}
            <motion.div
              className="absolute top-2 right-2 w-2 h-2 bg-indrasol-lightblue/40 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}
            />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="p-4 bg-gradient-to-r from-indrasol-blue to-indrasol-lightblue rounded-xl mb-6 inline-block shadow-lg">
                <Award className="h-8 w-8 text-white" strokeWidth={2} />
              </div>
              
              {/* Title with hover animation */}
              <motion.h3 
                className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indrasol-blue transition-colors duration-300"
                initial={{ y: 0 }}
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Industry Expertise
              </motion.h3>
              
              {/* Description with hover animation */}
              <motion.p 
                className="text-gray-700 mb-4 group-hover:text-gray-800 transition-colors duration-300"
                initial={{ y: 0 }}
                whileHover={{ 
                  y: -1,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Deep domain knowledge and certifications
              </motion.p>
              
              {/* Details with hover animation */}
              <motion.div 
                className="text-sm text-indrasol-blue font-medium"
                initial={{ y: 0 }}
                whileHover={{ 
                  y: -1,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Enterprise-grade solutions
              </motion.div>
            </div>
            
            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indrasol-blue to-indrasol-lightblue rounded-full z-20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 0 }}
              whileHover={{ 
                scaleX: 1,
                transition: { duration: 0.4, ease: "easeInOut" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-100/50 shadow-xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations worldwide who trust Indrasol to deliver innovative solutions that drive real business value.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue hover:shadow-2xl text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-indrasol-blue/25 transition-all duration-300 transform hover:scale-[1.02] group"
            >
              Learn More About Our Journey
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('locations')}
              className="border-2 border-indrasol-blue text-indrasol-blue hover:bg-indrasol-blue hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
            >
              View Our Locations
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <span className="font-semibold">✓ Free consultation</span> • 
            <span className="font-semibold"> ✓ Global support</span> • 
            <span className="font-semibold"> ✓ Proven expertise</span>
          </div>
        </motion.div>
      </div>
      
      {/* Straight border divider */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  );
}
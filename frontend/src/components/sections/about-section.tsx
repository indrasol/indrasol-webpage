import React, { useState, useEffect, useRef } from "react";
import { MapPin, Clock, Award, ChevronRight, Users, Settings, CheckCircle, TrendingUp, Building, Globe, Star, ArrowRight } from "lucide-react";
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
    number: "500+",
    label: "Projects Delivered",
    description: "Successful implementations"
  }
];

const coreValues = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for perfection in every solution we deliver",
    color: "from-indrasol-blue to-indrasol-lightblue"
  },
  {
    icon: Users,
    title: "Partnership",
    description: "Building long-term relationships with our clients",
    color: "from-indrasol-orange to-yellow-500"
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "Cutting-edge solutions for tomorrow's challenges",
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
  const sectionRef = useRef(null);
  
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

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Oracle Gold Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>AWS Advanced Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Microsoft Certified</span>
            </div>
          </div>
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
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indrasol-blue rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Driving Digital Transformation Since 2010
                </h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  Founded in 2010, Indrasol is a global provider of consulting, implementation, and support services for the Oracle solution stack, data analytics, and business intelligence. We also provide comprehensive cloud consulting services.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  With over a decade of experience, our team of experts help organizations cut costs while dramatically improving performance. Our passion for service and commitment to delivering great value defines our approach to client relationships.
                </p>
                
                {/* Achievements List */}
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Key Achievements</h4>
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indrasol-blue rounded-full"></div>
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Core Values */}
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Our Core Values</h4>
                {coreValues.map((value, index) => (
                  <motion.div
                    key={index}
                    onMouseEnter={() => setActiveValue(index)}
                    onMouseLeave={() => setActiveValue(null)}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-gradient-to-r ${value.color} rounded-xl`}>
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h5 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h5>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indrasol-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="p-4 bg-indrasol-blue/10 rounded-xl mb-6 inline-block group-hover:bg-indrasol-blue/20 transition-colors duration-300">
                <MapPin className="h-8 w-8 text-indrasol-blue" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indrasol-blue transition-colors duration-300">
                Global Presence
              </h3>
              <p className="text-gray-700 mb-4">Strategic offices across four countries</p>
              <div className="text-sm text-indrasol-blue font-medium">
                USA • Mexico • Singapore • India
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indrasol-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="p-4 bg-indrasol-blue/10 rounded-xl mb-6 inline-block group-hover:bg-indrasol-blue/20 transition-colors duration-300">
                <Clock className="h-8 w-8 text-indrasol-blue" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indrasol-blue transition-colors duration-300">
                Established Legacy
              </h3>
              <p className="text-gray-700 mb-4">Over a decade of consistent excellence</p>
              <div className="text-sm text-indrasol-blue font-medium">
                Founded in 2010
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indrasol-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="p-4 bg-indrasol-blue/10 rounded-xl mb-6 inline-block group-hover:bg-indrasol-blue/20 transition-colors duration-300">
                <Award className="h-8 w-8 text-indrasol-blue" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indrasol-blue transition-colors duration-300">
                Industry Expertise
              </h3>
              <p className="text-gray-700 mb-4">Deep domain knowledge and certifications</p>
              <div className="text-sm text-indrasol-blue font-medium">
                Enterprise-grade solutions
              </div>
            </div>
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
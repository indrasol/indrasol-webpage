import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Award, Users, TrendingUp, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const clientLogos = [
  // Row 1
  {
    name: "Facebook",
    logo: "/logos/metalogo.png",
    url: "https://www.facebook.com/",
    industry: "Social Media",
    partnership: "2019"
  },
  {
    name: "Accuray",
    logo: "/logos/accuray.png",
    url: "https://www.accuray.com/",
    industry: "Healthcare Tech",
    partnership: "2018"
  },
  {
    name: "Alorica",
    logo: "/logos/alorica.png",
    url: "https://www.alorica.com/",
    industry: "Customer Experience",
    partnership: "2020"
  },
  {
    name: "TSTT",
    logo: "/logos/tstt.png",
    url: "https://www.tstt.co.tt/",
    industry: "Telecommunications",
    partnership: "2017"
  },
  {
    name: "Urban Development Corporation",
    logo: "/logos/udc.png",
    url: "https://udcja.com/",
    industry: "Real Estate",
    partnership: "2021"
  },
  {
    name: "Guardian Group",
    logo: "/logos/guardian-group.png",
    url: "https://trinidad.myguardiangroup.com/",
    industry: "Financial Services",
    partnership: "2019"
  },
  {
    name: "Complete Genomics",
    logo: "/logos/complete-genomics.png",
    url: "https://www.completegenomics.com/",
    industry: "Genomics",
    partnership: "2020"
  },
  // Row 2
  {
    name: "Annapurna Studios",
    logo: "/logos/annapurna-studios.png",
    url: "https://annapurnastudios.com/",
    industry: "Entertainment",
    partnership: "2018"
  },
  {
    name: "GAP",
    logo: "/logos/gap.png",
    url: "https://www.gap.com/",
    industry: "Retail",
    partnership: "2017"
  },
  {
    name: "Essex Property Trust",
    logo: "/logos/essex.png",
    url: "https://www.essex.com/",
    industry: "Real Estate",
    partnership: "2019"
  },
  {
    name: "SonicWall",
    logo: "/logos/sonicwall.png",
    url: "https://www.sonicwall.com/",
    industry: "Cybersecurity",
    partnership: "2020"
  },
  {
    name: "YuMe",
    logo: "/logos/yume.png",
    url: "https://www.yume.com/",
    industry: "Digital Advertising",
    partnership: "2018"
  },
  {
    name: "Mervyn's",
    logo: "/logos/mervyns.png",
    url: "https://mervynsonline.com/",
    industry: "Retail",
    partnership: "2017"
  },
  {
    name: "Concerto Health",
    logo: "/logos/concerto-health.png",
    url: "https://concertocare.com/",
    industry: "Healthcare",
    partnership: "2021"
  },
  // Row 3
  {
    name: "Charlotte Russe",
    logo: "/logos/charlotte-russe.png",
    url: "https://www.charlotterusse.com/",
    industry: "Fashion",
    partnership: "2018"
  },
  {
    name: "Palo Alto Networks",
    logo: "/logos/palo-alto.png",
    url: "https://www.paloaltonetworks.com/",
    industry: "Cybersecurity",
    partnership: "2019"
  },
  {
    name: "Banana Republic",
    logo: "/logos/banana-republic.png",
    url: "https://www.bananarepublic.com/",
    industry: "Fashion",
    partnership: "2017"
  },
  {
    name: "Gigamon",
    logo: "/logos/gigamon.png",
    url: "https://www.gigamon.com/",
    industry: "Network Security",
    partnership: "2020"
  },
  {
    name: "Cisco",
    logo: "/logos/cisco.png",
    url: "https://www.cisco.com/",
    industry: "Networking",
    partnership: "2018"
  },
  {
    name: "Planet",
    logo: "/logos/planet.png",
    url: "https://www.planet.com/",
    industry: "Geospatial Data",
    partnership: "2021"
  },
  {
    name: "T&TEC",
    logo: "/logos/ttec.png",
    url: "https://ttec.co.tt/",
    industry: "Utilities",
    partnership: "2019"
  }
];

const clientStats = [
  {
    icon: Building,
    label: "Enterprise Clients",
    value: "500+",
    color: "from-indrasol-blue to-indrasol-darkblue"
  },
  {
    icon: Award,
    label: "Industries Served",
    value: "15+",
    color: "from-indrasol-orange to-orange-600"
  },
  {
    icon: TrendingUp,
    label: "Success Rate",
    value: "98%",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Users,
    label: "Long-term Partnerships",
    value: "85%",
    color: "from-indrasol-blue to-indrasol-lightblue"
  }
];

export function ClientsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeClient, setActiveClient] = useState(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('clients-section');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Navigation function
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
        staggerChildren: 0.08,
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

  const statsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const statsItem = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <section 
      id="clients-section"
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-white via-indrasol-gray/20 to-slate-50"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-indrasol-blue/10 to-indrasol-orange/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-indrasol-gray/20 to-indrasol-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-conic from-indrasol-blue/5 via-transparent to-indrasol-orange/5 rounded-full blur-3xl"></div>
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indrasol-blue/10 to-indrasol-lightblue/10 px-6 py-3 rounded-full mb-6 border border-indrasol-blue/20">
            <CheckCircle className="w-5 h-5 text-indrasol-blue" />
            <span className="text-indrasol-blue font-semibold">Trusted by Industry Leaders</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Our
            <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue bg-clip-text text-transparent relative">
              {" "}Clients
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            From Fortune 500 companies to innovative startups, we've helped organizations across industries achieve their digital transformation goals
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Fortune 500 Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Global Reach</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Multi-Industry Expertise</span>
            </div>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div 
          variants={statsContainer}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {clientStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={statsItem}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Clients Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-16"
        >
          {/* Clean scrolling container without border */}
          <div className="relative overflow-hidden pause-animation py-8">
            {/* Animated scrolling container */}
            <div className="flex animate-scroll-clients space-x-8">
              {/* Single array followed by duplicate for seamless loop */}
              {clientLogos.map((client, index) => (
                <motion.a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`original-${client.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -8,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 }
                  }}
                  className="group relative flex-shrink-0"
                >
                  <div className="w-72 h-36 bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex items-center justify-between p-6">
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indrasol-blue/8 via-transparent to-indrasol-lightblue/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Animated border with pulse effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indrasol-blue/40 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-indrasol-blue/20"></div>
                    
                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-indrasol-blue/30 rounded-full animate-bounce"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${30 + i * 20}%`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: '2s'
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Logo section with subtle animation */}
                    <motion.div 
                      className="relative z-10 flex-1 flex items-center justify-center"
                      whileHover={{ rotate: [0, -2, 2, 0], transition: { duration: 0.6 } }}
                    >
                      <img 
                        src={client.logo} 
                        alt={`${client.name} logo`} 
                        className="max-h-14 max-w-24 object-contain filter group-hover:scale-110 transition-all duration-500 group-hover:brightness-110"
                      />
                    </motion.div>
                    
                    {/* Client info with staggered animations */}
                    <div className="relative z-10 flex-1 text-left pl-6 space-y-2">
                      <motion.h3 
                        className="font-bold text-gray-900 text-sm mb-2 group-hover:text-indrasol-blue transition-colors duration-300"
                        whileHover={{ x: 2 }}
                      >
                        {client.name}
                      </motion.h3>
                      
                      <div className="space-y-2">
                        <motion.div 
                          className="inline-block bg-gradient-to-r from-indrasol-blue/15 to-indrasol-lightblue/20 text-indrasol-blue border border-indrasol-blue/20 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          {client.industry}
                        </motion.div>
                        <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Since {client.partnership}
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced hover indicator with animation */}
                    <motion.div 
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ scale: 0, rotate: -180 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-7 h-7 bg-gradient-to-r from-indrasol-blue to-indrasol-darkblue rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </div>
                    </motion.div>

                    {/* Enhanced shine effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-indrasol-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indrasol-blue/5 to-indrasol-lightblue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  </div>
                </motion.a>
              ))}
              
              {/* Duplicate array for seamless loop */}
              {clientLogos.map((client, index) => (
                <motion.a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`duplicate-${client.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: (index + clientLogos.length) * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -8,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 }
                  }}
                  className="group relative flex-shrink-0"
                >
                  <div className="w-72 h-36 bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex items-center justify-between p-6">
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indrasol-blue/8 via-transparent to-indrasol-lightblue/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Animated border with pulse effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indrasol-blue/40 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-indrasol-blue/20"></div>
                    
                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-indrasol-blue/30 rounded-full animate-bounce"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${30 + i * 20}%`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: '2s'
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Logo section with subtle animation */}
                    <motion.div 
                      className="relative z-10 flex-1 flex items-center justify-center"
                      whileHover={{ rotate: [0, -2, 2, 0], transition: { duration: 0.6 } }}
                    >
                      <img 
                        src={client.logo} 
                        alt={`${client.name} logo`} 
                        className="max-h-14 max-w-24 object-contain filter group-hover:scale-110 transition-all duration-500 group-hover:brightness-110"
                      />
                    </motion.div>
                    
                    {/* Client info with staggered animations */}
                    <div className="relative z-10 flex-1 text-left pl-6 space-y-2">
                      <motion.h3 
                        className="font-bold text-gray-900 text-sm mb-2 group-hover:text-indrasol-blue transition-colors duration-300"
                        whileHover={{ x: 2 }}
                      >
                        {client.name}
                      </motion.h3>
                      
                      <div className="space-y-2">
                        <motion.div 
                          className="inline-block bg-gradient-to-r from-indrasol-blue/15 to-indrasol-lightblue/20 text-indrasol-blue border border-indrasol-blue/20 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          {client.industry}
                        </motion.div>
                        <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Since {client.partnership}
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced hover indicator with animation */}
                    <motion.div 
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ scale: 0, rotate: -180 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-7 h-7 bg-gradient-to-r from-indrasol-blue to-indrasol-darkblue rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </div>
                    </motion.div>

                    {/* Enhanced shine effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-indrasol-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indrasol-blue/5 to-indrasol-lightblue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* Subtle gradient fade edges for smooth transitions */}
            <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-indrasol-gray/20 via-indrasol-gray/10 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-indrasol-gray/20 via-indrasol-gray/10 to-transparent pointer-events-none z-10"></div>
          </div>
          
          {/* Enhanced instructions with animation */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-indrasol-blue rounded-full"
              ></motion.span>
              Hover over any client to pause and explore • Trusted partnerships across industries
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-2 h-2 bg-indrasol-blue rounded-full"
              ></motion.span>
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-100/50 shadow-xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our Growing Client Family
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to transform your business with proven expertise? Let's discuss how we can help you achieve your technology goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue hover:shadow-2xl text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-indrasol-blue/25 transition-all duration-300 transform hover:scale-[1.02] group"
            >
              Start Your Project
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                navigate('/services');
                window.scrollTo(0, 0);
              }}
              className="border-2 border-indrasol-blue text-indrasol-blue hover:bg-indrasol-blue hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02]"
            >
              Explore Services
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <span className="font-semibold">✓ Free consultation</span> • 
            <span className="font-semibold"> ✓ Custom solutions</span> • 
            <span className="font-semibold"> ✓ Proven results</span>
          </div>
        </motion.div>
      </div>
      
      {/* Straight border divider */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  );
}

export default ClientsSection;
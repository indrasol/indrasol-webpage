import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const partnerLogos = [
  {
    name: "CSA",
    logo: "/partners-logo/csa.png",
    description: "Cloud Security Alliance",
    category: "Security",
    yearsPartnership: "5+"
  },
  {
    name: "AWS",
    logo: "/partners-logo/aws.png",
    description: "Amazon Web Services",
    category: "Cloud Infrastructure",
    yearsPartnership: "8+"
  },
  {
    name: "Microsoft",
    logo: "/partners-logo/microsoft.png",
    description: "Microsoft Azure",
    category: "Enterprise Solutions",
    yearsPartnership: "10+"
  },
  {
    name: "Oracle",
    logo: "/partners-logo/oracle.png",
    description: "Oracle Cloud",
    category: "Database & Analytics",
    yearsPartnership: "12+"
  },
];

export function PartnersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activePartner, setActivePartner] = useState(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('partners-section');
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

  return (
    <section 
      id="partners-section"
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indrasol-gray/30"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-indrasol-blue/10 to-indrasol-orange/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-indrasol-gray/20 to-indrasol-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-indrasol-blue/5 via-transparent to-indrasol-orange/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
            <CheckCircle className="w-5 h-5 text-indrasol-blue" />
            <span className="text-indrasol-blue font-semibold">Trusted by Industry Leaders</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Strategic
            <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue bg-clip-text text-transparent relative">
              {" "}Partnerships
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Leverage the power of enterprise-grade technologies through our certified partnerships with global technology leaders
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Certified Partners</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Enterprise Grade</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </motion.div>
        
        {/* Partners Grid */}
        <motion.div 
          ref={containerRef}
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {partnerLogos.map((partner, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
              }}
              onMouseEnter={() => setActivePartner(index)}
              onMouseLeave={() => setActivePartner(null)}
              className="group relative perspective-1000"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden transform-gpu">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indrasol-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                

                
                {/* Logo */}
                <div className="relative z-10 h-20 flex items-center justify-center mb-6">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-16 max-w-full object-contain filter group-hover:scale-110 transition-all duration-300"
                  />
                </div>
                
                {/* Partner info */}
                <div className="relative z-10 text-center">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indrasol-blue transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{partner.description}</p>
                  <div className="inline-block bg-indrasol-blue/10 text-indrasol-blue text-xs px-3 py-1 rounded-full font-medium">
                    {partner.category}
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indrasol-blue/20 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-100/50 shadow-xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Leverage Enterprise Technologies?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Partner with us to implement cutting-edge solutions backed by industry-leading technologies and certifications.
          </p>
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue hover:shadow-2xl text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-indrasol-blue/25 transition-all duration-300 transform hover:scale-[1.02] group"
            >
              Schedule a Consultation
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <span className="font-semibold">✓ Free consultation</span> • 
            <span className="font-semibold"> ✓ Custom solutions</span> • 
            <span className="font-semibold"> ✓ 24/7 support</span>
          </div>
        </motion.div>
      </div>
      
      {/* Straight border divider */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  );
}

export default PartnersSection;
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, Award, TrendingUp, Users, CheckCircle, ArrowRight, Building2 } from "lucide-react";

export function TestimonialsSection() {
  // Enhanced testimonial data with more details
  const testimonials = [
    {
      id: 1,
      quote: "I've worked with Indrasol team extensively over the past several years, as they not only assist us with the ongoing maintenance and support of our management financial reporting systems, but they were also our implementation partner as we moved our on-premises Hyperion instance to the cloud, while also doing a major implementation of Oracle's EPBCS (Enterprise Planning and Budgeting Cloud Solution). When it came time to choose a partner, it came down to Indrasol and one of the other big-name companies that you would think of when it comes to that sort of engagements. While the relative value they provided compared to the competition was readily apparent, that was not the major factor that tipped things in their favor – our main considerations were their expertise and skills in the area, the ready partnership and communication they showed, as well as their flexibility to adapt & adjust within reasonable bounds as the project progressed.",
      author: "David Wellman",
      position: "Vice President of Finance",
      company: "Alorica",
      companyLogo: "/logos/alorica.png",
      rating: 5,
      projectType: "Cloud Migration & EPBCS Implementation",
      results: "Seamless cloud transition with enhanced reporting capabilities",
      industry: "Customer Experience"
    },
    {
      id: 2,
      quote: "Having worked with the Indrasol team under Brahma's leadership over the past few years, I can say that they have strong expertise in analytics and cloud technologies. They have been assisting us with marketing analytics on the Azure platform. We are happy with Indrasol, and I strongly recommend them.",
      author: "Chandra Sreeram",
      position: "Marketing Analytics and Operations Leader",
      company: "Gigamon",
      companyLogo: "/logos/gigamon.png",
      rating: 5,
      projectType: "Marketing Analytics & Azure Platform",
      results: "Enhanced data-driven marketing insights and automation",
      industry: "Network Security"
    },
    {
      id: 3,
      quote: "We've been working with Indrasol for almost three years now and plan to continue working with the team of talented people for years to come. They have the right technical staff to take up any task. Whether it's an enhancement or a year-long project, they stay on top of things with absolute commitment. They consistently exceed our expectations, providing quality services with cost efficient support, quick resolution of issues and round-the-clock availability.",
      author: "Raj Vakil",
      position: "Senior Vice President Finance",
      company: "Accuray",
      companyLogo: "/logos/accuray.png",
      rating: 5,
      projectType: "Long-term Technical Partnership",
      results: "3+ years of consistent excellence and 24/7 support",
      industry: "Medical Technology"
    },
  ];

  // State for testimonial carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const autoPlayRef = useRef(null);
  const timeoutRef = useRef(null);
  const sectionRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate stars for ratings with animation
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 transition-all duration-300 ${
          index < rating 
            ? "text-indrasol-orange fill-indrasol-orange animate-pulse" 
            : "text-gray-300"
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
      />
    ));
  };

  // Handle navigation with smooth transitions
  const goToSlide = (index) => {
    let newIndex = index;
    if (newIndex < 0) {
      newIndex = testimonials.length - 1;
    } else if (newIndex >= testimonials.length) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
    resetTimeout();
  };

  const nextSlide = () => goToSlide(activeIndex + 1);
  const prevSlide = () => goToSlide(activeIndex - 1);

  // Auto play functionality
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    resetTimeout();
    if (isAutoPlaying) {
      timeoutRef.current = setTimeout(play, 6000); // Longer duration for better reading
    }

    return () => {
      resetTimeout();
    };
  }, [isAutoPlaying, activeIndex]);

  // Pause auto play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
    >
      {/* Enhanced background elements with animations */}
      <div className="absolute inset-0 z-0">
        {/* Large blue circle - hide on mobile */}
        <div className="absolute top-10 right-10 w-32 h-32 md:w-96 md:h-96 bg-gradient-to-br from-indrasol-blue/10 to-indrasol-blue/5 rounded-full blur-2xl md:blur-3xl animate-pulse hidden md:block"></div>
        {/* Large orange circle - hide on mobile */}
        <div className="absolute bottom-10 left-10 w-24 h-24 md:w-80 md:h-80 bg-gradient-to-tr from-indrasol-orange/10 to-yellow-500/10 rounded-full blur-xl md:blur-3xl animate-pulse hidden md:block" style={{animationDelay: '1s'}}></div>
        {/* Center blue circle - hide on mobile */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-64 md:h-64 bg-gradient-to-r from-indrasol-blue/5 to-blue-500/5 rounded-full blur-lg md:blur-2xl animate-pulse hidden md:block" style={{animationDelay: '2s'}}></div>
        {/* Floating geometric shapes - hide on mobile */}
        <div className="absolute top-20 left-20 w-4 h-4 md:w-8 md:h-8 bg-indrasol-blue/20 rounded-lg animate-float-gentle hidden md:block"></div>
        <div className="absolute top-40 right-32 w-3 h-3 md:w-6 md:h-6 bg-indrasol-orange/30 rounded-full animate-float-gentle hidden md:block" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 right-20 w-5 h-5 md:w-10 md:h-10 bg-blue-500/20 rounded-full animate-float-gentle hidden md:block" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-32 w-3.5 h-3.5 md:w-7 md:h-7 bg-indrasol-blue/25 rounded-lg animate-float-gentle hidden md:block" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced section header */}
        <div className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indrasol-blue/10 to-indrasol-blue/5 px-6 py-3 rounded-full mb-6 border border-indrasol-blue/20 shadow-lg">
            <Award className="h-5 w-5 text-indrasol-blue" />
            <span className="text-indrasol-blue font-semibold">Client Success Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Trusted by </span>
            <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue bg-clip-text text-transparent">Industry Leaders</span>
          </h2>
          
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Discover how we've transformed businesses with cutting-edge solutions, delivering measurable results and lasting partnerships across diverse industries.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">3+ Years Average Partnership</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indrasol-blue" />
              <span className="font-medium">100% Project Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indrasol-orange" />
              <span className="font-medium">Fortune 500 Clients</span>
            </div>
          </div>
        </div>

        {/* Enhanced testimonials carousel */}
        <div 
          className={`relative max-w-7xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Desktop navigation arrows (outside card, only md and up) */}
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl border border-gray-100 hover:bg-indrasol-blue hover:text-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indrasol-blue/40 hidden md:block group"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 group-hover:animate-bounce-x" />
          </button>
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl border border-gray-100 hover:bg-indrasol-blue hover:text-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indrasol-blue/40 hidden md:block group"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 group-hover:animate-bounce-x" />
          </button>
          {/* Main testimonial display */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4 md:px-8"
                >
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 px-12 md:px-12 min-h-[350px] shadow-2xl border border-gray-100 group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Mobile navigation arrows (inside card, only below md, vertically centered) */}
                    <button 
                      className="absolute left-0 top-52 z-30 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-100 hover:bg-indrasol-blue hover:text-white hover:scale-110 transition-all duration-300 group flex-shrink-0 md:hidden"
                      onClick={prevSlide}
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-5 w-5 group-hover:animate-bounce-x" />
                    </button>
                    <button 
                      className="absolute right-0 top-52 z-30 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-100 hover:bg-indrasol-blue hover:text-white hover:scale-110 transition-all duration-300 group flex-shrink-0 md:hidden"
                      onClick={nextSlide}
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-5 w-5 group-hover:animate-bounce-x" />
                    </button>
                    {/* Subtle gradient border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indrasol-blue/10 to-indrasol-blue/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    
                    {/* Enhanced quote icon with animation */}
                    <div className="absolute top-8 right-8 text-indrasol-blue/10 group-hover:text-indrasol-blue/20 transition-colors duration-500">
                      <Quote className="h-20 w-20 animate-pulse-slow" />
                    </div>
                    
                    {/* Company logo and industry tag */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-xl shadow-lg p-3 border border-gray-100 group-hover:shadow-xl transition-shadow duration-300">
                          <img 
                            src={testimonial.companyLogo} 
                            alt={testimonial.company}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{testimonial.company}</h4>
                          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            {testimonial.industry}
                          </span>
                        </div>
                      </div>
                      
                      {/* Project type badge */}
                      <div className="hidden md:block">
                        <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          {testimonial.projectType}
                        </span>
                      </div>
                    </div>
                    
                    {/* Enhanced testimonial content */}
                    <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 relative">
                      <span className="text-indrasol-blue text-4xl absolute -top-4 -left-2">"</span>
                      <span className="ml-6">{testimonial.quote}</span>
                      <span className="text-indrasol-blue text-4xl">"</span>
                    </blockquote>
                    
                    {/* Results highlight */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 border border-green-200/50">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-semibold text-green-800">Key Results</span>
                      </div>
                      <p className="text-green-700 font-medium">{testimonial.results}</p>
                    </div>
                    
                    {/* Enhanced client info */}
                    <div className="border-t border-gray-100 pt-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{testimonial.author}</h3>
                          <p className="text-gray-600 mb-3">{testimonial.position}</p>
                                                     <div className="flex items-center">
                             {renderStars(testimonial.rating)}
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unified navigation and indicators row for all breakpoints */}
          <div className="relative flex justify-center items-center mt-12">
            {/* Indicators */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`transition-all duration-500 focus:outline-none rounded-full ${
                    index === activeIndex 
                      ? "bg-gradient-to-r from-indrasol-blue to-indrasol-blue w-12 h-4 shadow-lg" 
                      : "bg-gray-300 hover:bg-indrasol-blue/50 w-4 h-4 hover:scale-125"
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced CTA section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-indrasol-blue/5 to-indrasol-blue/10 rounded-3xl p-8 md:p-12 border border-indrasol-blue/20 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can transform your business with our proven expertise and dedicated partnership approach.
            </p>
            <div className="flex justify-center">
              <a 
                href="#contact"
                className="group bg-gradient-to-r from-indrasol-blue to-indrasol-blue text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Building2 className="h-6 w-6" />
                <span>Start Your Project</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced custom styles */}
      <style>{`
        @keyframes float-gentle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.7; 
          }
          50% { 
            transform: translateY(-12px) rotate(3deg); 
            opacity: 1; 
          }
        }
        
        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }
        
        @keyframes bounce-x {
          0%, 100% { 
            transform: translateX(0); 
          }
          50% { 
            transform: translateX(4px); 
          }
        }
        
        .animate-bounce-x {
          animation: bounce-x 0.6s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.8; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.05); 
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        /* Enhanced hover effects */
        .group:hover .animate-pulse {
          animation-duration: 1s;
        }
        
        /* Smooth gradient transitions */
        .bg-gradient-to-r {
          background-size: 200% 200%;
          transition: background-position 0.5s ease;
        }
        
        .bg-gradient-to-r:hover {
          background-position: right center;
        }
      `}</style>
    </section>
  );
}

export default TestimonialsSection;
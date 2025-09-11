import React, { useEffect, useRef } from "react";
import { 
  ArrowRight, 
  Heart,
  Palette,
  Clock,
  Star,
  Coffee,
  ChevronRight,
  Camera
} from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { ChatBot } from "@/components/ui/chatbot";

// Hero section component
const YaadonKeRangHero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-white via-indrasol-gray/5 to-white">
      {/* Background elements */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indrasol-blue/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indrasol-blue/5 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
      
      <div 
        ref={heroRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0 translate-y-8 transition-all duration-1000"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left content */}
            <div className="space-y-4 sm:space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                <Link to="/" className="hover:text-indrasol-blue transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/Products" className="hover:text-indrasol-blue transition-colors">Products</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-gray-700">YaadonKeRang</span>
              </div>

              {/* Title with custom icon and styling */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Palette className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5 text-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-orange-600 rounded-full flex items-center justify-center">
                      <Camera className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 lg:h-3 lg:w-3 text-white" />
                    </div>
                  </div>
                  <span className="font-sora font-bold">
                    <span className="text-black">YaadonKe</span><span className="bg-gradient-to-r from-orange-800 via-red-700 to-red-800 bg-clip-text text-transparent">Rang</span>
                  </span>
                </div>
              </h1>
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-indrasol-blue mb-4">
                Memories. Colors. Love.
              </div>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl">
                A simple weekend project made with <span className="bg-gradient-to-r from-orange-800 via-red-700 to-red-800 bg-clip-text text-transparent font-bold">love</span>. Capture and cherish your precious memories in vibrant colors.
              </p>
              
              {/* CTA Button */}
              <div className="flex justify-start pt-4 sm:pt-6">
                <a
                  href="https://yaadonkerang.indrasol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-4 sm:px-6 py-3 bg-indrasol-blue text-white rounded-lg hover:bg-indrasol-blue/90 transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-indrasol-blue/20 text-sm sm:text-base"
                >
                  Experience YaadonKeRang
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                </a>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block">
              <a
                href="https://yaadonkerang.indrasol.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur group-hover:blur-lg transition-all duration-300"></div>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                    <img 
                      src="/product-images/yaadonkerang-screenshots.png" 
                      alt="YaadonKeRang Application Screenshot" 
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </a>
            </div>
        </div>
      </div>
    </section>
  );
};

// What is section
const WhatIsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-indrasol-blue/5 to-white">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 opacity-0 translate-y-8 transition-all duration-1000"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 bg-indrasol-blue/10 text-indrasol-blue font-medium rounded-full text-xs sm:text-sm mb-4">
            About YaadonKeRang
          </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">A Labor of Love</h2>
            <p className="text-lg sm:text-xl text-gray-700">
              Sometimes the most beautiful things come from the simplest beginnings.
            </p>
          </div>

          {/* Modern single column layout */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-8 sm:p-12 border border-gray-100/50 shadow-sm">
              <div className="text-center space-y-6">
                {/* Icon with gradient background */}
                <div className="relative inline-block">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Coffee className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center">
                    <Heart className="h-3 w-3 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Born from Passion</h3>
                  <div className="max-w-2xl mx-auto space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      <span className="text-black">YaadonKe</span><span className="bg-gradient-to-r from-orange-800 via-red-700 to-red-800 bg-clip-text text-transparent font-semibold">Rang</span> started as a weekend project, crafted with love and attention to detail.
                    </p>
                    <p>
                      Simple, elegant, and minimalistic - it captures the essence of preserving memories in their most beautiful form. <span className="font-medium text-indrasol-blue">Transform your black & white memories to color.</span>
                    </p>
                  </div>
                </div>

                {/* Minimal accent elements */}
                <div className="flex justify-center items-center space-x-3 pt-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-500">Weekend Project</span>
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Key features section
const KeyFeaturesSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every pixel crafted with care and attention to detail"
    },
    {
      icon: Palette,
      title: "Beautiful Colors",
      description: "Vibrant and meaningful color palettes that speak to the heart"
    },
    {
      icon: Clock,
      title: "Weekend Creation",
      description: "Born from passion during peaceful weekend moments"
    },
    {
      icon: Star,
      title: "Simple & Pure",
      description: "Minimalistic design that focuses on what truly matters"
    }
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 opacity-0 translate-y-8 transition-all duration-1000"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 bg-indrasol-blue/10 text-indrasol-blue font-medium rounded-full text-xs sm:text-sm mb-4">
            Key Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why <span className="text-black">YaadonKe</span><span className="bg-gradient-to-r from-orange-800 via-red-700 to-red-800 bg-clip-text text-transparent">Rang</span> is Special</h2>
          <p className="text-xl text-gray-700">
            Every feature reflects the love and care that went into creating this weekend project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="p-4 bg-indrasol-blue/10 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-indrasol-blue/20 transition-all duration-300">
                <feature.icon className="h-8 w-8 text-indrasol-blue" strokeWidth={2} />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Image section to break up content
const YaadonKeRangImageSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-indrasol-blue/5 to-white">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 opacity-0 translate-y-8 transition-all duration-1000"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <Palette className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-orange-600 rounded-full flex items-center justify-center">
                <Camera className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
              <span className="text-black">Experience the </span><span className="bg-gradient-to-r from-orange-800 via-red-700 to-red-800 bg-clip-text text-transparent">Colors</span>
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              YaadonKeRang is more than just a project - it's a testament to the beauty 
              that emerges when passion meets creativity during those precious weekend moments.
            </p>
            <a
              href="https://yaadonkerang.indrasol.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-indrasol-blue to-indrasol-blue hover:shadow-lg text-white px-4 sm:px-6 py-3 rounded-lg font-medium shadow-md shadow-indrasol-blue/20 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Visit YaadonKeRang
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main component
const YaadonKeRangProductPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <YaadonKeRangHero />
        <WhatIsSection />
        <KeyFeaturesSection />
        <YaadonKeRangImageSection />
      </main>

      <Footer />
      <BackToTop />
      <ChatBot />
    </div>
  );
};

export default YaadonKeRangProductPage;

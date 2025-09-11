import React, { useEffect, useRef, useState } from "react";
import { 
  ArrowRight, 
  Search,
  Shield,
  FileSearch,
  Target,
  TrendingUp,
  AlertTriangle,
  Database,
  Brain,
  CheckCircle,
  ChevronRight,
  Zap,
  Activity,
  Lock,
  BarChart,
  PhoneCall,
  Heart,
  Palette,
  Camera
} from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { ChatBot } from "@/components/ui/chatbot";

// Add cycling animation styles
const cyclingStyles = `
  .fade-in {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
  }
  
  .fade-out {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
  }
`;

// Product card component with hover effects and animations
const ProductCard = ({ 
  icon: Icon, 
  title, 
  tagline,
  description, 
  features, 
  stats,
  link,
  linkText = "Learn More",
  accentColor = "indrasol-blue",
  isNew = false,
  customIcon = null
}) => {
  const cardRef = useRef(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="opacity-0 translate-y-8 transition-all duration-700 ease-out h-full"
    >
      <div className="group h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative flex flex-col">

        
        {/* Card header with gradient accent */}
        <div className="h-2 bg-gradient-to-r from-indrasol-blue to-indrasol-blue/80"></div>
        
        <div className="p-8 flex flex-col flex-1">
          {/* Icon and title section */}
          <div className="mb-6">
            {title === "TasksMate" ? (
              <div>
                <div className="flex items-baseline mb-2">
                  <div className="mr-3">
                    {customIcon ? customIcon : <Icon className="h-8 w-8 text-indrasol-blue group-hover:scale-110 transition-transform" strokeWidth={2} />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mr-2">{title}</h3>
                  <span className="text-sm font-medium text-gray-600 flex items-center">
                    Your Sidekick for every Tick
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-3 w-3 text-gray-600">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </span>
                </div>
                {tagline && <p className="text-sm text-indrasol-blue font-medium">{tagline}</p>}
              </div>
            ) : title === "AI Receptionist" ? (
              <div>
                <div className="flex items-center mb-2">
                  <div className="mr-4">
                    {customIcon ? customIcon : <Icon className="h-8 w-8 text-indrasol-blue group-hover:scale-110 transition-transform" strokeWidth={2} />}
                  </div>
                  <h3 className="text-xl font-bold text-yellow-500">{title}</h3>
                </div>
                {tagline && <p className="text-sm text-indrasol-blue font-medium">{tagline}</p>}
              </div>
            ) : title === "Bizradar" ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {customIcon ? customIcon : <Icon className="h-8 w-8 text-indrasol-blue group-hover:scale-110 transition-transform" strokeWidth={2} />}
                  <h3 className="text-xl font-bold text-blue-600">{title}</h3>
                </div>
                {tagline && <p className="text-sm text-indrasol-blue font-medium">{tagline}</p>}
              </div>
            ) : title === "SecureTrack" ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {customIcon ? customIcon : <Icon className="h-8 w-8 text-indrasol-blue group-hover:scale-110 transition-transform" strokeWidth={2} />}
                  <h3 className="text-xl font-bold">
                    Secure<span style={{color: 'rgb(62, 207, 142)'}}>Track</span>
                  </h3>
                </div>
                {tagline && <p className="text-sm text-indrasol-blue font-medium">{tagline}</p>}
              </div>
            ) : title === "YaadonKeRang" ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {customIcon ? customIcon : <Icon className="h-8 w-8 text-indrasol-blue group-hover:scale-110 transition-transform" strokeWidth={2} />}
                  <h3 className="text-xl font-bold">
                    <span className="text-black">YaadonKe</span><span className="bg-gradient-to-r from-orange-800 via-red-700 to-red-800 bg-clip-text text-transparent">Rang</span>
                  </h3>
                </div>
                {tagline && <p className="text-sm text-indrasol-blue font-medium">{tagline}</p>}
              </div>
            ) : (
              <div className="flex items-center">
                <div className="mr-4">
                  {customIcon ? customIcon : <Icon className="h-8 w-8 text-indrasol-blue group-hover:scale-110 transition-transform" strokeWidth={2} />}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
                  {tagline && <p className="text-sm text-indrasol-blue font-medium">{tagline}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">{description}</p>

          {/* Stats section */}
          {stats && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-indrasol-blue">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Features list */}
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-3">Key Features:</p>
            <ul className="space-y-2">
              {features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <CheckCircle className="h-4 w-4 text-indrasol-blue flex-shrink-0 mt-0.5 mr-2" strokeWidth={2} />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-grow"></div>

          {/* CTA button */}
          <Link 
            to={link}
            className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue hover:shadow-lg text-white px-4 py-2 rounded-lg font-medium shadow-md shadow-indrasol-blue/20 transition-all duration-300 transform hover:scale-[1.02] group/btn inline-flex items-center justify-center"
          >
            {linkText}
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Hero section component
const ProductsHeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => {
        heroRef.current.classList.remove('opacity-0', 'translate-y-4');
        heroRef.current.classList.add('opacity-100', 'translate-y-0');
      }, 100);
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden transition-all duration-700"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-indrasol-gray/5 opacity-80"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indrasol-blue/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indrasol-orange/5 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-indrasol-blue transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-700">Products</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-black">Intelligent Solutions For</span>
            <br />
            <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue bg-clip-text text-transparent">Modern Business Challenges</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Discover our suite of AI-powered products designed to streamline your operations, 
            enhance security, and drive business growth through intelligent automation.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue hover:shadow-lg text-white px-4 py-2 rounded-lg font-medium shadow-md shadow-indrasol-blue/20 transition-all duration-300 transform hover:scale-[1.02] group inline-flex items-center justify-center"
            >
              Request Demo 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </Link>
            <a 
              href="#products-overview" 
              className="px-6 py-3 border-2 border-indrasol-blue text-indrasol-blue bg-white/80 backdrop-blur-sm rounded-lg hover:bg-indrasol-blue/10 transition-colors inline-flex items-center justify-center"
            >
              Explore Products
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Brain className="h-5 w-5 text-indrasol-blue mr-2" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-indrasol-blue mr-2" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-indrasol-blue mr-2" />
              <span>Real-time Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Benefits section
const BenefitsSection = () => {
  const benefitsRef = useRef(null);

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

    if (benefitsRef.current) {
      observer.observe(benefitsRef.current);
    }

    return () => {
      if (benefitsRef.current) {
        observer.unobserve(benefitsRef.current);
      }
    };
  }, []);

  const benefits = [
    {
      icon: TrendingUp,
      title: "Accelerate Growth",
      description: "Leverage AI to identify opportunities and optimize operations for rapid business expansion."
    },
    {
      icon: Shield,
      title: "Enhance Security",
      description: "Proactively identify and address security vulnerabilities before they become threats."
    },
    {
      icon: Target,
      title: "Improve Accuracy",
      description: "AI-driven insights ensure precision in decision-making and risk assessment."
    },
    {
      icon: Database,
      title: "Streamline Operations",
      description: "Automate complex processes and reduce manual effort across your organization."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-indrasol-blue/5 to-white">
      <div 
        ref={benefitsRef}
        className="container mx-auto px-4 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-indrasol-blue/10 text-indrasol-blue font-medium rounded-full text-sm mb-4">
            Why Choose Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Built for Modern Enterprises
          </h2>
          <p className="text-xl text-gray-700">
            Our products combine cutting-edge AI technology with deep industry expertise 
            to deliver solutions that drive real business value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="p-4 bg-indrasol-blue/10 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-indrasol-blue/20 transition-colors">
                <benefit.icon className="h-8 w-8 text-indrasol-blue" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Products component
const Products = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Inject cycling styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = cyclingStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Cycling logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentSet(prev => prev === 2 ? 0 : prev + 1);
        setIsVisible(true);
      }, 800); // Wait for fade out to complete
      
    }, 4000); // Show each set for 4 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Products data
  const products = [
    {
      icon: Activity,
      title: "Bizradar",
      tagline: "Discover. Analyze. Win.",
      description: "AI-driven contract tracking dashboard that automates the discovery and analysis of cybersecurity, AI, and data engineering projects across government and freelance marketplaces.",
      features: [
        "24/7 monitoring of government & freelance platforms",
        "AI-powered contract matching",
        "Real-time opportunity alerts",
        "Comprehensive market intelligence",
        "Win probability scoring"
      ],
      stats: [
        { value: "2.5K+", label: "Daily Contracts" },
        { value: "98%", label: "Match Accuracy" }
      ],
      link: "/Products/Bizradar",
      accentColor: "indrasol-blue",
      isNew: false,
      customIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform group-hover:rotate-12 duration-300">
          <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"></path>
          <path d="M4 6h.01"></path>
          <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"></path>
          <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"></path>
          <path d="M12 18h.01"></path>
          <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"></path>
          <circle cx="12" cy="12" r="2"></circle>
          <path d="m13.41 10.59 5.66-5.66"></path>
        </svg>
      )
    },
    {
      icon: Lock,
      title: "SecureTrack",
      tagline: "Analyze. Identify. Secure.",
      description: "Intelligent security architecture design review application that analyzes diagrams, identifies gaps, and provides actionable recommendations using AI-driven insights.",
      features: [
        "Automated diagram analysis",
        "Security gap identification",
        "Compliance mapping (NIST, ISO, CIS)",
        "AI-powered threat modeling",
        "Actionable recommendations"
      ],
      stats: [
        { value: "95%", label: "Threat Detection" },
        { value: "76%", label: "Time Saved" }
      ],
      link: "/Products/Securetrack",
      accentColor: "indrasol-blue",
      isNew: false,
      customIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 group-hover:scale-110 transition-transform" style={{color: 'rgb(62, 207, 142)'}}>
          <circle cx="6" cy="19" r="3"></circle>
          <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path>
          <circle cx="18" cy="5" r="3"></circle>
        </svg>
      )
    },
    {
      icon: PhoneCall,
      title: "AI Receptionist",
      tagline: "Welcome. Assist. Connect.",
      description: "Intelligent virtual receptionist that provides 24/7 customer support and appointment scheduling using advanced AI and natural language processing.",
      features: [
        "24/7 customer support",
        "Smart appointment scheduling",
        "Natural language processing",
        "Seamless system integration"
      ],
      stats: [
        { value: "24/7", label: "Always Available" },
        
      ],
      link: "/Products/AiReceptionist",
      accentColor: "indrasol-blue",
      isNew: true,
      customIcon: (
        <div className="relative w-10 h-10 group-hover:scale-110 transition-transform">
          {/* Yellow Background with White Bot Icon */}
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
              <path d="M12 8V4H8"/>
              <rect width="16" height="12" x="4" y="8" rx="2"/>
              <path d="M2 14h2"/>
              <path d="M20 14h2"/>
              <path d="M15 13v2"/>
              <path d="M9 13v2"/>
            </svg>
          </div>
          {/* Green Call Icon - Top Right Corner */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2 w-2 text-white">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0-0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
        </div>
      )
    },
    {
      icon: CheckCircle,
      title: "TasksMate",
      tagline: "Organize. Track. Achieve.",
      description: "Turn chaos into clarity. Empower your team with a unified workspace that keeps projects moving, ideas flowing, and bugs squashed — all in record time.",
      features: [
        "Task categorization and priority setting",
        "Deadline reminders and notifications",
        "Progress tracking and analytics",
        "Team collaboration and task sharing",
        "Intuitive drag-and-drop interface"
      ],
      stats: [
        { value: "99%", label: "Task Completion" },
        { value: "50%", label: "Time Saved" }
      ],
      link: "/Products/TasksMate",
      accentColor: "indrasol-blue",
      isNew: true,
      customIcon: (
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </div>
      )
    },
    {
      icon: Heart,
      title: "YaadonKeRang",
      tagline: "Memories. Colors. Love.",
      description: "A simple weekend project made with love. Capture and cherish your precious memories in vibrant, meaningful colors.",
      features: [
        "Made with love over a weekend",
        "Beautiful and vibrant color palettes",
        "Simple and minimalistic design",
        "Focus on meaningful memories"
      ],
      stats: [
        { value: "❤️", label: "Made with Love" },
        { value: "🎨", label: "Beautiful Colors" }
      ],
      link: "/Products/YaadonKeRang",
      accentColor: "indrasol-blue",
      isNew: false,
      customIcon: (
        <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <Palette className="h-5 w-5 text-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-600 rounded-full flex items-center justify-center">
            <Camera className="h-1.5 w-1.5 text-white" />
          </div>
        </div>
      )
    }
  ];

  const overviewRef = useRef(null);

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

    if (overviewRef.current) {
      observer.observe(overviewRef.current);
    }

    return () => {
      if (overviewRef.current) {
        observer.unobserve(overviewRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <ProductsHeroSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Products Overview Section */}
        <section id="products-overview" className="py-20 bg-white">
          <div 
            ref={overviewRef}
            className="container mx-auto px-4 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            {/* Section header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 bg-indrasol-blue/10 text-indrasol-blue font-medium rounded-full text-sm mb-4">
                Our Products
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Intelligent Solutions Portfolio
              </h2>
              <p className="text-xl text-gray-700">
                Each product is designed to address specific business challenges with 
                precision and intelligence, delivering measurable results.
              </p>
            </div>

            {/* Products cycling display */}
            <div className="relative max-w-6xl mx-auto">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-800 ${isVisible ? 'fade-in' : 'fade-out'}`}>
                {currentSet === 0 ? (
                  // First set: Show first 2 products
                  products.slice(0, 2).map((product, index) => (
                    <ProductCard key={`set1-${index}`} {...product} />
                  ))
                ) : currentSet === 1 ? (
                  // Second set: Show next 2 products
                  products.slice(2, 4).map((product, index) => (
                    <ProductCard key={`set2-${index}`} {...product} />
                  ))
                ) : (
                  // Third set: Show last product
                  <>
                    <ProductCard key={`set3-0`} {...products[4]} />
                    <div className="hidden md:block"></div> {/* Empty space for balance */}
                  </>
                )}
              </div>
              
              {/* Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSet === 0 ? 'bg-indrasol-blue' : 'bg-gray-300'}`}></div>
                <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSet === 1 ? 'bg-indrasol-blue' : 'bg-gray-300'}`}></div>
                <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSet === 2 ? 'bg-indrasol-blue' : 'bg-gray-300'}`}></div>
              </div>
            </div>

            {/* Coming Soon section */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center bg-indrasol-blue/10 px-6 py-3 rounded-full">
                <Activity className="h-5 w-5 text-indrasol-blue mr-2" />
                <span className="text-indrasol-blue font-semibold">
                  More innovative products coming soon!
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-20 bg-gradient-to-b from-white via-indrasol-blue/5 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Seamless Integration & Support
              </h2>
              <p className="text-xl text-gray-700 mb-12">
                Our products are designed to integrate seamlessly with your existing 
                infrastructure and workflows, backed by enterprise-grade support.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="p-3 bg-indrasol-blue/10 rounded-full w-14 h-14 mx-auto mb-4">
                    <Database className="h-8 w-8 text-indrasol-blue" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">API Integration</h3>
                  <p className="text-gray-600">RESTful APIs for seamless integration with your existing tools</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-indrasol-blue/10 rounded-full w-14 h-14 mx-auto mb-4">
                    <Lock className="h-8 w-8 text-indrasol-blue" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Enterprise Security</h3>
                  <p className="text-gray-600">Bank-grade encryption and compliance with industry standards</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-indrasol-blue/10 rounded-full w-14 h-14 mx-auto mb-4">
                    <BarChart className="h-8 w-8 text-indrasol-blue" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Analytics & Insights</h3>
                  <p className="text-gray-600">Comprehensive dashboards and reporting capabilities</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue/80 rounded-2xl p-12 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Experience the power of AI-driven solutions. Schedule a personalized 
                demo to see how our products can accelerate your success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="group px-8 py-4 bg-white text-indrasol-blue rounded-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center text-lg font-medium"
                >
                  Schedule Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center text-lg font-medium"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
      <ChatBot />
    </div>
  );
};

export default Products;
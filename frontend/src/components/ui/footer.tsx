import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Mail, MapPin, Phone, ArrowUpRight, Globe, Shield, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#1e3a8a] via-[#367ABB] to-[#1e40af] text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-indrasol-orange/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/20"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Top section with logo and company info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <div className="group">
                <Link to="/" className="flex items-end gap-0 mb-6 w-fit bg-white rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                  <img 
                    src="/indrasol_logo_high_res.png" 
                    alt="Indrasol Logo" 
                    className="h-9 w-9"
                  />
                  <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue bg-clip-text text-transparent font-bold text-4xl tracking-tight leading-none relative top-[4px]">Indrasol</span>
                </Link>
                <p className="text-white/80 text-base leading-relaxed mb-6">
                  A global provider of consulting, implementation, and support services for Oracle solutions, cloud platforms, and data analytics.
                </p>
              </div>

              {/* Enhanced social media section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Connect with us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.youtube.com/@IndrasolTech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 bg-gradient-to-r from-[#FF0000] to-[#CC0000] rounded-2xl hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    aria-label="YouTube"
                  >
                    <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="white" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>

                  <a
                    href="https://x.com/theindrasol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 bg-gradient-to-r from-black to-gray-800 rounded-2xl hover:shadow-2xl hover:shadow-gray-800/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    aria-label="X (formerly Twitter)"
                  >
                    <svg className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" fill="white" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/indrasol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 bg-gradient-to-r from-[#0077B5] to-[#005885] rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" fill="white" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                <div className="p-2 bg-gradient-to-r from-indrasol-orange to-yellow-500 rounded-xl mr-3">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                Contact Information
              </h3>
              <div className="space-y-4">
                <a href="https://www.google.com/maps/place/6101+Bollinger+Canyon+Rd+suite+335+C,+San+Ramon,+CA+94583,+USA/@37.7597632,-121.9558876,593m/data=!3m2!1e3!4b1!4m6!3m5!1s0x808fed7d76100001:0x80d9a02c84cc6cc1!8m2!3d37.7597632!4d-121.9558876!16s%2Fg%2F11sy74klzp?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D">

                  <div className="group flex items-start hover:bg-white/5 p-3 rounded-2xl transition-all duration-300">
                    <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl mr-4 mt-1">
                      <MapPin className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <a href="https://www.google.com/maps/place/6101+Bollinger+Canyon+Rd+suite+335+C,+San+Ramon,+CA+94583,+USA/@37.7597632,-121.9558876,593m/data=!3m2!1e3!4b1!4m6!3m5!1s0x808fed7d76100001:0x80d9a02c84cc6cc1!8m2!3d37.7597632!4d-121.9558876!16s%2Fg%2F11sy74klzp?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D" className="text-white/90 font-medium leading-relaxed">
                        6101 Bollinger Canyon Rd, Suite 335 C<br />
                        San Ramon, CA 94583
                      </a>
                    </div>
                  </div>
                  </a>
                 
                 <a href="tel:+14244046372">
                <div className="group flex items-center hover:bg-white/5 p-3 rounded-2xl transition-all duration-300">
                  <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl mr-4">
                    <Phone className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                   <a href="tel:+14244046372" className="text-white/90 hover:text-white transition-colors font-medium">
                    +1 424 404 6372
                  </a>
                  </div>
                  
                </div>
                </a>

          

                <a href="mailto:sales@indrasol.com">
                <div className="group flex items-center hover:bg-white/5 p-3 rounded-2xl transition-all duration-300">
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl mr-4">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <a href="mailto:sales@indrasol.com" className="text-white/90 hover:text-white transition-colors font-medium">
                    sales@indrasol.com
                  </a>
                </div>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Services */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl mr-3">
                    <Cpu className="h-5 w-5 text-white" />
                  </div>
                  Services
                </h3>
                <div className="space-y-3">
                  <Link
                    to="/services/aisolutions"
                    className="group flex items-center text-white/80 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">AI Solutions & Security</span>
                  </Link>
                  <Link
                    to="/services/cloud-engineering"
                    className="group flex items-center text-white/80 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Cloud Engineering & Security</span>
                  </Link>
                  <Link
                    to="/services/application-security"
                    className="group flex items-center text-white/80 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Application Security</span>
                  </Link>
                  <Link
                    to="/services/data-engineering"
                    className="group flex items-center text-white/80 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Data Engineering & Security</span>
                  </Link>
                </div>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl mr-3">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  Company
                </h3>
                <div className="space-y-3">
                  <Link
                    to="/company"
                    className="group flex items-center text-white/80 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                  </Link>
                  <Link
                    to="/locations"
                    className="group flex items-center text-white/80 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Global Locations</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="group flex items-center text-white/80 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                  </Link>
                  <a
                    href="https://www.linkedin.com/company/indrasol/jobs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center text-white/80 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5"
                  >
                    <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Careers</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white">Enterprise Security</h4>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Advanced security solutions protecting global enterprises with cutting-edge technology.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white">Global Reach</h4>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Serving clients across continents with local expertise and global standards.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white">AI Innovation</h4>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Leading the future with AI-powered solutions and intelligent automation.
            </p>
          </div>
        </div>

        {/* Enhanced bottom copyright section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-white/60 text-sm font-medium">
                &copy; {new Date().getFullYear()} Indrasol. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="group text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center">
                <Shield className="h-3 w-3 mr-1 group-hover:scale-110 transition-transform duration-300" />
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" target="_blank" rel="noopener noreferrer" className="group text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center">
                <ExternalLink className="h-3 w-3 mr-1 group-hover:scale-110 transition-transform duration-300" />
                Terms of Service
              </Link>
              <Link to="/cookie-policy" target="_blank" rel="noopener noreferrer" className="group text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center">
                <Globe className="h-3 w-3 mr-1 group-hover:scale-110 transition-transform duration-300" />
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style>{`
        @keyframes float-gentle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.7; 
          }
          50% { 
            transform: translateY(-10px) rotate(5deg); 
            opacity: 1; 
          }
        }
        
        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        /* Enhanced hover effects for social icons */
        .social-icon:hover {
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        /* Glass morphism effect for cards */
        .glass-card {
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .glass-card:hover {
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </footer>
  );
}
import React, { useState } from "react";
import { MapPin, Phone, Mail, Globe, ExternalLink, Building2, Users, Clock } from "lucide-react";

const locations = [
  {
    city: "San Ramon",
    country: "USA",
    address: "6101 Bollinger canyon Rd, suite 335 C, San Ramon, California 94583",
    isHeadquarters: true,
    phone: "+1 (510) 754 2001",
    email: "sales@indrasol.com",
    mapLink: "https://www.google.com/maps/place/6101+Bollinger+Canyon+Rd+suite+335+C,+San+Ramon,+CA+94583,+USA/@37.7597674,-121.9584625,655m/data=!3m2!1e3!4b1!4m6!3m5!1s0x808fed7d76100001:0x80d9a02c84cc6cc1!8m2!3d37.7597632!4d-121.9558876!16s%2Fg%2F11sy74klzp?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3Dhttps://maps.google.com/?q=San+Ramon,+California",
    flag: "🇺🇸",
    img_url: "/locations/San_Ramon_USA.png",
    timezone: "PST (UTC-8)",
    team: "25+ experts",
    color: "from-indrasol-blue to-indrasol-blue"
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "The Adelphi,1 Coleman Street, #05-14, Singapore 179803",
    isHeadquarters: false,
    phone: " +65 90267032",
    email: "sales@indrasol.com",
    mapLink: "https://www.google.com/maps/place/The+Adelphi/@1.2911899,103.8486418,829m/data=!3m3!1e3!4b1!5s0x31da190a6a7e722b:0x356b15a7d5d6fa4c!4m6!3m5!1s0x31da19a728e85ce3:0x33f3d7270d0f9c68!8m2!3d1.2911845!4d103.8512167!16s%2Fg%2F11f_4rltdr?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3Dhttps://maps.google.com/?q=Singapore+Business+District",
    flag: "🇸🇬",
    img_url: "/locations/Singapore.png",
    timezone: "SGT (UTC+8)",
    team: "15+ experts",
    color: "from-indrasol-blue to-indrasol-blue"
  },
  {
    city: "Hyderabad",
    country: "India",
    address: "814, Manjeera Trinity Corporate, JNTU Road, Kukatpally, Hyderabad, TS, 500 075",
    isHeadquarters: false,
    phone: " +91 9966636305",
    email: "sales@indrasol.com",
    mapLink: "https://www.google.com/maps/place/Indrasol/@17.4893133,78.3901066,936m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bcb91f27b5c1195:0xc97b9e2d12234798!8m2!3d17.4893082!4d78.3926815!16s%2Fg%2F11fkw7t_9g?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3Dhttps://maps.google.com/maps/search/814,+Manjeera+Trinity+Corporate,+JNTU+Road,+Kukatpally,+Hyderabad,+TS,+500+075/@17.4911278,78.3908007,468m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D",
    flag: "🇮🇳",
    img_url: "/locations/Hyderabad_India.png",
    timezone: "IST (UTC+5:30)",
    team: "50+ experts",
    color: "from-indrasol-blue to-indrasol-blue"
  },
  {
    city: "Mexico City",
    country: "Mexico",
    address: "Av Independencia 89-7 col. Amomolulco Lerma Estado de Mèxico c.p. 52005",
    isHeadquarters: false,
    phone: "+1 (510) 754 2001",
    email: "sales@indrasol.com",
    mapLink: "https://maps.google.com/?q=Paseo+de+la+Reforma+222+Mexico+City",
    flag: "🇲🇽",
    img_url: "/locations/Mexico.png",
    timezone: "CST (UTC-6)",
    team: "10+ experts",
    color: "from-indrasol-blue to-indrasol-blue"
  }
];

export function LocationsSection() {
  const [activeLocation, setActiveLocation] = useState<number>(0);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);

  return (
    <section id="locations" className="py-24 md:py-32 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      
      {/* Animated decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-indrasol-blue/10 to-indrasol-blue/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-indrasol-orange/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indrasol-blue/5 to-blue-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-indrasol-blue font-semibold mb-4 bg-gradient-to-r from-indrasol-blue/10 to-indrasol-blue/5 px-6 py-2 rounded-full border border-indrasol-blue/20">
            <Globe className="h-4 w-4" />
            Global Presence
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Serving Clients </span>
            <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue bg-clip-text text-transparent">Worldwide</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            With offices across three continents, we deliver localized expertise backed by global capabilities and 24/7 support.
          </p>
        </div>

        {/* Enhanced Interactive World Map */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indrasol-blue/20 via-transparent to-indrasol-orange/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/lovable-uploads/worldmap.png"
                alt="Indrasol Global Offices"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Interactive location markers */}
              <div className="absolute inset-0">
                {/* San Ramon - USA */}
                <div 
                  className="absolute top-[35%] left-[15%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setActiveLocation(0)}
                  onMouseEnter={() => setHoveredLocation(0)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <div className={`relative transition-all duration-300 ${hoveredLocation === 0 || activeLocation === 0 ? 'scale-125' : ''}`}>
                    <div className="w-4 h-4 bg-gradient-to-r from-indrasol-blue to-indrasol-blue rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-indrasol-blue/60 rounded-full animate-ping opacity-75"></div>
                    {(hoveredLocation === 0 || activeLocation === 0) && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-xl border text-sm font-semibold text-gray-700 whitespace-nowrap animate-fadeIn">
                        🇺🇸 San Ramon, USA
                      </div>
                    )}
                  </div>
                </div>

                {/* Singapore */}
                <div 
                  className="absolute top-[65%] right-[25%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setActiveLocation(1)}
                  onMouseEnter={() => setHoveredLocation(1)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <div className={`relative transition-all duration-300 ${hoveredLocation === 1 || activeLocation === 1 ? 'scale-125' : ''}`}>
                    <div className="w-4 h-4 bg-gradient-to-r from-indrasol-blue to-indrasol-blue rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-indrasol-blue/60 rounded-full animate-ping opacity-75"></div>
                    {(hoveredLocation === 1 || activeLocation === 1) && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-xl border text-sm font-semibold text-gray-700 whitespace-nowrap animate-fadeIn">
                        🇸🇬 Singapore
                      </div>
                    )}
                  </div>
                </div>

                {/* Hyderabad - India */}
                <div 
                  className="absolute top-[55%] right-[35%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setActiveLocation(2)}
                  onMouseEnter={() => setHoveredLocation(2)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <div className={`relative transition-all duration-300 ${hoveredLocation === 2 || activeLocation === 2 ? 'scale-125' : ''}`}>
                    <div className="w-4 h-4 bg-gradient-to-r from-indrasol-blue to-indrasol-blue rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-indrasol-blue/60 rounded-full animate-ping opacity-75"></div>
                    {(hoveredLocation === 2 || activeLocation === 2) && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-xl border text-sm font-semibold text-gray-700 whitespace-nowrap animate-fadeIn">
                        🇮🇳 Hyderabad, India
                      </div>
                    )}
                  </div>
                </div>

                {/* Mexico */}
                <div 
                  className="absolute top-[45%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setActiveLocation(3)}
                  onMouseEnter={() => setHoveredLocation(3)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <div className={`relative transition-all duration-300 ${hoveredLocation === 3 || activeLocation === 3 ? 'scale-125' : ''}`}>
                    <div className="w-4 h-4 bg-gradient-to-r from-indrasol-blue to-indrasol-blue rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-indrasol-blue/60 rounded-full animate-ping opacity-75"></div>
                    {(hoveredLocation === 3 || activeLocation === 3) && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-xl border text-sm font-semibold text-gray-700 whitespace-nowrap animate-fadeIn">
                        🇲🇽 Mexico City, Mexico
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {locations.map((location, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-500 hover:scale-105 hover:z-10 ${
                activeLocation === index ? 'scale-105 z-10' : ''
              }`}
              onMouseEnter={() => setActiveLocation(index)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${location.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
              
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-full flex flex-col group-hover:shadow-2xl transition-all duration-300">
                {/* Enhanced map preview */}
                <div className="relative h-48 overflow-hidden">
                  <a
                    href={location.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="relative h-full">
                      <img
                        src={location.img_url}
                        alt={location.address}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <ExternalLink className="h-4 w-4 text-indrasol-blue" />
                      </div>
                      
                      {/* Location badge with HQ tag */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className={`bg-gradient-to-r ${location.color} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
                          {location.flag} {location.city}, {location.country}
                        </div>
                        {location.isHeadquarters && (
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs rounded-full font-bold shadow-lg">
                            HQ
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  {/* Address section - flexible height */}
                  <div className="mb-0">
                    <div className="flex items-start p-3 rounded-xl">
                      <div className={`p-2 bg-gradient-to-r ${location.color} rounded-xl mr-3 shadow-lg flex-shrink-0`}>
                        <MapPin className="h-4 w-4 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-sm text-gray-700 font-bold leading-relaxed">
                        {location.address}
                      </span>
                    </div>
                  </div>

                  {/* Contact section - positioned higher */}
                  <div className="space-y-3 mt-auto">
                    <a
                      href={`tel:${location.phone}`}
                      className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group/contact"
                    >
                      <div className={`p-2 bg-gradient-to-r ${location.color} rounded-xl mr-3 group-hover/contact:scale-110 transition-transform duration-300`}>
                        <Phone className="h-4 w-4 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-sm text-gray-700 group-hover/contact:text-indrasol-blue transition-colors font-medium">
                        {location.phone}
                      </span>
                    </a>

                    <a
                      href={`mailto:${location.email}`}
                      className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group/contact"
                    >
                      <div className={`p-2 bg-gradient-to-r ${location.color} rounded-xl mr-3 group-hover/contact:scale-110 transition-transform duration-300`}>
                        <Mail className="h-4 w-4 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-sm text-gray-700 group-hover/contact:text-indrasol-blue transition-colors font-medium">
                        {location.email}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center">
            <p className="text-lg text-gray-600 mb-6 max-w-2xl">
              Ready to discuss your project? Our global team is standing by to help transform your business.
            </p>
            <a
              href="/contact"
              className="group inline-flex items-center bg-gradient-to-r from-indrasol-blue to-indrasol-blue text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-indrasol-blue/25 hover:shadow-2xl hover:shadow-indrasol-blue/30 transition-all duration-300 transform hover:scale-105"
            >
              <Building2 className="mr-3 h-6 w-6" strokeWidth={2} />
              Connect With Our Team
              <ExternalLink className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @keyframes float-gentle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.7; 
          }
          50% { 
            transform: translateY(-8px) rotate(2deg); 
            opacity: 1; 
          }
        }
        
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% { 
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        /* Enhanced map marker animations */
        .map-marker {
          position: relative;
        }
        
        .map-marker::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse-ring 2s ease-in-out infinite;
        }
        
        @keyframes pulse-ring {
          0% { 
            transform: translate(-50%, -50%) scale(0.8); 
            opacity: 1; 
          }
          100% { 
            transform: translate(-50%, -50%) scale(2); 
            opacity: 0; 
          }
        }
        
        /* Smooth hover transitions for location cards */
        .location-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .location-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        /* Enhanced gradient backgrounds */
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .gradient-bg-alt {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
      `}</style>
    </section>
  );
}


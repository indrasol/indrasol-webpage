import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Modern background with gradient and blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-indrasol-gray opacity-80"></div>
      
      {/* Decorative shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indrasol-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indrasol-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-gray-900">We Build and Secure </span>
              <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue bg-clip-text text-transparent block mt-1">AI, Cloud and Data Systems</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
              From Development to Defense, Indrasol delivers end-to-end solutions for AI/LLM development, cloud-native engineering, data platforms, and security. We help you innovate faster, and safer.
            </p>
            {/* Mobile: Show image above certification logos and buttons */}
            <div className="mb-8 block lg:hidden">
              <img
                src="/lovable-uploads/keyoffers.png"
                alt="Business professionals working on technology solutions"
                className="w-full max-w-xs mx-auto transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue hover:shadow-2xl text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-indrasol-blue/25 transition-all duration-300 transform hover:scale-[1.02] group inline-flex items-center justify-center"
              >
                Request Consultation 
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 border-2 border-indrasol-blue text-indrasol-blue bg-white/80 backdrop-blur-sm rounded-lg hover:bg-indrasol-blue/10 transition-colors inline-flex items-center justify-center"
              >
                Explore Services
              </Link>
            </div>
            
            {/* Long Term Partnership Section */}
            <div className="mt-12 mb-6">
              <p className="text-sm text-gray-600 mb-4 font-medium">Long Term Partnership:</p>
              <div className="flex flex-wrap gap-6 items-center">
                <img 
                  src="/logos/metalogo.png" 
                  alt="Meta" 
                  className="h-16 opacity-80 hover:opacity-100 transition-opacity"
                />
                <img 
                  src="/logos/cisco.png" 
                  alt="Cisco" 
                  className="h-16 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Trusted Partners/Clients Logos Section */}
            <div className="mt-8 mb-0 lg:mb-12">
              <p className="text-sm text-gray-600 mb-4 font-medium">Certified by:</p>
              <div className="flex flex-wrap gap-8 items-center">
                <img 
                  src="/dgs1.png" 
                  alt="California Department of General Services" 
                  className="h-20 opacity-80 hover:opacity-100 transition-opacity"
                />
                <img 
                  src="/agov1.png" 
                  alt="CA.GOV" 
                  className="h-20 opacity-80 hover:opacity-100 transition-opacity"
                />
                <img 
                  src="/oraclep1.png" 
                  alt="Oracle Partner" 
                  className="h-20 opacity-80 hover:opacity-100 transition-opacity"
                />
                <img 
                  src="/nmsdc.jpeg" 
                  alt="NMSDC - National Minority Supplier Development Council" 
                  className="h-20 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="relative">
                <img
                  src="/lovable-uploads/keyoffers.png"
                  alt="Business professionals working on technology solutions"
                  className="w-full transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}









// import React from "react";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";

// export function HeroSection() {
//   return (
//     <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
//       {/* Modern background with gradient and blur effect */}
//       <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-indrasol-gray opacity-80"></div>
      
//       {/* Decorative shapes */}
//       <div className="absolute -top-24 -right-24 w-96 h-96 bg-indrasol-blue/10 rounded-full blur-3xl"></div>
//       <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indrasol-blue/5 rounded-full blur-3xl"></div>
      
//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div className="space-y-6">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
//               <span className="text-gray-900">We Build and Secure </span>
//               <span className="text-indrasol-blue block mt-1">AI, Cloud and Data Systems</span>
//             </h1>
//             <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
//             From Development to Defense, Indrasol delivers end-to-end solutions for AI/LLM development, cloud-native engineering, data platforms, and security. We help you innovate faster, and safer.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 pt-6">
//               <Link 
//                 to="/contact" 
//                 className="group px-6 py-3 bg-indrasol-blue text-white rounded-lg hover:bg-indrasol-blue/90 transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-indrasol-blue/20"
//               >
//                 Request Consultation 
//                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 stroke-2" />
//               </Link>
//               <Link 
//                 to="/contact" 
//                 className="px-6 py-3 border-2 border-indrasol-blue text-indrasol-blue bg-white/80 backdrop-blur-sm rounded-lg hover:bg-indrasol-blue/10 transition-colors inline-flex items-center justify-center"
//               >
//                 Explore Services
//               </Link>
//             </div>
//           </div>
//           <div className="hidden lg:block">
//             <div className="relative">
              
//               <div className="relative ">
//                 <img 
//                   src="/lovable-uploads/keyoffers.png" 
//                   alt="Business professionals working on technology solutions" 
//                   className="w-full transition-transform duration-700 hover:scale-105"
//                 />
                
                
//               </div>
              
//               {/* Floating accent element */}
//               {/* <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-xl shadow-xl flex items-center justify-center transform rotate-12">
//                 <div className="w-16 h-16 bg-indrasol-blue/20 rounded-lg flex items-center justify-center">
//                   <div className="w-8 h-8 bg-indrasol-blue rounded-md"></div>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import AiSolutions from "./pages/services/AiSolutions";
import NotFound from "./pages/NotFound";
import Location from "./pages/Aboutus/Locations";
import CloudEngineeringSecurity from "./pages/services/CloudEngineeringSecurity";
import ApplicationSecurity from "./pages/services/ApplicationSecurity";
import DataEngineering from "./pages/services/DataEngineering";
import Company from "./pages/Aboutus/Company";
import Services from "./pages/Services";
import Products from "./pages/Products";

import BizRadarProductPage from "./pages/Products/BizRadarProductPage";
import SecureTrackProductPage from "./pages/Products/SecureTrackProductPage";
import BlogPageSection from "./pages/Resources/BlogPageSection";
import BlogDetailPage from "./pages/Resources/BlogDetailPage";
import WhitePaperSection from "./pages/Resources/WhitePaperSection";
import WhitePaper1 from "./components/whitepaper/ai-augmented-pen-testing";
import WhitepaperDetailPage from "./pages/Resources/WhitepaperDetailPage";
import CaseStudies from "./pages/Resources/CaseStudies";

import Admin from "./pages/Admin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";

// 👉 Import ScrollToTop
import { ScrollToTop } from "./components/ScrollToTop";

// Wrapper for whitepaper detail page
function WhitePaperDetailWrapper() {
  const { slug } = useParams();
  return <WhitepaperDetailPage />;
}

// Wrapper to handle whitepaper routes
function WhitePaperRouter() {
  const { slug } = useParams();

  if (slug === "ai-augmented-penetration-testing") {
    return <WhitePaper1 />;
  }

  return <WhitepaperDetailPage />;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* 👉 Add ScrollToTop here */}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company" element={<Company />} />
          <Route path="/locations" element={<Location />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services/aisolutions" element={<AiSolutions />} />
          <Route path="/services/cloud-engineering" element={<CloudEngineeringSecurity />} />
          <Route path="/services/application-security" element={<ApplicationSecurity />} />
          <Route path="/services/data-engineering" element={<DataEngineering />} />
          <Route path="/Products/Bizradar" element={<BizRadarProductPage />} />
          <Route path="/Products/Securetrack" element={<SecureTrackProductPage />} />
          <Route path="/Resources/blogs2" element={<BlogPageSection />} />
          <Route path="/Resources/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/Resources/case-studies" element={<CaseStudies />} />
          <Route path="/Resources/whitepaper" element={<WhitePaperSection />} />
          <Route path="/resources/whitepaper/:slug" element={<WhitePaperRouter />} />
          <Route path="/components/whitepaper/:slug" element={<WhitePaperRouter />} />
          
          {/* Legal and Privacy Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          
          {/* Protected Admin Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: "company" | "services" | "products" | "security" | "pricing";
}

const faqs: FAQ[] = [
  // Company & General
  {
    id: 1,
    question: "What is Indrasol and what services do you provide?",
    answer: "Indrasol is a leading technology consulting company specializing in AI solutions, cloud engineering, cybersecurity, and data engineering. We help organizations build and secure AI, cloud, and data systems with end-to-end solutions from development to defense.",
    category: "company"
  },
  {
    id: 2,
    question: "Which industries does Indrasol serve?",
    answer: "We serve diverse industries including healthcare technology, financial services, government agencies, telecommunications, retail, entertainment, genomics, and real estate. Our clients range from Fortune 500 companies like Meta and Cisco to innovative startups.",
    category: "company"
  },
  {
    id: 3,
    question: "Where is Indrasol located and do you provide global services?",
    answer: "Indrasol has offices in San Ramon, CA, Singapore, Hyderabad, India, and Mexico City. We provide 24/7 global support coverage and serve clients worldwide with our distributed team of experts.",
    category: "company"
  },
  {
    id: 4,
    question: "What certifications and partnerships does Indrasol have?",
    answer: "We are an Oracle Gold Partner for 10+ years, AWS Advanced Consulting Partner, Microsoft Azure Certified, and certified by California Department of General Services. We're also NMSDC certified and maintain SOC 2, ISO, and HIPAA compliance standards.",
    category: "company"
  },

  // AI & Security Services
  {
    id: 5,
    question: "What AI security services does Indrasol offer?",
    answer: "Our AI Security services include LLM & AI application development, GenAI security reviews & threat modeling, AI Security Posture Management (AI-SPM), and MLSecOps implementation. We protect against prompt injection, model leaks, and AI misuse.",
    category: "services"
  },
  {
    id: 6,
    question: "How does Indrasol help with cloud migration and security?",
    answer: "We provide cloud-native app development, Cloud Security Posture Management (CSPM), cloud compliance (SOC 2, ISO, HIPAA), and managed cloud services. Our expertise spans Microsoft Azure, AWS, and Google Cloud Platform for secure, scalable migrations.",
    category: "services"
  },
  {
    id: 7,
    question: "What is application security posture management?",
    answer: "Application Security Posture Management involves continuous monitoring and assessment of your application security. We provide penetration testing (Web, API, AI), SaaS security & compliance, security tool development, and comprehensive security gap identification.",
    category: "security"
  },
  {
    id: 8,
    question: "Does Indrasol provide Oracle consulting services?",
    answer: "Yes, we offer expert Oracle consulting and implementation for Oracle Hyperion, PeopleSoft, Oracle Fusion, and JD Edwards. As an Oracle Gold Partner for over 10 years, we provide dedicated managed services and specialized support.",
    category: "services"
  },

  // Products
  {
    id: 9,
    question: "What is SecureTrack and how does it work?",
    answer: "SecureTrack is an intelligent security architecture design review application that analyzes diagrams, identifies security gaps, and provides actionable recommendations using AI-driven insights. It offers 95% threat detection accuracy and saves 76% of manual review time.",
    category: "products"
  },
  {
    id: 10,
    question: "What is BizRadar and who should use it?",
    answer: "BizRadar continuously monitors government and freelance portals, matching new RFPs to your keywords and past wins. It's perfect for sales teams and business development professionals who want to identify perfect-fit contract opportunities automatically.",
    category: "products"
  },
  {
    id: 11,
    question: "Do you offer AI-powered customer service solutions?",
    answer: "Yes, our AI Receptionist provides intelligent customer service automation with natural language processing, 24/7 availability, and seamless integration with existing systems. It handles inquiries, schedules appointments, and provides personalized customer interactions.",
    category: "products"
  },
  {
    id: 12,
    question: "How quickly can SecureTrack be implemented?",
    answer: "SecureTrack can be integrated the same day by pointing it at your Infrastructure as Code (IaC) repository or Architecture Decision Records. No agents or sidecars required - you get security insights immediately without complex setup.",
    category: "products"
  },

  // Security & Compliance
  {
    id: 13,
    question: "What compliance frameworks does Indrasol support?",
    answer: "We support major compliance frameworks including SOC 2, ISO 27001, HIPAA, NIST Cybersecurity Framework, CIS Controls, and PCI DSS. Our solutions help map your architecture to these controls and identify compliance gaps automatically.",
    category: "security"
  },
  {
    id: 14,
    question: "How does Indrasol protect against AI and LLM security threats?",
    answer: "We provide comprehensive AI security including prompt injection protection, model leak prevention, AI threat modeling, and GenAI security reviews. Our AI-SPM solutions continuously monitor AI applications for security vulnerabilities and compliance issues.",
    category: "security"
  },
  {
    id: 15,
    question: "What types of penetration testing does Indrasol perform?",
    answer: "We perform comprehensive penetration testing for web applications, APIs, and AI systems. Our testing includes vulnerability assessments, threat modeling, security architecture reviews, and actionable remediation recommendations with detailed reporting.",
    category: "security"
  },

  // Data & Analytics
  {
    id: 16,
    question: "What data engineering services does Indrasol provide?",
    answer: "Our data engineering services include data pipeline development, data lake and warehouse design, real-time analytics implementation, data governance, and security. We help transform raw data into actionable insights with advanced analytics solutions.",
    category: "services"
  },
  {
    id: 17,
    question: "How does Indrasol ensure data security and privacy?",
    answer: "We implement end-to-end data security including encryption at rest and in transit, access controls, data masking, audit logging, and compliance with privacy regulations like GDPR and CCPA. Our data security posture management ensures continuous protection.",
    category: "security"
  },

  // Pricing & Support
  {
    id: 18,
    question: "What is Indrasol's pricing model for consulting services?",
    answer: "We offer flexible pricing models including project-based, retainer, and managed services arrangements. Pricing depends on project scope, duration, and complexity. Contact us for a customized consultation and detailed pricing proposal.",
    category: "pricing"
  },
  {
    id: 19,
    question: "Does Indrasol provide 24/7 support and managed services?",
    answer: "Yes, we provide 24/7 global support coverage with our distributed team. Our managed services include ongoing Oracle Hyperion and PeopleSoft support, cloud infrastructure management, security monitoring, and proactive maintenance.",
    category: "services"
  },
  {
    id: 20,
    question: "How can I get started with Indrasol's services?",
    answer: "Getting started is easy - request a free consultation through our website, schedule a demo of our products, or contact our experts directly. We'll assess your needs and provide a customized solution roadmap with clear next steps and timelines.",
    category: "company"
  }
];

const categoryColors = {
  company: "bg-blue-50 text-blue-700 border-blue-200",
  services: "bg-green-50 text-green-700 border-green-200",
  products: "bg-purple-50 text-purple-700 border-purple-200",
  security: "bg-red-50 text-red-700 border-red-200",
  pricing: "bg-orange-50 text-orange-700 border-orange-200"
};

const categoryLabels = {
  company: "Company",
  services: "Services",
  products: "Products",
  security: "Security",
  pricing: "Pricing"
};

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const filteredFAQs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const categories = ["all", ...Object.keys(categoryLabels)];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-indrasol-gray/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indrasol-blue/10 px-6 py-3 rounded-full mb-6 border border-indrasol-blue/20">
            <HelpCircle className="w-5 h-5 text-indrasol-blue" />
            <span className="text-indrasol-blue font-semibold">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Got Questions? We've Got
            <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue bg-clip-text text-transparent"> Answers</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions about our AI, cloud, and cybersecurity solutions. 
            Can't find what you're looking for? Contact our experts for personalized assistance.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-indrasol-blue text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-indrasol-blue hover:text-indrasol-blue"
                }`}
              >
                {category === "all" ? "All Questions" : categoryLabels[category as keyof typeof categoryLabels]}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="mb-4"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[faq.category]}`}>
                        {categoryLabels[faq.category]}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {openFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-indrasol-blue" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="pl-20">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-indrasol-blue/5 to-indrasol-blue/10 rounded-3xl p-8 max-w-2xl mx-auto border border-indrasol-blue/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our experts are ready to help you find the perfect solution for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-indrasol-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-indrasol-blue/90 transition-colors duration-300"
              >
                Contact Our Experts
              </a>
              <a
                href="/services"
                className="border-2 border-indrasol-blue text-indrasol-blue px-8 py-3 rounded-xl font-semibold hover:bg-indrasol-blue/10 transition-colors duration-300"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

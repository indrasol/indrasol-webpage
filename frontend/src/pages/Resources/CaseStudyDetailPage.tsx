import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share, 
  X,
  Linkedin,
  Loader2, 
  User,
  BookOpen,
  ChevronRight,
  Tag,
  Building,
  Target,
  CheckCircle,
  Quote,
  ArrowRight,
  Eye,
  TrendingUp,
  Award,
  Users,
  BarChart3,
  Lightbulb,
  Zap
} from 'lucide-react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { BackToTop } from '@/components/ui/back-to-top';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/supabase';
import { format, parseISO } from 'date-fns';
import { EnhancedMarkdownRenderer } from '@/components/EnhancedMarkdownRenderer';

interface CaseStudy {
  id: string;
  cstitle: string;
  content: string;
  markdown_content?: string;
  excerpt?: string;
  coverImage?: string;
  cscategory?: string;
  csAuthor?: string;
  csauthor_desc?: string;
  csauthor_profile_url?: string;
  created_at: string;
  readTime?: string;
  readtime?: number;
  slug?: string;
  document_structure?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  quote?: string;
  tags?: string[];
  word_count?: number;
  has_images?: boolean;
  has_tables?: boolean;
  has_code?: boolean;
  meta_description?: string;
  stats?: any;
  published?: boolean;
  published_at?: string;
}

// Reading Progress Bar Component
const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-gradient-to-r from-indrasol-blue to-indrasol-blue/80 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedCaseStudies, setRelatedCaseStudies] = useState<CaseStudy[]>([]);

  // Helper function to generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  // Helper function to calculate read time
  const calculateReadTime = (content: string): string => {
    const words = content.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  // Helper function to extract company logo (first image only)
  const extractCompanyLogo = (caseStudy: any): string | null => {
    if (caseStudy.document_structure) {
      try {
        const structure = JSON.parse(caseStudy.document_structure);
        if (structure.images && Array.isArray(structure.images) && structure.images.length > 0) {
          const firstImage = structure.images[0];
          if (firstImage.src) return firstImage.src;
        }
      } catch (e) {
        console.warn('Error parsing document structure:', e);
      }
    }
    
    if (caseStudy.markdown_content || caseStudy.content) {
      const content = caseStudy.markdown_content || caseStudy.content;
      const markdownImgMatch = content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (markdownImgMatch && markdownImgMatch[2]) {
        return markdownImgMatch[2];
      }
    }
    
    return null;
  };

  // Extract sections from content
  const extractSection = (content: string, sectionName: string): string => {
    const regex = new RegExp(`## ${sectionName}[\\s\\S]*?(?=## |$)`, 'i');
    const match = content.match(regex);
    if (match) {
      return match[0].replace(`## ${sectionName}`, '').trim();
    }
    return '';
  };

  // Extract quote from content
  const extractQuote = (content: string): string => {
    let quote = '';
    
    const blockquoteMatch = content.match(/> "([^"]+)"/);
    if (blockquoteMatch) {
      quote = blockquoteMatch[1];
    } else {
      const quoteMatch = content.match(/## Quote[\\s\\S]*?"([^"]+)"/i);
      if (quoteMatch) {
        quote = quoteMatch[1];
      } else {
        const anyQuoteMatch = content.match(/"([^"]{20,})"/);
        if (anyQuoteMatch) {
          quote = anyQuoteMatch[1];
        }
      }
    }
    
    // Remove escape characters (backslashes) from the quote
    if (quote) {
      quote = quote.replace(/\\(.)/g, '$1'); // Remove backslashes that escape other characters
    }
    
    return quote;
  };

  // Remove images from markdown content
  const removeImagesFromContent = (content: string): string => {
    // Remove markdown images: ![alt text](url)
    let cleanContent = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '');
    
    // Remove HTML img tags
    cleanContent = cleanContent.replace(/<img[^>]*>/g, '');
    
    // Remove image references: [image]: url
    cleanContent = cleanContent.replace(/\[([^\]]*)\]:\s*[^\s]+/g, '');
    
    // Clean up extra whitespace that might be left
    cleanContent = cleanContent.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    return cleanContent.trim();
  };

  // Interface for key metrics
  interface KeyMetric {
    label: string;
    value: string;
    type: 'percentage' | 'number' | 'currency' | 'time' | 'text';
    icon?: string;
    color?: string;
  }

  // Extract key metrics from content
  const extractKeyMetrics = (content: string): KeyMetric[] => {
    const metrics: KeyMetric[] = [];
    
    // Extract metrics section
    const metricsSection = extractSection(content, 'Key Metrics') || 
                          extractSection(content, 'Metrics') ||
                          extractSection(content, 'Results Summary') ||
                          extractSection(content, 'Key Results');
    
    if (!metricsSection) return metrics;
    
    // Pattern to match common metric formats
    const patterns = [
      // Percentage improvements: "50% increase", "25% reduction", "30% improvement"
      /(\d+(?:\.\d+)?%)\s+(?:increase|improvement|growth|boost|rise|gain|higher|more|up|improved)\s+(?:in\s+)?([^.\n]+)/gi,
      /(\d+(?:\.\d+)?%)\s+(?:decrease|reduction|drop|decline|lower|less|savings?|down|reduced)\s+(?:in\s+)?([^.\n]+)/gi,
      /([^.\n]+?):\s*(\d+(?:\.\d+)?%)/gi,
      /(\d+(?:\.\d+)?%)\s+(?:of|in)\s+([^.\n]+)/gi,
      
      // Currency amounts: "$500K saved", "$2M revenue increase"
      /(\$\d+(?:\.\d+)?[KMB]?)\s+(?:saved|savings?|revenue|profit|cost\s+reduction|increase|growth|generated|earned)\s+(?:in\s+)?([^.\n]+)/gi,
      /([^.\n]+?):\s*(\$\d+(?:\.\d+)?[KMB]?)/gi,
      /(?:saved|generated|earned|increased|reduced\s+costs?\s+by)\s+(\$\d+(?:\.\d+)?[KMB]?)\s+(?:in\s+)?([^.\n]+)/gi,
      
      // Time improvements: "50% faster", "2x speed improvement"
      /(\d+(?:\.\d+)?x)\s+(?:faster|speed|quicker|acceleration|improvement|better|more\s+efficient)\s+(?:in\s+)?([^.\n]+)/gi,
      /(\d+(?:\.\d+)?%)\s+(?:faster|quicker|speed\s+improvement|more\s+efficient)\s+(?:in\s+)?([^.\n]+)/gi,
      /(?:improved|increased|enhanced)\s+([^.\n]+?)\s+by\s+(\d+(?:\.\d+)?[x%])/gi,
      
      // Number improvements: "10K more users", "500 new customers"
      /(\d+(?:\.\d+)?[KMB]?)\s+(?:more|new|additional|extra|increased)\s+([^.\n]+)/gi,
      /([^.\n]+?):\s*(\d+(?:\.\d+)?[KMB]?)\s+(?:users?|customers?|clients?|leads?|sales?|orders?)/gi,
      /(?:increased|grew|added|gained)\s+(\d+(?:\.\d+)?[KMB]?)\s+(?:new\s+)?([^.\n]+)/gi,
      
      // Time periods: "within 3 months", "in 6 weeks"
      /(?:within|in|after|during)\s+(\d+\s+(?:days?|weeks?|months?|years?))\s+([^.\n]+)/gi,
      /([^.\n]+?)\s+(?:in|within|after)\s+(\d+\s+(?:days?|weeks?|months?|years?))/gi,
      
      // ROI and efficiency metrics
      /(\d+(?:\.\d+)?[x%])\s+(?:ROI|return|efficiency|productivity|performance)\s+(?:improvement|increase|gain)\s+(?:in\s+)?([^.\n]+)/gi,
      /(?:ROI|return|efficiency)\s+of\s+(\d+(?:\.\d+)?[x%])\s+(?:in\s+)?([^.\n]+)/gi,
      
      // Capacity and scale metrics
      /(\d+(?:\.\d+)?[KMB]?)\s+(?:capacity|scale|volume|throughput)\s+(?:increase|improvement|growth)\s+(?:in\s+)?([^.\n]+)/gi,
      /(?:scaled|increased|improved)\s+([^.\n]+?)\s+by\s+(\d+(?:\.\d+)?[KMB%])/gi,
      
      // DOCX-specific patterns (often have different formatting)
      /•\s*([^:]+):\s*(\d+(?:\.\d+)?[%KMB]?(?:\s*[%KMB])?)/gi,
      /-\s*([^:]+):\s*(\d+(?:\.\d+)?[%KMB]?(?:\s*[%KMB])?)/gi,
      /\*\s*([^:]+):\s*(\d+(?:\.\d+)?[%KMB]?(?:\s*[%KMB])?)/gi,
    ];
    
    patterns.forEach(pattern => {
      const matches = metricsSection.matchAll(pattern);
      for (const match of matches) {
        let value = match[1];
        let label = match[2];
        
        // Clean up label
        label = label.replace(/[^\w\s]/g, '').trim();
        if (label.length > 30) label = label.substring(0, 30) + '...';
        
        // Determine type and color based on value
        let type: KeyMetric['type'] = 'text';
        let color = 'blue';
        
        if (value.includes('%')) {
          type = 'percentage';
          color = 'green';
        } else if (value.includes('$')) {
          type = 'currency';
          color = 'emerald';
        } else if (value.includes('x')) {
          type = 'number';
          color = 'purple';
        } else if (/\d+\s+(?:days?|weeks?|months?|years?)/.test(value)) {
          type = 'time';
          color = 'orange';
        } else if (/^\d+(?:\.\d+)?[KMB]?$/.test(value)) {
          type = 'number';
          color = 'indigo';
        }
        
        metrics.push({
          label: label || 'Improvement',
          value,
          type,
          color
        });
      }
    });
    
    // If no metrics found, try to extract from bullet points or lines
    if (metrics.length === 0) {
      const lines = metricsSection.split('\n');
      lines.forEach(line => {
        // Look for lines with numbers and percentages
        const metricMatch = line.match(/[-*•]\s*([^:]+):\s*([^.\n]+)/);
        if (metricMatch) {
          const label = metricMatch[1].trim();
          const value = metricMatch[2].trim();
          
          let type: KeyMetric['type'] = 'text';
          let color = 'blue';
          
          if (value.includes('%')) {
            type = 'percentage';
            color = 'green';
          } else if (value.includes('$')) {
            type = 'currency';
            color = 'emerald';
          }
          
          metrics.push({ label, value, type, color });
        }
      });
    }
    
    return metrics.slice(0, 6); // Limit to 6 metrics for better display
  };

  // Key Metrics Display Component
  const KeyMetricsDisplay: React.FC<{ metrics: KeyMetric[] }> = ({ metrics }) => {
    const getIcon = (type: KeyMetric['type']) => {
      switch (type) {
        case 'percentage':
          return <TrendingUp className="w-6 h-6" />;
        case 'currency':
          return <BarChart3 className="w-6 h-6" />;
        case 'number':
          return <Users className="w-6 h-6" />;
        case 'time':
          return <Clock className="w-6 h-6" />;
        default:
          return <Award className="w-6 h-6" />;
      }
    };
    
    const getColorClasses = (color: string) => {
      switch (color) {
        case 'green':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'emerald':
          return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        case 'purple':
          return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'orange':
          return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'indigo':
          return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        default:
          return 'bg-blue-100 text-blue-800 border-blue-200';
      }
    };
    
    if (metrics.length === 0) return null;
    
    return (
      <section className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Key Metrics</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 ${getColorClasses(metric.color || 'blue')} transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${getColorClasses(metric.color || 'blue')} bg-opacity-20`}>
                  {getIcon(metric.type)}
                </div>
                <div className="text-xs font-medium uppercase tracking-wider opacity-70">
                  {metric.type}
                </div>
              </div>
              
              <div className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                {metric.value}
              </div>
              
              <div className="text-sm font-medium opacity-90 leading-tight">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary message */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-medium">Outstanding Results:</span> These metrics demonstrate the significant impact 
            and measurable success achieved through our comprehensive solution approach.
          </p>
        </div>
      </section>
    );
  };

  // Social sharing function
  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const title = caseStudy?.cstitle || 'Indrasol Case Study';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'x':
        shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        // Create a toast notification instead of alert
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        toast.textContent = 'Link copied to clipboard!';
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  useEffect(() => {
    const fetchCaseStudyDetail = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        
        // Try to find by slug first
        let { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (error) {
          console.error('Supabase error for slug query:', error);
        }
        
        // If not found by slug, try by ID
        if (error || !data) {
          const { data: idData, error: idError } = await supabase
            .from('case_studies')
            .select('*')
            .eq('id', slug)
            .maybeSingle();
            
          if (idError) {
            console.error('Supabase error for id query:', idError);
          }
            
          // If still not found, try to find by generated slug
          if (idError || !idData) {
            const { data: allCaseStudies, error: allError } = await supabase
              .from('case_studies')
              .select('*');
              
            if (allError) {
              console.error('Supabase error for all case studies query:', allError);
              throw new Error(`Failed to load case studies: ${allError.message}`);
            }
            
            const caseStudy = allCaseStudies.find(cs => generateSlug(cs.cstitle) === slug);
            
            if (!caseStudy) {
              throw new Error('Case study not found');
            }
            
            data = caseStudy;
          } else {
            data = idData;
          }
        }
        
        setCaseStudy(data);
        
        // Fetch related case studies
        if (data.cscategory) {
          const { data: related } = await supabase
            .from('case_studies')
            .select('*')
            .eq('cscategory', data.cscategory)
            .neq('id', data.id)
            .limit(3);
            
          if (related) {
            setRelatedCaseStudies(related);
          }
        }
        
      } catch (err: any) {
        console.error('Error fetching case study:', err);
        setError(err.message || 'Failed to load case study');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudyDetail();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <ReadingProgressBar />
        <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 mx-auto text-indrasol-blue animate-spin mb-4" />
            <h3 className="text-lg font-medium text-gray-600">Loading case study...</h3>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !caseStudy) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-24 min-h-screen">
          <div className="bg-gray-50 rounded-xl p-12 text-center max-w-2xl mx-auto">
            <div className="mx-auto w-24 h-24 mb-4 text-gray-300">
              <BarChart3 className="w-full h-full" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Case Study Not Found</h1>
            <p className="text-gray-600 mb-8">{error || "We couldn't find the case study you're looking for."}</p>
            <button 
              onClick={() => navigate('/Resources/case-studies')}
              className="px-6 py-3 bg-indrasol-blue text-white rounded-lg hover:bg-indrasol-blue/90 transition-colors inline-flex items-center font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Case Studies
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Extract content sections
  const processedContent = caseStudy.markdown_content || caseStudy.content || '';
  const challenge = extractSection(processedContent, 'Challenge') || 
                   extractSection(processedContent, 'The Challenge') ||
                   caseStudy.challenge || '';
                   
  const solution = extractSection(processedContent, 'Solution') || 
                  extractSection(processedContent, 'Our Solution') ||
                  caseStudy.solution || '';
                  
  const results = extractSection(processedContent, 'Results') || 
                 extractSection(processedContent, 'The Results') ||
                 caseStudy.results || '';
                 
  const quote = extractQuote(processedContent) || caseStudy.quote || '';

  const authorName = caseStudy.csAuthor || 'Indrasol Team';
  const authorRole = caseStudy.csauthor_desc || 'Case Study Team';
  const authorInitial = authorName.charAt(0).toUpperCase();
  const companyLogo = extractCompanyLogo(caseStudy);
  const keyMetrics = extractKeyMetrics(processedContent);
  const readTime = caseStudy.readTime || 
                  (caseStudy.readtime ? `${caseStudy.readtime} min read` : null) ||
                  calculateReadTime(processedContent);
  const tags = caseStudy.tags || [caseStudy.cscategory || 'Case Study'];

  return (
    <>
      <Navbar />
      <ReadingProgressBar />
      
      {/* Hero Section with Dark Background */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-indrasol-blue pt-32 pb-16 overflow-hidden mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-8 max-w-8xl mx-auto">
            <nav className="flex items-center text-sm text-gray-300">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link to="/Resources/case-studies" className="hover:text-white transition-colors">
                Case Studies
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-400 truncate max-w-xs">{caseStudy.cstitle}</span>
            </nav>
          </div>
          
          {/* Hero Content */}
          <div className="max-w-8xl mx-auto text-left">
            {/* Company Logo */}
            {companyLogo && (
              <div className="mb-8">
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="h-20 w-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
            
            {/* Category and Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="bg-indrasol-blue text-white text-sm font-medium px-4 py-2 rounded-full">
                {caseStudy.cscategory || 'Case Study'}
              </span>
              <div className="flex items-center text-gray-300 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                {format(parseISO(caseStudy.created_at), 'MMMM d, yyyy')}
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Clock className="h-4 w-4 mr-2" />
                {readTime}
              </div>
            </div>
            
            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              {caseStudy.cstitle}
            </h1>
            
            {/* Excerpt */}
            {caseStudy.excerpt && (
              <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
                {caseStudy.excerpt}
              </p>
            )}
            
            {/* Author Info - Only show if not Anonymous or default values */}
            {caseStudy.csAuthor && 
             caseStudy.csAuthor !== 'Anonymous' && 
             caseStudy.csAuthor !== 'Indrasol Team' && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-xl font-bold border border-white/30">
                  {authorInitial}
                </div>
                <div>
                  <div className="font-medium text-white text-lg">{authorName}</div>
                  <div className="text-sm text-gray-300">{authorRole}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <article className="pb-16">
        <div className="container mx-auto px-4">
          {/* Centered Main Content */}
          <div className="max-w-8xl mx-auto">
            {/* Share buttons */}
            <div className="flex items-center justify-end gap-2 mb-8 pt-8">
              <span className="text-sm text-gray-500 mr-2">Share:</span>
              <button 
                onClick={() => shareOnSocial('x')}
                className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
                aria-label="Share on X"
              >
                <svg className="h-4 w-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button 
                onClick={() => shareOnSocial('linkedin')}
                className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-blue-600" />
              </button>
              <button 
                onClick={() => shareOnSocial('copy')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Copy link"
              >
                <Share className="h-4 w-4 text-gray-700" />
              </button>
            </div>

            {/* Quote Section - Moved to top */}
            {quote && (
              <section className="bg-gradient-to-r from-indrasol-blue/5 to-purple-50 rounded-xl p-8 border-l-4 border-indrasol-blue relative overflow-hidden mb-8">
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-16 h-16 text-indrasol-blue" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Quote className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Client Testimonial</h2>
                  </div>
                  <blockquote className="text-xl font-medium mb-6 italic text-gray-800 leading-relaxed">
                    "{quote}"
                  </blockquote>
                  {authorName && authorName !== 'Anonymous' && (
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-indrasol-blue to-indrasol-blue/80 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {authorInitial}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{authorName}</div>
                        {authorRole && <div className="text-sm text-gray-600">{authorRole}</div>}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Content Sections */}
            <div className="space-y-8">
              {/* Challenge Section */}
              {challenge && (
                <section className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <Target className="w-5 h-5 text-red-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">The Challenge</h2>
                  </div>
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900">
                    <EnhancedMarkdownRenderer content={removeImagesFromContent(challenge)} disableTableOfContents={true} />
                  </div>
                </section>
              )}
              
              {/* Solution Section */}
              {solution && (
                <section className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-indrasol-blue/10 rounded-full flex items-center justify-center mr-4">
                      <Lightbulb className="w-5 h-5 text-indrasol-blue" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Solution</h2>
                  </div>
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900">
                    <EnhancedMarkdownRenderer content={removeImagesFromContent(solution)} disableTableOfContents={true} />
                  </div>
                </section>
              )}

              {/* Results Section */}
              {results && (
                <section className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">The Results</h2>
                  </div>
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900">
                    <EnhancedMarkdownRenderer content={removeImagesFromContent(results)} disableTableOfContents={true} />
                  </div>
                </section>
              )}

              {/* Key Metrics Section */}
              <KeyMetricsDisplay metrics={keyMetrics} />

              {/* Full content if individual sections not found */}
              {!challenge && !solution && !results && processedContent && (
                <section className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900">
                    <EnhancedMarkdownRenderer content={removeImagesFromContent(processedContent)} disableTableOfContents={true} />
                  </div>
                </section>
              )}


            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
                <Tag className="h-4 w-4 text-gray-500" />
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedCaseStudies.map((related) => (
                <Link
                  key={related.id}
                  to={`/Resources/case-study/${related.slug || generateSlug(related.cstitle)}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 group border border-gray-100"
                >
                  <div className="aspect-video bg-gradient-to-br from-indrasol-blue/10 to-indrasol-blue/20 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                    <div className="text-indrasol-blue/60">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs font-medium text-indrasol-blue bg-indrasol-blue/10 px-2 py-1 rounded-full">
                      {related.cscategory || 'Case Study'}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indrasol-blue transition-colors line-clamp-2">
                    {related.cstitle}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {related.excerpt || `Discover how ${related.cstitle} transformed their business with Indrasol.`}
                  </p>
                  <div className="text-indrasol-blue text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    Read Case Study
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced CTA Section */}
      <section className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue/90 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse" />
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of companies that trust Indrasol Solutions to drive innovation, 
              reduce costs, and accelerate their digital transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-indrasol-blue rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all duration-300 font-semibold backdrop-blur-sm"
              >
                <Users className="mr-2 h-5 w-5" />
                Talk to Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <BackToTop />
    </>
  );
};

export default CaseStudyDetailPage; 
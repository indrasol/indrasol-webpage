import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";
import { ArrowRight, TrendingUp, Users, Zap, Shield, Building, BarChart3, Database, Activity, Lock, Loader2, Search, Filter, ChevronDown, Tag, Calendar, Clock, Grid3X3, List, Eye, X, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/supabase";
import { format, parseISO, subDays, isAfter } from "date-fns";

// Database case study record type (reflecting actual Supabase schema)
interface CaseStudyRecord {
  id: string;
  cstitle: string;              // lowercase in database
  content: string;
  markdown_content?: string;
  excerpt?: string;
  coverImage?: string;
  cscategory?: string;          // lowercase in database
  csAuthor?: string;            // camelCase in database
  csauthor_desc?: string;       // lowercase in database
  csauthor_profile_url?: string; // lowercase in database
  created_at: string;
  readTime?: string;
  readtime?: number;            // integer in database
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
  image_count?: number;
  meta_description?: string;
  stats?: any;
  published?: boolean;
  published_at?: string;
  checksum?: string;
  status?: string;
}

// Types for case studies
interface CaseStudy {
  id: string;
  csTitle: string;
  content: string;
  markdown_content?: string;
  excerpt?: string;
  description?: string;
  coverImage?: string;
  csCategory: string;
  csAuthor: string;
  csAuthor_desc?: string;
  csAuthor_profile_url?: string;
  publishDate: string;
  createdAt: string;
  readTime?: string;
  slug?: string;
  created_at: string;
  // Legacy fields for compatibility with modal
  company?: string;
  industry?: string;
  category?: string;
  title?: string;
  summary?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  quote?: string;
  author?: string;
  role?: string;
  metrics?: {
    growth: string;
    savings: string;
    users: string;
  };
  tags?: string[];
  image?: string;
}

// Search filters interface
interface SearchFilters {
  searchTerm: string;
  selectedTags: string[];
  dateRange: string;
  readTimeRange: string;
}

// Utility functions
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long',
    day: 'numeric' 
  });
};

const getMonthYear = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long'
  });
};

const calculateReadTime = (content: string): string => {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const extractCoverImage = (caseStudy: any): string => {
  const title = caseStudy.csTitle || caseStudy.cstitle || 'Case Study';
  const defaultImage = `/api/placeholder/800/400?text=${encodeURIComponent(title)}`;
  
  if (caseStudy.coverImage) return caseStudy.coverImage;
  
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
  
  return defaultImage;
};

const generateExcerpt = (title: string): string => {
  return `Discover how ${title} transformed their business with Indrasol Solutions.`;
};

// Search and filter component matching whitepaper design
const SearchAndFilters: React.FC<{
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  availableTags: string[];
}> = ({ filters, setFilters, availableTags }) => {
  const [showFilters, setShowFilters] = useState(false);

  const clearAllFilters = () => {
    setFilters({
      searchTerm: "",
      selectedTags: [],
      dateRange: "all",
      readTimeRange: "all"
    });
  };

  const handleTagToggle = (tag: string) => {
    if (filters.selectedTags.includes(tag)) {
      setFilters({ ...filters, selectedTags: filters.selectedTags.filter((t) => t !== tag) });
    } else {
      setFilters({ ...filters, selectedTags: [...filters.selectedTags, tag] });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFilters({ ...filters, selectedTags: filters.selectedTags.filter(tag => tag !== tagToRemove) });
  };

  const hasActiveFilters = filters.selectedTags.length > 0 || filters.dateRange !== "all" || filters.readTimeRange !== "all";

  return (
    <div className="mb-12">
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search case studies by title, company, or industry..."
          value={filters.searchTerm}
          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-indrasol-blue focus:outline-none focus:ring-2 focus:ring-indrasol-blue/20 transition-all duration-300"
        />
        {filters.searchTerm && (
          <button
            onClick={() => setFilters({ ...filters, searchTerm: "" })}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Active Tags Display */}
      {filters.selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center bg-indrasol-blue/10 text-indrasol-blue px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 hover:text-indrasol-blue/70 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Filter Toggle */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
            showFilters || hasActiveFilters
              ? "border-indrasol-blue bg-indrasol-blue/5 text-indrasol-blue"
              : "border-gray-200 hover:border-gray-300 text-gray-600"
          }`}
        >
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="bg-indrasol-blue text-white text-xs px-2 py-0.5 rounded-full">
              {filters.selectedTags.length + (filters.dateRange !== "all" ? 1 : 0) + (filters.readTimeRange !== "all" ? 1 : 0)}
            </span>
          )}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Filters Panel */}
      <div className={`overflow-hidden transition-all duration-500 ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-gray-50 rounded-xl p-6 space-y-6 border border-gray-200">
          {/* Tags Filter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.selectedTags.includes(tag)
                      ? "bg-indrasol-blue text-white shadow-md transform scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Published
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { value: "all", label: "All time" },
                { value: "7", label: "Last 7 days" },
                { value: "30", label: "Last 30 days" },
                { value: "90", label: "Last 3 months" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilters({ ...filters, dateRange: option.value })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filters.dateRange === option.value
                      ? "bg-indrasol-blue text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



// Regular Case Study Card Component
const CaseStudyCard: React.FC<{ caseStudy: CaseStudy; onClick: () => void }> = ({ caseStudy, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Eye className="h-5 w-5 text-indrasol-blue" />
          </div>
        </div>
        <img
          src={caseStudy.coverImage || `/api/placeholder/600/300?text=${encodeURIComponent(caseStudy.csTitle)}`}
          alt={caseStudy.csTitle}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `/api/placeholder/600/300?text=${encodeURIComponent(caseStudy.csTitle)}`;
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-indrasol-blue text-white px-3 py-1 rounded-full text-xs font-medium">
            {caseStudy.csCategory}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{caseStudy.publishDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{caseStudy.readTime}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indrasol-blue transition-colors">
          {caseStudy.csTitle}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {caseStudy.excerpt}
        </p>
        
        {caseStudy.csAuthor && caseStudy.csAuthor !== 'Anonymous' && (
          <div className="flex items-center gap-3 mt-auto">
            <div className="w-8 h-8 bg-gradient-to-br from-indrasol-blue to-indrasol-darkblue rounded-full flex items-center justify-center text-white text-sm font-medium">
              {caseStudy.csAuthor.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{caseStudy.csAuthor}</p>
              <p className="text-xs text-gray-500">{caseStudy.csAuthor_desc || 'Case Study Author'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// List view case study card
const CaseStudyListCard: React.FC<{ caseStudy: CaseStudy; onClick: () => void }> = ({ caseStudy, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex gap-6">
        {/* Thumbnail */}
        <div className="hidden md:block flex-shrink-0">
          <div className="relative w-48 h-32 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <Eye className="h-4 w-4 text-indrasol-blue" />
              </div>
            </div>
            <img
              src={caseStudy.coverImage || `/api/placeholder/600/300?text=${encodeURIComponent(caseStudy.csTitle)}`}
              alt={caseStudy.csTitle}
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `/api/placeholder/600/300?text=${encodeURIComponent(caseStudy.csTitle)}`;
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="bg-indrasol-blue text-white px-3 py-1 rounded-full text-xs font-medium">
              {caseStudy.csCategory}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{caseStudy.publishDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{caseStudy.readTime}</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indrasol-blue transition-colors">
            {caseStudy.csTitle}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {caseStudy.excerpt}
          </p>
          
          {caseStudy.csAuthor && caseStudy.csAuthor !== 'Anonymous' && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indrasol-blue to-indrasol-darkblue rounded-full flex items-center justify-center text-white text-sm font-medium">
                {caseStudy.csAuthor.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{caseStudy.csAuthor}</p>
                <p className="text-xs text-gray-500">{caseStudy.csAuthor_desc || 'Case Study Author'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// View Toggle Component
const ViewToggle: React.FC<{
  viewMode: "gallery" | "list";
  setViewMode: (mode: "gallery" | "list") => void;
}> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setViewMode("gallery")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          viewMode === "gallery"
            ? "bg-white text-indrasol-blue shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <Grid3X3 className="h-4 w-4" />
        Gallery
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          viewMode === "list"
            ? "bg-white text-indrasol-blue shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <List className="h-4 w-4" />
        List
      </button>
    </div>
  );
};

// Category Filter Component
const CategoryFilter: React.FC<{
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  availableCategories: string[];
}> = ({ activeCategory, setActiveCategory, availableCategories }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setActiveCategory("All")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeCategory === "All"
            ? "bg-indrasol-blue text-white"
            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
        }`}
      >
        All
      </button>
      {availableCategories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category
              ? "bg-indrasol-blue text-white"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Empty State Component
const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center py-16">
    <div className="mx-auto w-24 h-24 mb-4 text-gray-300">
      <BarChart3 className="w-full h-full" />
    </div>
    <h3 className="text-lg font-medium text-gray-600">{message}</h3>
    <p className="mt-2 text-gray-500">Check back soon for new success stories!</p>
  </div>
);

// Loading State Component
const LoadingState: React.FC = () => (
  <div className="text-center py-16">
    <Loader2 className="h-12 w-12 mx-auto text-indrasol-blue animate-spin mb-4" />
    <h3 className="text-lg font-medium text-gray-600">Loading case studies...</h3>
  </div>
);

// Main component
const CaseStudies = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"gallery" | "list">("gallery");
  const [activeCategory, setActiveCategory] = useState("All");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    selectedTags: [],
    dateRange: "all",
    readTimeRange: "all"
  });

  const openModal = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCaseStudy(null);
  };

  // Fetch case studies from Supabase
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          const transformedCaseStudies: CaseStudy[] = data.map((item: any, index: number) => {
            let formattedDate;
            try {
              formattedDate = getMonthYear(item.created_at);
            } catch (e) {
              formattedDate = 'Unknown date';
            }
            
            // Handle both string readTime and integer readtime fields
            const readTime = item.readTime || 
                            (item.readtime ? `${item.readtime} min read` : null) ||
                            calculateReadTime(item.content || '');
            const coverImage = extractCoverImage(item);
            
            // Handle both old and new field names for compatibility
            const title = item.csTitle || item.cstitle;
            const author = item.csAuthor || 'Anonymous';
            const category = item.csCategory || item.cscategory || 'General';
            const authorDesc = item.csAuthor_desc || item.csauthor_desc || '';
            const authorProfileUrl = item.csAuthor_profile_url || item.csauthor_profile_url || '';
            
            return {
              id: item.id,
              csTitle: title,
              content: item.content || '',
              markdown_content: item.markdown_content,
              excerpt: item.excerpt || generateExcerpt(title),
              description: item.excerpt || generateExcerpt(title),
              coverImage,
              csCategory: category,
              csAuthor: author,
              csAuthor_desc: authorDesc,
              csAuthor_profile_url: authorProfileUrl,
              publishDate: formattedDate,
              createdAt: item.created_at,
              readTime,
              slug: item.slug || generateSlug(title),
              created_at: item.created_at,
              // Legacy compatibility fields for modal
              company: title,
              industry: category,
              category: category,
              title: title,
              summary: item.excerpt || generateExcerpt(title),
              challenge: item.challenge || 'Details available in the full case study.',
              solution: item.solution || 'Our comprehensive solution approach.',
              results: item.results || 'Significant improvements achieved.',
              quote: item.quote || 'Great results achieved with Indrasol solutions.',
              author: author,
              role: authorDesc || 'Team Lead',
              metrics: {
                growth: '100%',
                savings: '50%',
                users: '1000+'
              },
              tags: item.tags || [category],
              image: coverImage
            };
          });
          
          setCaseStudies(transformedCaseStudies);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.map((item: any) => item.csCategory || item.cscategory || 'General'))];
          setAvailableCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching case studies:', error);
        setError('Failed to load case studies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCaseStudies();
  }, []);

  // Filter case studies
  const filteredAndSortedCaseStudies = React.useMemo(() => {
    let result = caseStudies.filter((caseStudy) => {
      // Category filter
      if (activeCategory !== "All" && caseStudy.csCategory !== activeCategory) {
        return false;
      }
      
      // Search filter
      if (filters.searchTerm) {
        const query = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          caseStudy.csTitle.toLowerCase().includes(query) ||
          caseStudy.excerpt?.toLowerCase().includes(query) ||
          caseStudy.csAuthor.toLowerCase().includes(query) ||
          caseStudy.csCategory.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }
      
      // Tag filter
      if (filters.selectedTags.length > 0 && !filters.selectedTags.includes(caseStudy.csCategory)) {
        return false;
      }
      
      // Date filter
      if (filters.dateRange !== "all") {
        const daysAgo = parseInt(filters.dateRange);
        const filterDate = subDays(new Date(), daysAgo);
        const caseStudyDate = parseISO(caseStudy.createdAt);
        
        if (!isAfter(caseStudyDate, filterDate)) {
          return false;
        }
      }
      
      return true;
    });
    
    // Sort by newest first
    return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [caseStudies, activeCategory, filters]);

  // All case studies are treated equally
  const allCaseStudies = filteredAndSortedCaseStudies;

  return (
    <>
      <Navbar />
      <section className="pt-40 pb-16 bg-gradient-to-b from-white via-indrasol-blue/5 to-white">
        <div className="container mx-auto px-4">
          {/* Section header matching whitepaper design */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block bg-indrasol-blue/10 px-4 py-1 rounded-full mb-4">
              <span className="text-indrasol-blue font-semibold text-sm">
                Success Stories
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest from the{" "}
              <span className="bg-gradient-to-r from-indrasol-blue to-indrasol-blue bg-clip-text text-transparent">Indrasol Case Studies</span>
            </h2>
            <p className="text-lg text-gray-600">
              Discover how leading organizations achieve extraordinary growth, 
              reduce costs, and accelerate their digital transformation with our solutions.
            </p>
          </div>

          {/* Search and filter */}
          <SearchAndFilters 
            filters={filters}
            setFilters={setFilters}
            availableTags={availableCategories}
          />

          {/* Loading state */}
          {loading ? (
            <LoadingState />
          ) : error ? (
            <EmptyState message={error} />
          ) : caseStudies.length === 0 ? (
            <EmptyState message="No case studies found" />
          ) : (
            <>
              {/* Results counter */}
              {(filters.searchTerm || filters.selectedTags.length > 0 || 
                filters.dateRange !== "all" || filters.readTimeRange !== "all") && (
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-indrasol-blue/5 to-purple-500/5 backdrop-blur-sm border border-indrasol-blue/10 rounded-xl px-6 py-4">
                    <p className="text-gray-700">
                      <span className="font-semibold text-indrasol-blue">{filteredAndSortedCaseStudies.length}</span>
                      {filteredAndSortedCaseStudies.length === 1 ? ' case study' : ' case studies'} found
                      {filters.searchTerm && (
                        <span> for "<span className="font-medium">{filters.searchTerm}</span>"</span>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Category filter and View Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                {/* Category Filter */}
                {availableCategories.length > 0 && (
                  <CategoryFilter
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    availableCategories={availableCategories}
                  />
                )}
                
                {/* View Toggle */}
                <div className="flex items-center gap-2">
                  <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                </div>
              </div>

              {/* Case Studies content */}
              {allCaseStudies.length === 0 ? (
                <EmptyState message="No case studies match your search criteria. Try adjusting your filters." />
              ) : (
                <>
                  {/* Gallery View */}
                  {viewMode === "gallery" ? (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">All Case Studies</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {allCaseStudies.map((caseStudy, index) => (
                          <div
                            key={caseStudy.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <CaseStudyCard 
                              caseStudy={caseStudy} 
                              onClick={() => openModal(caseStudy)} 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* List View */
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          All Case Studies ({allCaseStudies.length})
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {allCaseStudies.map((caseStudy, index) => (
                          <div
                            key={caseStudy.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <CaseStudyListCard 
                              caseStudy={caseStudy} 
                              onClick={() => openModal(caseStudy)} 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Custom CTA matching whitepaper design */}
          <div className="mt-16 bg-indrasol-blue rounded-xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  Ready to achieve similar results?
                </h3>
                <p className="text-white/90">
                  Join thousands of companies that trust Indrasol Solutions to transform their business and drive unprecedented growth.
                </p>
              </div>
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-white text-indrasol-blue rounded-lg hover:bg-gray-100 transition-colors font-medium flex-1 text-center"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      
      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        caseStudyId={selectedCaseStudy}
      />
    </>
  );
};

export default CaseStudies; 
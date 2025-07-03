import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ArrowRight, Target, CheckCircle, Quote, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from '@/supabase';
import { EnhancedMarkdownRenderer } from '@/components/EnhancedMarkdownRenderer';

// Updated interface to match database structure
interface CaseStudyRecord {
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

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudyId: string | null;
}

export function CaseStudyModal({ isOpen, onClose, caseStudyId }: CaseStudyModalProps) {
  const [caseStudy, setCaseStudy] = useState<CaseStudyRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !caseStudyId) {
      setCaseStudy(null);
      setLoading(true);
      setError(null);
      return;
    }

    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('case_studies')
          .select('*')
          .eq('id', caseStudyId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (!data) {
          throw new Error('Case study not found');
        }

        setCaseStudy(data);

      } catch (err: any) {
        console.error('Error fetching case study:', err);
        setError(err.message || 'Failed to load case study');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [isOpen, caseStudyId]);

  if (!isOpen) return null;

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-indrasol-blue mx-auto mb-4" />
              <p className="text-gray-600">Loading case study...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !caseStudy) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <X className="h-8 w-8 mx-auto" />
              </div>
              <p className="text-gray-600">{error || 'Case study not found'}</p>
              <Button onClick={onClose} variant="outline" className="mt-4">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Extract author details
  const authorName = caseStudy.csAuthor || 'Anonymous';
  const authorRole = caseStudy.csauthor_desc || '';
  const authorInitial = authorName.charAt(0).toUpperCase();

  // Extract content from processed markdown or content field
  const processedContent = caseStudy.markdown_content || caseStudy.content || '';
  
  // Parse sections from the processed content
  const extractSection = (content: string, sectionName: string): string => {
    const regex = new RegExp(`## ${sectionName}[\\s\\S]*?(?=## |$)`, 'i');
    const match = content.match(regex);
    if (match) {
      return match[0].replace(`## ${sectionName}`, '').trim();
    }
    return '';
  };

  // Extract quote from content (look for blockquotes or specific patterns)
  const extractQuote = (content: string): string => {
    // Look for blockquotes
    const blockquoteMatch = content.match(/> "([^"]+)"/);
    if (blockquoteMatch) return blockquoteMatch[1];
    
    // Look for quotes in quotes section
    const quoteMatch = content.match(/## Quote[\\s\\S]*?"([^"]+)"/i);
    if (quoteMatch) return quoteMatch[1];
    
    // Look for any quoted text
    const anyQuoteMatch = content.match(/"([^"]{20,})"/);
    if (anyQuoteMatch) return anyQuoteMatch[1];
    
    return caseStudy.quote || '';
  };

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
  
  // Extract tags from various sources
  const tags = caseStudy.tags || [caseStudy.cscategory || 'Case Study'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-8 pt-6">
          {/* Title Section */}
          <div className="text-center border-b border-gray-200 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {caseStudy.cstitle}
            </h1>
          </div>

          {/* Challenge Section */}
          {challenge && (
            <div>
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-red-500 mr-2" />
                <h3 className="text-2xl font-bold">The Challenge</h3>
              </div>
              <div className="text-gray-600 leading-relaxed">
                <EnhancedMarkdownRenderer content={challenge} disableTableOfContents={true} />
              </div>
            </div>
          )}
          
          {/* Solution Section */}
          {solution && (
            <div>
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-indrasol-blue mr-2" />
                <h3 className="text-2xl font-bold">Our Solution</h3>
              </div>
              <div className="text-gray-600 leading-relaxed">
                <EnhancedMarkdownRenderer content={solution} disableTableOfContents={true} />
              </div>
            </div>
          )}

          {/* Full Content Section - if individual sections not found */}
          {!challenge && !solution && !results && processedContent && (
            <div>
              <div className="prose prose-lg max-w-none">
                <EnhancedMarkdownRenderer content={processedContent} disableTableOfContents={true} />
              </div>
            </div>
          )}
          
          {/* Results Section */}
          {results && (
            <div>
              <h3 className="text-2xl font-bold mb-4">The Results</h3>
              <div className="text-gray-600 leading-relaxed mb-6">
                <EnhancedMarkdownRenderer content={results} disableTableOfContents={true} />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-indrasol-blue text-indrasol-blue">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Quote Section */}
          {quote && (
            <div className="bg-indrasol-blue/10 rounded-lg p-6 border-l-4 border-indrasol-blue">
              <Quote className="w-8 h-8 text-indrasol-blue mb-4" />
              <blockquote className="text-lg font-medium mb-4 italic">
                "{quote}"
              </blockquote>
              {authorName && authorName !== 'Anonymous' && (
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-indrasol-blue to-indrasol-darkblue rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {authorInitial}
                  </div>
                  <div>
                    <div className="font-semibold">{authorName}</div>
                    {authorRole && <div className="text-sm text-gray-600">{authorRole}</div>}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-indrasol-blue/10 to-indrasol-darkblue/10 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to achieve similar results?</h3>
            <p className="text-gray-600 mb-6">Join thousands of companies that trust Indrasol Solutions to transform their business.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-indrasol-blue hover:bg-indrasol-darkblue">
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-indrasol-blue text-indrasol-blue hover:bg-indrasol-blue hover:text-white">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
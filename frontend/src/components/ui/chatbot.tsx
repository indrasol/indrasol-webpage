import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Mic } from "lucide-react";
import { chatService } from "../../services/chatService";
import { bootstrapChat } from "../../services/chatService";
import { Message as BaseMessage } from "../../types/chat";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ContactFormOverlay } from "./contactFormOverlay";
import { CallFormOverlay } from "./callFormOverlay";
import { SpeechOverlay, type SpeechRecognition, type SpeechRecognitionEvent, type SpeechRecognitionErrorEvent } from "./speechOverlay";
import QuickActionButtons from "./QuickActionButtons";

import { conversationService } from "../../services/conversationService";
import { API_ENDPOINTS } from "@/config";

// Extend Message type to include optional originalText and isTyping
type Message = BaseMessage & {
  originalText?: string;
  isTyping?: boolean;
  processedText?: string;
  action?: string;
  intent?: string;
};



// Utility function to detect and convert email addresses to mailto links
const convertEmailsToLinks = (text: string): string => {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  return text.replace(emailRegex, (email) => {
    return `[${email}](mailto:${email})`;
  });
};

// Utility function to process URLs in markdown
const convertUrlsToMarkdown = (text: string): string => {
  const urlRegex = /(https?:\/\/[^\s()]+?)(?=[.,;:!?]?(?:\s|$))/g;
  return text.replace(urlRegex, (url) => {
    let displayText = '';
    if (url.endsWith('.com')) {
      const parts = url.split('.');
      displayText = parts[parts.length - 2].split('/').pop() || 'link';
    } else {
      const parts = url.split('/');
      displayText = parts[parts.length - 1] || 'link';
    }
    return `[${displayText}](${url})`;
  });
};

const emphasizeKeywords = (text: string): string => {
  const keywords = ["SecureTrack", "BizRadar", "AI Security", "Cloud Engineering", 
                    "Application Security", "Data Engineering"];
  return keywords.reduce(
    (acc, kw) => acc.replace(new RegExp(`\\b${kw}\\b`, "gi"), `**${kw}**`),
    text
  );
};

const commaListToBullets = (text: string): string => {
  // converts lines like "We offer A, B, C, and D." into bullet list
  return text.replace(
    /(?:^|[\n\r])([^*\n\r].*?:)([^*\n\r]+, .+?)\.(?:[\n\r]|$)/g,
    (_, intro, list) => {
      const items = list.split(/\s*,\s*/).map(s => `- ${s.trim()}`);
      return `\n\n${intro}\n${items.join("\n")}\n`;
    }
  );
};


// Process text to convert both emails and URLs to markdown format
const processTextToMarkdown = (text: string): string => {
  let processedText = text;
  processedText = convertEmailsToLinks(processedText);
  processedText = convertUrlsToMarkdown(processedText);
  // processedText = emphasizeKeywords(processedText);
  // processedText = commaListToBullets(processedText);
  return processedText;
};

// ───── TypeWriter component (animated + static in one) ──────────
type TWProps = {
  text: string;
  delay?: number;
  isAnimating?: boolean;
  onComplete: () => void;
};

const TypeWriter: React.FC<TWProps> = ({
  text,
  delay = 15,
  isAnimating = true,
  onComplete
}) => {
  const [display, setDisplay] = useState(isAnimating ? "" : text);
  const [idx, setIdx] = useState(0);

  /* typing loop only when animation is ON */
  useEffect(() => {
    if (!isAnimating) return;           // skip when already static
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplay((p) => p + text[idx]);
        setIdx(idx + 1);
      }, delay);
      return () => clearTimeout(t);
    }
    onComplete();
  }, [idx, isAnimating, text, delay]);

    return (
    <div className="indrasol-markdown">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indrasol-blue font-semibold underline hover:opacity-80 transition-opacity" />
          ),
          strong: ({ node, ...props }) => (
            <strong {...props} className="text-indrasol-blue font-bold" />
          )
        }}
      >
        {display}
      </ReactMarkdown>
    </div>
  );
};

// Helper function to convert URLs into hyperlinks (fixed regex to exclude punctuation)
const convertLinksToHyperlinks = (text: string): string => {
  // Updated regex to exclude trailing punctuation marks
  return text.replace(/(https?:\/\/[^\s()]+?)(?=[.,;:!?]?(?:\s|$))/g, (url) => {
    let displayText = '';
    if (url.endsWith('.com')) {
      const parts = url.split('.');
      displayText = parts[parts.length - 2].split('/').pop() || 'link';
    } else {
      const parts = url.split('/');
      displayText = parts[parts.length - 1] || 'link';
    }
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">${displayText}</a>`;
  });
};

// Predefined suggestions for real-time filtering
const TYPING_SUGGESTIONS = [
  "What products and services do you offer?",
  "Where are your global locations?",
  "Tell me about your AI and security solutions",
  "What is SecureTrack?",
  "What is BizRadar?",
  "How can I contact your sales team?",
  "What industries do you serve?",
  "Tell me about your cloud engineering services",
  "What are your data engineering capabilities?",
  "Do you have case studies?",
  "What whitepapers do you have available?",
  "Show me your latest blogs",
  "What blog posts do you have?",
  "Tell me about your whitepapers",
  "Do you have any case studies I can review?",
  "What research papers are available?",
  "Show me your thought leadership content",
  "What resources do you have for learning?",
  "Tell me about your company history",
  "What makes Indrasol different?",
  "How do I get started with your services?",
  "What is your pricing model?"
];

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasReopened, setHasReopened] = useState(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [chatHeight, setChatHeight] = useState<number>(450);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [emailSending, setEmailSending] = useState<boolean>(false);
  const [emailStage, setEmailStage] = useState<number>(0); // 0: collecting, 1: formatting, 2: sending, 3: sent

  // Voice Recognition State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [showSpeechOverlay, setShowSpeechOverlay] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(false);

  const [showContactForm, setShowContactForm] = useState(false);
  const [showCallForm, setShowCallForm] = useState(false);
  const [quickActionPending, setQuickActionPending] = useState(false);

  const [engagementTriggered, setEngagementTriggered] = useState(false);
  const [welcomeBackShown, setWelcomeBackShown] = useState(false);
  // Ensure privacy consent prompt appears when chat opens
  useEffect(() => {
    if (isOpen) {
      // Kick-off privacy bootstrap (shows consent modal if needed)
      bootstrapChat().catch((err) => console.error('Privacy bootstrap error', err));
    }
  }, [isOpen]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptSegment = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcriptSegment;
          } else {
            interimTranscript += transcriptSegment;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setIsListening(false);
        setSpeechError(event.error);
      };

      setSpeechRecognition(recognition);
    } else {
      setIsSpeechSupported(false);
    }
  }, []);


  

  // Voice Recognition Functions
  const startListening = () => {
    if (speechRecognition && isSpeechSupported) {
      setTranscript("");
      setSpeechError(null);
      setShowSpeechOverlay(true);
      speechRecognition.start();
    }
  };

  const stopListening = () => {
    if (speechRecognition) {
      speechRecognition.stop();
    }
  };

  const closeSpeechOverlay = () => {
    stopListening();
    setShowSpeechOverlay(false);
    setTranscript("");
    setSpeechError(null);
  };

  const handleVoiceInput = async (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    
    const userRow: Message = { id: Date.now(), text: clean, sender: "user" };
    const optimistic = [...messages, userRow];
    setMessages(optimistic);
    setNewMessage("");
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setWaiting(true);
    await handleSend(clean, optimistic);
  };

  /**
   * Fire a follow-up message ("Demo" | "Call") silently
   */
  const sendFollowUp = useCallback(
    async (text: string) => {
      try {
        await chatService.sendMessage(text, messages);      // no optimistic push
      } catch (e) {
        console.error("follow-up failed", e);
      }
    },
    [messages]
  );

  // Reset chat when closed and reopened
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setNewMessage("");
      setIsTyping(false);
      setEmailSending(false);
      setEmailStage(0);
      closeSpeechOverlay();
      setEngagementTriggered(false); // Reset so engagement can trigger again on next open
    }
  }, [isOpen]);

  const toggleChat = (): void => {
    setIsOpen(!isOpen);
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Dynamically adjust chat window height
  useEffect(() => {
    if (isOpen && chatContentRef.current) {
      const updateHeight = () => {
        const contentHeight = chatContentRef.current?.scrollHeight || 0;
        
        // Different min heights based on whether we're showing initial suggestions
        const isShowingInitialSuggestions = messages.length === 0 && !waiting;
        
        if (isShowingInitialSuggestions) {
          // Calculate height needed for initial suggestions
          // Header (80px) + Welcome content (250px) + 3 suggestions (240px) + Input (80px) + padding (80px)
          const suggestionsHeight = 730;
          const maxHeight = window.innerHeight * 0.9; // Increased max height
          setChatHeight(Math.min(suggestionsHeight, maxHeight));
        } else {
          // Normal dynamic height for conversations
          const minHeight = 450;
          const maxHeight = window.innerHeight * 0.85;
          const newHeight = Math.min(Math.max(contentHeight + 120, minHeight), maxHeight);
          setChatHeight(newHeight);
        }
      };
      
      // Small delay to ensure content is rendered
      setTimeout(updateHeight, 100);
      
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [isOpen, messages, waiting]);

  /* ─── helper: flip one message out of "typing" mode ─── */
  const handleTypeDone = (id: number) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, isTyping: false } : m));
      
                // Check if this message should trigger contact form after typing is done
          const message = updated.find(m => m.id === id);
          if (message?.action === "contact_form") {
            // Wait 3 seconds after typing is complete for user to read the message
            setTimeout(() => {
              // Double-check that the bot response is fully typed before showing form
              setMessages((currentMessages) => {
                const contactFormMessage = currentMessages.find(m => m.id === id && m.action === "contact_form");
                
                // Only show contact form if message exists and is NOT typing
                if (contactFormMessage && !contactFormMessage.isTyping) {
                  if (contactFormMessage.intent === "Call Booking") {
                    setShowCallForm(true);
                  } else {
                    setShowContactForm(true);
                  }
                }
                
                return currentMessages; // No change to messages, just checking state
              });
            }, 2000);
          }
      
      return updated;
    });
  };

     /* ───────────── send helpers (timer removed) ────────── */

  const handleSend = async (text: string, optimistic: Message[]) => {
    try {
      const { botReply } = await chatService.sendMessage(text, optimistic);

      if (botReply.action === "choose_contact_method") {
        setQuickActionPending(true);
        setWaiting(false);
        return;                          // no bot bubble added
      }

      /** Branch B – normal bot message */
      const botMessage: Message = { ...botReply, isTyping: true };
      setMessages((prev) => [...prev, botMessage]);
      setWaiting(false);

      /** Branch C – back-end sent a direct CTA form */
      if (botReply.action === "contact_form") {
        // decide overlay by intent
        if (botReply.intent === "Call Booking") {
          setShowCallForm(true);
        } else {
          setShowContactForm(true);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setWaiting(false);
      // Add error message
      const errorMessage: Message = {
        id: Date.now(),
        text: 'Sorry! Something went wrong. Please try again.',
        sender: 'bot'
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  /* ───────────── onSubmit / onSuggestion ─────────────── */
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newMessage.trim();
    if (!clean) return;
    const userRow: Message = { id: Date.now(), text: clean, sender: "user" };
    const optimistic = [...messages, userRow];
    setMessages(optimistic);
    setNewMessage("");
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setWaiting(true);
    await handleSend(clean, optimistic);
  };

  const handleSuggestion = async (s: string) => {
    const userRow: Message = { id: Date.now(), text: s, sender: "user" };
    const optimistic = [...messages, userRow];
    setMessages(optimistic);
    setNewMessage("");
    setShowSuggestions(false);
    setWaiting(true);
    await handleSend(s, optimistic);
  };

  // Handle input change with real-time suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMessage(value);
    
    if (value.trim().length > 1) {
      const filtered = TYPING_SUGGESTIONS.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Show max 5 suggestions
      
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  };
  // Place this above your return statement in the ChatBot component:
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
  if (isOpen) {
    (async () => {
      const { userId: uid } = await chatService.bootstrapChat();
      setUserId(uid);

      const isNewUser =
        !localStorage.getItem("indra_is_new_user") ||
        localStorage.getItem("indra_is_new_user") === "true";

      if (isNewUser) {
        console.log("🆕 New user detected");
        localStorage.setItem("indra_is_new_user", "false");
      } else {
        console.log("🔁 Returning user detected");
      }

      // Get chat history
      const historyMessages = await conversationService.getHistory(uid);
      console.log("Fetched conversation history:", historyMessages);

      const returningPhrases = [
        "welcome back",
        "hello again",
        "good to see you again",
        "nice to have you back",
        "returned to see you",
        "great to see you again",
        "how can i assist you today",
      ];

      const lastMessage = historyMessages[historyMessages.length - 1];
      const isWelcomeMessage =
        lastMessage?.sender === "bot" &&
        returningPhrases.some((phrase) =>
          lastMessage.text?.toLowerCase().includes(phrase)
        );

      if (historyMessages.length > 0) {
        const taggedHistory = historyMessages.map((msg, index) => ({
          ...msg,
          isHistory: true,
          isTyping:
            isWelcomeMessage && index === historyMessages.length - 1,
        }));
        setMessages(taggedHistory);
      }

      const alreadyWelcomed =
        lastMessage?.sender === "bot" &&
        returningPhrases.some((phrase) =>
          lastMessage.text?.toLowerCase().includes(phrase)
        );

      if (!isNewUser && !engagementTriggered && !alreadyWelcomed) {
        console.log("💬 Sending _welcome_back_ message for returning user");

        const response = await chatService.sendMessage("", historyMessages, true);

        if (response && response.botReply) {
          const botMsg = { ...response.botReply, isTyping: true };
          setMessages((prev) => [...prev, botMsg]);
        }

        setEngagementTriggered(true);
      }
    })();
  } else {
    setEngagementTriggered(false);
  }
}, [isOpen]);






  return (
    <>
      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300" />
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 sm:left-auto sm:right-6 transform -translate-x-1/2 sm:translate-x-0 flex flex-col sm:flex-row items-end gap-0 sm:gap-6 z-50">
            {/* Chat Window */}
            <div
              className="w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[65vw] xl:w-[55vw] max-w-4xl bg-white/95 backdrop-blur-md border border-blue-100 shadow-2xl rounded-3xl flex flex-col overflow-hidden transition-all duration-500 ease-in-out blue-chat-window animate-scaleUp relative"
              style={{ height: `${chatHeight}px` }}
            >
              {/* Speech Overlay */}
              {showSpeechOverlay && (
                <SpeechOverlay
                  isListening={isListening}
                  transcript={transcript}
                  isSupported={isSpeechSupported}
                  error={speechError}
                  onClose={closeSpeechOverlay}
                  onSend={handleVoiceInput}
                />
              )}



              {showCallForm && (
                <CallFormOverlay
                  onClose={() => setShowCallForm(false)}
                  onSuccess={() => {
                    setMessages((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        text: "Great! Your call is scheduled – our expert will ring you at the chosen time.",
                        sender: "bot"
                      }
                    ]);
                  }}
                />
              )}

              {showContactForm && (
                <ContactFormOverlay
                  onClose={() => setShowContactForm(false)}
                  onSubmitStart={() => {
                    setEmailSending(true);
                    setEmailStage(1);
                    setTimeout(() => setEmailStage(2), 1000);
                    setTimeout(() => setEmailStage(3), 2500);
                  }}
                  onSuccess={() => {
                    // Wait for email animation to complete before showing success message
                    setTimeout(() => {
                      setEmailSending(false);
                      setEmailStage(0);
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          text: "Perfect! I've logged your request – you'll receive a confirmation e-mail with more details. Our team is excited to connect!",
                          sender: "bot"
                        }
                      ]);
                    }, 3500); // Wait for email animation to complete (3.5 seconds total)
                  }}
                />
              )}

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-5 text-white flex items-center justify-between rounded-t-3xl shadow-md border-b border-blue-200">
                <div className="flex items-center">
                  <img
                    src="/lovable-uploads/indrabot-mascot.png"
                    alt="IndraBot"
                    className="w-8 h-8 mr-0 drop-shadow-sm"
                  />
                  <div className="ml-2">
                    <h3 className="font-bold text-lg flex items-center">
                      IndraBot 
                      <span className="ml-2 hidden sm:flex items-center">
                        <span className="w-2.5 h-2.5 bg-green-400 rounded-full inline-block mr-1.5"></span>
                        <span className="text-sm font-normal">| Ready to assist you</span>
                      </span>
                    </h3>
                    {/* Online indicator text stays for desktop; mobile indicator simplified */}
                  </div>
                </div>
                {/* Close button visible only on mobile */}
                <button
                  className="sm:hidden text-white hover:text-gray-200 focus:outline-none"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="w-6 h-6 stroke-2" />
                </button>
              </div>
              
              {/* Messages */}
              <div 
                ref={chatContentRef}
                className="flex-1 p-5 overflow-y-auto custom-scrollbar bg-gray-50/95"
              >
                <div className="space-y-4 pb-2 relative">
                  {messages.length === 0 && !isTyping && (
                    <div className="flex flex-col items-center justify-center h-full animate-fadeIn">
                      <div className="mb-6 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-4 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <h4 className="text-gray-700 font-semibold mb-2 text-lg">{getGreeting()}! How can I help you today?</h4>
                        <p className="text-gray-500 text-sm mb-4">Select an option below or type your question</p>
                      </div>
                      <div className="grid gap-4 w-full max-w-lg mx-auto">
                        <button 
                          onClick={() => handleSuggestion("What products and services do you offer?")}
                          className="suggestion-btn group bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400 hover:from-blue-100 hover:to-indigo-100 rounded-2xl p-4 text-left transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-3 mr-4 group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-lg group-hover:text-blue-700 transition-colors">Products & Services</h4>
                            <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700">Explore our comprehensive solutions</p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                        
                        <button 
                          onClick={() => handleSuggestion("Where are your global locations?")}
                          className="suggestion-btn group bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 hover:border-emerald-400 hover:from-emerald-100 hover:to-teal-100 rounded-2xl p-4 text-left transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-3 mr-4 group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-lg group-hover:text-emerald-700 transition-colors">Global Locations</h4>
                            <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700">Find our offices worldwide</p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                        
                        <button 
                          onClick={() => handleSuggestion("Tell me about your AI and security solutions")}
                          className="suggestion-btn group bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-400 hover:from-purple-100 hover:to-pink-100 rounded-2xl p-4 text-left transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-3 mr-4 group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-lg group-hover:text-purple-700 transition-colors">AI & Security</h4>
                            <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700">Advanced AI-powered security solutions</p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                  {messages.length > 0 && messages.map((message) => (
                    <div
                      key={message.id}
                      className={`animate-slideIn ${
                        message.sender === "user" ? "flex justify-end" : "flex justify-start"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="w-8 h-8 mt-1 mr-2 flex-shrink-0">
                          <img
                            src="/lovable-uploads/indrabot-mascot.png"
                            alt="Bot"
                            className="w-full h-full"
                          />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] px-5 py-4 shadow-sm transition-all ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-none"
                            : "bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-none"
                        }`}
                      >
                        <div className="text-base md:text-lg leading-relaxed">
                          {message.sender === "bot" && (
                            <>
                              {/* TypeWriter handles both animated & static phases */}
                              <TypeWriter
                                text={message.text}
                                isAnimating={message.isTyping}
                                delay={15}
                                onComplete={() => handleTypeDone(message.id)}
                              />
                              {message.isTyping && (
                                <div className="typing-indicator-simple inline-flex items-center ml-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-simple-pulse"></div>
                                </div>
                              )}
                            </>
                          )}

                          {message.sender === "user" && message.text}
                        </div>
                        
                        {/* Quick Reply Buttons */}
                        {message.sender === "bot" && message.suggested && message.suggested.length > 0 && !message.isTyping && (
                          <div className="mt-4 flex flex-wrap gap-2 animate-fadeIn">
                            {message.suggested.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestion(suggestion)}
                                className="quick-reply-btn bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 hover:border-blue-400 text-blue-700 hover:text-blue-800 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                              >
                                <span className="flex items-center gap-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                  {suggestion}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {quickActionPending && (
                    <div className="flex justify-start animate-fadeIn">
                      <div className="w-8 h-8 mt-1 mr-2 flex-shrink-0">
                        <img
                          src="/lovable-uploads/indrabot-mascot.png"
                          alt="Bot"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-none px-5 py-4 max-w-[85%] sm:max-w-[80%] md:max-w-[75%] shadow-sm">
                        <div className="h-96">
                          <QuickActionButtons
                            onDemo={() => {
                              setQuickActionPending(false);
                              setShowContactForm(true);
                              sendFollowUp("Demo");
                            }}
                            onCall={() => {
                              setQuickActionPending(false);
                              setShowCallForm(true);
                              sendFollowUp("Call");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {waiting && (
                    <div className="flex justify-start animate-fadeIn">
                      <div className="w-8 h-8 mt-1 mr-2 flex-shrink-0">
                        <img
                          src="/lovable-uploads/indrabot-mascot.png"
                          alt="Bot"
                          className="w-full h-full animate-pulse"
                        />
                      </div>
                      <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-none px-5 py-4 max-w-[85%] sm:max-w-[80%] md:max-w-[75%] shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          </div>
                          <span className="text-xs text-gray-500 animate-pulse">IndraBot is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {emailSending && (
                    <div className="flex justify-start animate-fadeIn">
                      <div className="w-8 h-8 mt-1 mr-2 flex-shrink-0">
                        <img
                          src="/lovable-uploads/indrabot-mascot.png"
                          alt="Bot"
                          className="w-full h-full animate-pulse"
                        />
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 border-2 border-blue-200 rounded-2xl rounded-bl-none px-6 py-5 max-w-[85%] sm:max-w-[80%] md:max-w-[75%] shadow-xl relative overflow-hidden">
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-indigo-100/50 to-purple-100/50 animate-gradient-x"></div>
                        
                        {/* Main content */}
                        <div className="relative z-10">
                          {/* Header with spinning loader and email icon */}
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="relative">
                              <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                              <div className="absolute inset-0 w-8 h-8 border-3 border-transparent border-r-indigo-400 rounded-full animate-spin-reverse"></div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              {/* Animated email icon */}
                              <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {/* Flying paper airplane effect */}
                                <div className="absolute -top-1 -right-1 w-3 h-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-indigo-500 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                  </svg>
                                </div>
                              </div>
                              
                              <div className="flex flex-col">
                                <span className="text-base font-semibold text-blue-700 animate-pulse">Sending your demo request</span>
                                <span className="text-sm text-gray-600">Processing your booking...</span>
                              </div>
                            </div>
                          </div>

                          {/* Progress steps */}
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-scale-up">
                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-sm text-gray-700">Information collected</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                                emailStage >= 2 ? 'bg-green-500 animate-scale-up' : 
                                emailStage >= 1 ? 'bg-blue-500 animate-pulse' : 'border-2 border-gray-300'
                              }`}>
                                {emailStage >= 2 ? (
                                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                ) : emailStage >= 1 ? (
                                  <div className="w-full h-full bg-blue-300 rounded-full animate-ping"></div>
                                ) : null}
                              </div>
                              <span className={`text-sm transition-colors duration-300 ${
                                emailStage >= 2 ? 'text-gray-700' : 
                                emailStage >= 1 ? 'text-gray-700 animate-pulse' : 'text-gray-500'
                              }`}>
                                Formatting email content
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                                emailStage >= 3 ? 'bg-green-500 animate-scale-up' : 
                                emailStage >= 2 ? 'bg-blue-500 animate-pulse' : 'border-2 border-gray-300'
                              }`}>
                                {emailStage >= 3 ? (
                                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                ) : emailStage >= 2 ? (
                                  <div className="w-full h-full bg-blue-300 rounded-full animate-ping"></div>
                                ) : null}
                              </div>
                              <span className={`text-sm transition-colors duration-300 ${
                                emailStage >= 3 ? 'text-gray-700' : 
                                emailStage >= 2 ? 'text-gray-700 animate-pulse' : 'text-gray-500'
                              }`}>
                                Sending to our team
                              </span>
                            </div>
                          </div>

                          {/* Floating particles effect */}
                          <div className="absolute top-2 right-4">
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-blue-400 rounded-full animate-float-1"></div>
                              <div className="w-1 h-1 bg-indigo-400 rounded-full animate-float-2"></div>
                              <div className="w-1 h-1 bg-purple-400 rounded-full animate-float-3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
                            {/* Input */}
              <div className="border-t border-gray-200 bg-white rounded-b-3xl">
                {/* Real-time suggestions */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="px-5 py-3 border-b border-gray-100 max-h-48 overflow-y-auto suggestions-container">
                    <div className="text-xs text-gray-500 mb-2 font-medium">Suggestions:</div>
                    <div className="space-y-1">
                      {filteredSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestion(suggestion)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200 flex items-center group"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="truncate">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSendMessage} className="p-5 flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="w-full border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base transition-all duration-300 bg-gray-50"
                      value={newMessage}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  {/* Voice Recognition Button */}
                  <button
                    type="button"
                    onClick={startListening}
                    className={`rounded-full p-3 transition-all duration-300 transform hover:scale-105 shadow-md ${
                      isSpeechSupported 
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:shadow-lg" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!isSpeechSupported}
                    title={isSpeechSupported ? "Click to speak" : "Voice recognition not supported"}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md"
                    disabled={newMessage.trim() === ""}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
            
            {/* Mascot */}
            <div className="relative flex flex-col items-center animate-scaleUp hidden sm:flex">
              <img
                src="/lovable-uploads/indrabot-mascot.png"
                alt="IndraBot"
                className="w-56 h-56 md:w-80 md:h-80 transition-all duration-500 drop-shadow-2xl"
              />
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md transform transition-transform hover:rotate-90"
                onClick={setIsOpen.bind(null, false)}
              >
                <X className="w-6 h-6 md:w-7 md:h-7 stroke-2 text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mascot Button (Closed State) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className="relative cursor-pointer group"
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {hovering && (
              <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-4 px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-blue-100 flex items-center gap-2 animate-fadeIn pointer-events-none select-none min-w-[210px]">
                <img src='/lovable-uploads/indrabot-mascot.png' alt='IndraBot' className='w-7 h-7 mr-2 drop-shadow' />
                <span className="text-gray-700 font-medium text-sm">Hi, I'm <span className="text-blue-600 font-bold">IndraBot</span>!<br/><span className="text-xs font-normal text-gray-500">Click to chat with me.</span></span>
              </div>
            )}
            <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-blue-500/30 to-sky-400/30 animate-pulse-slow-large"></div>
            <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-blue-500/40 to-sky-400/40 animate-pulse-medium group-hover:animate-none"></div>
            <div className="absolute -top-1 -right-1 flex">
              <div className="relative">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-white"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                </span>
              </div>
            </div>
            <img
              src="/lovable-uploads/indrabot-mascot.png"
              alt="Chat Bot"
              className={`w-16 h-16 md:w-24 md:h-24 transition-all duration-300 ${
                hovering ? 'transform scale-110 translate-y-[-5px]' : ''
              } drop-shadow-lg`}
            />
          </div>
        </div>
      )}
      
      {/* Scroll to Top Button */}
      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-60">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transform transition-transform hover:scale-110 focus:outline-none opacity-0 pointer-events-none"
          id="scrollTopBtn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
        
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleUp { animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-subtle-bounce { animation: subtle-bounce 3s ease-in-out infinite; }
        
        /* Enhanced Email Sending Animations */
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse { animation: spin-reverse 1s linear infinite; }
        
        @keyframes scale-up {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up { animation: scale-up 0.6s ease-out; }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
          33% { transform: translateY(-10px) rotate(120deg); opacity: 0.7; }
          66% { transform: translateY(-5px) rotate(240deg); opacity: 0.4; }
        }
        .animate-float-1 { animation: float-1 2s ease-in-out infinite; }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
          33% { transform: translateY(-8px) rotate(100deg); opacity: 1; }
          66% { transform: translateY(-12px) rotate(200deg); opacity: 0.6; }
        }
        .animate-float-2 { animation: float-2 2.5s ease-in-out infinite 0.5s; }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          33% { transform: translateY(-6px) rotate(80deg); opacity: 0.9; }
          66% { transform: translateY(-9px) rotate(160deg); opacity: 1; }
        }
        .animate-float-3 { animation: float-3 3s ease-in-out infinite 1s; }
        
        /* Border width utilities */
        .border-3 { border-width: 3px; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.03); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(59, 130, 246, 0.5);
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.95); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        @keyframes pulse-slow-large {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        .animate-pulse-slow-large {
          animation: pulse-slow-large 3s ease-in-out infinite;
        }
        
        @keyframes pulse-medium {
          0%, 100% { opacity: 0.2; transform: scale(0.95); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse-medium {
          animation: pulse-medium 2.5s ease-in-out infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.7s infinite;
        }
        
        .typing-cursor {
          display: inline-block;
          margin-left: 2px;
        }
        
        .blue-chat-window {
          box-shadow: 0 10px 30px -5px rgba(59, 130, 246, 0.3);
          transition: height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .suggestion-btn {
          transform: translateY(0);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .suggestion-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        /* Real-time suggestions animations */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .suggestions-container {
          animation: slideDown 0.2s ease-out;
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2.5s linear infinite;
        }
        
        /* Indrasol Brand Colors */
        .text-indrasol-blue {
          color: #1e40af; /* Indrasol brand blue - adjust this hex code to match your exact brand color */
        }
        
        .indrasol-markdown strong {
          color: #1e40af !important;
          font-weight: 700;
        }
        
        .indrasol-markdown a {
          color: #1e40af !important;
          font-weight: 600;
          text-decoration: underline;
          transition: opacity 0.2s ease;
        }
        
        .indrasol-markdown a:hover {
          opacity: 0.8;
        }
        
        /* Quick Reply Button Animations */
        .quick-reply-btn {
          animation: slideInQuick 0.3s ease-out forwards;
          transform-origin: left center;
        }
        
        @keyframes slideInQuick {
          from { 
            opacity: 0; 
            transform: translateX(-10px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        .quick-reply-btn:hover {
          transform: scale(1.05) translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }
        
        .quick-reply-btn:active {
          transform: scale(0.98);
        }
        
        /* Voice Recognition Animations */
        @keyframes voice-pulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.7; 
            transform: scale(1.05); 
          }
        }
        
        .voice-pulse {
          animation: voice-pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes voice-wave {
          0%, 100% { 
            height: 10px; 
            background: linear-gradient(to top, #3b82f6, #1d4ed8);
          }
          50% { 
            height: 25px; 
            background: linear-gradient(to top, #6366f1, #4f46e5);
          }
        }
        
        .voice-wave {
          animation: voice-wave 0.6s ease-in-out infinite;
        }
        
        @keyframes listening-glow {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          50% { 
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
        }
        
        .listening-glow {
          animation: listening-glow 2s ease-in-out infinite;
        }
        
        @keyframes mic-bounce {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-3px);
          }
        }
        
        .mic-bounce {
          animation: mic-bounce 1s ease-in-out infinite;
        }
        
        /* Enhanced Voice Overlay Animations */
        @keyframes modalSlideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-modalSlideUp {
          animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
          animation: gradient-shift 4s ease infinite;
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.7; 
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
            opacity: 1; 
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes ping-slow {
          0% { 
            transform: scale(1); 
            opacity: 0.8; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.4; 
          }
          100% { 
            transform: scale(1.2); 
            opacity: 0; 
          }
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes pulse-ring {
          0% { 
            transform: scale(0.95); 
            opacity: 0.7; 
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.4; 
          }
          100% { 
            transform: scale(0.95); 
            opacity: 0.7; 
          }
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 1.5s ease-in-out infinite;
        }
        
        @keyframes mic-pulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
          }
          50% { 
            transform: scale(1.05); 
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.5);
          }
        }
        
        .animate-mic-pulse {
          animation: mic-pulse 2s ease-in-out infinite;
        }
        
        @keyframes bounce-subtle {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(-2px); 
          }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 1.5s ease-in-out infinite;
        }
        
        @keyframes sound-wave {
          0%, 100% { 
            height: 8px; 
            opacity: 0.6; 
          }
          50% { 
            height: 20px; 
            opacity: 1; 
          }
        }
        
        .animate-sound-wave {
          animation: sound-wave 0.8s ease-in-out infinite;
        }
        
        @keyframes voice-wave {
          0%, 100% { 
            transform: scaleY(0.5); 
            opacity: 0.7; 
          }
          50% { 
            transform: scaleY(1.2); 
            opacity: 1; 
          }
        }
        
        .animate-voice-wave {
          animation: voice-wave 0.6s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.3; 
          }
          50% { 
            opacity: 0.6; 
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        @keyframes typeIn {
          from { 
            opacity: 0; 
          }
          to { 
            opacity: 1; 
          }
        }
        
        .animate-typeIn {
          animation: typeIn 0.5s ease-out forwards;
        }
        
        /* Consistent Smile Animation */
        @keyframes smile-eye-1 {
          0%, 100% { 
            transform: translate(-4px, -2px) scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: translate(-4px, -2px) scale(1.2); 
            opacity: 0.8; 
          }
        }
        
        @keyframes smile-eye-2 {
          0%, 100% { 
            transform: translate(4px, -2px) scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: translate(4px, -2px) scale(1.2); 
            opacity: 0.8; 
          }
        }
        
        @keyframes smile-mouth {
          0%, 100% { 
            transform: translate(0px, 2px) scaleX(1) scaleY(1); 
            opacity: 1; 
          }
          50% { 
            transform: translate(0px, 2px) scaleX(1.1) scaleY(1.1); 
            opacity: 0.8; 
          }
        }
        
        /* Circle Formation Animations */
        @keyframes circle-form-1 {
          0% { 
            transform: scale(0.8); 
            opacity: 0; 
          }
          25% { 
            transform: scale(1.1); 
            opacity: 0.6; 
          }
          50% { 
            transform: scale(1.3); 
            opacity: 0.3; 
          }
          75% { 
            transform: scale(1.5); 
            opacity: 0.1; 
          }
          100% { 
            transform: scale(1.7); 
            opacity: 0; 
          }
        }
        
        @keyframes circle-form-2 {
          0% { 
            transform: scale(0.7); 
            opacity: 0; 
          }
          30% { 
            transform: scale(1); 
            opacity: 0.4; 
          }
          60% { 
            transform: scale(1.2); 
            opacity: 0.2; 
          }
          100% { 
            transform: scale(1.4); 
            opacity: 0; 
          }
        }
        
        @keyframes circle-form-3 {
          0% { 
            transform: scale(0.9); 
            opacity: 0; 
          }
          40% { 
            transform: scale(1.15); 
            opacity: 0.3; 
          }
          80% { 
            transform: scale(1.35); 
            opacity: 0.1; 
          }
          100% { 
            transform: scale(1.5); 
            opacity: 0; 
          }
        }
        
        .animate-smile-eye-1 {
          animation: smile-eye-1 3s ease-in-out infinite;
        }
        
        .animate-smile-eye-2 {
          animation: smile-eye-2 3s ease-in-out infinite 0.5s;
        }
        
        .animate-smile-mouth {
          animation: smile-mouth 2.5s ease-in-out infinite 1s;
        }
        
        .animate-circle-form-1 {
          animation: circle-form-1 2s ease-out infinite;
        }
        
        .animate-circle-form-2 {
          animation: circle-form-2 2.5s ease-out infinite 0.5s;
        }
        
        .animate-circle-form-3 {
          animation: circle-form-3 3s ease-out infinite 1s;
        }
        
        /* Simple Pulse Animation */
        @keyframes simple-pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.3); 
            opacity: 0.6; 
          }
        }
        
        .animate-simple-pulse {
          animation: simple-pulse 1.5s ease-in-out infinite;
        }
      `}</style>
          </>
    );
  };
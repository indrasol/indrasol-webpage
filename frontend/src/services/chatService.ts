// src/services/chatService.ts
import { Message } from '../types/chat';
import { API_ENDPOINTS } from '../config';

export interface SendMessageResponse {
  response: string;
  intent: string;
  routed_agent: string;
  suggested?: string[];
  action?: string;
}

// ── 1.  Response shape from MCP router ──────────────────────────────
export interface ChatResponse {
  turn_id:      string;
  text:         string; 
  routed_skill: string;
  finished:     boolean;
  suggested?:   string[];
  latency_ms:   number;
  error?:       string | null;
  meta?:        Record<string, any>;
}

// ── 2.  Local-storage keys ──────────────────────────────────────────
const STORAGE_KEYS = {
  USER_ID: 'indra_user_id',
  HISTORY: 'indra_chat_history',
  CONSENT: 'indra_data_consent',
  TIMESTAMP: 'indra_data_timestamp'
};

// ── 3.  Privacy Configuration ──────────────────────────────────────
const PRIVACY_CONFIG = {
  DATA_RETENTION_DAYS: 30,
  CONSENT_VERSION: '1.0',
  REQUIRED_CONSENT_TYPES: ['functional', 'analytics'] as const
};

type ConsentData = {
  version: string;
  timestamp: string;
  functional: boolean;
  analytics: boolean;
  granted: boolean;
};

/** Helper : generate stable UUID (crypto if available) */
const genUUID = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `user-${Date.now()}`;

/** ---- PRIVACY CONSENT MANAGEMENT ---- */
const requestDataConsent = (): Promise<ConsentData | null> => {
  return new Promise((resolve) => {
    // Create consent modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-lg mx-4 shadow-2xl border border-gray-200">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900">Privacy & Data Usage</h3>
            <p class="text-sm text-gray-600">Your privacy matters to us</p>
          </div>
        </div>
        
        <div class="space-y-4 mb-6">
          <p class="text-gray-700 leading-relaxed">
            To provide you with the best chat experience, we'd like to store your conversation locally on your device. This helps us:
          </p>
          <ul class="list-disc list-inside space-y-2 text-sm text-gray-600 ml-4">
            <li>Remember our conversation context</li>
            <li>Provide more relevant responses</li>
            <li>Avoid repeating questions</li>
          </ul>
          
          <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h4 class="font-semibold text-blue-900 mb-2 flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Privacy Guarantee
            </h4>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Data stays on YOUR device only</li>
              <li>• Automatically deleted after 30 days</li>
              <li>• You can clear it anytime</li>
              <li>• No third-party sharing</li>
            </ul>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3">
          <button id="consent-accept" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Accept & Continue
          </button>
          <button id="consent-decline" class="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
            Decline
          </button>
        </div>
        
        <p class="text-xs text-gray-500 mt-4 text-center">
          By accepting, you agree to our 
          <a href="/privacy-policy" class="text-blue-600 hover:underline">Privacy Policy</a> and 
          <a href="/terms-of-service" class="text-blue-600 hover:underline">Terms of Service</a>
        </p>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const handleResponse = (granted: boolean) => {
      const consentData: ConsentData = {
        version: PRIVACY_CONFIG.CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        functional: granted,
        analytics: granted,
        granted
      };
      
      document.body.removeChild(modal);
      resolve(granted ? consentData : null);
    };
    
    modal.querySelector('#consent-accept')?.addEventListener('click', () => handleResponse(true));
    modal.querySelector('#consent-decline')?.addEventListener('click', () => handleResponse(false));
  });
};

/** Check if data has expired based on retention policy */
const isDataExpired = (timestamp: string): boolean => {
  try {
    const stored = new Date(timestamp);
    const now = new Date();
    const diffDays = (now.getTime() - stored.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays > PRIVACY_CONFIG.DATA_RETENTION_DAYS;
  } catch {
    return true; // If timestamp is invalid, consider expired
  }
};

/** Clean expired data automatically */
const cleanExpiredData = (): void => {
  const timestamp = localStorage.getItem(STORAGE_KEYS.TIMESTAMP);
  if (timestamp && isDataExpired(timestamp)) {
    console.log('Cleaning expired chat data...');
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

/** Validate consent is still valid */
const isConsentValid = (): boolean => {
  try {
    const consentData = localStorage.getItem(STORAGE_KEYS.CONSENT);
    if (!consentData) return false;
    
    const consent: ConsentData = JSON.parse(consentData);
    return consent.granted && 
           consent.version === PRIVACY_CONFIG.CONSENT_VERSION &&
           !isDataExpired(consent.timestamp);
  } catch {
    return false;
  }
};

/** ---- INITIALISE session (returns userId + cached history) ---- */
export const bootstrapChat = async (): Promise<{ userId: string; history: Message[] }> => {
  // Clean expired data first
  cleanExpiredData();
  
  // Check if we have valid consent
  if (!isConsentValid()) {
    const consent = await requestDataConsent();
    
    if (!consent) {
      // User declined - return session-only data
      return { 
        userId: genUUID(), 
        history: [] 
      };
    }
    
    // Store consent
    localStorage.setItem(STORAGE_KEYS.CONSENT, JSON.stringify(consent));
    localStorage.setItem(STORAGE_KEYS.TIMESTAMP, consent.timestamp);
  }
  
  // User has valid consent - proceed with normal flow
  let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  if (!userId) {
    userId = genUUID();
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    localStorage.setItem(STORAGE_KEYS.TIMESTAMP, new Date().toISOString());
  }
  
  const historyJSON = localStorage.getItem(STORAGE_KEYS.HISTORY);
  const history: Message[] = historyJSON ? JSON.parse(historyJSON) : [];
  
  return { userId, history };
};

/** ---- Persist history after every turn ---- */
const saveHistory = (history: Message[]) => {
  if (isConsentValid()) {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    localStorage.setItem(STORAGE_KEYS.TIMESTAMP, new Date().toISOString());
  }
};

/** ---- Convert Message[] ➜ string[] expected by backend ---- */
const toPlainHistory = (history: Message[]): string[] =>
  history.map((m) => {
    const prefix = m.sender === 'user' ? 'User:' : 'Bot:';
    return `${prefix} ${m.text}`;
  });

/** ----------------  MAIN SERVICE  ---------------- */
export const chatService = {
  /** Send a message & update local history */
  sendMessage: async (
    messageText: string,
    history: Message[]
  ): Promise<{ botReply: Message; newHistory: Message[] }> => {
    const { userId } = await bootstrapChat();

    // 1️⃣  Add the user message optimistically
    const userMsg: Message = { id: Date.now(), text: messageText, sender: 'user' };
    const updatedHistory = [...history, userMsg];

    try {
      const res = await fetch(API_ENDPOINTS.SEND_MESSAGE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          query: messageText,
          history: toPlainHistory(updatedHistory) // send FULL transcript
        }),
        signal: AbortSignal.timeout?.(15000)      // native timeout (Chrome 117+)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: SendMessageResponse = await res.json();
      const botMsg: Message = { 
        id: Date.now() + 1, 
        text: data.response, 
        sender: 'bot',
        action: data.action 
      };

      const finalHistory = [...updatedHistory, botMsg];
      saveHistory(finalHistory);

      return { botReply: botMsg, newHistory: finalHistory };
    } catch (err) {
      console.error('chatService error', err);
      const fallback: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting. Please try again shortly.",
        sender: 'bot'
      };
      const errorHistory = [...updatedHistory, fallback];
      saveHistory(errorHistory);
      return { botReply: fallback, newHistory: errorHistory };
    }
  },

  /** Retrieve cached conversation (widget init) */
  getCachedHistory: (): Message[] => {
    if (!isConsentValid()) return [];
    
    const json = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return json ? (JSON.parse(json) as Message[]) : [];
  },

  /** Reset chat conversation only */
  resetConversation: () => {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  },

  /** Clear ALL user data (GDPR compliance) */
  clearAllData: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('All user data cleared');
  },

  /** Export user data (GDPR compliance) */
  exportUserData: () => {
    const data = {
      userId: localStorage.getItem(STORAGE_KEYS.USER_ID),
      chatHistory: localStorage.getItem(STORAGE_KEYS.HISTORY),
      consent: localStorage.getItem(STORAGE_KEYS.CONSENT),
      dataTimestamp: localStorage.getItem(STORAGE_KEYS.TIMESTAMP),
      exportedAt: new Date().toISOString()
    };
    
    // Create downloadable file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `indrasol-chat-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return data;
  },

  /** Get privacy status */
  getPrivacyStatus: () => {
    const consent = localStorage.getItem(STORAGE_KEYS.CONSENT);
    const timestamp = localStorage.getItem(STORAGE_KEYS.TIMESTAMP);
    
    return {
      hasConsent: isConsentValid(),
      consentData: consent ? JSON.parse(consent) : null,
      dataAge: timestamp ? Math.floor((Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24)) : 0,
      maxRetentionDays: PRIVACY_CONFIG.DATA_RETENTION_DAYS,
      willExpireOn: timestamp ? new Date(new Date(timestamp).getTime() + (PRIVACY_CONFIG.DATA_RETENTION_DAYS * 24 * 60 * 60 * 1000)).toISOString() : null
    };
  },

  /** Manual cleanup check */
  cleanupExpiredData: cleanExpiredData,

  /** Update consent preferences */
  updateConsent: async (newConsent?: Partial<ConsentData>) => {
    if (!newConsent) {
      // Re-request consent
      const consent = await requestDataConsent();
      if (consent) {
        localStorage.setItem(STORAGE_KEYS.CONSENT, JSON.stringify(consent));
        localStorage.setItem(STORAGE_KEYS.TIMESTAMP, consent.timestamp);
      }
      return consent;
    } else {
      // Update existing consent
      const existing = localStorage.getItem(STORAGE_KEYS.CONSENT);
      if (existing) {
        const updated = { ...JSON.parse(existing), ...newConsent, timestamp: new Date().toISOString() };
        localStorage.setItem(STORAGE_KEYS.CONSENT, JSON.stringify(updated));
        return updated;
      }
    }
    return null;
  }
};

// Initialize cleanup on module load
cleanExpiredData();

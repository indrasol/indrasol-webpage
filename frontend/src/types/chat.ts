export interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    isTyping?: boolean;
    suggested?: string[];
    action?: string;
    intent?: string;
  }
  
  export interface ChatState {
    isOpen: boolean;
    messages: Message[];
    loading: boolean;
    error: string | null;
  }
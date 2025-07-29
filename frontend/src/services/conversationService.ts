import { API_ENDPOINTS } from "../config";
import { Message } from "../types/chat";

/**
 * Fetches conversation history for a user from the backend and converts it to Message[]
 */
export const conversationService = {
  async getHistory(userId: string): Promise<Message[]> {
    const res = await fetch(`${API_ENDPOINTS.GET_CONVERSATION}?user_id=${userId}`);
    if (!res.ok) return [];
    const data = await res.json();
    const historyMessages: Message[] = [];
    data.history.forEach((turn: { user?: string; bot?: string }) => {
      if (turn.user) {
        historyMessages.push({
          id: Date.now() + Math.random(),
          text: turn.user,
          sender: "user"
        });
      }
      if (turn.bot) {
        historyMessages.push({
          id: Date.now() + Math.random(),
          text: turn.bot,
          sender: "bot"
        });
      }
    });
    return historyMessages;
  }
};

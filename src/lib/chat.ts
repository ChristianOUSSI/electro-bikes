// Real-time chat system using localStorage with cross-tab synchronization
// This enables the admin panel to receive and respond to client messages in real-time

interface ChatMessage {
  id: string;
  visitorId: string;
  visitorName: string;
  visitorEmail?: string;
  message: string;
  isAdmin: boolean;
  read: boolean;
  timestamp: string;
}

interface ChatSession {
  id: string;
  visitorId: string;
  visitorName?: string;
  visitorEmail?: string;
  status: "pending" | "active" | "closed";
  assignedTo?: string;
  messages: ChatMessage[];
  createdAt: string;
  lastMessageAt: string;
}

// Storage keys
const CHAT_SESSIONS_KEY = 'chat_sessions';
const CHAT_EVENTS_KEY = 'chat_events';

// Initialize storage
function initializeStorage() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(CHAT_SESSIONS_KEY)) {
    localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(CHAT_EVENTS_KEY)) {
    localStorage.setItem(CHAT_EVENTS_KEY, JSON.stringify([]));
  }
}

// Get all sessions
function getAllSessions(): ChatSession[] {
  if (typeof window === 'undefined') return [];
  initializeStorage();
  const data = localStorage.getItem(CHAT_SESSIONS_KEY);
  return data ? JSON.parse(data) : [];
}

// Save all sessions
function saveSessions(sessions: ChatSession[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify(sessions));
  // Trigger storage event for cross-tab sync
  window.dispatchEvent(new Event('storage'));
  // Add event for custom chat updates
  window.dispatchEvent(new CustomEvent('chat-updated'));
}

// Create a new chat session
export function createChatSession(visitorId: string, visitorName?: string, visitorEmail?: string): ChatSession {
  if (typeof window === 'undefined') {
    // Return mock data for server-side
    return {
      id: `chat-${Date.now()}`,
      visitorId,
      visitorName,
      visitorEmail,
      status: "pending",
      messages: [],
      createdAt: new Date().toISOString(),
      lastMessageAt: new Date().toISOString()
    };
  }

  initializeStorage();
  const sessions = getAllSessions();

  const session: ChatSession = {
    id: `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    visitorId,
    visitorName,
    visitorEmail,
    status: "pending",
    messages: [],
    createdAt: new Date().toISOString(),
    lastMessageAt: new Date().toISOString()
  };

  sessions.push(session);
  saveSessions(sessions);

  return session;
}

// Add a message to a session
export function addChatMessage(sessionId: string, message: Omit<ChatMessage, "id" | "timestamp">): ChatMessage {
  if (typeof window === 'undefined') {
    // Return mock data for server-side
    return {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
  }

  const sessions = getAllSessions();
  const session = sessions.find(s => s.id === sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  const chatMessage: ChatMessage = {
    ...message,
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString()
  };

  session.messages.push(chatMessage);
  session.lastMessageAt = chatMessage.timestamp;

  // If this is the first message from visitor, mark as active
  if (!message.isAdmin && session.status === "pending") {
    session.status = "active";
  }

  saveSessions(sessions);

  return chatMessage;
}

// Get all sessions with optional filters
export function getChatSessions(filters?: { status?: string; assignedTo?: string }): ChatSession[] {
  let result = getAllSessions();

  if (filters?.status) {
    result = result.filter(s => s.status === filters.status);
  }

  if (filters?.assignedTo) {
    result = result.filter(s => s.assignedTo === filters.assignedTo);
  }

  return result.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
}

// Get a specific session by ID
export function getChatSessionById(id: string): ChatSession | undefined {
  const sessions = getAllSessions();
  return sessions.find(s => s.id === id);
}

// Update session status
export function updateChatSessionStatus(sessionId: string, status: ChatSession["status"], assignedTo?: string): void {
  if (typeof window === 'undefined') return;

  const sessions = getAllSessions();
  const session = sessions.find(s => s.id === sessionId);

  if (session) {
    session.status = status;
    if (assignedTo) session.assignedTo = assignedTo;
    saveSessions(sessions);
  }
}

// Mark messages as read
export function markMessagesAsRead(sessionId: string, isAdmin: boolean): void {
  if (typeof window === 'undefined') return;

  const sessions = getAllSessions();
  const session = sessions.find(s => s.id === sessionId);

  if (session) {
    session.messages.forEach(m => {
      if (m.isAdmin !== isAdmin) m.read = true;
    });
    saveSessions(sessions);
  }
}

// Get unread message count for admin
export function getUnreadMessageCount(): number {
  const sessions = getAllSessions();
  let count = 0;

  sessions.forEach(session => {
    session.messages.forEach(message => {
      if (!message.isAdmin && !message.read) {
        count++;
      }
    });
  });

  return count;
}

// Get unread message count for a specific visitor
export function getVisitorUnreadCount(visitorId: string): number {
  const sessions = getAllSessions();
  const session = sessions.find(s => s.visitorId === visitorId);

  if (!session) return 0;

  return session.messages.filter(m => m.isAdmin && !m.read).length;
}

// Subscribe to chat updates (for real-time updates)
export function subscribeToChatUpdates(callback: () => void): () => void {
  const handleStorageChange = () => callback();
  const handleChatUpdate = () => callback();

  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('chat-updated', handleChatUpdate);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('chat-updated', handleChatUpdate);
  };
}

// Clear all chat data (for testing/admin)
export function clearChatData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CHAT_SESSIONS_KEY);
  localStorage.removeItem(CHAT_EVENTS_KEY);
  initializeStorage();
}

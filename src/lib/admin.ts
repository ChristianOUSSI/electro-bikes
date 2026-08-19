import { AdminUser, Visitor, ChatSession, ChatMessage, PaymentNotification, AnalyticsData, AdminNotification } from "./types";

// Admin Authentication
const ADMIN_CREDENTIALS = {
  email: "admin@gmail.com",
  password: "admin123",
  name: "Administrateur",
  role: "admin" as const
};

export function authenticateAdmin(email: string, password: string): AdminUser | null {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return {
      id: "admin-1",
      email: ADMIN_CREDENTIALS.email,
      password: ADMIN_CREDENTIALS.password,
      name: ADMIN_CREDENTIALS.name,
      role: ADMIN_CREDENTIALS.role,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
  }
  return null;
}

export function getAdminSession(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem("admin_session");
  return session ? JSON.parse(session) : null;
}

export function setAdminSession(admin: AdminUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_session", JSON.stringify(admin));
  }
}

export function clearAdminSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_session");
  }
}

// Visitors Tracking
const visitors: Visitor[] = [];

export function trackVisitor(visitorData: Omit<Visitor, "id" | "createdAt" | "lastActivity">): Visitor {
  const visitor: Visitor = {
    ...visitorData,
    id: `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString()
  };
  visitors.push(visitor);
  return visitor;
}

export function updateVisitorActivity(visitorId: string, currentPage: string): void {
  const visitor = visitors.find(v => v.id === visitorId);
  if (visitor) {
    visitor.currentPage = currentPage;
    visitor.lastActivity = new Date().toISOString();
    visitor.duration += 30; // Assume 30 seconds per page view
    if (!visitor.pagesVisited.includes(currentPage)) {
      visitor.pagesVisited.push(currentPage);
    }
  }
}

export function getVisitors(filters?: { period?: string; status?: string }): Visitor[] {
  let result = [...visitors];
  
  if (filters?.period) {
    const now = new Date();
    const period = filters.period;
    const cutoffDate = new Date();
    
    if (period === "today") {
      cutoffDate.setHours(0, 0, 0, 0);
    } else if (period === "week") {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (period === "month") {
      cutoffDate.setMonth(now.getMonth() - 1);
    }
    
    result = result.filter(v => new Date(v.createdAt) >= cutoffDate);
  }
  
  return result.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
}

export function getVisitorById(id: string): Visitor | undefined {
  return visitors.find(v => v.id === id);
}

// Chat System
const chatSessions: ChatSession[] = [];

export function createChatSession(visitorId: string, visitorName?: string, visitorEmail?: string): ChatSession {
  const session: ChatSession = {
    id: `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    visitorId,
    visitorName,
    visitorEmail,
    status: "active",
    messages: [],
    createdAt: new Date().toISOString(),
    lastMessageAt: new Date().toISOString()
  };
  chatSessions.push(session);
  return session;
}

export function addChatMessage(sessionId: string, message: Omit<ChatMessage, "id" | "timestamp">): ChatMessage {
  const session = chatSessions.find(s => s.id === sessionId);
  if (!session) throw new Error("Session not found");
  
  const chatMessage: ChatMessage = {
    ...message,
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString()
  };
  
  session.messages.push(chatMessage);
  session.lastMessageAt = chatMessage.timestamp;
  
  return chatMessage;
}

export function getChatSessions(filters?: { status?: string; assignedTo?: string }): ChatSession[] {
  let result = [...chatSessions];
  
  if (filters?.status) {
    result = result.filter(s => s.status === filters.status);
  }
  
  if (filters?.assignedTo) {
    result = result.filter(s => s.assignedTo === filters.assignedTo);
  }
  
  return result.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
}

export function getChatSessionById(id: string): ChatSession | undefined {
  return chatSessions.find(s => s.id === id);
}

export function updateChatSessionStatus(sessionId: string, status: ChatSession["status"], assignedTo?: string): void {
  const session = chatSessions.find(s => s.id === sessionId);
  if (session) {
    session.status = status;
    if (assignedTo) session.assignedTo = assignedTo;
  }
}

export function markMessagesAsRead(sessionId: string, isAdmin: boolean): void {
  const session = chatSessions.find(s => s.id === sessionId);
  if (session) {
    session.messages.forEach(m => {
      if (m.isAdmin !== isAdmin) m.read = true;
    });
  }
}

// Payment Notifications
const paymentNotifications: PaymentNotification[] = [];

export function createPaymentNotification(payment: Omit<PaymentNotification, "id" | "createdAt">): PaymentNotification {
  const notification: PaymentNotification = {
    ...payment,
    id: `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString()
  };
  paymentNotifications.push(notification);
  return notification;
}

export function getPaymentNotifications(filters?: { status?: string; type?: string }): PaymentNotification[] {
  let result = [...paymentNotifications];
  
  if (filters?.status) {
    result = result.filter(p => p.status === filters.status);
  }
  
  if (filters?.type) {
    result = result.filter(p => p.type === filters.type);
  }
  
  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function updatePaymentStatus(id: string, status: PaymentNotification["status"], processedAt?: string): void {
  const payment = paymentNotifications.find(p => p.id === id);
  if (payment) {
    payment.status = status;
    if (processedAt) payment.processedAt = processedAt;
  }
}

// Analytics
export function getAnalyticsData(period: string): AnalyticsData {
  const visitors = getVisitors({ period });
  const now = new Date();
  let cutoffDate = new Date();
  
  if (period === "today") {
    cutoffDate.setHours(0, 0, 0, 0);
  } else if (period === "week") {
    cutoffDate.setDate(now.getDate() - 7);
  } else if (period === "month") {
    cutoffDate.setMonth(now.getMonth() - 1);
  }
  
  const periodVisitors = visitors.filter(v => new Date(v.createdAt) >= cutoffDate);
  const uniqueVisitors = new Set(periodVisitors.map(v => v.sessionId)).size;
  const returningVisitors = periodVisitors.filter(v => v.pagesVisited.length > 1).length;
  
  const pageViews = periodVisitors.reduce((acc, v) => acc + v.pagesVisited.length, 0);
  const avgSessionDuration = periodVisitors.length > 0 
    ? periodVisitors.reduce((acc, v) => acc + v.duration, 0) / periodVisitors.length 
    : 0;
  
  const bounceRate = periodVisitors.length > 0
    ? (periodVisitors.filter(v => v.pagesVisited.length === 1).length / periodVisitors.length) * 100
    : 0;
  
  // Top pages
  const pageCounts = new Map<string, number>();
  periodVisitors.forEach(v => {
    v.pagesVisited.forEach(page => {
      pageCounts.set(page, (pageCounts.get(page) || 0) + 1);
    });
  });
  
  const topPages = Array.from(pageCounts.entries())
    .map(([page, views]) => ({ page, views, uniqueVisitors: views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
  
  // Traffic sources
  const sourceCounts = new Map<string, number>();
  periodVisitors.forEach(v => {
    const source = v.referer || "Direct";
    sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1);
  });
  
  const totalSources = Array.from(sourceCounts.values()).reduce((a, b) => a + b, 0);
  const trafficSources = Array.from(sourceCounts.entries())
    .map(([source, visitors]) => ({ 
      source, 
      visitors, 
      percentage: totalSources > 0 ? (visitors / totalSources) * 100 : 0 
    }))
    .sort((a, b) => b.visitors - a.visitors);
  
  // Devices
  const deviceCounts = new Map<string, number>();
  periodVisitors.forEach(v => {
    deviceCounts.set(v.device.type, (deviceCounts.get(v.device.type) || 0) + 1);
  });
  
  const totalDevices = Array.from(deviceCounts.values()).reduce((a, b) => a + b, 0);
  const devices = Array.from(deviceCounts.entries())
    .map(([type, count]) => ({ 
      type, 
      count, 
      percentage: totalDevices > 0 ? (count / totalDevices) * 100 : 0 
    }))
    .sort((a, b) => b.count - a.count);
  
  return {
    period,
    visitors: {
      total: periodVisitors.length,
      unique: uniqueVisitors,
      returning: returningVisitors
    },
    pageViews,
    avgSessionDuration,
    bounceRate,
    topPages,
    trafficSources,
    devices,
    conversions: {
      orders: 0, // À connecter avec les vraies commandes
      revenue: 0,
      conversionRate: 0
    }
  };
}

// Admin Notifications
const adminNotifications: AdminNotification[] = [];

export function createAdminNotification(notification: Omit<AdminNotification, "id" | "createdAt" | "read">): AdminNotification {
  const newNotification: AdminNotification = {
    ...notification,
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    read: false
  };
  adminNotifications.unshift(newNotification);
  return newNotification;
}

export function getAdminNotifications(): AdminNotification[] {
  return adminNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function markNotificationAsRead(id: string): void {
  const notification = adminNotifications.find(n => n.id === id);
  if (notification) notification.read = true;
}

export function markAllNotificationsAsRead(): void {
  adminNotifications.forEach(n => n.read = true);
}

export function getUnreadNotificationCount(): number {
  return adminNotifications.filter(n => !n.read).length;
}
// Analytics storage system using localStorage with cross-tab synchronization
// This simulates a real database for development/demo purposes

interface VisitorData {
  id: string;
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  referer: string;
  landingPage: string;
  currentPage: string;
  pagesVisited: string[];
  duration: number;
  location: {
    country: string;
    city: string;
    region: string;
  };
  device: {
    type: string;
    os: string;
    browser: string;
  };
  createdAt: string;
  lastActivity: string;
}

interface PageViewData {
  id: string;
  visitorId: string;
  page: string;
  timestamp: string;
  duration: number;
}

// Storage keys
const VISITORS_KEY = 'analytics_visitors';
const PAGE_VIEWS_KEY = 'analytics_page_views';
const ACTIVE_SESSIONS_KEY = 'analytics_active_sessions';
const MAX_VISITORS = 1000; // Limit to prevent quota exceeded

// Safe localStorage operations with quota handling
function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error('localStorage get error:', e);
    return null;
  }
}

function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error('localStorage set error:', e);
    // If quota exceeded, try to clear old data
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      console.warn('Quota exceeded, attempting cleanup');
      cleanupOldData();
    }
    return false;
  }
}

function cleanupOldData() {
  try {
    // Remove old visitors (older than 30 days)
    const visitorsData = safeGetItem(VISITORS_KEY);
    if (visitorsData) {
      const visitors = JSON.parse(visitorsData);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const filteredVisitors = visitors.filter((v: VisitorData) => {
        return new Date(v.createdAt) > thirtyDaysAgo;
      });

      // Keep only the most recent visitors if still too many
      if (filteredVisitors.length > MAX_VISITORS) {
        filteredVisitors.splice(0, filteredVisitors.length - MAX_VISITORS);
      }

      safeSetItem(VISITORS_KEY, JSON.stringify(filteredVisitors));
    }
  } catch (e) {
    console.error('Error cleaning up old data:', e);
  }
}

// Initialize storage
function initializeStorage() {
  if (typeof window === 'undefined') return;

  if (!safeGetItem(VISITORS_KEY)) {
    safeSetItem(VISITORS_KEY, JSON.stringify([]));
  }
  if (!safeGetItem(PAGE_VIEWS_KEY)) {
    safeSetItem(PAGE_VIEWS_KEY, JSON.stringify([]));
  }
  if (!safeGetItem(ACTIVE_SESSIONS_KEY)) {
    safeSetItem(ACTIVE_SESSIONS_KEY, JSON.stringify({}));
  }
}

// Get all visitors
export function getAllVisitors(): VisitorData[] {
  if (typeof window === 'undefined') return [];
  initializeStorage();
  const data = safeGetItem(VISITORS_KEY);
  return data ? JSON.parse(data) : [];
}

// Save all visitors with quota handling
function saveVisitors(visitors: VisitorData[]) {
  if (typeof window === 'undefined') return;

  // Limit number of visitors to prevent quota exceeded
  if (visitors.length > MAX_VISITORS) {
    visitors = visitors.slice(-MAX_VISITORS); // Keep most recent
  }

  const success = safeSetItem(VISITORS_KEY, JSON.stringify(visitors));
  if (success) {
    // Trigger storage event for cross-tab sync
    window.dispatchEvent(new Event('storage'));
  }
}

// Track a new visitor
export function trackVisitor(visitorData: Omit<VisitorData, 'id' | 'createdAt' | 'lastActivity'>): VisitorData {
  if (typeof window === 'undefined') {
    // Return mock data for server-side
    return {
      ...visitorData,
      id: `visitor-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
  }

  initializeStorage();
  const visitors = getAllVisitors();

  const visitor: VisitorData = {
    ...visitorData,
    id: `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString()
  };

  visitors.push(visitor);
  saveVisitors(visitors);

  // Store as active session
  const activeSessions = JSON.parse(safeGetItem(ACTIVE_SESSIONS_KEY) || '{}');
  activeSessions[visitor.sessionId] = {
    visitorId: visitor.id,
    lastActivity: visitor.lastActivity
  };
  safeSetItem(ACTIVE_SESSIONS_KEY, JSON.stringify(activeSessions));

  return visitor;
}

// Update visitor activity
export function updateVisitorActivity(visitorId: string, currentPage: string): void {
  if (typeof window === 'undefined') return;

  const visitors = getAllVisitors();
  const visitor = visitors.find(v => v.id === visitorId);

  if (visitor) {
    visitor.currentPage = currentPage;
    visitor.lastActivity = new Date().toISOString();
    visitor.duration += 30; // Add 30 seconds

    if (!visitor.pagesVisited.includes(currentPage)) {
      visitor.pagesVisited.push(currentPage);
    }

    saveVisitors(visitors);

    // Update active session
    const activeSessions = JSON.parse(safeGetItem(ACTIVE_SESSIONS_KEY) || '{}');
    const sessionId = visitor.sessionId;
    if (activeSessions[sessionId]) {
      activeSessions[sessionId].lastActivity = visitor.lastActivity;
      safeSetItem(ACTIVE_SESSIONS_KEY, JSON.stringify(activeSessions));
    }
  }
}

// Get visitors with filters
export function getVisitors(filters?: { period?: string; status?: string }): VisitorData[] {
  let result = getAllVisitors();

  if (filters?.period) {
    const now = new Date();
    const cutoffDate = new Date();

    if (filters.period === 'today') {
      cutoffDate.setHours(0, 0, 0, 0);
    } else if (filters.period === 'week') {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (filters.period === 'month') {
      cutoffDate.setMonth(now.getMonth() - 1);
    }

    result = result.filter(v => new Date(v.createdAt) >= cutoffDate);
  }

  // Get active sessions
  const activeSessions = JSON.parse(safeGetItem(ACTIVE_SESSIONS_KEY) || '{}');
  const activeSessionIds = Object.values(activeSessions).map((s: any) => s.visitorId);

  if (filters?.status === 'active') {
    result = result.filter(v => activeSessionIds.includes(v.id));
  } else if (filters?.status === 'offline') {
    result = result.filter(v => !activeSessionIds.includes(v.id));
  }

  return result.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
}

// Get active visitor count
export function getActiveVisitorCount(): number {
  if (typeof window === 'undefined') return 0;
  const activeSessions = JSON.parse(localStorage.getItem(ACTIVE_SESSIONS_KEY) || '{}');
  
  // Remove sessions inactive for more than 5 minutes
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  
  let cleanedSessions: any = {};
  Object.entries(activeSessions).forEach(([sessionId, data]: [string, any]) => {
    if (new Date(data.lastActivity) > fiveMinutesAgo) {
      cleanedSessions[sessionId] = data;
    }
  });
  
  safeSetItem(ACTIVE_SESSIONS_KEY, JSON.stringify(cleanedSessions));
  
  return Object.keys(cleanedSessions).length;
}

// Get analytics data
export function getAnalyticsData(period: string) {
  const visitors = getVisitors({ period });
  const now = new Date();
  let cutoffDate = new Date();

  if (period === 'today') {
    cutoffDate.setHours(0, 0, 0, 0);
  } else if (period === 'week') {
    cutoffDate.setDate(now.getDate() - 7);
  } else if (period === 'month') {
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
    const source = v.referer || 'Direct';
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
      returning: returningVisitors,
      active: getActiveVisitorCount()
    },
    pageViews,
    avgSessionDuration,
    bounceRate,
    topPages,
    trafficSources,
    devices,
    conversions: {
      orders: 0,
      revenue: 0,
      conversionRate: 0
    }
  };
}

// Export data for backup
export function exportAnalyticsData() {
  return {
    visitors: getAllVisitors(),
    pageViews: JSON.parse(safeGetItem(PAGE_VIEWS_KEY) || '[]'),
    activeSessions: JSON.parse(safeGetItem(ACTIVE_SESSIONS_KEY) || '{}'),
    exportedAt: new Date().toISOString()
  };
}

// Clear all analytics data
export function clearAnalyticsData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(VISITORS_KEY);
  localStorage.removeItem(PAGE_VIEWS_KEY);
  localStorage.removeItem(ACTIVE_SESSIONS_KEY);
  initializeStorage();
}

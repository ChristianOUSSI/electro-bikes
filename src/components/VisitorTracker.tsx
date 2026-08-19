"use client";

import { useEffect, useState } from "react";
import { trackVisitor, updateVisitorActivity } from "@/lib/admin";

export default function VisitorTracker() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("");

  useEffect(() => {
    // Only track on client side
    if (typeof window === "undefined") return;

    // Get or create session ID
    let sessionId = sessionStorage.getItem("visitor_session_id");
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("visitor_session_id", sessionId);
    }

    // Detect device info
    const userAgent = navigator.userAgent;
    const deviceType = /Mobile|Android|iPhone/i.test(userAgent) ? "mobile" :
                      /Tablet|iPad/i.test(userAgent) ? "tablet" : "desktop";
    
    const os = /Windows/i.test(userAgent) ? "Windows" :
               /Mac/i.test(userAgent) ? "MacOS" :
               /Linux/i.test(userAgent) ? "Linux" :
               /Android/i.test(userAgent) ? "Android" :
               /iOS/i.test(userAgent) ? "iOS" : "Unknown";
    
    const browser = /Chrome/i.test(userAgent) ? "Chrome" :
                    /Firefox/i.test(userAgent) ? "Firefox" :
                    /Safari/i.test(userAgent) ? "Safari" :
                    /Edge/i.test(userAgent) ? "Edge" : "Unknown";

    // Track initial visitor
    const visitor = trackVisitor({
      sessionId,
      ipAddress: "unknown", // In production, this would come from server
      userAgent,
      referer: document.referrer,
      landingPage: window.location.pathname,
      currentPage: window.location.pathname,
      pagesVisited: [window.location.pathname],
      duration: 0,
      location: {
        country: "Unknown",
        city: "Unknown",
        region: "Unknown"
      },
      device: {
        type: deviceType as any,
        os,
        browser
      }
    });

    setVisitorId(visitor.id);
    setCurrentPage(window.location.pathname);

    // Set up activity tracking interval
    const activityInterval = setInterval(() => {
      if (visitorId) {
        updateVisitorActivity(visitorId, window.location.pathname);
      }
    }, 30000); // Update every 30 seconds

    // Track page changes
    const handleRouteChange = () => {
      const newPage = window.location.pathname;
      if (visitorId && newPage !== currentPage) {
        updateVisitorActivity(visitorId, newPage);
        setCurrentPage(newPage);
      }
    };

    // Listen for route changes (for SPA)
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      clearInterval(activityInterval);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [visitorId, currentPage]);

  // This component doesn't render anything visible
  return null;
}
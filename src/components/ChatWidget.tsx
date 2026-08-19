"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { MessageSquare, X, Send, Minimize2, Maximize2, GripVertical, Sparkles } from "lucide-react";
import { createChatSession, addChatMessage, getVisitorUnreadCount, subscribeToChatUpdates } from "@/lib/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [visitorInfo, setVisitorInfo] = useState({ name: "", email: "" });
  const [isRegistered, setIsRegistered] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const visitorIdRef = useRef<string>(`visitor-${Date.now()}`);
  const lastUpdateTimeRef = useRef<number>(0);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const rect = e.currentTarget.getBoundingClientRect();
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: clientX - rect.left,
      y: clientY - rect.top
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;

    // Marquer qu'on a bougé si le mouvement est significatif (> 5px)
    if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
      setHasMoved(true);
    }

    // Keep button within viewport bounds
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 80;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  }, [isDragging, dragStart, position]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  // Subscribe to real-time chat updates
  useEffect(() => {
    if (!sessionId) return;

    const unsubscribe = subscribeToChatUpdates(() => {
      // Throttle updates to avoid excessive re-renders
      const now = Date.now();
      if (now - lastUpdateTimeRef.current < 100) return; // 100ms throttle
      lastUpdateTimeRef.current = now;

      // Reload messages when chat updates
      const session = (window as any).getChatSession?.(sessionId);
      if (session) {
        setMessages(session.messages);
        // Check for unread admin messages
        const unread = getVisitorUnreadCount(visitorIdRef.current);
        setUnreadCount(unread);
      }
    });

    return () => unsubscribe();
  }, [sessionId]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Marquer qu'on a bougé si le mouvement est significatif (> 5px)
      if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
        setHasMoved(true);
      }

      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;

      // Marquer qu'on a bougé si le mouvement est significatif (> 5px)
      if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
        setHasMoved(true);
      }

      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setHasMoved(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalTouchMove);
      window.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart.x, dragStart.y, position.x, position.y]);

  const handleRegister = useCallback(async () => {
    if (!visitorInfo.name.trim()) {
      alert("Veuillez entrer votre nom");
      return;
    }

    const session = createChatSession(
      visitorIdRef.current,
      visitorInfo.name,
      visitorInfo.email || undefined
    );

    setSessionId(session.id);
    setIsRegistered(true);

    // Add welcome message
    const welcomeMsg = addChatMessage(session.id, {
      visitorId: session.visitorId,
      visitorName: visitorInfo.name,
      visitorEmail: visitorInfo.email,
      message: `Bonjour ${visitorInfo.name} ! Bienvenue sur Electro Bikes. Comment puis-je vous aider concernant nos vélos et motos électriques ?`,
      isAdmin: true,
      read: false
    });

    setMessages([welcomeMsg]);
  }, [visitorInfo.name, visitorInfo.email]);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim() || !sessionId) return;

    const userMessage = addChatMessage(sessionId, {
      visitorId: visitorIdRef.current,
      visitorName: visitorInfo.name,
      visitorEmail: visitorInfo.email,
      message: message.trim(),
      isAdmin: false,
      read: false
    });

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate admin response (in production, this would be real-time from admin panel)
    setTimeout(() => {
      const responses = [
        "Merci pour votre message ! Un conseiller spécialisé en véhicules électriques va vous répondre rapidement.",
        "Je suis là pour vous aider concernant nos vélos et motos électriques. Pouvez-vous me donner plus de détails ?",
        "Compris, je transmets votre demande à notre équipe technique spécialisée.",
        "Je vais vérifier les informations sur nos modèles électriques pour vous tout de suite."
      ];

      const adminResponse = addChatMessage(sessionId, {
        visitorId: visitorIdRef.current,
        visitorName: visitorInfo.name,
        visitorEmail: visitorInfo.email,
        message: responses[Math.floor(Math.random() * responses.length)],
        isAdmin: true,
        read: false
      });

      setMessages(prev => [...prev, adminResponse]);
      setIsTyping(false);
    }, 1500);
  }, [message, sessionId, visitorInfo.name, visitorInfo.email]);

  const handleVisitorInfoChange = useCallback((field: 'name' | 'email', value: string) => {
    setVisitorInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleToggleOpen = useCallback(() => {
    if (!hasMoved) {
      setIsOpen(true);
    }
  }, [hasMoved]);

  const handleToggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleHeaderDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const rect = e.currentTarget.getBoundingClientRect();
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: clientX - rect.left,
      y: clientY - rect.top
    });
  }, []);

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div
          ref={buttonRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className="fixed z-[9999] cursor-move touch-none"
          style={{
            right: position.x === 0 ? '1.5rem' : 'auto',
            bottom: position.y === 0 ? '1.5rem' : 'auto',
            left: position.x !== 0 ? `${position.x}px` : 'auto',
            top: position.y !== 0 ? `${position.y}px` : 'auto',
          }}
        >
          <button
            onClick={handleToggleOpen}
            className="relative group bg-gradient-to-br from-[#1a1a1f] to-[#0d0d10] border border-[#c8ff00]/30 hover:border-[#c8ff00]/60 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[#c8ff00]/20"
            style={{
              boxShadow: isDragging ? '0 25px 50px -12px rgba(200, 255, 0, 0.25)' : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
            }}
            title="Discuter avec nous"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#c8ff00]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageSquare className="w-6 h-6 relative z-10 text-[#c8ff00]" />
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-[#c8ff00] animate-pulse" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bg-[#0d0d10] rounded-2xl shadow-2xl border border-[#c8ff00]/20 z-[9999] transition-all overflow-hidden ${
            isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
          }`}
          style={{
            right: position.x === 0 ? '1.5rem' : 'auto',
            bottom: position.y === 0 ? '1.5rem' : 'auto',
            left: position.x !== 0 ? `${position.x}px` : 'auto',
            top: position.y !== 0 ? `${position.y}px` : 'auto',
            boxShadow: '0 25px 50px -12px rgba(200, 255, 0, 0.15)',
          }}
        >
          {/* Header */}
          <div
            className="bg-gradient-to-r from-[#1a1a1f] to-[#0d0d10] p-4 flex items-center justify-between border-b border-[#c8ff00]/20 cursor-move select-none touch-none"
            onMouseDown={handleHeaderDragStart}
            onTouchStart={handleHeaderDragStart}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#c8ff00]/10 rounded-full flex items-center justify-center border border-[#c8ff00]/30">
                <MessageSquare className="w-5 h-5 text-[#c8ff00]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Support Client</h3>
                <p className="text-[#c8ff00]/70 text-sm flex items-center space-x-1">
                  <span className="w-2 h-2 bg-[#c8ff00] rounded-full animate-pulse" />
                  <span>En ligne</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <GripVertical className="w-4 h-4 text-[#c8ff00]/50" />
              <button
                onClick={handleToggleMinimize}
                className="p-2 hover:bg-[#c8ff00]/10 rounded-lg transition-colors text-[#c8ff00]/70 hover:text-[#c8ff00]"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-[#c8ff00]/10 rounded-lg transition-colors text-[#c8ff00]/70 hover:text-[#c8ff00]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Content */}
              <div className="flex flex-col h-[calc(100%-120px)]">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {!isRegistered ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[#c8ff00]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#c8ff00]/30">
                          <MessageSquare className="w-8 h-8 text-[#c8ff00]" />
                        </div>
                        <h4 className="text-white font-semibold mb-2">Bienvenue !</h4>
                        <p className="text-gray-400 text-sm">Comment pouvons-nous vous aider ?</p>
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Votre nom *"
                          value={visitorInfo.name}
                          onChange={(e) => handleVisitorInfoChange('name', e.target.value)}
                          onFocus={() => setIsInputFocused(true)}
                          onBlur={() => setIsInputFocused(false)}
                          className="w-full bg-[#1a1a1f] border border-[#c8ff00]/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8ff00]/50 focus:border-[#c8ff00]/50 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Votre email (optionnel)"
                          value={visitorInfo.email}
                          onChange={(e) => handleVisitorInfoChange('email', e.target.value)}
                          onFocus={() => setIsInputFocused(true)}
                          onBlur={() => setIsInputFocused(false)}
                          className="w-full bg-[#1a1a1f] border border-[#c8ff00]/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8ff00]/50 focus:border-[#c8ff00]/50 transition-all"
                        />
                        <button
                          onClick={handleRegister}
                          className="w-full bg-gradient-to-r from-[#c8ff00] to-[#a0cc00] hover:from-[#a0cc00] hover:to-[#8bb800] text-black font-semibold py-2 rounded-lg transition-all duration-300 shadow-[#c8ff00]/20 hover:shadow-[#c8ff00]/30"
                        >
                          Commencer la discussion
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {messages.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50 text-[#c8ff00]" />
                          <p>Démarrez la conversation !</p>
                        </div>
                      ) : (
                        messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.isAdmin ? "justify-start" : "justify-end"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                msg.isAdmin
                                  ? "bg-[#1a1a1f] border border-[#c8ff00]/20 text-white"
                                  : "bg-gradient-to-r from-[#c8ff00] to-[#a0cc00] text-black"
                              }`}
                            >
                              <p className="text-sm">{msg.message}</p>
                              <p className={`text-xs mt-1 ${msg.isAdmin ? "text-gray-400" : "text-black/70"}`}>
                                {new Date(msg.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-[#1a1a1f] border border-[#c8ff00]/20 rounded-lg p-3">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 bg-[#c8ff00] rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-[#c8ff00] rounded-full animate-bounce delay-100" />
                              <div className="w-2 h-2 bg-[#c8ff00] rounded-full animate-bounce delay-200" />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Input Area */}
                {isRegistered && (
                  <div className="p-4 border-t border-[#c8ff00]/20">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={message}
                        onChange={handleMessageChange}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        placeholder="Écrivez votre message..."
                        className="flex-1 bg-[#1a1a1f] border border-[#c8ff00]/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8ff00]/50 focus:border-[#c8ff00]/50 transition-all"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="p-2 bg-gradient-to-r from-[#c8ff00] to-[#a0cc00] hover:from-[#a0cc00] hover:to-[#8bb800] disabled:from-gray-600 disabled:to-gray-700 text-black rounded-lg transition-all duration-300 shadow-[#c8ff00]/20 hover:shadow-[#c8ff00]/30"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
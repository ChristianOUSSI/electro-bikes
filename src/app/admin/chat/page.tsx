"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Send,
  Users,
  Clock,
  Check,
  CheckCheck,
  X,
  Phone,
  Mail
} from "lucide-react";
import { getChatSessions, addChatMessage, updateChatSessionStatus, markMessagesAsRead, subscribeToChatUpdates } from "@/lib/chat";
import AdminLayout from "@/components/AdminLayout";

export default function AdminChat() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSessions();
    // Subscribe to real-time updates
    const unsubscribe = subscribeToChatUpdates(() => {
      loadSessions();
      if (selectedSession) {
        const updatedSessions = getChatSessions();
        const updatedSession = updatedSessions.find(s => s.id === selectedSession.id);
        setSelectedSession(updatedSession);
      }
    });

    return () => unsubscribe();
  }, [filter, selectedSession]);

  const loadSessions = () => {
    const statusFilter = filter === "all" ? undefined : filter;
    setSessions(getChatSessions({ status: statusFilter }));
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedSession) return;

    setLoading(true);
    try {
      await addChatMessage(selectedSession.id, {
        visitorId: selectedSession.visitorId,
        visitorName: selectedSession.visitorName,
        visitorEmail: selectedSession.visitorEmail,
        message: message.trim(),
        isAdmin: true,
        read: false
      });

      setMessage("");
      loadSessions();
      
      // Reload selected session to get new messages
      const updatedSessions = getChatSessions();
      const updatedSession = updatedSessions.find(s => s.id === selectedSession.id);
      setSelectedSession(updatedSession);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSessionSelect = (session: any) => {
    setSelectedSession(session);
    markMessagesAsRead(session.id, true);
    loadSessions();
  };

  const handleStatusChange = async (sessionId: string, status: "pending" | "active" | "closed") => {
    await updateChatSessionStatus(sessionId, status);
    loadSessions();
    if (selectedSession?.id === sessionId) {
      const updatedSessions = getChatSessions();
      setSelectedSession(updatedSessions.find(s => s.id === sessionId));
    }
  };

  const filteredSessions = sessions.filter(session => {
    if (filter === "all") return true;
    return session.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "closed": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Actif";
      case "pending": return "En attente";
      case "closed": return "Fermé";
      default: return status;
    }
  };

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-200px)]">
      {/* Sessions List */}
      <div className="w-1/3 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Sessions de chat</h2>
          <div className="flex space-x-2">
            {["all", "active", "pending", "closed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {status === "all" ? "Tous" : getStatusLabel(status)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <MessageSquare className="w-12 h-12 mb-4" />
              <p>Aucune session de chat</p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => handleSessionSelect(session)}
                className={`p-4 border-b border-gray-700 cursor-pointer transition-colors ${
                  selectedSession?.id === session.id
                    ? "bg-gray-700/50"
                    : "hover:bg-gray-700/30"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {session.visitorName?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {session.visitorName || "Visiteur"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {session.visitorEmail || "Non connecté"}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(session.status)}`}>
                    {getStatusLabel(session.status)}
                  </span>
                </div>
                <p className="text-gray-400 text-sm truncate">
                  {session.messages[session.messages.length - 1]?.message || "Nouveau chat"}
                </p>
                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>
                    {new Date(session.lastMessageAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedSession ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedSession.visitorName?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    {selectedSession.visitorName || "Visiteur"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {selectedSession.visitorEmail || "Non connecté"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {selectedSession.visitorEmail && (
                  <a
                    href={`mailto:${selectedSession.visitorEmail}`}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                <select
                  value={selectedSession.status}
                  onChange={(e) => handleStatusChange(selectedSession.id, e.target.value as "pending" | "active" | "closed")}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Actif</option>
                  <option value="pending">En attente</option>
                  <option value="closed">Fermé</option>
                </select>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedSession.messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <MessageSquare className="w-12 h-12 mb-4" />
                  <p>Aucun message</p>
                  <p className="text-sm">Envoyez le premier message pour commencer la conversation</p>
                </div>
              ) : (
                selectedSession.messages.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.isAdmin
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {!msg.isAdmin && (
                        <p className="text-xs text-gray-400 mb-1">
                          {msg.visitorName || "Visiteur"}
                        </p>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      <div className="flex items-center justify-end space-x-1 mt-1">
                        <span className="text-xs opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                        {msg.isAdmin && (
                          msg.read ? (
                            <CheckCheck className="w-3 h-3 opacity-70" />
                          ) : (
                            <Check className="w-3 h-3 opacity-70" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Écrivez votre message..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading || !message.trim()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Users className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sélectionnez une conversation</h3>
            <p>Choisissez une session de chat dans la liste pour commencer</p>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
}
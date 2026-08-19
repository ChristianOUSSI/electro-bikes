import { NextRequest, NextResponse } from "next/server";
import { 
  getChatSessions, 
  createChatSession, 
  addChatMessage, 
  updateChatSessionStatus,
  markMessagesAsRead 
} from "@/lib/admin";

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const status = params.get("status") || undefined;
  const assignedTo = params.get("assignedTo") || undefined;

  const sessions = getChatSessions({ status, assignedTo });
  
  return NextResponse.json({ sessions, total: sessions.length });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case "create_session":
        const session = createChatSession(data.visitorId, data.visitorName, data.visitorEmail);
        return NextResponse.json({ session }, { status: 201 });

      case "send_message":
        const message = addChatMessage(data.sessionId, {
          visitorId: data.visitorId,
          visitorName: data.visitorName,
          visitorEmail: data.visitorEmail,
          message: data.message,
          isAdmin: data.isAdmin,
          read: false
        });
        return NextResponse.json({ message }, { status: 201 });

      case "update_status":
        updateChatSessionStatus(data.sessionId, data.status, data.assignedTo);
        return NextResponse.json({ success: true });

      case "mark_read":
        markMessagesAsRead(data.sessionId, data.isAdmin);
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing chat request" },
      { status: 500 }
    );
  }
}
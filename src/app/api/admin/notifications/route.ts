import { NextRequest, NextResponse } from "next/server";
import { 
  getAdminNotifications, 
  createAdminNotification, 
  markNotificationAsRead,
  markAllNotificationsAsRead 
} from "@/lib/admin";

export function GET() {
  const notifications = getAdminNotifications();
  return NextResponse.json({ notifications });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case "create":
        const notification = createAdminNotification(data);
        return NextResponse.json({ notification }, { status: 201 });

      case "mark_read":
        markNotificationAsRead(data.id);
        return NextResponse.json({ success: true });

      case "mark_all_read":
        markAllNotificationsAsRead();
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing notification request" },
      { status: 500 }
    );
  }
}
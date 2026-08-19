import { NextRequest, NextResponse } from "next/server";
import { 
  getPaymentNotifications, 
  createPaymentNotification, 
  updatePaymentStatus 
} from "@/lib/admin";

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const status = params.get("status") || undefined;
  const type = params.get("type") || undefined;

  const payments = getPaymentNotifications({ status, type });
  
  return NextResponse.json({ payments, total: payments.length });
}

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json();
    
    const payment = createPaymentNotification(paymentData);
    
    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating payment notification" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status, processedAt } = await request.json();
    
    updatePaymentStatus(id, status, processedAt);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating payment status" },
      { status: 500 }
    );
  }
}
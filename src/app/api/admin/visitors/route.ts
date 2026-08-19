import { NextRequest, NextResponse } from "next/server";
import { getVisitors } from "@/lib/admin";

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const period = params.get("period") || "today";
  const status = params.get("status") || undefined;

  const visitors = getVisitors({ period, status });
  
  return NextResponse.json({ visitors, total: visitors.length });
}
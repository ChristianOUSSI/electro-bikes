import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/admin";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }
    
    const admin = authenticateAdmin(email, password);
    
    if (!admin) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }
    
    // Retourner l'admin sans le mot de passe
    const { password: _, ...safeAdmin } = admin;
    
    return NextResponse.json({ admin: safeAdmin });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'authentification" },
      { status: 500 }
    );
  }
}
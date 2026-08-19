"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession } from "@/lib/admin";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      router.push("/admin/dashboard");
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white">Redirection...</div>
    </div>
  );
}

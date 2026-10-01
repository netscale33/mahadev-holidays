"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function check() {
      const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
      if (!token) {
        setIsAuthenticated(false);
        router.push("/admin/login");
        return;
      }
      try {
        const res = await fetch("/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("invalid");
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("admin_token");
        sessionStorage.removeItem("admin_token");
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    }
    check();
  }, [router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-primary-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

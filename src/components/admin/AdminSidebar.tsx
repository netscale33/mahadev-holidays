"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  MapPin,
  CalendarCheck,
  Image,
  Users,
  Shield,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  MessageSquare,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  section: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Dashboard", section: "dashboard", icon: LayoutDashboard },
  { label: "Destinations", section: "destinations", icon: MapPin },
  { label: "Bookings", section: "bookings", icon: CalendarCheck },
  { label: "Inquiries", section: "inquiries", icon: MessageSquare },
  { label: "Media Library", section: "media", icon: Image },
  { label: "Customers", section: "customers", icon: Users },
  { label: "User Management", section: "users", icon: Shield },
  { label: "Profile & Settings", section: "profile", icon: Settings },
];

interface AdminSidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onLogout: () => void;
}

export default function AdminSidebar({ activeSection, onNavigate, onLogout }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-cream p-2 rounded-lg"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-primary text-cream flex flex-col transition-all duration-300 border-r border-primary-700",
          collapsed ? "w-20" : "w-64",
          "lg:relative lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-primary-700">
          <button onClick={() => onNavigate("dashboard")} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-lg">
              MH
            </div>
            {!collapsed && (
              <span className="font-serif text-xl font-bold text-cream tracking-wide">
                Mahadev
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setCollapsed(!collapsed);
              setMobileOpen(false);
            }}
            className="text-cream/60 hover:text-cream transition-colors hidden lg:block"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft
              size={18}
              className={cn("transition-transform", collapsed && "rotate-180")}
            />
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-cream/60 hover:text-cream transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section;
            return (
              <button
                key={item.section}
                onClick={() => { onNavigate(item.section); setMobileOpen(false); }}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 group text-left",
                  isActive
                    ? "bg-accent/20 text-accent border border-accent/30"
                    : "text-cream/70 hover:text-cream hover:bg-primary-700/50"
                )}
              >
                <Icon
                  size={20}
                  className={cn(
                    "shrink-0",
                    isActive
                      ? "text-accent"
                      : "text-cream/50 group-hover:text-cream/80"
                  )}
                />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-primary-700">
          <button
            onClick={onLogout}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-cream/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            )}
          >
            <LogOut size={20} className="shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

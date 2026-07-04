"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AdminHeaderProps {
  title: string;
  onMenuToggle?: () => void;
  userName?: string;
  userEmail?: string;
  notificationCount?: number;
}

export default function AdminHeader({
  title,
  onMenuToggle,
  userName = "Admin",
  userEmail = "admin@mahadevholidays.com",
  notificationCount = 3,
}: AdminHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-cream-dark/30 px-4 lg:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-navy-900 hover:bg-cream transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-navy-900 font-serif">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="relative p-2 rounded-lg text-navy-500 hover:text-navy-900 hover:bg-cream transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-cream transition-colors"
            aria-label="User menu"
          >
            <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-navy-800 text-sm font-bold">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-navy-900 leading-tight">
                {userName}
              </p>
              <p className="text-xs text-navy-400">{userEmail}</p>
            </div>
            <ChevronDown
              size={16}
              className={cn(
                "text-navy-400 transition-transform",
                dropdownOpen && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-cream-dark/20 overflow-hidden"
              >
                <div className="p-3 border-b border-cream-dark/10">
                  <p className="text-sm font-medium text-navy-900">
                    {userName}
                  </p>
                  <p className="text-xs text-navy-400">{userEmail}</p>
                </div>
                <div className="p-1">
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-navy-700 hover:bg-cream rounded-lg transition-colors">
                    <User size={16} />
                    Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

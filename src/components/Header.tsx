"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com/mahadevholidays",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/_mahadev_holidays",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@mahadevholidays",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/mahadevholidays",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const containerTransition = { duration: 0.6, ease: "easeOut" } as const;

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);
  const openMobile  = () => setMobileOpen(true);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={containerTransition}
      className="fixed top-0 left-0 right-0 z-[60] bg-white/98 backdrop-blur-md shadow-lg shadow-black/5 py-2 border-b border-gray-200/50"
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-auto overflow-hidden">
        <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0 py-1 min-w-0">
          <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white shrink-0">
            <Image
              src="/logo.png"
              alt="Mahadev Holidays Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          {/* Logo text — hide on small mobile to give hamburger space */}
          <div className="hidden sm:flex flex-col">
            <span className="font-heading font-black text-lg md:text-xl leading-none tracking-tight text-primary">
              MAHADEV
            </span>
            <span className="font-heading font-bold text-xs md:text-sm tracking-[0.25em] text-accent mt-0.5 leading-none">
              HOLIDAYS
            </span>
          </div>
          {/* Very small screen: show abbreviated text */}
          <div className="flex sm:hidden flex-col">
            <span className="font-heading font-black text-sm leading-none tracking-tight text-primary">MAHADEV</span>
            <span className="font-heading font-bold text-[9px] tracking-[0.2em] text-accent mt-0.5 leading-none">HOLIDAYS</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-primary hover:text-accent text-sm font-bold tracking-wider uppercase transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden lg:inline-flex px-8 py-3 bg-accent hover:bg-accent-600 text-white font-bold rounded-full text-sm tracking-wide transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50"
          >
            Plan Your Trip
          </Link>
          {/* ── Hamburger button — accent bg, always visible on mobile ── */}
          <button
            onClick={openMobile}
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-accent text-white shadow-md shrink-0 touch-manipulation active:scale-95 transition-transform"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* ─── Backdrop ─── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden"
              onClick={closeMobile}
            />
            {/* ─── Slide-in Panel ─── */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
              className="fixed top-0 right-0 bottom-0 w-[300px] max-w-[88vw] bg-white z-[50] lg:hidden shadow-2xl shadow-black/25 overflow-y-auto"
            >
              <div className="flex flex-col h-full pt-6 pb-8 px-6">
                {/* ── Panel header: logo + close button ── */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <Link href="/" onClick={closeMobile} className="flex items-center gap-2.5 shrink-0">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-gray-100 bg-white">
                      <Image
                        src="/logo.png"
                        alt="Mahadev Holidays Logo"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-heading font-black text-base leading-none tracking-tight text-primary">
                        MAHADEV
                      </span>
                      <span className="font-heading font-bold text-[10px] tracking-[0.2em] text-accent mt-0.5 leading-none">
                        HOLIDAYS
                      </span>
                    </div>
                  </Link>
                  {/* Dedicated close button — big tap target */}
                  <button
                    onClick={closeMobile}
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-primary transition-colors touch-manipulation"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* Nav links */}
                <div className="flex flex-col gap-0.5">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobile}
                        className="flex items-center py-3.5 text-primary hover:text-accent text-base font-bold transition-colors border-b border-gray-100 active:bg-accent/5 touch-manipulation"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-auto space-y-6">
                  <Link
                    href="/contact"
                    onClick={closeMobile}
                    className="block text-center px-6 py-3 bg-accent hover:bg-accent-600 text-white font-bold rounded-full text-sm transition-all duration-300"
                  >
                    Plan Your Trip
                  </Link>
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200/50">
                    {SOCIAL_LINKS.map(({ icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="text-accent/70 hover:text-accent transition-colors duration-300"
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                  <div className="flex justify-center pt-6">
                    <a
                      href="https://zorvent.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white rounded-full shadow-lg font-bold text-[9px] tracking-wider animate-pulse hover:scale-105 transition-all"
                    >
                      <span>DESIGNED & DEVELOPED BY</span>
                      <span className="font-black text-yellow-200 tracking-widest">ZORVENT</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

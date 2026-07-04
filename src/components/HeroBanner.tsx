"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

interface HeroBannerProps {
  videoSrc?: string;
  fallbackImage: string;
  headline: string;
  subtitle: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

export default function HeroBanner({
  videoSrc,
  fallbackImage,
  headline,
  subtitle,
  primaryCTA,
  secondaryCTA,
}: HeroBannerProps) {
  const [displayText, setDisplayText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setTypingDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(subtitle.slice(0, i + 1));
      i++;
      if (i >= subtitle.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [subtitle]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background/Fallback Image always rendered to prevent blank/black screen while video loads or fails */}
      <Image
        src={fallbackImage}
        alt={headline}
        fill
        className="object-cover"
        priority
      />

      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-accent/40 via-gold/20 to-primary/50 z-20" />

      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block px-4 py-1.5 border border-accent/50 rounded-full text-accent text-xs tracking-[0.2em] uppercase mb-6 font-bold drop-shadow-lg shadow-accent/30"
        >
          Explore • Experience • Enjoy
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-tight max-w-5xl mb-4 md:mb-6 [text-shadow:0_4px_16px_rgba(0,0,0,0.9)] select-none px-2"
        >
          Discover the <span className="zorvent-shimmer font-black select-none [text-shadow:none]">Extraordinary</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="px-4 md:px-8 py-2.5 md:py-3 bg-black/60 backdrop-blur-md border border-white/20 rounded-full mb-6 md:mb-8 shadow-2xl max-w-[90vw] md:max-w-none"
        >
          <p className="text-sm md:text-xl lg:text-2xl text-white font-heading font-extrabold tracking-wide select-none">
            {displayText}
            {typingDone ? (
              <span className="animate-pulse text-gold font-black">|</span>
            ) : (
              <span className="animate-pulse text-accent font-black">|</span>
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {primaryCTA && (
            <Link
              href={primaryCTA.href}
              className="px-8 py-3.5 bg-accent text-white font-bold rounded-full text-sm tracking-wide hover:bg-accent-600 transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50 flex items-center gap-2 group"
            >
              {primaryCTA.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="px-8 py-3.5 border border-white/30 text-white rounded-full text-sm tracking-wide hover:bg-white/10 transition-all duration-300"
            >
              {secondaryCTA.label}
            </Link>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, ArrowUpRight } from "lucide-react";

interface DestinationCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  rating: number;
  duration: string;
  price: number;
  type: string;
  href: string;
}

const TYPE_COLORS: Record<string, string> = {
  Nature: "bg-emerald-500",
  Adventure: "bg-orange-500",
  Luxury: "bg-accent",
  Cultural: "bg-purple-500",
  Beach: "bg-cyan-500",
  Heritage: "bg-amber-600",
  Wellness: "bg-rose-500",
};

export default function DestinationCard({
  image,
  title,
  location,
  rating,
  duration,
  price,
  type,
  href,
}: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 active:scale-[0.98] touch-manipulation"
    >
      <Link href={href} className="block">
        <div className="relative h-52 sm:h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/40 via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 left-3 z-10">
            <span
              className={`px-3 py-1 rounded-full text-white text-[10px] font-semibold uppercase tracking-wider ${
                TYPE_COLORS[type] || "bg-accent"
              }`}
            >
              {type}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-primary font-bold text-sm">
              ₹{price.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Hover quick-view — desktop only */}
          <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
            <span className="px-5 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-colors">
              Quick View
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  i < Math.floor(rating)
                    ? "fill-accent text-accent"
                    : i < rating
                    ? "fill-accent/50 text-accent"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="text-primary/80 text-xs sm:text-sm ml-1 font-semibold">{rating}</span>
          </div>

          <h3 className="font-heading text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 leading-tight">
            {title}
          </h3>

          <div className="flex items-center justify-between text-xs sm:text-sm text-primary/80 font-semibold">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate max-w-[100px] sm:max-w-none">{location}</span>
            </span>
            <span className="flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {duration}
            </span>
          </div>

          {/* Mobile-only always-visible CTA */}
          <div className="sm:hidden pt-1">
            <span className="inline-flex items-center gap-1 text-accent text-xs font-bold">
              View Details <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}


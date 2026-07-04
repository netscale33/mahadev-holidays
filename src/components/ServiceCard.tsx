"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="w-14 h-14 rounded-xl bg-accent/5 flex items-center justify-center mb-5 group-hover:bg-accent transition-colors duration-500">
        <Icon className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-500" />
      </div>

      <h3 className="font-heading text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>

      <p className="text-primary/80 text-base leading-relaxed font-semibold">{description}</p>
    </motion.div>
  );
}

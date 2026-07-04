"use client";

import { MessageCircle } from "lucide-react";

interface NewsletterProps {
  background?: "cream" | "primary";
}

export default function Newsletter({ background = "cream" }: NewsletterProps) {
  const isPrimary = background === "primary";

  return (
    <div
      className={`rounded-2xl p-8 md:p-12 relative overflow-hidden ${
        isPrimary ? "bg-gradient-to-br from-accent/10 via-gold/5 to-secondary/10 border border-gold/10" : "bg-cream"
      }`}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #C9A227 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isPrimary ? "bg-accent/20" : "bg-accent/10"
          }`}
        >
          <MessageCircle
            className={`w-6 h-6 ${isPrimary ? "text-accent" : "text-accent"}`}
          />
        </div>

        <h3
          className={`font-heading text-2xl md:text-3xl font-bold mb-3 ${
            isPrimary ? "text-primary" : "text-primary"
          }`}
        >
          Subscribe on WhatsApp
        </h3>
        <p
          className={`text-sm mb-6 ${
            isPrimary ? "text-primary/85" : "text-primary/70"
          }`}
        >
          Get exclusive travel deals, hidden gems, and luxury insights delivered
          directly to your WhatsApp.
        </p>

        <a
          href="https://wa.me/919328151481?text=Hello%20Mahadev%20Holidays%2C%20I%27d%20like%20to%20subscribe%20to%20your%20WhatsApp%20updates%20for%20exclusive%20travel%20deals%20and%20offers."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          Subscribe on WhatsApp
        </a>

        <p
          className={`text-[10px] mt-3 ${
            isPrimary ? "text-primary/30" : "text-primary/30"
          }`}
        >
          No spam, ever. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  );
}

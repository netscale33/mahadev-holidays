import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const DESTINATIONS = [
  { label: "Kashmir", href: "/destinations/kashmir" },
  { label: "Goa", href: "/destinations/goa" },
  { label: "Kerala", href: "/destinations/kerala" },
  { label: "Rajasthan", href: "/destinations/rajasthan" },
  { label: "Ladakh", href: "/destinations/ladakh" },
  { label: "Andaman", href: "/destinations/andaman" },
];

const SocialFacebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const SocialInstagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const SocialYoutube = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const SocialLinkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIAL_LINKS = [
  { icon: SocialFacebook, href: "https://facebook.com/mahadevholidays", label: "Facebook", hoverColor: "hover:bg-blue-600 hover:text-white hover:border-blue-600" },
  { icon: SocialInstagram, href: "https://instagram.com/_mahadev_holidays", label: "Instagram", hoverColor: "hover:bg-pink-500 hover:text-white hover:border-pink-500" },
  { icon: SocialYoutube, href: "https://youtube.com/@mahadevholidays", label: "YouTube", hoverColor: "hover:bg-red-600 hover:text-white hover:border-red-600" },
  { icon: SocialLinkedin, href: "https://linkedin.com/company/mahadevholidays", label: "LinkedIn", hoverColor: "hover:bg-blue-700 hover:text-white hover:border-blue-700" },
];

const PAYMENT_METHODS = [
  { name: "Visa", icon: "/icons/visa.svg" },
  { name: "Mastercard", icon: "/icons/mastercard.svg" },
  { name: "UPI", icon: "/icons/upi.svg" },
  { name: "Net Banking", icon: "/icons/bank.svg" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-accent/5 via-gold/5 to-secondary/5 text-primary">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 py-1">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-gold/10 bg-white">
                <Image
                  src="/logo.png"
                  alt="Mahadev Holidays Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-black text-lg leading-none tracking-tight text-primary">
                  MAHADEV
                </span>
                <span className="font-heading font-bold text-xs tracking-[0.25em] text-accent mt-0.5 leading-none">
                  HOLIDAYS
                </span>
              </div>
            </div>
            <p className="text-primary/85 text-sm leading-relaxed font-semibold">
              MAHADEV HOLIDAYS - Explore &bull; Experience &bull; Enjoy. Premier
              travel company based in Palanpur, Gujarat. Approved by Ministry of
              Tourism, Government of India. Estd 2022.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 flex items-center justify-center rounded-full border border-gold/20 text-primary/50 transition-all duration-300 ${hoverColor}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-pink-400 font-heading text-lg font-bold mb-6 relative inline-block after:block after:w-8 after:h-[2px] after:bg-pink-400 after:mt-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-primary/80 hover:text-accent text-sm font-semibold transition-colors duration-300 group"
                  >
                    <ChevronRight className="w-3 h-3 text-pink-400/50 group-hover:text-pink-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-green-400 font-heading text-lg font-bold mb-6 relative inline-block after:block after:w-8 after:h-[2px] after:bg-green-400 after:mt-2">
              Top Destinations
            </h3>
            <ul className="space-y-3">
              {DESTINATIONS.map((dest) => (
                <li key={dest.href}>
                  <Link
                    href={dest.href}
                    className="flex items-center gap-2 text-primary/80 hover:text-accent text-sm font-semibold transition-colors duration-300 group"
                  >
                    <ChevronRight className="w-3 h-3 text-green-400/50 group-hover:text-green-400 transition-colors" />
                    {dest.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-gold font-heading text-lg font-bold mb-6 relative inline-block after:block after:w-8 after:h-[2px] after:bg-gold after:mt-2">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-primary/85 text-sm font-semibold">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>
                  Shop.no-26, Above Alex Tailor, Bus Station Road,
                  <br />
                  Gurunanak Chowk, Palanpur, B.K, Guj (385001)
                </span>
              </div>
              <a
                href="tel:+919328151481"
                className="flex items-center gap-3 text-primary/90 hover:text-gold text-sm font-semibold transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-gold shrink-0" />
                +91 9328151481
              </a>
              <a
                href="mailto:mahadevholidays2000@gmail.com"
                className="flex items-center gap-3 text-primary/90 hover:text-gold text-sm font-semibold transition-colors duration-300"
              >
                <Mail className="w-4 h-4 text-gold shrink-0" />
                mahadevholidays2000@gmail.com
              </a>
              <a
                href="https://wa.me/919328151481"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary/90 hover:text-gold text-sm font-semibold transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4 text-gold shrink-0" />
                WhatsApp: 9328151481
              </a>
            </div>

          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gold/15 flex flex-col items-center text-center gap-4">
          <span className="text-primary/50 text-[10px] uppercase tracking-[0.35em] font-black leading-none">
            CREATIVE BRANDING PARTNER
          </span>

          {/* ═══ ZORVENT CARD — FULL BAWAL MODE ═══ */}
          <a
            href="https://zorvent.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group zorvent-float relative flex flex-col items-center justify-center p-10 md:p-12 rounded-[2rem] max-w-sm w-full cursor-pointer overflow-hidden"
            style={{ isolation: "isolate", background: "#040407" }}
          >

            {/* — Layer 3: Breathing radial glow — */}
            <div
              className="glow-breathe absolute inset-0 rounded-[2rem] -z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(255,107,0,0.55) 0%, rgba(255,0,85,0.25) 40%, transparent 70%)",
              }}
            />

            {/* — Layer 4: Hover inner glow overlay — */}
            <div
              className="absolute inset-0 rounded-[2rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 30%, rgba(255,215,0,0.35) 0%, transparent 65%)",
              }}
            />

            {/* — Layer 5: Scan-line sweep — */}
            <div
              className="scan-sweep absolute left-0 right-0 h-[2px] rounded-full pointer-events-none -z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.7) 50%, transparent 100%)",
              }}
            />

            {/* — Layer 6: Corner sparkle diamonds — */}
            {/* Top-left */}
            <svg className="sparkle-1 absolute top-3 left-4 w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#FFD700" />
            </svg>
            {/* Top-right */}
            <svg className="sparkle-2 absolute top-3 right-4 w-3 h-3 pointer-events-none" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#FF6B00" />
            </svg>
            {/* Bottom-left */}
            <svg className="sparkle-3 absolute bottom-4 left-5 w-3 h-3 pointer-events-none" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#FF0055" />
            </svg>
            {/* Bottom-right */}
            <svg className="sparkle-4 absolute bottom-4 right-5 w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#FFD700" />
            </svg>
            {/* Mid-left */}
            <svg className="sparkle-5 absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 pointer-events-none" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#FF6B00" />
            </svg>
            {/* Mid-right */}
            <svg className="sparkle-6 absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 pointer-events-none" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#FFD700" />
            </svg>

            {/* ─── Content ─── */}
            <div className="relative flex flex-col items-center gap-3 select-none">
              {/* Label */}
              <span
                className="text-[9px] tracking-[0.55em] font-black uppercase"
                style={{ color: "#FF8C00", animation: "glow-breathe 2s ease-in-out infinite" }}
              >
                DESIGNED &amp; DEVELOPED BY
              </span>

              {/* THE BIG NAME */}
              <span
                className="zorvent-shimmer text-6xl md:text-7xl font-heading font-black tracking-[0.22em] uppercase"
              >
                ZORVENT
              </span>

              {/* Divider line with glow */}
              <div
                className="w-32 h-[1.5px] rounded-full my-1"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #FFD700, #FF6B00, #FFD700, transparent)",
                }}
              />

              {/* URL pill */}
              <span
                className="text-[11px] font-black tracking-[0.25em] uppercase px-6 py-2 rounded-full transition-all duration-300 group-hover:scale-105"
                style={{
                  background: "rgba(255,107,0,0.12)",
                  border: "1.5px solid rgba(255,215,0,0.4)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                WWW.ZORVENT.COM →
              </span>
            </div>
          </a>
        </div>
      </div>

      <div className="border-t border-gold/10 bg-cream-dark/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p className="text-primary/70 text-xs font-semibold">
              &copy; {year} MAHADEV HOLIDAYS. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-primary/30 text-xs font-semibold">We Accept:</span>
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method.name}
                className="px-2.5 py-1 bg-white rounded text-primary/70 text-[10px] font-bold uppercase tracking-wider border border-gold/20"
              >
                {method.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

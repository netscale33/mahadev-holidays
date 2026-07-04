"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield,
  HeadphonesIcon,
  RefreshCw,
  Tag,
  Award,
  Compass,
  Building2,
  Truck,
  Users,
  Globe,
  CalendarCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import SectionHeader from "@/components/SectionHeader";
import DestinationCard from "@/components/DestinationCard";
import TestimonialCard from "@/components/TestimonialCard";
import ServiceCard from "@/components/ServiceCard";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";

const SUBTITLES = [
  "Explore • Experience • Enjoy",
  "Curating Unforgettable Journeys Since 2022",
  "Your Journey, Our Passion",
];

const FEATURED_DESTINATIONS = [
  {
    id: "kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop",
    title: "Kerala Backwaters",
    location: "Kerala, India",
    rating: 4.7,
    duration: "5 Days / 4 Nights",
    price: 37500,
    type: "Nature",
    href: "/destinations/kerala",
  },
  {
    id: "goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
    title: "Goa Beaches",
    location: "Goa, India",
    rating: 4.8,
    duration: "4 Days / 3 Nights",
    price: 26000,
    type: "Beach",
    href: "/destinations/goa",
  },
  {
    id: "kashmir",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&h=400&fit=crop",
    title: "Kashmir Valley",
    location: "Jammu & Kashmir, India",
    rating: 4.9,
    duration: "6 Days / 5 Nights",
    price: 54000,
    type: "Luxury",
    href: "/destinations/kashmir",
  },
  {
    id: "rajasthan",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop",
    title: "Rajasthan Heritage",
    location: "Rajasthan, India",
    rating: 4.9,
    duration: "7 Days / 6 Nights",
    price: 70000,
    type: "Heritage",
    href: "/destinations/rajasthan",
  },
  {
    id: "himachal",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop",
    title: "Himachal Retreat",
    location: "Himachal Pradesh, India",
    rating: 4.8,
    duration: "5 Days / 4 Nights",
    price: 30000,
    type: "Adventure",
    href: "/destinations/himachal",
  },
  {
    id: "andaman",
    image:
      "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=600&h=400&fit=crop",
    title: "Andaman Islands",
    location: "Andaman & Nicobar, India",
    rating: 4.8,
    duration: "6 Days / 5 Nights",
    price: 108000,
    type: "Beach",
    href: "/destinations/andaman",
  },
  {
    id: "dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    title: "Dubai Luxury",
    location: "Dubai, UAE",
    rating: 4.9,
    duration: "5 Days / 4 Nights",
    price: 54999,
    type: "Luxury",
    href: "/destinations/dubai",
  },
  {
    id: "thailand",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop",
    title: "Thailand Escapade",
    location: "Thailand",
    rating: 4.8,
    duration: "5 Days / 4 Nights",
    price: 32999,
    type: "Beach",
    href: "/destinations/thailand",
  },
  {
    id: "singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop",
    title: "Singapore City",
    location: "Singapore",
    rating: 4.7,
    duration: "5 Days / 4 Nights",
    price: 42999,
    type: "Luxury",
    href: "/destinations/singapore",
  },
  {
    id: "malaysia",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop",
    title: "Malaysia Truly Asia",
    location: "Malaysia",
    rating: 4.5,
    duration: "6 Days / 5 Nights",
    price: 38999,
    type: "Cultural",
    href: "/destinations/malaysia",
  },
  {
    id: "vietnam",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop",
    title: "Vietnam Wonders",
    location: "Vietnam",
    rating: 4.5,
    duration: "7 Days / 6 Nights",
    price: 32999,
    type: "Adventure",
    href: "/destinations/vietnam",
  },
  {
    id: "maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop",
    title: "Maldives Paradise",
    location: "Maldives",
    rating: 4.9,
    duration: "5 Days / 4 Nights",
    price: 74999,
    type: "Luxury",
    href: "/destinations/maldives",
  },
];

const WELCOME_SERVICES = [
  {
    icon: Shield,
    title: "100% Secure Booking",
    description:
      "Your payments and personal information are protected with enterprise-grade security.",
  },
  {
    icon: Tag,
    title: "Best Price Guarantee",
    description:
      "We match any legitimate price, ensuring you get the best value for your luxury experience.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Concierge",
    description:
      "Dedicated travel concierge available round-the-clock for any assistance you need.",
  },
  {
    icon: RefreshCw,
    title: "Easy Cancellation",
    description:
      "Flexible cancellation policies that give you peace of mind when booking with us.",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: Award,
    title: "Govt Approved",
    description:
      "Ministry of Tourism approved, ADTOI & ATOAI member",
  },
  {
    icon: Compass,
    title: "Customized Packages",
    description:
      "Tailored itineraries matching your preferences",
  },
  {
    icon: Tag,
    title: "Best Price Guarantee",
    description:
      "Competitive pricing with no hidden costs",
  },
  {
    icon: Building2,
    title: "Premium Accommodations",
    description:
      "Handpicked luxury hotels and resorts",
  },
  {
    icon: Truck,
    title: "Private Transfers",
    description:
      "Chauffeured luxury vehicles",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Concierge",
    description:
      "Round-the-clock personal assistance",
  },
];

const INTERNATIONAL = [
  {
    name: "Dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    price: "₹54,999",
    desc: "City of Gold & Luxury",
  },
  {
    name: "Thailand",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop",
    price: "₹32,999",
    desc: "Land of Smiles",
  },
  {
    name: "Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop",
    price: "₹45,999",
    desc: "Garden City",
  },
  {
    name: "Vietnam",
    image:
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop",
    price: "₹36,999",
    desc: "Timeless Charm",
  },
  {
    name: "Malaysia",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop",
    price: "₹38,999",
    desc: "Truly Asia",
  },
  {
    name: "Europe",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop",
    price: "₹1,25,000",
    desc: "Classic Elegance",
  },
  {
    name: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop",
    price: "₹85,999",
    desc: "Paradise on Earth",
  },
  {
    name: "Sri Lanka",
    image:
      "https://images.unsplash.com/photo-1559333086-b0a1a1b7f2e1?w=600&h=400&fit=crop",
    price: "₹28,999",
    desc: "Pearl of Indian Ocean",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Our vacation was absolutely fantastic! The attention to detail and personalized service made all the difference.",
    author: "Harish Patel",
    location: "Gujarat",
    rating: 5,
  },
  {
    quote:
      "Mahadev Holidays curated the most incredible honeymoon for us. Every moment was magical.",
    author: "Priya Sharma",
    location: "Delhi",
    rating: 5,
  },
  {
    quote:
      "Professional, reliable, and truly luxurious. They handled everything flawlessly.",
    author: "Amit Singh",
    location: "Mumbai",
    rating: 5,
  },
  {
    quote:
      "The Kashmir trip was beyond our expectations. The arrangements were impeccable.",
    author: "Sarah Khan",
    location: "Bangalore",
    rating: 5,
  },
  {
    quote:
      "From booking to return, everything was seamless. Highly recommended for luxury travel.",
    author: "Ravi Verma",
    location: "Pune",
    rating: 5,
  },
  {
    quote:
      "Our Rajasthan heritage tour was absolutely perfect. The guides were knowledgeable and courteous.",
    author: "Ananya Patel",
    location: "Kolkata",
    rating: 5,
  },
];

const VIBE_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&h=500&fit=crop",
];

const AWARDS = [
  {
    icon: CheckCircle2,
    title: "Ministry of Tourism Approved",
    detail: "Government of India",
  },
  {
    icon: Users,
    title: "ADTOI Member",
    detail: "Active Member",
  },
  {
    icon: Globe,
    title: "ATOAI Certified",
    detail: "Adventure Tour Operators Association",
  },
  {
    icon: Shield,
    title: "IRCTC Approved",
    detail: "Authorized Travel Partner",
  },
  {
    icon: Award,
    title: "GST Registered",
    detail: "Verified & Compliant Business",
  },
  {
    icon: Building2,
    title: "Mahadev Holidays",
    detail: "Est. 2022, Palanpur, Gujarat",
  },
];

const TRUST_METRICS = [
  { icon: Users, count: "10,000+", label: "Happy Travelers" },
  { icon: Globe, count: "150+", label: "Destinations" },
  { icon: CalendarCheck, count: "Since", label: "2022" },
  { icon: Shield, count: "Govt", label: "Approved" },
];

function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SUBTITLES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <HeroBanner
      videoSrc="https://getwayvideo.reachcure.in/banner-video.mp4"
      fallbackImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop"
      headline="Discover the Extraordinary"
      subtitle={SUBTITLES[index]}
      primaryCTA={{ label: "Explore Destinations", href: "/destinations" }}
      secondaryCTA={{ label: "Plan Your Journey", href: "/contact" }}
    />
  );
}

function TrustBar() {
  return (
    <section className="relative py-12 overflow-hidden border-y border-gold/10">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
          alt="Trust Mahadev Holidays"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-cream/40 backdrop-blur-[2px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="bg-white/95 backdrop-blur-md border border-gold/15 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {TRUST_METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-1.5 p-3 border border-gold/5 bg-cream/30 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-1">
                  <metric.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-3xl md:text-4xl font-heading font-black bg-gradient-to-r from-accent to-gold-600 bg-clip-text text-transparent">
                  {metric.count}
                </span>
                <span className="text-primary text-[10px] md:text-xs tracking-widest uppercase font-extrabold">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [destinations, setDestinations] = useState<any[]>(FEATURED_DESTINATIONS);

  useEffect(() => {
    // Force-sync browser local storage to load fixed image links and 12-item rows
    const currentVersion = "v4";
    const localVersion = localStorage.getItem("mahadev_db_version");
    if (localVersion !== currentVersion) {
      localStorage.setItem("mahadev_destinations", JSON.stringify(FEATURED_DESTINATIONS));
      localStorage.setItem("mahadev_db_version", currentVersion);
    }

    const local = localStorage.getItem("mahadev_destinations");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const featured = parsed.filter((d: any) => d.isFeatured ?? true);
          const listToUse = featured.length >= 12 ? featured : parsed;
          const formatted = listToUse.slice(0, 12).map((d: any) => ({
            id: d.id || d._id,
            title: d.title,
            slug: d.slug,
            location: d.location,
            image: d.images?.[0] || d.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
            price: d.price,
            rating: d.rating || 4.5,
            reviewCount: d.reviewCount || 10,
            duration: d.duration,
            type: d.type || (d.category === "international" ? "Luxury" : "Nature"),
            category: String(d.category).toLowerCase() === "international" ? "International" : "Domestic",
            href: d.slug ? `/destinations/${d.slug}` : `/destinations`
          }));
          setDestinations(formatted);
          return;
        }
      } catch (err) {
        console.error("Failed to parse local storage destinations, falling back:", err);
      }
    }

    setDestinations(FEATURED_DESTINATIONS);
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <TrustBar />
 
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeader
              tag="Welcome to Mahadev Holidays"
              title="Explore • Experience • Enjoy"
              subtitle="Curated by VISHAL CHAUHAN (DARJI) — your trusted tour advisor. One of India's premier travel curators based in Palanpur, Gujarat, operating worldwide since 2022. We specialize in crafting bespoke travel experiences for discerning travelers, offering meticulously designed domestic and international journeys that transcend the ordinary."
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {WELCOME_SERVICES.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
 
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeader
              title="Curated Destinations"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {destinations.map((dest, i) => (
              <AnimatedSection key={dest.id} delay={i * 0.05}>
                <DestinationCard {...dest} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.3}>
            <div className="flex justify-center mt-12">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white font-semibold rounded-full text-sm tracking-wide hover:bg-accent-600 transition-all duration-300 shadow-lg group"
              >
                View All Destinations
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
            alt="Why choose Mahadev Holidays"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-gold/10 to-secondary/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeader
              tag="Why Mahadev Holidays"
              title="The Art of Curated Travel"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {WHY_CHOOSE_US.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group bg-white border border-gold/10 rounded-2xl p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-primary text-lg mb-2">{service.title}</h3>
                  <p className="text-primary/80 text-base leading-relaxed font-semibold">{service.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-accent/5 via-gold/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeader
              tag="Global Explorations"
              title="Journey Beyond Borders"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {INTERNATIONAL.map((dest, i) => (
              <AnimatedSection key={dest.name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/40 via-gold/15 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-primary font-heading text-xl font-bold">
                        {dest.name}
                      </h3>
                      <p className="text-primary/85 text-base font-semibold">{dest.desc}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-primary font-heading font-bold text-lg">
                      {dest.price}
                    </span>
                    <span className="text-accent text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeader
              tag="Client Testimonials"
              title="Voices of Our Travelers"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={t.author} delay={i * 0.1}>
                <TestimonialCard {...t} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-accent/5 via-gold/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <AnimatedSection>
            <SectionHeader
              tag="Follow Our Journey"
              title="Vibe with Us"
            />
          </AnimatedSection>
        </div>
        <div className="relative z-10">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            className="flex gap-4 w-max"
          >
            {[...VIBE_IMAGES, ...VIBE_IMAGES].map((src, i) => (
              <div
                key={i}
                className="relative w-64 h-80 shrink-0 rounded-2xl overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Travel vibe ${i + 1}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/10 hover:bg-primary/0 transition-colors duration-500" />
              </div>
            ))}
          </motion.div>
        </div>
        <AnimatedSection delay={0.2}>
          <div className="relative z-10 flex justify-center mt-10">
            <a
              href="https://instagram.com/_mahadev_holidays"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full text-sm hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-pink-500/25 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              Follow @_mahadev_holidays
            </a>
          </div>
        </AnimatedSection>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeader
              tag="Trust & Credentials"
              title="Recognized Excellence"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {AWARDS.map((award, i) => {
              const iconColors = ["text-pink-500 bg-pink-50", "text-green-500 bg-green-50", "text-purple-500 bg-purple-50", "text-amber-500 bg-amber-50", "text-blue-500 bg-blue-50", "text-red-500 bg-red-50"];
              return (
                <AnimatedSection key={award.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-accent/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${iconColors[i].split(" ")[1]} flex items-center justify-center shrink-0`}>
                        <award.icon className={`w-6 h-6 ${iconColors[i].split(" ")[0]}`} />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-primary text-base">
                          {award.title}
                        </h3>
                        <p className="text-primary/75 text-sm mt-0.5 font-semibold">
                          {award.detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>



      <Footer />
      <ScrollToTop />
    </>
  );
}

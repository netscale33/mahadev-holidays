"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Building2,
  Mountain,
  Landmark,
  Compass,
  Users,
  Globe,
  CheckCircle2,
  ArrowRight,
  Search,
  ClipboardList,
  Plane,
  Star,
  Shield,
  Clock,
  Headphones,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollToTop from "@/components/ScrollToTop";

const services = [
  {
    icon: Sparkles,
    title: "Private Luxury Tours",
    tag: "Bespoke Excellence",
    description:
      "Indulge in the epitome of personalized travel with our exclusively curated private luxury tours. Every detail, from accommodation to itinerary, is tailored to your preferences, ensuring a seamless and opulent journey through India's most breathtaking destinations. Travel in comfort with premium vehicles, expert guides, and handpicked experiences that define luxury.",
    highlights: [
      "Personalized itinerary planning",
      "Premium chauffeured transportation",
      "5-star & heritage hotel accommodations",
      "Private expert tour guides",
      "Concierge service 24/7",
      "Fine dining reservations",
    ],
  },
  {
    icon: Heart,
    title: "Honeymoon Packages",
    tag: "Romantic Escapes",
    description:
      "Celebrate your love story with our exquisitely designed honeymoon packages. From the serene backwaters of Kerala to the snow-capped peaks of Kashmir, we create romantic retreats that offer intimacy, luxury, and unforgettable moments. Candlelight dinners, spa treatments, and stunning sunset views await you.",
    highlights: [
      "Romantic candlelight dinners",
      "Couple spa & wellness sessions",
      "Private sunset cruises",
      "Luxury boutique hotels",
      "Photography packages",
      "Personalized celebrations",
    ],
  },
  {
    icon: Building2,
    title: "Corporate Retreats",
    tag: "Business Meets Luxury",
    description:
      "Elevate your corporate gatherings with our premium retreat and conference solutions. Combining business with pleasure, we organize executive retreats, team-building expeditions, and corporate getaways in India's finest resorts and business hotels, complete with state-of-the-art facilities.",
    highlights: [
      "Conference & meeting facilities",
      "Team-building activities",
      "Executive transportation",
      "Gourmet catering services",
      "Leisure & recreation included",
      "Event planning & coordination",
    ],
  },
  {
    icon: Mountain,
    title: "Adventure Travel",
    tag: "Thrill & Discovery",
    description:
      "For the intrepid soul, our adventure travel packages offer an adrenaline-fueled exploration of India's wildest landscapes. From trekking in the Himalayas to white-water rafting in Rishikesh, we ensure world-class safety standards while delivering exhilarating experiences.",
    highlights: [
      "Expert adventure guides",
      "Top-grade safety equipment",
      "Trekking & mountaineering",
      "Water sports & rafting",
      "Wildlife safaris",
      "Camping under the stars",
    ],
  },
  {
    icon: Landmark,
    title: "Cultural Immersion",
    tag: "Heritage & Tradition",
    description:
      "Dive deep into India's rich tapestry of culture, art, and heritage. Our cultural tours take you beyond the guidebooks, offering authentic interactions with local artisans, traditional cooking classes, heritage walks, and visits to UNESCO World Heritage Sites with expert historians.",
    highlights: [
      "UNESCO heritage site tours",
      "Artisan workshop visits",
      "Traditional cooking classes",
      "Heritage walk experiences",
      "Folk music & dance performances",
      "Historical expert guides",
    ],
  },
  {
    icon: Compass,
    title: "Religious Tours",
    tag: "Spiritual Journeys",
    description:
      "Embark on a soul-stirring pilgrimage with our specially designed religious tours. Covering India's most sacred destinations — from Char Dham to Varanasi, Bodh Gaya to Rameswaram — we provide comfortable, respectful, and spiritually enriching travel experiences.",
    highlights: [
      "Sacred destination tours",
      "Pilgrimage assistance",
      "Comfortable accommodations",
      "Local spiritual guides",
      "Ritual & ceremony access",
      "Group & private options",
    ],
  },
  {
    icon: Users,
    title: "Group Tours",
    tag: "Shared Experiences",
    description:
      "Travel with like-minded explorers on our carefully curated group tours. Perfect for solo travelers or groups of friends, our group tours offer a perfect balance of guided exploration and free time, creating a vibrant community experience without compromising on comfort.",
    highlights: [
      "Small group sizes (max 15)",
      "Expert tour leader",
      "Shared yet premium experiences",
      "Flexible free time",
      "Diverse itinerary options",
      "Great value pricing",
    ],
  },
  {
    icon: Globe,
    title: "International Escapes",
    tag: "Global Luxury",
    description:
      "Extend your horizons beyond India with our international travel services. From the Maldives to Dubai, Thailand to Europe, we partner with the world's finest hospitality providers to deliver seamless luxury travel experiences across the globe.",
    highlights: [
      "Global destination expertise",
      "Visa assistance services",
      "International flight bookings",
      "Luxury international hotels",
      "Guided international tours",
      "24/7 global support",
    ],
  },
];

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery Call",
    description:
      "We begin with a detailed consultation to understand your preferences, budget, and travel dreams. This helps us design a trip that truly reflects your vision.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Custom Itinerary",
    description:
      "Our travel designers craft a bespoke itinerary tailored to your desires, complete with handpicked accommodations, experiences, and seamless logistics.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Review & Refine",
    description:
      "You review the proposed itinerary and we refine every detail until it meets your exact expectations — no request is too small or too grand.",
  },
  {
    icon: Plane,
    step: "04",
    title: "Book & Confirm",
    description:
      "Once you approve, we handle all bookings, confirmations, and documentation. You receive a comprehensive travel dossier for your journey.",
  },
  {
    icon: Headphones,
    step: "05",
    title: "Travel with Support",
    description:
      "Embark on your journey with complete peace of mind. Our 24/7 concierge team is available throughout your trip for any assistance you may need.",
  },
  {
    icon: Star,
    step: "06",
    title: "Post-Travel Care",
    description:
      "After your return, we follow up to ensure everything was perfect. Your feedback helps us refine future experiences and maintain our excellence.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <ScrollToTop />

      {/* Hero Banner */}
      <section className="relative pt-44 pb-32 overflow-hidden flex items-center min-h-[50vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80"
            alt="Services Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-10" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block bg-white/95 backdrop-blur-md border border-white/50 shadow-2xl p-8 md:p-10 rounded-3xl max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 border border-accent/30 bg-accent/5 rounded-full text-accent text-xs font-bold tracking-[0.25em] uppercase mb-5">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight mb-4">
              Crafting Exceptional Journeys
            </h1>
            <p className="text-primary-800 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
              From private luxury tours to international escapes, discover a
              world of bespoke travel services designed to exceed every expectation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            tag="What We Offer"
            title="Premium Travel Services"
            subtitle="A comprehensive suite of luxury travel solutions tailored to your every need and desire."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const borderColors = ["border-t-pink-500", "border-t-amber-500", "border-t-green-500", "border-t-purple-500", "border-t-blue-500", "border-t-teal-500", "border-t-red-500", "border-t-indigo-500"];
              const iconColors = ["bg-pink-50 text-pink-500", "bg-amber-50 text-amber-500", "bg-green-50 text-green-500", "bg-purple-50 text-purple-500", "bg-blue-50 text-blue-500", "bg-teal-50 text-teal-500", "bg-red-50 text-red-500", "bg-indigo-50 text-indigo-500"];
              return (
              <AnimatedSection key={service.title} delay={index * 0.05}>
                <div className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col border-t-4 ${borderColors[index % borderColors.length]}`}>
                  <div className="p-8 pb-6">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-14 h-14 rounded-xl ${iconColors[index % iconColors.length].split(" ")[0]} flex items-center justify-center`}>
                        <service.icon className={`w-7 h-7 ${iconColors[index % iconColors.length].split(" ")[1]} group-hover:text-inherit transition-colors duration-500`} />
                      </div>
                      <span className="px-3 py-1 bg-gold/10 rounded-full text-gold text-xs font-medium tracking-wide">
                        {service.tag}
                      </span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-primary mb-4 group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-primary/90 leading-relaxed font-body text-base">
                      {service.description}
                    </p>
                  </div>
                  <div className="px-8 pb-8 mt-auto">
                    <div className="border-t border-gold/10 pt-5">
                      <p className="text-sm uppercase tracking-[0.15em] text-primary/75 font-semibold mb-3 font-body">
                        Key Highlights
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {service.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                            <span className="text-sm text-primary/85 font-semibold">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
            alt="How It Works"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-gold/10 to-secondary/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <SectionHeader
            tag="The Process"
            title="How It Works"
            subtitle="From your first inquiry to your journey's end — a seamless, personalized experience at every step."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.1}>
                <div className="relative group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gold/10 hover:border-gold/30 transition-all duration-300 h-full">
                    <span className="text-5xl font-heading font-bold text-gold/10 absolute top-4 right-6">
                      {step.step}
                    </span>
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                      <step.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-primary mb-3 relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-primary/85 text-base leading-relaxed font-body relative z-10">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedSection>
              <div className="text-center p-6">
                <Shield className="w-10 h-10 text-gold mx-auto mb-3" />
                <h4 className="text-primary font-heading font-semibold text-lg">Ministry Approved</h4>
                <p className="text-primary/85 text-sm mt-1 font-semibold">Recognized by Govt. of India</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="text-center p-6">
                <Compass className="w-10 h-10 text-gold mx-auto mb-3" />
                <h4 className="text-primary font-heading font-semibold text-lg">ADTOI Member</h4>
                <p className="text-primary/85 text-sm mt-1 font-semibold">Association of Domestic Tour Operators</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="text-center p-6">
                <Mountain className="w-10 h-10 text-gold mx-auto mb-3" />
                <h4 className="text-primary font-heading font-semibold text-lg">ATOAI Member</h4>
                <p className="text-primary/85 text-sm mt-1 font-semibold">Association of Domestic Tour Operators</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="text-center p-6">
                <Clock className="w-10 h-10 text-gold mx-auto mb-3" />
                <h4 className="text-primary font-heading font-semibold text-lg">15+ Years</h4>
                <p className="text-primary/85 text-sm mt-1 font-semibold">Of Travel Excellence</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Customization CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-accent/10 via-gold/5 to-secondary/10 rounded-3xl p-12 lg:p-16 relative overflow-hidden border border-gold/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <span className="inline-block px-4 py-1.5 border border-gold/30 rounded-full text-accent text-xs tracking-[0.2em] uppercase mb-4">
                  Tailored for You
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary leading-tight mb-6">
                  Need Something{" "}
                  <span className="text-accent">Completely Custom?</span>
                </h2>
                <p className="text-primary/85 text-lg leading-relaxed mb-8 font-body">
                  No two travelers are the same. Tell us your vision, and we'll
                  build a one-of-a-kind itinerary from scratch — with no limits
                  on creativity, luxury, or adventure.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full text-sm tracking-wide hover:bg-accent-600 transition-all duration-300 shadow-lg shadow-accent/20"
                >
                  Start Your Custom Journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Tailor-made Itineraries", desc: "Designed just for you" },
                    { label: "Expert Local Guides", desc: "Insider knowledge" },
                    { label: "24/7 Concierge", desc: "Support anytime" },
                    { label: "Best Price Guarantee", desc: "Unbeatable value" },
                  ].map((item) => (
                    <div key={item.label} className="bg-primary/5 backdrop-blur-sm rounded-xl p-5 border border-gold/10">
                      <CheckCircle2 className="w-5 h-5 text-accent mb-2" />
                      <h4 className="text-primary font-heading font-semibold text-sm">{item.label}</h4>
                      <p className="text-primary/70 text-sm mt-1 font-semibold">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  Globe,
  ShieldCheck,
  Target,
  Eye,
  Heart,
  Star,
  MapPin,
  Phone,
  Mail,
  CalendarCheck,
  Building2,
  Quote,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollToTop from "@/components/ScrollToTop";

const stats = [
  { value: "4+", label: "Years of Excellence", icon: CalendarCheck },
  { value: "10,000+", label: "Happy Travelers", icon: Users },
  { value: "150+", label: "Destinations Covered", icon: Globe },
  { value: "99%", label: "Client Satisfaction", icon: Star },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We uphold the highest standards of honesty and transparency in every interaction, ensuring trust is the foundation of every journey.",
  },
  {
    icon: Star,
    title: "Excellence",
    description:
      "From bespoke itineraries to white-glove service, we relentlessly pursue perfection in every detail of your travel experience.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Our love for travel and discovery drives us to create experiences that inspire, transform, and leave lasting memories.",
  },
  {
    icon: Globe,
    title: "Responsibility",
    description:
      "We are committed to sustainable tourism that respects local cultures, communities, and the environment we explore.",
  },
];

const milestones = [
  { year: "2022", title: "Mahadev Holidays Founded", description: "Vishal Chouhan established Mahadev Holidays in Palanpur, Gujarat, with a bold vision — to make premium, personalized travel accessible to everyone." },
  { year: "2023", title: "Ministry of Tourism Approved", description: "Earned official recognition from the Ministry of Tourism, Government of India, cementing our credibility as a trusted travel operator." },
  { year: "2023", title: "Industry Memberships", description: "Became proud members of ADTOI (Association of Domestic Tour Operators of India) and ATOAI, upholding the highest industry standards." },
  { year: "2024", title: "International Expansion", description: "Launched curated international packages covering Southeast Asia, Europe, and the Middle East — crafted with the same personal touch." },
  { year: "2025", title: "10,000+ Happy Travelers", description: "Crossed the milestone of 10,000+ satisfied travelers, earning repeat trust from families, honeymooners, and corporate clients alike." },
  { year: "2026", title: "Digital-First Experience", description: "Launched a fully digital booking and itinerary platform, making it effortless to plan, customize, and book your dream holiday online." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 overflow-hidden flex items-center min-h-[50vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="About Background"
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
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight mb-4">
              Beyond Travel, It's an Experience
            </h1>
            <p className="text-primary-800 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
              Discover the story behind Mahadev Holidays — a journey of passion,
              dedication, and an unwavering commitment to crafting extraordinary
              travel experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                    alt="Mahadev Holidays Team"
                    width={800}
                    height={600}
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold/10 rounded-2xl border border-gold/20 z-0" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span className="inline-block px-4 py-1.5 border border-gold/30 rounded-full text-gold text-xs tracking-[0.2em] uppercase mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary leading-tight mb-6">
                Your Dream Journey,{" "}
                <span className="text-gold">Crafted Personally</span>
              </h2>
              <div className="space-y-4 text-primary/70 leading-relaxed font-body">
                <p>
                  Mahadev Holidays was founded in 2022 by{" "}
                  <strong className="text-primary">Vishal Chouhan</strong> — a passionate
                  travel curator based in Palanpur, Gujarat, with a deep love for India's
                  diverse landscapes and a commitment to making premium travel experiences
                  accessible, personal, and unforgettable.
                </p>
                <p>
                  From the very first day, the mission was clear: treat every traveler
                  not as a booking number, but as a guest whose story matters. We
                  specialize in bespoke domestic and international holiday packages —
                  crafted end-to-end with care, local expertise, and unmatched attention
                  to detail.
                </p>
                <p>
                  Recognized and approved by the{" "}
                  <strong className="text-primary">Ministry of Tourism</strong>, Government
                  of India, and proud members of{" "}
                  <strong className="text-primary">ADTOI</strong> and{" "}
                  <strong className="text-primary">ATOAI</strong>, we uphold the highest
                  professional standards while maintaining the personal warmth of a
                  boutique travel house.
                </p>
                <p>
                  Whether it's a family vacation, a honeymoon, a pilgrimage, or an
                  international escape — Vishal Chouhan and his team ensure your journey
                  is exactly the way you imagined it — and then some.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <span className="text-sm text-primary font-medium">Ministry of Tourism Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold" />
                  <span className="text-sm text-primary font-medium">ADTOI & ATOAI Member</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
            alt="Mahadev Holidays Stats"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-gold/10 to-secondary/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <stat.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                  <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-primary/85 text-sm tracking-wide uppercase font-body font-bold">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            tag="Our Ethos"
            title="Mission, Vision & Values"
            subtitle="The principles that guide every journey we curate and every relationship we build."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <AnimatedSection>
              <div className="p-8 bg-cream rounded-2xl border border-gold/10 h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-primary/70 leading-relaxed font-body">
                  To curate extraordinary travel experiences that transcend the ordinary,
                  offering discerning travelers a seamless blend of luxury, culture, and
                  authentic discovery while upholding the highest standards of service
                  excellence.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="p-8 bg-cream rounded-2xl border border-gold/10 h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-primary/70 leading-relaxed font-body">
                  To be India's most admired luxury travel brand, setting global
                  benchmarks for personalized service, innovative itineraries, and
                  sustainable tourism practices that honor our cultural heritage.
                </p>
              </div>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="p-6 bg-gradient-to-br from-accent/10 via-gold/5 to-secondary/10 rounded-2xl text-center h-full group hover:-translate-y-1 transition-transform duration-300 border border-gold/10">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors">
                    <value.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-primary/85 text-base leading-relaxed font-body">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section - Vishal Chouhan */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&q=80"
            alt="Founder"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-gold/10 to-secondary/10" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <SectionHeader
            tag="Founder & Travel Curator"
            title="Meet Vishal Chouhan"
            subtitle="The heart and mind behind every journey we craft at Mahadev Holidays."
          />
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gold/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-accent/10 via-gold/10 to-secondary/10 p-10 flex flex-col justify-center text-primary border-r border-gold/10">
                  <div className="w-24 h-24 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center mb-6">
                    <span className="text-4xl font-heading font-bold text-gold">VC</span>
                  </div>
                  <h2 className="text-3xl font-heading font-bold mb-2">Vishal Chouhan</h2>
                  <p className="text-accent font-semibold mb-1 text-sm tracking-wider uppercase">Founder & Travel Curator</p>
                  <p className="text-primary/75 text-sm mb-6">Palanpur, Gujarat · Since 2022</p>
                  <div className="space-y-3 text-sm">
                    <a href="tel:+919328151481" className="flex items-center gap-3 text-primary/70 hover:text-accent transition-colors">
                      <Phone className="w-4 h-4 text-accent shrink-0" />
                      +91 93281 51481
                    </a>
                    <a href="mailto:mahadevholidays2000@gmail.com" className="flex items-center gap-3 text-primary/70 hover:text-accent transition-colors">
                      <Mail className="w-4 h-4 text-accent shrink-0" />
                      mahadevholidays2000@gmail.com
                    </a>
                    <div className="flex items-start gap-3 text-primary/70">
                      <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      Gurunanak Chowk, Palanpur, Gujarat
                    </div>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <blockquote className="text-xl font-alt italic text-primary leading-relaxed mb-6 border-l-4 border-gold pl-5">
                    "Travel is not just about reaching a place — it's about becoming a
                    richer version of yourself along the way."
                  </blockquote>
                  <div className="space-y-4 text-primary/70 text-base leading-relaxed">
                    <p>
                      Vishal Chouhan's passion for travel was born from a love of
                      exploration and a belief that every person deserves a perfectly
                      curated experience — whether it's their first family holiday or a
                      luxury international getaway.
                    </p>
                    <p>
                      With deep expertise in domestic and international tourism, Vishal
                      personally oversees every package, ensuring quality, transparency,
                      and that personal touch that makes Mahadev Holidays different from
                      any other travel company.
                    </p>
                    <p>
                      His philosophy is simple: know your traveler, understand their
                      dreams, and build a journey that exceeds every expectation.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {["Domestic Tours", "International Packages", "Honeymoon", "Temple Yatra", "LTC Tours", "Corporate Travel"].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Achievements & Milestones */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Milestones"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-gold/10 to-secondary/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <SectionHeader
            tag="Milestones"
            title="Our Journey"
            subtitle="Key moments that have shaped Mahadev Holidays into the luxury travel house it is today."
          />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/20 md:-translate-x-px" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={`${milestone.year}-${index}`} delay={index * 0.1}>
                  <div className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="hidden md:block flex-1" />
                    <div className="absolute left-4 md:left-1/2 top-0 w-8 h-8 -translate-x-1/2 rounded-full bg-white border-2 border-gold flex items-center justify-center shadow-md">
                      <div className="w-3 h-3 rounded-full bg-gold" />
                    </div>
                    <div className="flex-1 pl-12 md:pl-0">
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gold/10 hover:border-gold/30 transition-colors duration-300">
                        <span className="inline-block px-3 py-1 bg-gold/10 rounded-full text-accent text-xs font-semibold mb-3">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-heading font-bold text-primary mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-primary/85 text-base leading-relaxed font-body">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Quote */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <Quote className="w-12 h-12 text-gold/30 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-alt italic text-primary leading-relaxed mb-6">
              "At Mahadev Holidays, we don't just plan trips — we craft stories that
              become the most cherished chapters of your life. Every journey is a
              masterpiece waiting to be created."
            </blockquote>
            <div className="w-12 h-px bg-gold mx-auto mb-4" />
            <p className="text-gold font-heading font-semibold text-lg">Vishal Chouhan</p>
            <p className="text-primary/80 text-base font-semibold">Founder & Travel Curator, Mahadev Holidays</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
            alt="Call to Action"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-gold/10 to-secondary/10" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
              Ready to Begin Your{" "}
              <span className="text-accent">Luxury Journey?</span>
            </h2>
            <p className="text-primary/85 text-lg max-w-2xl mx-auto mb-10 font-body">
              Let our expert team craft a bespoke travel experience tailored
              exclusively to your desires. Your extraordinary adventure awaits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-accent text-white font-semibold rounded-full text-sm tracking-wide hover:bg-accent-600 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40"
              >
                Plan Your Journey
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border border-primary/20 text-primary font-medium rounded-full text-sm tracking-wide hover:bg-accent/5 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
}

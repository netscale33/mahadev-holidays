"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  MessageCircle,
  Plus,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollToTop from "@/components/ScrollToTop";




const socialLinks = [
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    href: "https://facebook.com/mahadevholidays",
    label: "Facebook",
  },
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
    href: "https://instagram.com/_mahadev_holidays",
    label: "Instagram",
  },
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
    href: "https://youtube.com/@mahadevholidays",
    label: "YouTube",
  },
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    href: "https://linkedin.com/company/mahadevholidays",
    label: "LinkedIn",
  },
];

const faqs = [
  {
    q: "How do I book a trip with Mahadev Holidays?",
    a: "You can book through our website's inquiry form, call us at +91 93281 51481, or email us at mahadevholidays2000@gmail.com. Our team will get back to you within 24 hours to start planning your journey.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards (Visa, Mastercard), UPI (GPay, PhonePe, Paytm), net banking, and bank transfers. A 25% advance is required to confirm bookings.",
  },
  {
    q: "Can I customize my travel package?",
    a: "Absolutely. Every itinerary we create is fully customizable. Our travel designers work with you to tailor every aspect of your journey — from accommodations to activities.",
  },
  {
    q: "Is travel insurance included?",
    a: "Travel insurance is not included by default, but we strongly recommend it and can arrange comprehensive coverage through our partner insurance providers at an additional cost.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations made 30+ days before departure receive a full refund minus processing fees. 15-29 days: 50% refund. 7-14 days: 25% refund. 0-6 days: no refund. Please contact us for full details.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", destination: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Persist in localStorage to support completely serverless offline deployment
      const existing = localStorage.getItem("mahadev_inquiries");
      const list = existing ? JSON.parse(existing) : [];
      list.unshift({
        ...formData,
        id: `inq-${Date.now()}`,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("mahadev_inquiries", JSON.stringify(list));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", destination: "", message: "" });
    }, 800);
  }

  return (
    <>
      <Header />
      <ScrollToTop />

      {/* Hero with Map Background */}
      <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden flex items-center min-h-[45vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1569336415962-a4bd9f609cd0?w=1920&q=80"
            alt="Contact Background"
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
            className="inline-block bg-white/95 backdrop-blur-md border border-white/50 shadow-2xl p-6 md:p-10 rounded-3xl max-w-3xl mx-auto w-full"
          >
            <span className="inline-block px-4 py-1.5 border border-accent/30 bg-accent/5 rounded-full text-accent text-xs font-bold tracking-[0.25em] uppercase mb-5">
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight mb-4">
              Plan Your Dream Journey
            </h1>
            <p className="text-primary-800 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
              Whether you have a specific itinerary in mind or need inspiration,
              our travel experts are here to craft your perfect escape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards + Form */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            {/* Contact Form Section (Left - 3 Cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gold/10">
              <h2 className="text-3xl font-heading font-black bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent mb-2">
                Send Us an Inquiry
              </h2>
              <p className="text-primary-800 text-sm font-medium mb-8">
                Fill out the form below, and our travel specialists will get back to you with custom packages.
              </p>

              {submitSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-primary">Inquiry Sent Successfully!</h3>
                  <p className="text-primary/80 text-sm max-w-sm mx-auto font-medium">
                    Thank you for reaching out. Vishal Chouhan and our team will get in touch with you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-6 px-6 py-2.5 bg-accent hover:bg-accent-600 text-white font-bold rounded-full transition-all"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-primary/70 font-extrabold mb-2">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter name"
                        className="w-full px-4 py-3 bg-cream/50 border border-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 font-medium text-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-primary/70 font-extrabold mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter mobile number"
                        className="w-full px-4 py-3 bg-cream/50 border border-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 font-medium text-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-primary/70 font-extrabold mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter email"
                        className="w-full px-4 py-3 bg-cream/50 border border-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 font-medium text-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-primary/70 font-extrabold mb-2">Preferred Destination</label>
                      <input 
                        type="text" 
                        required
                        value={formData.destination}
                        onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                        placeholder="e.g. Kashmir, Kerala, Dubai"
                        className="w-full px-4 py-3 bg-cream/50 border border-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 font-medium text-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-primary/70 font-extrabold mb-2">Travel Requirements / Details</label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Share travel dates, number of travelers, budget preferences..."
                      className="w-full px-4 py-3 bg-cream/50 border border-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 font-medium text-primary resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent hover:bg-accent-600 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-widest disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div>

            {/* Visual Travel Details Card (Right - 2 Cols) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Visual Card 1: Beautiful Travel Contact Detail Info */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[320px] flex flex-col justify-end p-8 group">
                <Image 
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80" 
                  alt="Travel Contact"
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent z-10" />
                
                <div className="relative z-20 space-y-4 text-white">
                  <span className="inline-block px-3 py-1 bg-accent text-[10px] tracking-widest font-black uppercase rounded-full">
                    Mahadev Holidays
                  </span>
                  <h3 className="text-2xl font-heading font-black tracking-wide">
                    Luxury Tour Curator
                  </h3>
                  
                  <div className="space-y-2.5 pt-2 border-t border-white/20 text-sm">
                    <a href="tel:+919328151481" className="flex items-center gap-2.5 hover:text-gold transition-colors font-medium">
                      <Phone className="w-4 h-4 text-gold" />
                      <span>+91 93281 51481</span>
                    </a>
                    <a href="mailto:mahadevholidays2000@gmail.com" className="flex items-center gap-2.5 hover:text-gold transition-colors font-medium">
                      <Mail className="w-4 h-4 text-gold" />
                      <span className="break-all">mahadevholidays2000@gmail.com</span>
                    </a>
                    <div className="flex items-start gap-2.5 font-medium leading-relaxed">
                      <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>Shop 26, Above Alex Tailor, Gurunanak Chowk, Palanpur - 385001</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Card 2: WhatsApp quick connect card with travel imagery */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl p-8 text-white group flex flex-col justify-between min-h-[220px]">
                <Image 
                  src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80" 
                  alt="Lake travel" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-green-950/95 via-green-900/80 to-transparent z-10" />
                
                <div className="relative z-20 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h4 className="text-xl font-heading font-black leading-tight">Instant Tour Assistance</h4>
                  <p className="text-white/80 text-xs font-medium">Chat directly with Vishal Chouhan on WhatsApp for immediate custom design planning.</p>
                </div>

                <div className="relative z-20 pt-4">
                  <a 
                    href="https://wa.me/919328151481?text=Hello%20Mahadev%20Holidays%2C%20I%27d%20like%20to%20plan%20a%20trip.%20Please%20share%20your%20best%20packages%20and%20itineraries."
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Social links card */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gold/5 flex flex-col justify-between">
                <h4 className="text-sm font-heading font-black text-primary tracking-wider mb-4 uppercase">Connect Socially</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 rounded-xl bg-cream flex items-center justify-center text-primary/80 hover:bg-primary hover:text-accent transition-all duration-300 border border-gold/10"
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            tag="Visit Us"
            title="Find Us on the Map"
            subtitle="We'd love to welcome you to our office in Palanpur, Gujarat."
          />
          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gold/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.2376!2d72.4375!3d24.1726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395dd1c8a97c29c7%3A0x1e6b6b6b6b6b6b6b!2sGurunanak%20Chowk%2C%20Palanpur%2C%20Gujarat%20385001!5e0!3m2!1sen!2sin!4v1720000000000"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mahadev Holidays Office - Palanpur, Gujarat"
                className="w-full"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            tag="Quick Answers"
            title="Frequently Asked Questions"
            subtitle="Find answers to common queries about booking with Mahadev Holidays."
          />
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-cream/50"
                  >
                    <span className="text-primary font-medium font-body text-sm pr-4">
                      {faq.q}
                    </span>
                    <Plus
                      className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-primary/90 text-sm leading-relaxed font-body border-t border-cream-dark pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-primary/90 text-sm font-body">
              Have more questions? Visit our{" "}
              <Link href="/faq" className="text-gold hover:text-gold-dark underline underline-offset-4">
                full FAQ page
              </Link>{" "}
              or reach out to us directly.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

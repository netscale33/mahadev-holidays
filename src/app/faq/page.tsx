"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  BookOpen,
  CreditCard,
  XCircle,
  Plane,
  Globe,
  FileText,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollToTop from "@/components/ScrollToTop";

const categories = [
  { id: "all", label: "All Questions", icon: BookOpen },
  { id: "booking", label: "Booking", icon: BookOpen },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "cancellation", label: "Cancellation", icon: XCircle },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "destinations", label: "Destinations", icon: Globe },
  { id: "visa", label: "Visa", icon: FileText },
];

const faqs = [
  {
    category: "booking",
    q: "How do I book a trip with Mahadev Holidays?",
    a: "Booking with us is simple. You can fill out the inquiry form on our Contact page, call us at +91 93281 51481, or email us at mahadevholidays2000@gmail.com. One of our travel experts will get in touch within 24 hours to discuss your preferences and craft a tailored itinerary. A 25% advance payment is required to confirm your booking.",
  },
  {
    category: "booking",
    q: "Can I customize my travel package?",
    a: "Absolutely! Every itinerary we create is fully customizable. Our travel designers work closely with you to tailor every aspect — from destinations and accommodations to activities and dining. You have complete control over your travel experience.",
  },
  {
    category: "booking",
    q: "How far in advance should I book?",
    a: "We recommend booking at least 4-6 weeks in advance for domestic tours and 8-12 weeks for international travel. During peak seasons (October-March), earlier booking is advised to secure the best accommodations and rates.",
  },
  {
    category: "booking",
    q: "Do you offer group booking discounts?",
    a: "Yes, we offer special rates for group bookings of 6 or more travelers. Group discounts vary by destination and season. Contact us for a customized group quote.",
  },
  {
    category: "booking",
    q: "What is included in the package price?",
    a: "Our packages typically include accommodation, meals as specified, guided tours, internal transfers, and activity fees. International packages may include flights and visa assistance. Each itinerary clearly details what is included and excluded.",
  },
  {
    category: "payments",
    q: "What payment methods do you accept?",
    a: "We accept Visa, Mastercard, American Express credit/debit cards, UPI (GPay, PhonePe, Paytm), net banking, and direct bank transfers. All payments are processed through secure, encrypted channels.",
  },
  {
    category: "payments",
    q: "What is your payment schedule?",
    a: "A 25% advance is required to confirm the booking. An additional 50% is due 30 days before departure, and the remaining 25% is due 15 days before departure. For last-minute bookings (within 30 days), full payment is required at the time of booking.",
  },
  {
    category: "payments",
    q: "Are there any hidden charges?",
    a: "No. We believe in complete transparency. All costs are clearly outlined in your itinerary before booking. Any optional add-ons or upgrades are communicated with full pricing before you decide.",
  },
  {
    category: "payments",
    q: "Can I pay in installments?",
    a: "Yes, we offer flexible installment plans for most packages. Please discuss your preferred payment schedule with our team, and we will accommodate your needs wherever possible.",
  },
  {
    category: "payments",
    q: "Do you charge GST on your services?",
    a: "Yes, GST is applicable on all our services as per government regulations. Our GST number is 07AAFCG1535L1ZK. The applicable GST will be clearly mentioned in your invoice.",
  },
  {
    category: "cancellation",
    q: "What is your cancellation policy?",
    a: "Cancellations made 30+ days before departure: full refund minus processing fees. 15-29 days: 50% refund. 7-14 days: 25% refund. 0-6 days: no refund. Please contact us for detailed information.",
  },
  {
    category: "cancellation",
    q: "Can I transfer my booking to someone else?",
    a: "Yes, you can transfer your booking to another person up to 15 days before departure. A nominal transfer fee may apply. Please notify us in writing to initiate the transfer.",
  },
  {
    category: "cancellation",
    q: "What happens if the company cancels my tour?",
    a: "In the unlikely event that we need to cancel a tour due to unforeseen circumstances, you will receive a full refund of all amounts paid, or you may opt to transfer the amount to an alternate tour of your choice with a special discount.",
  },
  {
    category: "cancellation",
    q: "How long do refunds take to process?",
    a: "Refunds are processed within 10-15 business days from the date of cancellation confirmation. The timeline for the amount reflecting in your account depends on your payment method and bank processing times.",
  },
  {
    category: "travel",
    q: "Is travel insurance included?",
    a: "Travel insurance is not included in the package price but is strongly recommended. We can arrange comprehensive travel insurance through our partner providers covering medical emergencies, trip cancellation, lost baggage, and more.",
  },
  {
    category: "travel",
    q: "What should I pack for my trip?",
    a: "Packing recommendations vary by destination and season. We provide a detailed packing guide specific to your itinerary after booking. Generally, comfortable clothing, sunscreen, a first-aid kit, and appropriate footwear are recommended.",
  },
  {
    category: "travel",
    q: "Do you provide airport transfers?",
    a: "Yes, all our packages include chauffeured airport transfers. Our drivers will be waiting at the arrival terminal with a Mahadev Holidays signboard and assist you with your luggage.",
  },
  {
    category: "travel",
    q: "What if I have dietary restrictions?",
    a: "We accommodate all dietary requirements — vegetarian, vegan, gluten-free, halal, or any allergies. Please inform us at the time of booking, and we will ensure all meals are prepared accordingly.",
  },
  {
    category: "destinations",
    q: "Which destinations do you cover?",
    a: "We cover all major and offbeat destinations across India including Kashmir, Ladakh, Himachal, Uttarakhand, Rajasthan, Kerala, Goa, Andaman, Northeast India, and more. Internationally, we offer packages to Dubai, Maldives, Thailand, Singapore, Bali, Europe, and other select destinations.",
  },
  {
    category: "destinations",
    q: "What is the best time to visit India?",
    a: "The best time varies by region. October to March is ideal for most of India with pleasant weather. April to June is suitable for hill stations. July to September is monsoon season in many parts. We'll advise the best timing for your chosen destination.",
  },
  {
    category: "destinations",
    q: "Do you offer offbeat/lesser-known destinations?",
    a: "Yes! We specialize in curating unique experiences beyond popular tourist spots. Our offbeat tours include hidden villages in the Himalayas, unexplored beaches, tribal regions, and cultural hotspots that most travelers miss.",
  },
  {
    category: "visa",
    q: "Do you provide visa assistance?",
    a: "Yes, we offer comprehensive visa assistance for international travel. Our team will guide you through the application process, document requirements, and submission. Visa fees are additional and vary by country.",
  },
  {
    category: "visa",
    q: "What documents are needed for an Indian visa?",
    a: "International travelers visiting India typically need a valid passport (6+ months validity), completed visa application form, passport-size photographs, proof of travel itinerary, and visa fee payment. E-visa is available for citizens of many countries.",
  },
  {
    category: "visa",
    q: "How long does it take to get a visa?",
    a: "E-visa processing usually takes 3-5 business days. Regular visa applications can take 2-4 weeks depending on the country. We recommend applying at least 4-6 weeks before your intended travel date.",
  },
  {
    category: "visa",
    q: "Can you help with passport-related queries?",
    a: "While we primarily assist with travel visas, we can provide guidance on passport application procedures and requirements. For specific passport-related services, we recommend contacting your local passport office.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      (activeCategory === "all" || faq.category === activeCategory) &&
      (faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Header />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 overflow-hidden flex items-center min-h-[50vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="FAQ Background"
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
              FAQ
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-primary-800 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
              Everything you need to know about booking with Mahadev Holidays.
              Can't find what you're looking for? Reach out to our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-10 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/85" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-cream-dark rounded-2xl text-primary placeholder:text-primary/70/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all font-body text-sm shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-body ${
                  activeCategory === cat.id
                    ? "bg-accent text-white shadow-md"
                    : "bg-white text-primary/60 hover:text-primary hover:shadow-sm border border-cream-dark"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-cream min-h-[50vh]">
        <div className="max-w-3xl mx-auto px-6">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <AnimatedSection key={index} delay={index * 0.02}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-white/50 hover:border-gold/20 transition-colors duration-300">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <span className="text-sm uppercase tracking-[0.1em] text-gold font-semibold mb-1 block font-body">
                          {faq.category}
                        </span>
                        <span className="text-primary font-medium font-body text-sm">
                          {faq.q}
                        </span>
                      </div>
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
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-primary/70 text-sm leading-relaxed font-body border-t border-cream-dark pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-primary/70/40 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-primary mb-2">No Results Found</h3><p className="text-primary/85 font-body text-sm">
                                No questions match your search. Try different keywords or{" "}
                                <Link href="/contact" className="text-gold underline underline-offset-4">
                                  contact us
                                </Link>{" "}
                                directly.
                              </p>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-accent/5 via-gold/5 to-secondary/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Still Have{" "}
              <span className="text-accent">Questions?</span>
            </h2>
            <p className="text-primary/85 text-lg font-body mb-10">
              Our travel experts are just a call or message away. We're always
              happy to help you with any queries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-accent text-white font-semibold rounded-full text-sm tracking-wide hover:bg-accent-600 transition-all duration-300 shadow-lg shadow-accent/20"
              >
                Contact Us
              </Link>
              <a
                href="tel:+919328151481"
                className="px-8 py-4 border border-primary/20 text-primary font-medium rounded-full text-sm tracking-wide hover:bg-accent/5 transition-all duration-300"
              >
                Call +91 93281 51481
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
}

"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown, MapPin, Compass } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import DestinationCard from "@/components/DestinationCard";

type SortOption = "price-asc" | "price-desc" | "rating" | "name";
type CategoryFilter = "All" | "Domestic" | "International" | "Weekend Getaways" | "Luxury";

interface DestinationData {
  id: string;
  title: string;
  slug: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  type: string;
  category: CategoryFilter;
}

const ALL_DESTINATIONS: DestinationData[] = [
  { id: "1", title: "Kerala", slug: "kerala", location: "God's Own Country", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80", price: 15999, rating: 4.8, reviewCount: 1247, duration: "6D/5N", type: "Nature", category: "Domestic" },
  { id: "2", title: "Goa", slug: "goa", location: "Beach Paradise", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", price: 12999, rating: 4.6, reviewCount: 983, duration: "4D/3N", type: "Beach", category: "Domestic" },
  { id: "3", title: "Kashmir", slug: "kashmir", location: "Paradise on Earth", image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80", price: 18999, rating: 4.9, reviewCount: 1562, duration: "7D/6N", type: "Nature", category: "Domestic" },
  { id: "4", title: "Rajasthan", slug: "rajasthan", location: "Land of Kings", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80", price: 21999, rating: 4.7, reviewCount: 1105, duration: "8D/7N", type: "Heritage", category: "Domestic" },
  { id: "5", title: "Himachal Pradesh", slug: "himachal", location: "Mountain Retreat", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80", price: 13999, rating: 4.7, reviewCount: 876, duration: "6D/5N", type: "Adventure", category: "Domestic" },
  { id: "6", title: "Andaman Islands", slug: "andaman", location: "Tropical Bliss", image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80", price: 24999, rating: 4.6, reviewCount: 654, duration: "7D/6N", type: "Beach", category: "Domestic" },
  { id: "7", title: "Uttarakhand", slug: "uttarakhand", location: "Devbhumi", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80", price: 11999, rating: 4.5, reviewCount: 543, duration: "5D/4N", type: "Nature", category: "Domestic" },
  { id: "8", title: "Gujarat", slug: "gujarat", location: "Vibrant Heritage", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80", price: 14999, rating: 4.4, reviewCount: 432, duration: "6D/5N", type: "Cultural", category: "Domestic" },
  { id: "9", title: "Manali", slug: "manali", location: "Himalayan Haven", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", price: 10999, rating: 4.5, reviewCount: 721, duration: "5D/4N", type: "Adventure", category: "Domestic" },
  { id: "10", title: "North East India", slug: "north-east", location: "Seven Sisters", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80", price: 26999, rating: 4.6, reviewCount: 387, duration: "10D/9N", type: "Nature", category: "Domestic" },
  { id: "11", title: "LTC Tour", slug: "temple-yatra", location: "Spiritual Journey", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", price: 8999, rating: 4.3, reviewCount: 298, duration: "4D/3N", type: "Cultural", category: "Domestic" },
  { id: "12", title: "Temple Yatra", slug: "temple-yatra", location: "Sacred Pilgrimage", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", price: 9999, rating: 4.4, reviewCount: 365, duration: "5D/4N", type: "Cultural", category: "Domestic" },
  { id: "13", title: "Dubai", slug: "dubai", location: "City of Gold", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", price: 45999, rating: 4.8, reviewCount: 2134, duration: "5D/4N", type: "Luxury", category: "International" },
  { id: "14", title: "Thailand", slug: "thailand", location: "Land of Smiles", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", price: 35999, rating: 4.6, reviewCount: 1876, duration: "6D/5N", type: "Beach", category: "International" },
  { id: "15", title: "Singapore", slug: "singapore", location: "Lion City", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80", price: 42999, rating: 4.7, reviewCount: 1456, duration: "5D/4N", type: "Luxury", category: "International" },
  { id: "16", title: "Vietnam", slug: "vietnam", location: "Emerald Beauty", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80", price: 32999, rating: 4.5, reviewCount: 876, duration: "7D/6N", type: "Adventure", category: "International" },
  { id: "17", title: "Malaysia", slug: "malaysia", location: "Truly Asia", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80", price: 38999, rating: 4.5, reviewCount: 765, duration: "6D/5N", type: "Cultural", category: "International" },
  { id: "18", title: "Europe", slug: "europe", location: "The Grand Tour", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80", price: 189999, rating: 4.9, reviewCount: 3456, duration: "12D/11N", type: "Luxury", category: "International" },
  { id: "19", title: "Maldives", slug: "maldives", location: "Tropical Paradise", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", price: 74999, rating: 4.9, reviewCount: 2345, duration: "5D/4N", type: "Luxury", category: "International" },
  { id: "20", title: "Sri Lanka", slug: "sri-lanka", location: "Pearl of Indian Ocean", image: "https://images.unsplash.com/photo-1588598130619-469a584ef057?w=800&q=80", price: 29999, rating: 4.5, reviewCount: 654, duration: "7D/6N", type: "Nature", category: "International" },
];

const CATEGORIES: CategoryFilter[] = ["All", "Domestic", "International", "Weekend Getaways", "Luxury"];

export default function DestinationsClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [sort, setSort] = useState<SortOption>("rating");
  const [visibleCount, setVisibleCount] = useState(8);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [destinationsList, setDestinationsList] = useState<DestinationData[]>(ALL_DESTINATIONS);

  useEffect(() => {
    // Force-sync browser local storage to load fixed image links
    const currentVersion = "v5";
    const localVersion = localStorage.getItem("mahadev_db_version");
    if (localVersion !== currentVersion) {
      localStorage.setItem("mahadev_destinations", JSON.stringify(ALL_DESTINATIONS));
      localStorage.setItem("mahadev_db_version", currentVersion);
    }

    const local = localStorage.getItem("mahadev_destinations");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted = parsed.map((d: any) => ({
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
            category: (String(d.category).toLowerCase() === "international" ? "International" : "Domestic") as "Domestic" | "International",
          }));
          setDestinationsList(formatted);
          return;
        }
      } catch (err) {
        console.error("Failed to parse local storage destinations:", err);
      }
    }

    // 2. Fallback fetch from API if not present in localStorage
    async function loadDestinations() {
      try {
        const res = await fetch("/api/destinations?limit=100");
        if (!res.ok) return;
        const data = await res.json();
        if (data.destinations && Array.isArray(data.destinations) && data.destinations.length > 0) {
          const formatted = data.destinations.map((d: any) => ({
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
            category: (String(d.category).toLowerCase() === "international" ? "International" : "Domestic") as "Domestic" | "International",
          }));
          setDestinationsList(formatted);
        }
      } catch (err) {
        console.error("Failed to load dynamic destinations, falling back to static list:", err);
      }
    }
    loadDestinations();
  }, []);

  const filtered = useMemo(() => {
    let list = [...destinationsList];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.type.toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      if (category === "Weekend Getaways") {
        list = list.filter((d) => parseInt(d.duration.split("D")[0]) <= 4);
      } else if (category === "Luxury") {
        list = list.filter((d) => d.type === "Luxury");
      } else {
        list = list.filter((d) => d.category === category);
      }
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return list;
  }, [search, category, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const sortLabels: Record<SortOption, string> = {
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
    rating: "Highest Rated",
    name: "Name A-Z",
  };

  return (
    <>
      <Header />
      <ScrollToTop />

      <section className="relative pt-44 pb-32 overflow-hidden flex items-center min-h-[50vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
            alt="Explore Destinations"
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
              Explore the World
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight mb-4">
              Our Destinations
            </h1>
            <p className="text-primary-800 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
              Handpicked luxury escapes across India and the world, crafted for
              the discerning traveler seeking extraordinary experiences.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl shadow-primary/5 p-4 md:p-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setVisibleCount(8);
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                    category === cat
                      ? "bg-accent text-white shadow-md shadow-accent/20"
                      : "bg-primary/5 text-primary/80 hover:bg-primary/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(8);
                  }}
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-2.5 bg-primary/5 rounded-full text-sm text-primary outline-none placeholder:text-primary/30 focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary/5 rounded-full text-sm text-primary/70 hover:text-primary transition-all"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{sortLabels[sort]}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      showSortDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showSortDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowSortDropdown(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-primary/5 z-20 overflow-hidden">
                      {(Object.entries(sortLabels) as [SortOption, string][]).map(
                        ([key, label]) => (
                          <button
                            key={key}
                            onClick={() => {
                              setSort(key);
                              setShowSortDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                              sort === key
                                ? "bg-gold/10 text-gold-dark font-medium"
                                : "text-primary/85 hover:bg-primary/5"
                            }`}
                          >
                            {label}
                          </button>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {visible.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-primary/75 text-sm font-semibold">
                Showing{" "}
                <span className="text-primary font-semibold">{visible.length}</span>{" "}
                of{" "}
                <span className="text-primary font-semibold">
                  {filtered.length}
                </span>{" "}
                destinations
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {visible.map((dest) => (
                  <motion.div
                    key={dest.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DestinationCard
                      id={dest.id}
                      image={dest.image}
                      title={dest.title}
                      location={dest.location}
                      rating={dest.rating}
                      duration={dest.duration}
                      price={dest.price}
                      type={dest.type}
                      href={`/destinations/${dest.slug}`}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent-600 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/30 group"
                >
                  <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
                  Load More Destinations
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-primary mb-3">
              No Destinations Found
            </h3>
            <p className="text-primary/75 max-w-md mx-auto mb-6">
              We couldn&apos;t find any destinations matching your search. Try
              adjusting your filters or explore all our offerings.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("rating");
                setVisibleCount(8);
              }}
              className="px-6 py-3 bg-accent text-white font-semibold rounded-full text-sm hover:bg-accent-600 transition-all duration-300"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}
      </section>

      <Footer />
    </>
  );
}

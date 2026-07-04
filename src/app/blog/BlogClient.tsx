"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, User, Clock, ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedSection from "@/components/AnimatedSection";
import Newsletter from "@/components/Newsletter";

interface BlogData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const BLOG_POSTS: BlogData[] = [
  {
    id: "1",
    title: "Top 10 Luxury Destinations in India for 2026",
    slug: "top-10-luxury-destinations-in-india-2026",
    excerpt:
      "Discover the most opulent and breathtaking destinations across India that redefine luxury travel. From palace stays in Rajasthan to houseboat experiences in Kashmir.",
    coverImage:
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80",
    author: "Mahadev Holidays Team",
    category: "Luxury Travel",
    date: "March 15, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "2",
    title: "The Ultimate Honeymoon Guide: Romantic Getaways for Newlyweds",
    slug: "ultimate-honeymoon-guide-romantic-getaways",
    excerpt:
      "Planning your dream honeymoon? Explore our curated list of the most romantic destinations that promise unforgettable memories for couples.",
    coverImage:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
    author: "Priya Sharma",
    category: "Travel Tips",
    date: "March 10, 2026",
    readTime: "6 min read",
  },
  {
    id: "3",
    title: "Exploring Kerala: God's Own Country in Style",
    slug: "exploring-kerala-gods-own-country-in-style",
    excerpt:
      "Experience the lush backwaters, pristine beaches, and rich culture of Kerala with our luxury travel guide to India's most serene destination.",
    coverImage:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80",
    author: "Rahul Verma",
    category: "Destination Guides",
    date: "March 5, 2026",
    readTime: "7 min read",
  },
  {
    id: "4",
    title: "Why Choose a Customized Tour Package? The Benefits of Personalized Travel",
    slug: "why-choose-customized-tour-package",
    excerpt:
      "Discover how customized tour packages offer flexibility, unique experiences, and unparalleled value compared to off-the-shelf travel deals.",
    coverImage:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    author: "Ananya Gupta",
    category: "Travel Tips",
    date: "February 28, 2026",
    readTime: "5 min read",
  },
  {
    id: "5",
    title: "Kashmir: Paradise on Earth - A Complete Travel Guide",
    slug: "kashmir-paradise-on-earth-complete-travel-guide",
    excerpt:
      "From the Dal Lake shikaras to the snow-capped peaks of Gulmarg, explore everything you need to know for an unforgettable Kashmir vacation.",
    coverImage:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80",
    author: "Vikram Singh",
    category: "Destination Guides",
    date: "February 20, 2026",
    readTime: "10 min read",
  },
  {
    id: "6",
    title: "International Travel Tips for First-Time Travelers",
    slug: "international-travel-tips-first-time-travelers",
    excerpt:
      "Planning your first international trip? Here's everything you need to know - from visa requirements and currency exchange to packing essentials.",
    coverImage:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    author: "Neha Kapoor",
    category: "Travel Tips",
    date: "February 14, 2026",
    readTime: "6 min read",
  },
  {
    id: "7",
    title: "A Culinary Journey Through India's Regional Cuisines",
    slug: "culinary-journey-through-india-regional-cuisines",
    excerpt:
      "Embark on a gastronomic adventure across India's diverse culinary landscape, from spicy street food to royal thalis and coastal delicacies.",
    coverImage:
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&q=80",
    author: "Mahadev Holidays Team",
    category: "Food & Travel",
    date: "February 8, 2026",
    readTime: "7 min read",
  },
  {
    id: "8",
    title: "The Rich Cultural Heritage of Rajasthan: Beyond the Palaces",
    slug: "rich-cultural-heritage-rajasthan-beyond-palaces",
    excerpt:
      "Dive deep into Rajasthan's vibrant culture, folk music, traditional crafts, and timeless architecture that make it India's most colorful state.",
    coverImage:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
    author: "Arjun Mehta",
    category: "Culture & Heritage",
    date: "February 1, 2026",
    readTime: "9 min read",
  },
];

const CATEGORIES = [
  "All",
  "Travel Tips",
  "Destination Guides",
  "Luxury Travel",
  "Culture & Heritage",
  "Food & Travel",
];

const POSTS_PER_PAGE = 6;

export default function BlogClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const featured = useMemo(
    () => BLOG_POSTS.find((p) => p.featured),
    []
  );

  const regular = useMemo(
    () => BLOG_POSTS.filter((p) => !p.featured),
    []
  );

  const filtered = useMemo(() => {
    let list = search.trim()
      ? regular.filter(
          (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase())
        )
      : regular;

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    return list;
  }, [search, category, regular]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paged = filtered.slice(0, page * POSTS_PER_PAGE);
  const hasMore = page * POSTS_PER_PAGE < filtered.length;

  const handleLoadMore = () => setPage((p) => p + 1);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <>
      <Header />
      <ScrollToTop />

      <section className="relative pt-44 pb-32 overflow-hidden flex items-center min-h-[50vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
            alt="Travel Blog"
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
              Stories & Guides
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight mb-4">
              Our Travel Blog
            </h1>
            <p className="text-primary-800 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
              Inspiration, guides, and stories from the road to fuel your next
              luxury adventure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl shadow-primary/5 p-5"
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                    category === cat
                      ? "bg-accent text-white shadow-md shadow-accent/20"
                      : "bg-primary/5 text-primary/80 hover:bg-primary/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 bg-primary/5 rounded-full text-sm text-primary outline-none placeholder:text-primary/30 focus:ring-2 focus:ring-accent/30 transition-all"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {featured && search === "" && category === "All" && (
          <AnimatedSection className="mb-16">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/5 via-gold/5 to-secondary/5 border border-gold/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-gold/15 to-transparent" />
                  </div>
                  <div className="relative flex flex-col justify-center p-8 md:p-12">
                    <span className="px-3 py-1 bg-gold text-primary text-[10px] font-semibold uppercase tracking-wider rounded-full w-fit mb-4">
                      Featured Post
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-primary/85 text-base md:text-lg mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-primary/70 text-sm mb-6 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {featured.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {featured.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {featured.readTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        )}

        {filtered.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-primary/75 text-sm font-semibold">
                Showing{" "}
                <span className="text-primary font-semibold">{paged.length}</span>{" "}
                of{" "}
                <span className="text-primary font-semibold">
                  {filtered.length}
                </span>{" "}
                articles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {paged.map((post, index) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-accent/30 via-gold/10 to-transparent" />
                          <span className="absolute top-3 left-3 px-3 py-1 bg-gold text-primary text-[10px] font-semibold uppercase tracking-wider rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-primary/70 text-sm mb-3 font-semibold">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="font-heading text-lg font-bold text-primary mb-2 group-hover:text-gold transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-primary/80 text-base leading-relaxed mb-4 flex-1 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                            <span className="flex items-center gap-1.5 text-primary/75 text-sm font-semibold">
                              <User className="w-3 h-3" />
                              {post.author}
                            </span>
                            <span className="text-gold text-xs font-medium group-hover:gap-1 transition-all flex items-center gap-0.5">
                              Read More <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent-600 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/30 group"
                >
                  <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Load More Articles
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
              <BookOpen className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-primary mb-3">
              No Articles Found
            </h3>
            <p className="text-primary/75 max-w-md mx-auto mb-6">
              We couldn&apos;t find any articles matching your search. Try
              different keywords or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setPage(1);
              }}
              className="px-6 py-3 bg-accent text-white font-semibold rounded-full text-sm hover:bg-accent-600 transition-all duration-300"
            >
              View All Articles
            </button>
          </motion.div>
        )}

        <div className="mt-16">
          <Newsletter />
        </div>
      </section>

      <Footer />
    </>
  );
}

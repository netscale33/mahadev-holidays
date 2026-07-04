import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

const BLOG_SLUGS = [
  "top-10-luxury-destinations-in-india-2026",
  "ultimate-honeymoon-guide-romantic-getaways",
  "exploring-kerala-gods-own-country-in-style",
  "why-choose-customized-tour-package",
  "kashmir-paradise-on-earth-complete-travel-guide",
  "international-travel-tips-first-time-travelers",
  "culinary-journey-through-india-regional-cuisines",
  "rich-cultural-heritage-rajasthan-beyond-palaces",
];

const BLOG_META: Record<string, { title: string; description: string }> = {
  "top-10-luxury-destinations-in-india-2026": {
    title: "Top 10 Luxury Destinations in India for 2026 | Mahadev Holidays",
    description:
      "Discover India's most opulent destinations for 2026. From royal Rajasthan to serene Kerala, explore the finest luxury travel experiences across India.",
  },
  "ultimate-honeymoon-guide-romantic-getaways": {
    title: "Ultimate Honeymoon Guide: Romantic Getaways | Mahadev Holidays",
    description:
      "Plan your dream honeymoon with our guide to the most romantic destinations. From Maldives to Kashmir, find perfect couple getaways.",
  },
  "exploring-kerala-gods-own-country-in-style": {
    title: "Exploring Kerala: God's Own Country in Style | Mahadev Holidays",
    description:
      "Experience the best of Kerala with our luxury travel guide. Backwaters, tea gardens, beaches, and Ayurveda - all in style.",
  },
  "why-choose-customized-tour-package": {
    title: "Why Choose a Customized Tour Package? | Mahadev Holidays",
    description:
      "Discover the benefits of personalized travel packages. Flexibility, unique experiences, and value for money with customized tours.",
  },
  "kashmir-paradise-on-earth-complete-travel-guide": {
    title: "Kashmir: Paradise on Earth - Complete Travel Guide | Mahadev Holidays",
    description:
      "A comprehensive guide to traveling in Kashmir. From Dal Lake to Gulmarg, plan your perfect Kashmir vacation with expert tips.",
  },
  "international-travel-tips-first-time-travelers": {
    title: "International Travel Tips for First-Time Travelers | Mahadev Holidays",
    description:
      "Essential tips for first-time international travelers. Visa guidance, packing lists, currency tips, and more for stress-free travel abroad.",
  },
  "culinary-journey-through-india-regional-cuisines": {
    title: "A Culinary Journey Through India's Regional Cuisines | Mahadev Holidays",
    description:
      "Explore India's diverse culinary landscape. From spicy street food to royal thalis, embark on a gastronomic adventure across India.",
  },
  "rich-cultural-heritage-rajasthan-beyond-palaces": {
    title: "Rich Cultural Heritage of Rajasthan Beyond Palaces | Mahadev Holidays",
    description:
      "Dive deep into Rajasthan's vibrant culture, folk music, traditional crafts, and timeless architecture that make it India's most colorful state.",
  },
};

export async function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = BLOG_META[slug];
  if (!meta) {
    return { title: "Blog Post Not Found | Mahadev Holidays" };
  }
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      images: [
        {
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
  };
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}

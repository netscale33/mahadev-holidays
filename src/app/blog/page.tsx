import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Travel Blog | Mahadev Holidays",
  description:
    "Discover travel inspiration, destination guides, luxury travel tips, and cultural insights from the Mahadev Holidays blog.",
  keywords:
    "travel blog, luxury travel, India travel guide, holiday tips, destination guides",
  openGraph: {
    title: "Travel Blog | Mahadev Holidays",
    description:
      "Discover travel inspiration and expert guides from the Mahadev Holidays blog.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Mahadev Holidays Blog",
      },
    ],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}

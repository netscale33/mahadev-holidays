import type { Metadata } from "next";
import DestinationsClient from "./DestinationsClient";

export const metadata: Metadata = {
  title: "Our Destinations | Mahadev Holidays",
  description:
    "Explore our curated selection of luxury domestic and international destinations. From the backwaters of Kerala to the glamour of Dubai, find your perfect getaway.",
  keywords:
    "luxury travel, India tour packages, international holidays, Kerala, Goa, Kashmir, Dubai, Thailand, Maldives",
  openGraph: {
    title: "Our Destinations | Mahadev Holidays",
    description:
      "Explore curated luxury travel destinations across India and the world.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Mahadev Holidays Destinations",
      },
    ],
  },
};

export default function DestinationsPage() {
  return <DestinationsClient />;
}

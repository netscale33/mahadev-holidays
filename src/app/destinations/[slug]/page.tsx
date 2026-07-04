import type { Metadata } from "next";
import DestinationDetailClient from "./DestinationDetailClient";

const SLUGS = [
  "kerala", "goa", "kashmir", "rajasthan", "himachal", "andaman",
  "dubai", "thailand", "singapore", "europe", "maldives", "manali",
  "uttarakhand", "gujarat", "vietnam", "malaysia", "sri-lanka",
  "north-east", "temple-yatra",
];

const DESTINATION_META: Record<string, { title: string; description: string }> = {
  kerala: {
    title: "Kerala Tour Packages | Mahadev Holidays",
    description:
      "Explore Kerala's enchanting backwaters, lush hill stations, and pristine beaches with our luxury tour packages. Experience God's Own Country in style.",
  },
  goa: {
    title: "Goa Holiday Packages | Mahadev Holidays",
    description:
      "Discover the sun, sand, and soul of Goa with our curated luxury beach holiday packages. Perfect for relaxation and water sports.",
  },
  kashmir: {
    title: "Kashmir Tour Packages | Mahadev Holidays",
    description:
      "Experience the breathtaking beauty of Kashmir - from Dal Lake shikaras to Gulmarg's snowy peaks. Luxury Kashmir holiday packages await.",
  },
  rajasthan: {
    title: "Rajasthan Tour Packages | Mahadev Holidays",
    description:
      "Journey through the royal land of Rajasthan with palace stays, desert safaris, and heritage experiences. Luxury Rajasthan tours.",
  },
  himachal: {
    title: "Himachal Pradesh Tour Packages | Mahadev Holidays",
    description:
      "Escape to the Himalayan paradise of Himachal Pradesh. Luxury mountain retreats, adventure activities, and scenic landscapes.",
  },
  andaman: {
    title: "Andaman Tour Packages | Mahadev Holidays",
    description:
      "Discover the tropical paradise of Andaman Islands with crystal-clear waters, white sandy beaches, and exotic water sports.",
  },
  dubai: {
    title: "Dubai Tour Packages | Mahadev Holidays",
    description:
      "Experience the glitz and glamour of Dubai with our luxury holiday packages. Burj Khalifa, desert safaris, and world-class shopping.",
  },
  thailand: {
    title: "Thailand Tour Packages | Mahadev Holidays",
    description:
      "Explore the Land of Smiles with our Thailand packages. Bangkok, Phuket, Krabi - luxury beach holidays and cultural experiences.",
  },
  singapore: {
    title: "Singapore Tour Packages | Mahadev Holidays",
    description:
      "Discover the futuristic city-state of Singapore. Gardens by the Bay, Sentosa Island, and world-class dining experiences.",
  },
  europe: {
    title: "Europe Tour Packages | Mahadev Holidays",
    description:
      "Embark on a grand European adventure. Paris, Switzerland, Italy, and more - curated luxury tours across Europe's finest destinations.",
  },
  maldives: {
    title: "Maldives Tour Packages | Mahadev Holidays",
    description:
      "Indulge in the ultimate tropical luxury at the Maldives. Overwater villas, crystal lagoons, and world-class spa experiences.",
  },
  manali: {
    title: "Manali Tour Packages | Mahadev Holidays",
    description:
      "Experience the Himalayan beauty of Manali with our curated holiday packages. Snow-capped peaks, adventure sports, and serene landscapes.",
  },
  uttarakhand: {
    title: "Uttarakhand Tour Packages | Mahadev Holidays",
    description:
      "Explore the spiritual and natural beauty of Uttarakhand. From Char Dham to Nainital's lakes, experience divine tranquility.",
  },
  gujarat: {
    title: "Gujarat Tour Packages | Mahadev Holidays",
    description:
      "Discover the vibrant culture, wildlife, and heritage of Gujarat. Statue of Unity, Gir lions, and white Rann of Kutch.",
  },
  vietnam: {
    title: "Vietnam Tour Packages | Mahadev Holidays",
    description:
      "Explore the emerald beauty of Vietnam. Ha Long Bay, Hanoi, Ho Chi Minh City - a perfect blend of nature and culture.",
  },
  malaysia: {
    title: "Malaysia Tour Packages | Mahadev Holidays",
    description:
      "Discover the diversity of Malaysia. Kuala Lumpur, Langkawi, Penang - luxury holidays in truly Asia.",
  },
  "sri-lanka": {
    title: "Sri Lanka Tour Packages | Mahadev Holidays",
    description:
      "Explore the pearl of the Indian Ocean. Tea plantations, ancient cities, and pristine beaches in luxury comfort.",
  },
  "north-east": {
    title: "North East India Tour Packages | Mahadev Holidays",
    description:
      "Discover the untouched beauty of India's Northeast. Meghalaya, Assam, Sikkim - exotic landscapes and rich tribal culture.",
  },
  "temple-yatra": {
    title: "Temple Yatra Tour Packages | Mahadev Holidays",
    description:
      "Embark on a sacred spiritual journey with our Temple Yatra packages. Visit India's most revered temples with complete comfort.",
  },
};

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = DESTINATION_META[slug];
  if (!meta) {
    return { title: "Destination Not Found | Mahadev Holidays" };
  }
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
  };
}

export default function DestinationDetailPage() {
  return <DestinationDetailClient />;
}

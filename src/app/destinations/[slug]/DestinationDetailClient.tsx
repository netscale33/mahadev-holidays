"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Check,
  X,
  Star,
  MapPin,
  Clock,
  Sun,
  Plane,
  Phone,
  Send,
  Home,
  ChevronRight,
  ArrowRight,
  Users,
  Calendar,
  Mail,
  Menu,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import ImageGallery from "@/components/ImageGallery";
import DestinationCard from "@/components/DestinationCard";
import Newsletter from "@/components/Newsletter";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: { breakfast: boolean; lunch: boolean; dinner: boolean };
  accommodation: string;
}

interface PricingTier {
  name: string;
  tag: string;
  price: number;
  priceLabel: string;
  inclusions: string[];
  highlighted?: boolean;
}

interface DetailedDestination {
  slug: string;
  name: string;
  location: string;
  tagline: string;
  heroImage: string;
  rating: number;
  reviewCount: number;
  duration: string;
  bestTime: string;
  description: string;
  longDescription: string;
  highlights: string[];
  images: { src: string; alt: string }[];
  itinerary: ItineraryDay[];
  pricing: PricingTier[];
  inclusions: string[];
  exclusions: string[];
  category: string;
  type: string;
  price: number;
}

const ALL_DETAILS: Record<string, DetailedDestination> = {
  kerala: {
    slug: "kerala",
    name: "Kerala",
    location: "God's Own Country",
    tagline: "Where Nature Writes Poetry",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80",
    rating: 4.8,
    reviewCount: 1247,
    duration: "6 Days / 5 Nights",
    bestTime: "September to March",
    description:
      "Kerala, aptly called God's Own Country, is a tropical paradise where lush green landscapes meet serene backwaters and pristine beaches. Our luxury Kerala packages let you experience the best of this enchanting destination.",
    longDescription:
      "Nestled between the Arabian Sea and the Western Ghats, Kerala offers a unique blend of natural beauty, rich culture, and luxurious experiences. Glide through the tranquil backwaters of Alleppey on a private houseboat, witness the misty tea plantations of Munnar, indulge in Ayurvedic wellness treatments, and savor authentic Kerala cuisine. From the vibrant Kathakali performances to the serene beaches of Varkala, every moment in Kerala is a celebration of life and luxury.",
    highlights: [
      "Private houseboat cruise through Alleppey backwaters",
      "Stay at luxury tea estate bungalows in Munnar",
      "Traditional Ayurvedic spa treatments",
      "Kathakali dance performance",
      "Sunset at Kovalam Beach",
      "Wildlife safari at Periyar National Park",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80", alt: "Kerala Backwaters" },
      { src: "https://images.unsplash.com/photo-1602211844890-6537e05c8c7e?w=800&q=80", alt: "Munnar Tea Gardens" },
      { src: "https://images.unsplash.com/photo-1587218801987-56f0e43e4c02?w=800&q=80", alt: "Kerala Houseboat" },
      { src: "https://images.unsplash.com/photo-1625504615927-14d5bd86c9e5?w=800&q=80", alt: "Kerala Beach" },
      { src: "https://images.unsplash.com/photo-1598605272254-16f0c7ec1b47?w=800&q=80", alt: "Kathakali Performance" },
      { src: "https://images.unsplash.com/photo-1570168007206-1ba7da3b1a5d?w=800&q=80", alt: "Kerala Spices" },
    ],
    itinerary: [
      {
        day: 1, title: "Arrival in Kochi", description: "Arrive at Kochi International Airport. Our representative will welcome you and transfer you to your luxury hotel.",
        activities: ["Check into hotel", "Evening harbour cruise", "Chinese fishing nets visit", "Welcome dinner at a heritage restaurant"],
        meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Brunton Boatyard or similar",
      },
      {
        day: 2, title: "Kochi to Munnar", description: "After breakfast, drive to Munnar through winding roads with breathtaking views of tea plantations.",
        activities: ["Scenic drive to Munnar", "Tea plantation visit", "Tea tasting session", "Evening nature walk"],
        meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Tea County Resort or similar",
      },
      {
        day: 3, title: "Munnar Exploration", description: "Full day exploring the hill station's natural wonders and attractions.",
        activities: ["Eravikulam National Park", "Mattupetty Dam", "Echo Point", "Photo walk at tea gardens", "Sunset at Top Station"],
        meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Tea County Resort or similar",
      },
      {
        day: 4, title: "Munnar to Alleppey", description: "Drive to Alleppey to board your private luxury houseboat for an unforgettable backwater experience.",
        activities: ["Board luxury houseboat", "Cruise through backwaters", "Traditional Kerala lunch on boat", "Evening fishing", "Overnight stay on houseboat"],
        meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Premium Houseboat",
      },
      {
        day: 5, title: "Alleppey to Kovalam", description: "Disembark from the houseboat and drive to Kovalam for beachside relaxation.",
        activities: ["Houseboat breakfast cruise", "Disembark at Alleppey", "Drive to Kovalam", "Beach time at Lighthouse Beach", "Ayurvedic spa treatment"],
        meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Taj Green Cove or similar",
      },
      {
        day: 6, title: "Departure", description: "Enjoy a final breakfast at the resort before transferring to Trivandrum airport for departure.",
        activities: ["Beachside breakfast", "Souvenir shopping", "Transfer to airport"],
        meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "",
      },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 15999, priceLabel: "₹15,999 per person", inclusions: ["3-star accommodation", "Standard room category", "Economy transfers", "Breakfast included", "English speaking guide", "Boat cruise shared"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 25999, priceLabel: "₹25,999 per person", inclusions: ["4-star accommodation", "Deluxe room category", "Private transfers", "Breakfast & dinner daily", "Personal guide", "Private houseboat", "Ayurvedic spa session"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 42999, priceLabel: "₹42,999 per person", inclusions: ["5-star/heritage accommodation", "Premium suite category", "Luxury private transfers", "All meals included", "Dedicated concierge", "Private houseboat with crew", "Daily spa treatments", "Premium experiences"], highlighted: false },
    ],
    inclusions: ["Accommodation as per package", "Daily breakfast", "Private transfers", "English speaking guide", "Houseboat cruise", "All permit fees", "GST & service charges", "24/7 customer support"],
    exclusions: ["Flight tickets", "Personal expenses", "Camera fees at monuments", "Tips & gratuities", "Any meals not specified", "Travel insurance"],
    category: "domestic",
    type: "Nature",
    price: 15999,
  },
  goa: {
    slug: "goa", name: "Goa", location: "Beach Paradise",
    tagline: "Sun, Sand & Soul",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
    rating: 4.6, reviewCount: 983, duration: "4 Days / 3 Nights", bestTime: "November to February",
    description: "Goa is India's ultimate beach destination, offering a perfect blend of golden sands, vibrant nightlife, Portuguese heritage, and luxury resorts.",
    longDescription: "With its stunning coastline dotted with palm-fringed beaches, Goa offers an unparalleled beach holiday experience. From the lively shores of Baga to the serene beaches of South Goa, there's something for every traveler. Explore Portuguese-era architecture in Old Goa, indulge in water sports, savor fresh seafood, and dance the night away at beach clubs. Our luxury packages ensure you experience the best of Goa in style and comfort.",
    highlights: ["Private beachside villa stay", "Sunset dolphin cruise", "Water sports package", "Portuguese heritage walk", "Goan cooking class", "Spa by the sea"],
    images: [
      { src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", alt: "Goa Beach" },
      { src: "https://images.unsplash.com/photo-1604999333679-b86d5473834b?w=800&q=80", alt: "Goa Sunset" },
      { src: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=800&q=80", alt: "Goa Water Sports" },
      { src: "https://images.unsplash.com/photo-1571494076049-e52e9b67d7b4?w=800&q=80", alt: "Goa Church" },
      { src: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800&q=80", alt: "Goa Villa" },
      { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Goa Seafood" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Goa", description: "Welcome to Goa! Transfer to your beachfront resort.", activities: ["Check into luxury resort", "Beach welcome", "Sunset cocktail", "Night market visit"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Taj Fort Aguada or similar" },
      { day: 2, title: "North Goa Exploration", description: "Explore the vibrant beaches of North Goa.", activities: ["Baga & Calangute beaches", "Water sports", "Lunch at beach shack", "Fort Aguada visit", "Casino night cruise"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Taj Fort Aguada or similar" },
      { day: 3, title: "South Goa Serenity", description: "Discover the peaceful side of Goa.", activities: ["South Goa beach hopping", "Dolphin spotting cruise", "Portuguese heritage walk", "Spice plantation visit", "Farewell dinner"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Taj Fort Aguada or similar" },
      { day: 4, title: "Departure", description: "Final breakfast and departure.", activities: ["Breakfast at resort", "Last minute shopping", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 12999, priceLabel: "₹12,999 per person", inclusions: ["3-star beach resort", "Standard room", "Shared transfers", "Breakfast only", "Basic water sports"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 19999, priceLabel: "₹19,999 per person", inclusions: ["4-star beach resort", "Deluxe sea view room", "Private transfers", "Breakfast & dinner daily", "Water sports package", "Sunset cruise"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 34999, priceLabel: "₹34,999 per person", inclusions: ["5-star luxury resort", "Premium suite", "Luxury private transfers", "All meals included", "Private butler", "Private yacht cruise", "Daily spa", "Premium water sports"], highlighted: false },
    ],
    inclusions: ["Accommodation as per plan", "Daily breakfast", "Airport transfers", "Sightseeing as per itinerary", "Water sports as per package", "All taxes"],
    exclusions: ["Airfare", "Personal expenses", "Camera fees", "Tips", "Meals not specified"],
    category: "domestic", type: "Beach", price: 12999,
  },
  kashmir: {
    slug: "kashmir", name: "Kashmir", location: "Paradise on Earth",
    tagline: "Heaven on Earth Awaits",
    heroImage: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80",
    rating: 4.9, reviewCount: 1562, duration: "7 Days / 6 Nights", bestTime: "April to October",
    description: "Kashmir, often called Paradise on Earth, is a breathtaking valley of snow-capped mountains, pristine lakes, lush gardens, and rich cultural heritage.",
    longDescription: "Nestled in the Himalayas, Kashmir is a land of unparalleled natural beauty. Glide across the iconic Dal Lake on a shikara, stroll through the Mughal gardens, experience the meadows of Gulmarg, and explore the pristine valleys of Pahalgam. Our luxury packages offer the finest hospitality with stays at heritage houseboats and resorts that capture the essence of Kashmiri royalty.",
    highlights: ["Private shikara ride on Dal Lake", "Stay at luxury heritage houseboat", "Gondola ride at Gulmarg", "Mughal garden tours", "Pahalgam valley trek", "Kashmiri wazwan dinner"],
    images: [
      { src: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80", alt: "Dal Lake" },
      { src: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80", alt: "Mughal Garden" },
      { src: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&q=80", alt: "Gulmarg" },
      { src: "https://images.unsplash.com/photo-1598325337271-1a37c768dc9f?w=800&q=80", alt: "Pahalgam" },
      { src: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80", alt: "Shikara" },
      { src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80", alt: "Kashmir Valley" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", description: "Arrive at Srinagar airport and transfer to your luxury houseboat on Dal Lake.", activities: ["Airport pickup", "Check into heritage houseboat", "Shikara ride", "Welcome Kashmiri dinner"], meals: { breakfast: false, lunch: true, dinner: true }, accommodation: "Luxury Houseboat on Dal Lake" },
      { day: 2, title: "Srinagar Sightseeing", description: "Explore the Mughal gardens and local markets.", activities: ["Mughal Gardens - Shalimar, Nishat", "Shankaracharya Temple", "Floating market visit", "Craft shopping", "Evening entertainment"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Luxury Houseboat on Dal Lake" },
      { day: 3, title: "Srinagar to Gulmarg", description: "Drive to Gulmarg, the meadow of flowers, for an exhilarating experience.", activities: ["Drive to Gulmarg", "Gondola ride (Phase 1 & 2)", "Skiing/snowboarding (winter)", "Nature walk", "Bonfire evening"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Khyber Himalayan Resort or similar" },
      { day: 4, title: "Gulmarg to Pahalgam", description: "Travel to Pahalgam, the valley of shepherds.", activities: ["Scenic drive via Betaab Valley", "Aru Valley visit", "Horse riding", "River rafting", "Photography walk"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Pahalgam Resort or similar" },
      { day: 5, title: "Pahalgam Exploration", description: "Full day to explore the natural wonders of Pahalgam.", activities: ["Chandanwari excursion", "Sheshnag Lake trek option", "Pine forest walk", "Local village visit", "Streamside picnic"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Pahalgam Resort or similar" },
      { day: 6, title: "Return to Srinagar", description: "Drive back to Srinagar for a final day of leisure.", activities: ["Drive to Srinagar", "Leisure time at Mughal Gardens", "Last minute shopping", "Farewell Kashmiri feast"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Luxury Houseboat on Dal Lake" },
      { day: 7, title: "Departure", description: "Transfer to airport for departure with unforgettable memories.", activities: ["Breakfast on houseboat", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 18999, priceLabel: "₹18,999 per person", inclusions: ["3-star hotel/standard houseboat", "Standard room", "Shared transfers", "Breakfast & dinner", "Shikara ride"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 28999, priceLabel: "₹28,999 per person", inclusions: ["4-star hotel/deluxe houseboat", "Deluxe room", "Private transfers", "All meals included", "Shikara ride & gondola", "Guide"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 45999, priceLabel: "₹45,999 per person", inclusions: ["5-star resort/luxury houseboat", "Suite accommodation", "Luxury private transfers", "All meals premium", "Private shikara", "Full gondola access", "Daily spa", "Butler service"], highlighted: false },
    ],
    inclusions: ["Accommodation", "Daily meals as per plan", "Sightseeing & transfers", "Gondola ride (Gold/Platinum)", "Shikara ride", "Guide charges", "All taxes"],
    exclusions: ["Airfare", "Personal expenses", "Tips", "Camera fees", "Activities not mentioned"],
    category: "domestic", type: "Nature", price: 18999,
  },
  dubai: {
    slug: "dubai", name: "Dubai", location: "City of Gold",
    tagline: "Where Dreams Touch the Sky",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    rating: 4.8, reviewCount: 2134, duration: "5 Days / 4 Nights", bestTime: "November to March",
    description: "Dubai is a dazzling metropolis of futuristic architecture, luxury shopping, desert adventures, and world-class entertainment.",
    longDescription: "From the iconic Burj Khalifa to sprawling desert dunes, Dubai offers an unmatched luxury experience. Shop at the Dubai Mall, ski indoors at Mall of the Emirates, enjoy a desert safari, and dine at Michelin-starred restaurants. Our Dubai packages include stays at the finest hotels, VIP access to attractions, and seamless travel arrangements for an unforgettable Arabian getaway.",
    highlights: ["Burj Khalifa observation deck", "Desert safari with dune bashing", "Luxury yacht dinner cruise", "Dubai Mall shopping experience", "Atlantis water park", "Gold souk visit"],
    images: [
      { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", alt: "Dubai Skyline" },
      { src: "https://images.unsplash.com/photo-1546412414-e1885e5119a0?w=800&q=80", alt: "Burj Khalifa" },
      { src: "https://images.unsplash.com/photo-1575882697960-1f4e3f591e25?w=800&q=80", alt: "Dubai Desert" },
      { src: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80", alt: "Palm Jumeirah" },
      { src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80", alt: "Dubai Marina" },
      { src: "https://images.unsplash.com/photo-1569993078047-d1adf25ac709?w=800&q=80", alt: "Dubai Mall" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Dubai", description: "Welcome to Dubai! Transfer to your luxury hotel.", activities: ["Airport VIP transfer", "Hotel check-in", "Evening Dubai Marina walk", "Welcome dinner at Atlantis"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Burj Al Arab or similar" },
      { day: 2, title: "Dubai City Tour", description: "Explore the iconic landmarks of Dubai.", activities: ["Burj Khalifa observation deck", "Dubai Mall visit", "Dubai Fountain show", "Gold & Spice souks", "Abra ride on Dubai Creek"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Burj Al Arab or similar" },
      { day: 3, title: "Desert Adventure", description: "Experience the Arabian desert in style.", activities: ["Morning at leisure", "Afternoon desert safari", "Dune bashing", "Camel ride", "BBQ dinner under stars"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "Burj Al Arab or similar" },
      { day: 4, title: "Beach & Water Parks", description: "Day of water fun and relaxation.", activities: ["Atlantis Aquaventure Park", "Lunch at The Palm", "Beach relaxation", "Sunset yacht cruise"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Burj Al Arab or similar" },
      { day: 5, title: "Departure", description: "Final shopping and departure.", activities: ["Breakfast", "Last minute shopping at Dubai Mall", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 45999, priceLabel: "₹45,999 per person", inclusions: ["4-star city hotel", "Standard room", "Shared transfers", "Breakfast daily", "City tour"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 69999, priceLabel: "₹69,999 per person", inclusions: ["5-star hotel", "Deluxe room with city view", "Private transfers", "Breakfast & dinner", "Desert safari & city tour", "Burj Khalifa tickets"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 129999, priceLabel: "₹1,29,999 per person", inclusions: ["7-star Burj Al Arab", "Premium suite", "Luxury chauffeur", "All meals fine dining", "VIP desert safari", "Yacht cruise dinner", "Spa & butler"], highlighted: false },
    ],
    inclusions: ["Accommodation", "Daily breakfast", "Airport transfers", "Sightseeing as per itinerary", "All taxes"],
    exclusions: ["Visa fees", "International flights", "Personal expenses", "Tips", "Meals not specified"],
    category: "international", type: "Luxury", price: 45999,
  },
  rajasthan: {
    slug: "rajasthan", name: "Rajasthan", location: "Land of Kings",
    tagline: "Royalty Echoes in Every Fort",
    heroImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
    rating: 4.7, reviewCount: 1105, duration: "8 Days / 7 Nights", bestTime: "October to March",
    description: "Rajasthan is a vibrant tapestry of majestic forts, royal palaces, colorful bazaars, and timeless desert landscapes.",
    longDescription: "Step into a world of royalty and romance in Rajasthan. From the pink city of Jaipur to the blue city of Jodhpur, from the lake city of Udaipur to the desert dunes of Jaisalmer, every destination tells a story of valor and grandeur. Our luxury packages include stays at heritage palaces, private desert camps, and exclusive experiences that bring Rajasthan's royal legacy to life.",
    highlights: ["Heritage palace stays", "Private desert camp experience", "Elephant safari at Amber Fort", "Sunset at Mehrangarh Fort", "Lake cruise in Udaipur", "Traditional Rajasthani folk evening"],
    images: [
      { src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80", alt: "Jaipur Hawa Mahal" },
      { src: "https://images.unsplash.com/photo-1535957998253-26ae1ef29506?w=800&q=80", alt: "Udaipur Lake Palace" },
      { src: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800&q=80", alt: "Jaisalmer Fort" },
      { src: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=800&q=80", alt: "Thar Desert" },
      { src: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80", alt: "Rajasthan Palace" },
      { src: "https://images.unsplash.com/photo-1604999333679-b86d5473834b?w=800&q=80", alt: "Rajasthan Culture" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Jaipur", description: "Welcome to the Pink City.", activities: ["Airport reception", "Check into heritage hotel", "Evening walk at Hawa Mahal", "Welcome Rajasthani dinner"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Rambagh Palace or similar" },
      { day: 2, title: "Jaipur Exploration", description: "Full day exploring Jaipur's magnificent attractions.", activities: ["Amber Fort & elephant ride", "City Palace & Jantar Mantar", "Traditional lunch", "Jewelry shopping", "Block printing workshop"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Rambagh Palace or similar" },
      { day: 3, title: "Jaipur to Jodhpur", description: "Drive to the Blue City.", activities: ["Drive to Jodhpur", "Mehrangarh Fort visit", "Jaswant Thada", "Blue city walk", "Evening at Umaid Bhawan"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Umaid Bhawan Palace or similar" },
      { day: 4, title: "Jodhpur to Jaisalmer", description: "Travel to the Golden City through the Thar Desert.", activities: ["Drive to Jaisalmer", "En-route visit to Khichan", "Jaisalmer Fort sunset", "Desert camp check-in"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Desert Luxury Camp" },
      { day: 5, title: "Jaisalmer & Desert Safari", description: "Explore Jaisalmer and experience the desert.", activities: ["Jaisalmer Fort guided tour", "Patwon Ki Haveli", "Sam Sand Dunes", "Camel safari", "Desert BBQ & folk dance"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Desert Luxury Camp" },
      { day: 6, title: "Jaisalmer to Udaipur", description: "Flight to the City of Lakes.", activities: ["Morning at leisure", "Flight to Udaipur", "Lake Pichola boat ride", "Evening at Ambrai Ghat"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "The Oberoi Udaivilas or similar" },
      { day: 7, title: "Udaipur Sightseeing", description: "Discover the romantic city of Udaipur.", activities: ["City Palace tour", "Jag Mandir visit", "Sahelion Ki Bari", "Cooking class", "Farewell dinner at lake"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "The Oberoi Udaivilas or similar" },
      { day: 8, title: "Departure", description: "Transfer to Udaipur airport.", activities: ["Breakfast", "Souvenir shopping", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 21999, priceLabel: "₹21,999 per person", inclusions: ["3-star hotels", "Standard rooms", "Shared transfers", "Breakfast daily", "Basic sightseeing"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 35999, priceLabel: "₹35,999 per person", inclusions: ["4-star heritage hotels", "Deluxe rooms", "Private AC transfers", "Breakfast & dinner", "Expert guide", "Lake cruise"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 59999, priceLabel: "₹59,999 per person", inclusions: ["5-star palace hotels", "Suite accommodation", "Luxury car with chauffeur", "All meals premium", "Private guide", "Elephant ride & desert camp", "Spa & cultural shows"], highlighted: false },
    ],
    inclusions: ["Accommodation", "Meals as per plan", "Sightseeing & transfers", "Guide", "Monument entrance fees", "All taxes"],
    exclusions: ["Airfare/trains", "Personal expenses", "Tips", "Camera fees", "Insurance"],
    category: "domestic", type: "Heritage", price: 21999,
  },
  thailand: {
    slug: "thailand", name: "Thailand", location: "Land of Smiles",
    tagline: "Exotic Adventures Await",
    heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80",
    rating: 4.6, reviewCount: 1876, duration: "6 Days / 5 Nights", bestTime: "November to February",
    description: "Thailand offers pristine beaches, ornate temples, vibrant markets, and world-class hospitality at incredible value.",
    longDescription: "From the bustling streets of Bangkok to the tropical paradise of Phuket and Krabi, Thailand is a sensory feast. Explore golden temples, shop at floating markets, enjoy authentic Thai massage, and island-hop through turquoise waters. Our Thailand packages combine cultural experiences with beachside luxury for the perfect tropical getaway.",
    highlights: ["Grand Palace & Wat Pho", "Floating market tour", "Phi Phi Island excursion", "Thai cooking class", "Elephant sanctuary visit", "Luxury spa & massage"],
    images: [
      { src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", alt: "Bangkok" },
      { src: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=800&q=80", alt: "Phi Phi Island" },
      { src: "https://images.unsplash.com/photo-1564419320462-68791b4f7ed6?w=800&q=80", alt: "Phuket Beach" },
      { src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", alt: "Thai Temple" },
      { src: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&q=80", alt: "Thai Massage" },
      { src: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80", alt: "Thai Street Food" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bangkok", description: "Welcome to Thailand! Transfer to your hotel.", activities: ["Airport pickup", "Hotel check-in", "Evening Chao Phraya dinner cruise"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Mandarin Oriental or similar" },
      { day: 2, title: "Bangkok Temples & Markets", description: "Explore Bangkok's cultural treasures.", activities: ["Grand Palace & Wat Pho", "Wat Arun", "Floating market", "Thai massage", "Khao San Road evening"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Mandarin Oriental or similar" },
      { day: 3, title: "Bangkok to Phuket", description: "Fly to Phuket, Thailand's largest island.", activities: ["Flight to Phuket", "Hotel check-in", "Patong Beach stroll", "Sunset cocktail"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "Amanpuri or similar" },
      { day: 4, title: "Phi Phi Island Tour", description: "Full day island hopping adventure.", activities: ["Speedboat to Phi Phi", "Maya Bay visit", "Snorkeling", "Lunch on beach", "Monkey Beach"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Amanpuri or similar" },
      { day: 5, title: "Phuket Leisure", description: "Day at leisure with optional activities.", activities: ["Beach relaxation", "Thai cooking class", "Elephant sanctuary", "Sunset yacht cruise", "Farewell dinner"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Amanpuri or similar" },
      { day: 6, title: "Departure", description: "Transfer to Phuket airport.", activities: ["Breakfast", "Last minute shopping", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 35999, priceLabel: "₹35,999 per person", inclusions: ["3-star hotels", "Standard rooms", "Shared transfers", "Breakfast daily", "City tour"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 54999, priceLabel: "₹54,999 per person", inclusions: ["4-star resorts", "Deluxe rooms", "Private transfers", "Breakfast & dinner", "Phi Phi tour", "Thai massage"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 89999, priceLabel: "₹89,999 per person", inclusions: ["5-star luxury resorts", "Premium suites", "Luxury private transfers", "All meals", "Private yacht tour", "VIP island hopping", "Daily spa"], highlighted: false },
    ],
    inclusions: ["Accommodation", "Daily breakfast", "Airport transfers", "Sightseeing tours", "English guide", "All taxes"],
    exclusions: ["Visa", "International flights", "Personal expenses", "Tips", "Optional activities"],
    category: "international", type: "Beach", price: 35999,
  },
  maldives: {
    slug: "maldives", name: "Maldives", location: "Tropical Paradise",
    tagline: "The Ultimate Island Escape",
    heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    rating: 4.9, reviewCount: 2345, duration: "5 Days / 4 Nights", bestTime: "November to April",
    description: "The Maldives is the epitome of tropical luxury with crystal-clear waters, overwater villas, and world-class diving.",
    longDescription: "Experience the pinnacle of island luxury in the Maldives. Stay in overwater villas with glass floors, swim with manta rays and whale sharks, enjoy private dining on sandbanks, and rejuvenate at world-class spas. Our Maldives packages offer the most exclusive resort experiences for the ultimate tropical paradise escape.",
    highlights: ["Overwater villa stay", "Private sandbank dining", "Manta ray snorkeling", "Sunset dolphin cruise", "Underwater spa treatment", "Private seaplane transfer"],
    images: [
      { src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", alt: "Maldives Overwater Villa" },
      { src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80", alt: "Maldives Beach" },
      { src: "https://images.unsplash.com/photo-1514995669114-6081e934b693?w=800&q=80", alt: "Maldives Sunset" },
      { src: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80", alt: "Maldives Water" },
      { src: "https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=800&q=80", alt: "Maldives Spa" },
      { src: "https://images.unsplash.com/photo-1571208703249-0efc7e4bf4ea?w=800&q=80", alt: "Maldives Diving" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Maldives", description: "Welcome to paradise! Seaplane transfer to your resort.", activities: ["Seaplane transfer", "Welcome ceremony", "Villa check-in", "Sunset cocktail cruise"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Soneva Fushi or similar" },
      { day: 2, title: "Water Sports & Snorkeling", description: "Explore the underwater world of the Maldives.", activities: ["Snorkeling with manta rays", "Kayaking", "Stand-up paddleboarding", "Private lunch on sandbank", "Spa treatment"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Soneva Fushi or similar" },
      { day: 3, title: "Island Exploration", description: "Discover the local island and marine life.", activities: ["Local island visit", "Dolphin cruise", "Sunset fishing", "BBQ dinner on beach"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Soneva Fushi or similar" },
      { day: 4, title: "Luxury Relaxation", description: "Full day of leisure and premium experiences.", activities: ["Morning yoga", "Underwater spa", "Private pool time", "Champagne sunset", "Candlelight dinner"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Soneva Fushi or similar" },
      { day: 5, title: "Departure", description: "Seaplane transfer back to Male.", activities: ["Sunrise breakfast", "Seaplane to airport", "Departure"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 74999, priceLabel: "₹74,999 per person", inclusions: ["Beach villa", "Standard amenities", "Speedboat transfer", "Breakfast & dinner", "Basic snorkeling"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 119999, priceLabel: "₹1,19,999 per person", inclusions: ["Overwater villa", "Premium amenities", "Seaplane transfer", "All meals included", "Snorkeling & dolphin cruise", "Spa credit"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 199999, priceLabel: "₹1,99,999 per person", inclusions: ["Grand overwater suite", "Private butler", "Private seaplane", "All meals fine dining", "Private yacht", "All water sports", "Daily spa", "Sandbank dinner"], highlighted: false },
    ],
    inclusions: ["Accommodation", "Meals as per plan", "Seaplane/speedboat transfers", "Selected activities", "All taxes & service charges"],
    exclusions: ["International flights", "Visa", "Personal expenses", "Premium alcohol", "Tips"],
    category: "international", type: "Luxury", price: 74999,
  },
  himachal: {
    slug: "himachal", name: "Himachal Pradesh", location: "Mountain Retreat",
    tagline: "Serenity in the Shadows of Himalayas",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    rating: 4.7, reviewCount: 876, duration: "6 Days / 5 Nights", bestTime: "March to June & September to December",
    description: "Explore the scenic hill stations, snow-capped peaks, and river valleys of Himachal Pradesh with our luxury packages.",
    longDescription: "Himachal Pradesh is a mountain lover's paradise. Experience the majestic colonial architecture of Shimla, the vibrant adventure sports of Manali, the spiritual peace of Dharamshala, and the scenic beauty of Solan. Stay in high-end boutique properties, enjoy guided trekking and paragliding sessions, and dine looking out at snow-covered mountain valleys.",
    highlights: ["Shimla Mall Road & Ridge walk", "Solang Valley adventure sports", "Dharamshala Tibetan temples", "Kullu river rafting", "Scenic Pin Valley drive", "Himachali cuisine experience"],
    images: [
      { src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80", alt: "Himachal Valley" },
      { src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80", alt: "Shimla Hills" },
      { src: "https://images.unsplash.com/photo-1599824419829-9ab24f2b92f7?w=800&q=80", alt: "Manali Mountains" },
      { src: "https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=800&q=80", alt: "Dharamshala Monastery" },
      { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80", alt: "Solang Valley" },
      { src: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80", alt: "Himachal Snow" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Shimla", description: "Arrive in Shimla, check-in to your luxury hotel.", activities: ["Hotel transfer", "Mall Road walk", "Ridge sunset", "Welcome dinner"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Wildflower Hall or similar" },
      { day: 2, title: "Shimla Sightseeing", description: "Explore the colonial heritage of Shimla.", activities: ["Kufri trip", "Jakhoo Temple hike", "Viceregal Lodge tour", "Shopping"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Wildflower Hall or similar" },
      { day: 3, title: "Shimla to Manali", description: "Drive through scenic valleys to Manali.", activities: ["Kullu valley drive", "Beas river view", "Hotel check-in Manali"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "The Himalayan or similar" },
      { day: 4, title: "Manali Adventure", description: "Explore Manali and surrounding areas.", activities: ["Solang Valley paragliding", "Hadimba Temple", "Old Manali walk"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "The Himalayan or similar" },
      { day: 5, title: "Rohtang Pass excursion", description: "Day trip to the snow point of Rohtang Pass.", activities: ["Rohtang Pass snow view", "Skiing activities", "Photography session"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "The Himalayan or similar" },
      { day: 6, title: "Departure", description: "Check out and transfer to Chandigarh airport/railway station.", activities: ["Breakfast", "Check-out", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 13999, priceLabel: "₹13,999 per person", inclusions: ["3-star hotel", "Standard room", "AC Sedan transfers", "Breakfast & dinner"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 22999, priceLabel: "₹22,999 per person", inclusions: ["4-star hotel", "Deluxe valley view room", "Private SUV", "All meals included", "Local sightseeing"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 39999, priceLabel: "₹39,999 per person", inclusions: ["5-star resort/heritage stay", "Luxury suite", "Chauffeured SUV", "All meals premium", "Rohtang Pass entry permit", "Spa treatment"], highlighted: false },
    ],
    inclusions: ["Hotel accommodation", "Daily meals as per plan", "Private vehicle transfers", "Sightseeing as per itinerary", "All permit fees"],
    exclusions: ["Airfare", "Adventure sport charges", "Tips & laundry", "Meals not specified"],
    category: "domestic", type: "Adventure", price: 13999,
  },
  andaman: {
    slug: "andaman", name: "Andaman Islands", location: "Tropical Bliss",
    tagline: "Turquoise Waters & White Sands",
    heroImage: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1200&q=80",
    rating: 4.6, reviewCount: 654, duration: "7 Days / 6 Nights", bestTime: "October to May",
    description: "Discover the exotic tropical islands of Andaman. Snorkel in crystal clear waters and relax on Radhanagar Beach.",
    longDescription: "Escape to the serene islands of Andaman & Nicobar. Visit the historic Cellular Jail in Port Blair, ride the ferry to Havelock Island, and sink your toes in the sands of Radhanagar Beach, voted one of Asia's finest. Enjoy scuba diving, glass-bottom boat rides, and private candlelit dining by the sea.",
    highlights: ["Cellular Jail Light & Sound show", "Havelock cruise ride", "Scuba diving at Nemo Reef", "Sunset at Radhanagar Beach", "Neil Island beach tour", "Private beachfront dining"],
    images: [
      { src: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80", alt: "Radhanagar Beach" },
      { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Andaman Water" },
      { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", alt: "Havelock Island" },
      { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", alt: "Tropical Beach" },
      { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", alt: "Island Jetty" },
      { src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80", alt: "Coral Reef" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Port Blair", description: "Arrive in Port Blair, welcome and transfer to hotel.", activities: ["Cellular Jail visit", "Light & Sound show", "Welcome dinner"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Taj Exotica or similar" },
      { day: 2, title: "Ferry to Havelock Island", description: "Board cruise ferry to the beautiful Havelock Island.", activities: ["Luxury ferry ride", "Havelock arrival", "Resort check-in", "Evening beach walk"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Taj Exotica Havelock or similar" },
      { day: 3, title: "Radhanagar Beach & Sunset", description: "Relax at Asia's best beach, Radhanagar Beach.", activities: ["Swim at Radhanagar Beach", "Sunset viewing", "Beach resort spa"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Taj Exotica Havelock or similar" },
      { day: 4, title: "Water Sports & Scuba", description: "Day of underwater activities.", activities: ["Scuba diving session", "Snorkeling at Elephant Beach", "Seafood BBQ dinner"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Taj Exotica Havelock or similar" },
      { day: 5, title: "Neil Island excursion", description: "Ferry to Neil Island to see Natural Bridge.", activities: ["Neil Island ferry", "Laxmanpur beach sunset", "Natural Bridge tour"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Summer Sands Resort or similar" },
      { day: 6, title: "Return to Port Blair", description: "Ferry back to Port Blair.", activities: ["Shopping in Port Blair", "Farewell dinner"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Taj Exotica or similar" },
      { day: 7, title: "Departure", description: "Transfer to airport.", activities: ["Breakfast", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 24999, priceLabel: "₹24,999 per person", inclusions: ["3-star resort", "Standard room", "Private AC car transfers", "Ferry tickets standard"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 38999, priceLabel: "₹38,999 per person", inclusions: ["4-star resort", "Deluxe cottage", "Private AC SUV", "All ferry tickets premium class", "Breakfast & dinner", "Scuba session"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 74999, priceLabel: "₹74,999 per person", inclusions: ["5-star Taj Exotica", "Premium villa", "Luxury SUV", "VIP cruise seats", "All meals fine dining", "Private beachfront dinner", "Exclusive scuba & photography"], highlighted: false },
    ],
    inclusions: ["All ferry tickets", "Accommodation", "Daily breakfast", "Private vehicle transfers", "Water sports package (Gold/Platinum)"],
    exclusions: ["Airfare", "Personal expenses", "Tips", "Insurance"],
    category: "domestic", type: "Beach", price: 24999,
  },
  uttarakhand: {
    slug: "uttarakhand", name: "Uttarakhand", location: "Devbhumi",
    tagline: "Land of Gods and Scenic Peaks",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    rating: 4.5, reviewCount: 543, duration: "5 Days / 4 Nights", bestTime: "March to June & September to November",
    description: "Explore the spiritual and natural beauty of Uttarakhand. From Nainital's lakes to Rishikesh's ganga aarti.",
    longDescription: "Uttarakhand, the land of spiritual peaks and quiet valleys. Experience the peaceful shores of Nainital Lake, the high mountain vistas of Mussoorie, the sacred riverbanks of Rishikesh, and the wildlife wonders of Jim Corbett National Park. Our package offers a blend of heritage temple yatras and boutique nature retreats.",
    highlights: ["Nainital boat ride", "Rishikesh Ganga Aarti ceremony", "Mussoorie Kempty Falls visit", "Jim Corbett tiger safari", "Spiritual yoga session by Ganga", "Garhwali traditional dinner"],
    images: [
      { src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80", alt: "Uttarakhand Mountains" },
      { src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80", alt: "Nainital Lake" },
      { src: "https://images.unsplash.com/photo-1599824419829-9ab24f2b92f7?w=800&q=80", alt: "Rishikesh Ghats" },
      { src: "https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=800&q=80", alt: "Corbett Jungle" },
      { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80", alt: "Mussoorie View" },
      { src: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80", alt: "Uttarakhand Temple" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Dehradun to Mussoorie", description: "Arrive in Dehradun, transfer to Mussoorie.", activities: ["Scenic drive to Mussoorie", "Mall Road walk", "Hotel check-in", "Dinner"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "JW Marriott Mussoorie or similar" },
      { day: 2, title: "Mussoorie Sightseeing", description: "Explore Mussoorie's peaks and falls.", activities: ["Gun Hill cable car", "Kempty Falls", "Lal Tibba view", "Nature walk"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "JW Marriott Mussoorie or similar" },
      { day: 3, title: "Mussoorie to Rishikesh", description: "Drive to the spiritual capital Rishikesh.", activities: ["Laxman Jhula walk", "Evening Ganga Aarti ceremony", "Hotel check-in"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Taj Rishikesh or similar" },
      { day: 4, title: "Rishikesh Exploration & Yoga", description: "Spiritual and adventure activities in Rishikesh.", activities: ["Morning yoga session", "River rafting excursion", "Beatles Ashram visit", "Traditional feast"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Taj Rishikesh or similar" },
      { day: 5, title: "Departure", description: "Transfer back to Dehradun airport.", activities: ["Breakfast", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 11999, priceLabel: "₹11,999 per person", inclusions: ["3-star hotel", "Standard room", "Private AC Sedan", "Breakfast daily"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 18999, priceLabel: "₹18,999 per person", inclusions: ["4-star hotel", "Deluxe room", "Private AC SUV", "Breakfast & dinner", "Rafting permit"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 34999, priceLabel: "₹34,999 per person", inclusions: ["5-star JW Marriott/Taj", "Luxury valley view suite", "Private luxury Sedan", "All meals fine dining", "VIP Ganga Aarti access", "Private spa"], highlighted: false },
    ],
    inclusions: ["Hotel accommodation", "Daily meals as per plan", "Private transport", "Local guide for sightseeing", "All taxes"],
    exclusions: ["Airfare", "Activity tickets", "Tips & personal bills"],
    category: "domestic", type: "Nature", price: 11999,
  },
  gujarat: {
    slug: "gujarat", name: "Gujarat", location: "Vibrant Heritage",
    tagline: "Colors, Culture & Lion Safaris",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
    rating: 4.4, reviewCount: 432, duration: "6 Days / 5 Nights", bestTime: "October to March",
    description: "Discover the vibrant culture, wildlife, and heritage of Gujarat. Statue of Unity and Gir lions.",
    longDescription: "Vibrant Gujarat offers a rich blend of history, heritage, nature, and spirituality. Visit the massive Statue of Unity (the world's tallest statue), spot the Asiatic lions in their natural habitat at Gir National Park, explore the heritage architecture of Ahmedabad, and experience the surreal white desert of Rann of Kutch. Enjoy high-quality traditional Gujarati thalis and hospitality.",
    highlights: ["Statue of Unity VIP tour", "Gir Asiatic lion safari", "Sabarmati Ashram walk", "Rann of Kutch sunset", "Heritage temple visits", "Traditional Gujarati thali feast"],
    images: [
      { src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80", alt: "Statue of Unity" },
      { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Rann of Kutch" },
      { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", alt: "Gir Lion" },
      { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", alt: "Sabarmati" },
      { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", alt: "Dwarka Temple" },
      { src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80", alt: "Gujarati Thali" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Ahmedabad", description: "Arrive in Ahmedabad, transfer to hotel.", activities: ["Hotel transfer", "Sabarmati Ashram visit", "Adalaj Stepwell tour", "Dinner"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Hyatt Regency or similar" },
      { day: 2, title: "Ahmedabad to Statue of Unity", description: "Drive to Kevadia to see the Statue of Unity.", activities: ["Statue of Unity tour", "Viewing gallery tickets", "Laser light show", "Evening check-in"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Tent City Narmada or similar" },
      { day: 3, title: "Statue of Unity to Gir National Park", description: "Drive to the sanctuary of the Asiatic lions.", activities: ["Scenic drive to Gir", "Resort check-in", "Evening nature walk"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "The Woods at Sasan or similar" },
      { day: 4, title: "Gir Lion Safari & Somnath", description: "Morning lion safari and visit to Somnath Temple.", activities: ["Gir forest jeep safari", "Somnath Temple visit", "Light & Sound show at temple"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Somnath Resort or similar" },
      { day: 5, title: "Somnath to Dwarka", description: "Drive to the sacred city of Dwarka.", activities: ["Dwarkadhish Temple visit", "Nageshwar Jyotirlinga tour", "Sunset at Dwarka beach"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Dwarka Heritage Hotel or similar" },
      { day: 6, title: "Departure", description: "Drive back to Rajkot/Ahmedabad airport for departure.", activities: ["Breakfast", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 14999, priceLabel: "₹14,999 per person", inclusions: ["3-star hotel", "Standard room", "Private AC sedan", "Breakfast daily"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 23999, priceLabel: "₹23,999 per person", inclusions: ["4-star hotel/tent", "Deluxe room/tent", "Private AC SUV", "Breakfast & dinner daily", "Gir safari permit"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 38999, priceLabel: "₹38,999 per person", inclusions: ["5-star resort/luxury tent", "Suite room/luxury cottage", "Chauffeured luxury car", "All meals premium", "VIP Statue of Unity entry", "Private jeep safari"], highlighted: false },
    ],
    inclusions: ["Accommodation", "Daily meals as per plan", "Private transport", "Gir safari booking", "Taxes"],
    exclusions: ["Airfare", "Entry tickets not mentioned", "Personal expenses"],
    category: "domestic", type: "Cultural", price: 14999,
  },
  manali: {
    slug: "manali", name: "Manali", location: "Himalayan Haven",
    tagline: "Adventure and Bliss in Valley of Gods",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    rating: 4.5, reviewCount: 721, duration: "5 Days / 4 Nights", bestTime: "October to June",
    description: "Experience the Himalayan beauty of Manali with our curated holiday packages. Snow peaks and adventure.",
    longDescription: "Manali is a charming Himalayan town surrounded by majestic pine forests and the Beas River. Visit the historic Hadimba Temple, enjoy adventure activities like paragliding, skiing, and zorbing in Solang Valley, walk through the old town's cozy cafes, and travel through the engineering marvel of Atal Tunnel to Lahaul Valley. Our luxury retreats offer wood-paneled fireplace suites and spectacular valley views.",
    highlights: ["Hadimba Temple & Vashisht hot springs", "Solang Valley adventure activities", "Atal Tunnel & Sissu drive", "Jogini waterfall trek", "Cozy bonfire & music evening", "Local market shopping"],
    images: [
      { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", alt: "Manali Town" },
      { src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80", alt: "Solang Adventure" },
      { src: "https://images.unsplash.com/photo-1599824419829-9ab24f2b92f7?w=800&q=80", alt: "Atal Tunnel Snow" },
      { src: "https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=800&q=80", alt: "Hadimba Temple" },
      { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80", alt: "Pine Forest" },
      { src: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80", alt: "Manali Stream" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Manali", description: "Welcome to Manali, check-in to your resort.", activities: ["Hotel transfer", "Rest & acclimatize", "Evening mall road walk", "Dinner"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Manuallaya Resort or similar" },
      { day: 2, title: "Solang Valley & Adventure", description: "Day of adventure sports in Solang.", activities: ["Paragliding & Zorbing options", "Hadimba Temple visit", "Vashisht hot springs", "Dinner"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Manuallaya Resort or similar" },
      { day: 3, title: "Atal Tunnel & Lahaul Valley", description: "Drive through the famous Atal Tunnel to Lahaul.", activities: ["Atal Tunnel crossing", "Sissu waterfall visit", "Snow photography", "Return drive to Manali"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Manuallaya Resort or similar" },
      { day: 4, title: "Jogini Waterfall & Cafe Walk", description: "Trek to Jogini falls and explore Old Manali's cafes.", activities: ["Guided Jogini falls trek", "Old Manali cafe exploration", "Sunset viewpoint walk", "Farewell bonfire dinner"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Manuallaya Resort or similar" },
      { day: 5, title: "Departure", description: "Check out and transfer to Chandigarh airport.", activities: ["Breakfast", "Check-out", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 10999, priceLabel: "₹10,999 per person", inclusions: ["3-star hotel", "Standard room", "AC Sedan transfers", "Breakfast & dinner"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 16999, priceLabel: "₹16,999 per person", inclusions: ["4-star hotel", "Deluxe room with balcony", "Private SUV", "Breakfast & dinner daily", "Atal Tunnel tour"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 29999, priceLabel: "₹29,999 per person", inclusions: ["5-star Manuallaya Resort", "Fireplace chalet suite", "Chauffeured premium SUV", "All meals premium", "Atal Tunnel and Solang VIP tour", "Massage treatment"], highlighted: false },
    ],
    inclusions: ["Hotel accommodation", "Daily meals as per plan", "Private vehicle transfers", "Sightseeing as per itinerary", "Atal Tunnel permit fees"],
    exclusions: ["Airfare", "Adventure sport activities", "Personal bills"],
    category: "domestic", type: "Adventure", price: 10999,
  },
  "north-east": {
    slug: "north-east", name: "North East India", location: "Seven Sisters",
    tagline: "Unexplored Valleys and Living Root Bridges",
    heroImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80",
    rating: 4.6, reviewCount: 387, duration: "10 Days / 9 Nights", bestTime: "October to April",
    description: "Discover the untouched beauty of India's Northeast. Meghalaya, Assam, Sikkim - exotic landscapes.",
    longDescription: "North East India is a treasure trove of misty hills, deep river gorges, unique tribal cultures, and pristine valleys. Visit the living root bridges of Meghalaya (Cherrapunji), see the one-horned rhinos of Kaziranga National Park in Assam, explore the sacred monasteries of Gangtok, and look down at Bangladesh from the cliffs of Mawlynnong (Asia's cleanest village). Our premium package offers local expert guides and cozy mountain stays.",
    highlights: ["Double-decker living root bridge trek", "Cherrapunji waterfall tours", "Kaziranga rhino safari jeep ride", "Mawlynnong village walk", "Umiam Lake boating", "Traditional North Eastern cuisine"],
    images: [
      { src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80", alt: "Living Root Bridge" },
      { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Kaziranga Rhino" },
      { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", alt: "Gangtok Monastery" },
      { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", alt: "Cherrapunji Falls" },
      { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", alt: "Mawlynnong Village" },
      { src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80", alt: "North East Hills" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Guwahati to Shillong", description: "Arrive in Guwahati, drive to the Scotland of the East - Shillong.", activities: ["Airport pickup", "Guwahati to Shillong drive", "Umiam Lake stop", "Hotel check-in"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Ri Kynjai Resort or similar" },
      { day: 2, title: "Shillong to Cherrapunji", description: "Drive to Cherrapunji, the wettest place on Earth.", activities: ["Shillong Peak view", "Elephant Falls", "Nohkalikai Falls tour", "Caves exploration"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Cherrapunji Holiday Resort or similar" },
      { day: 3, title: "Living Root Bridge Trek", description: "Guided trek to the famous double-decker living root bridge.", activities: ["Living Root Bridge hike", "Natural pool swimming", "Traditional lunch in village"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Cherrapunji Holiday Resort or similar" },
      { day: 4, title: "Mawlynnong & Dawki", description: "Visit Asia's cleanest village and the crystal clear waters of Dawki.", activities: ["Mawlynnong village walk", "Dawki river boating", "Living root bridge Neil", "Return to Shillong"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Ri Kynjai Resort or similar" },
      { day: 5, title: "Shillong to Kaziranga National Park", description: "Drive to the sanctuary of the one-horned rhino.", activities: ["Drive to Kaziranga", "Orchid park visit", "Evening folk dance performance"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Borgos Resort or similar" },
      { day: 6, title: "Kaziranga Jungle Safari", description: "Wildlife jeep safari in Kaziranga forest.", activities: ["Morning elephant safari option", "Afternoon jeep safari", "Spotting rhinos & wild elephants"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Borgos Resort or similar" },
      { day: 7, title: "Kaziranga to Guwahati & Departure", description: "Drive to Guwahati, transfer to airport.", activities: ["Kamakhya Temple visit", "Guwahati airport transfer"], meals: { breakfast: true, lunch: true, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 26999, priceLabel: "₹26,999 per person", inclusions: ["3-star standard hotel", "Standard room", "Private AC sedan", "Breakfast daily"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 38999, priceLabel: "₹38,999 per person", inclusions: ["4-star resort/boutique stay", "Deluxe room", "Private AC SUV", "Breakfast & dinner daily", "Kaziranga jeep safari permit"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 64999, priceLabel: "₹64,999 per person", inclusions: ["5-star Ri Kynjai / Borgos", "Premium cottage", "Luxury SUV with chauffeur", "All meals premium", "Private root bridge guide", "VIP Kaziranga safari"], highlighted: false },
    ],
    inclusions: ["Hotel accommodation", "Daily meals as per plan", "Private transport AC", "Guiding charges for root bridge", "Kaziranga safari permit"],
    exclusions: ["Airfare", "Monument fees", "Tips & laundry", "Camera permits"],
    category: "domestic", type: "Nature", price: 26999,
  },
  "temple-yatra": {
    slug: "temple-yatra", name: "Temple Yatra / LTC", location: "Sacred Pilgrimage",
    tagline: "Embark on a Divine Spiritual Journey",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    rating: 4.4, reviewCount: 365, duration: "5 Days / 4 Nights", bestTime: "Year-Round",
    description: "Embark on a sacred spiritual journey with our Temple Yatra packages. Revered temples with complete comfort.",
    longDescription: "Our Temple Yatra & LTC packages are designed to provide a highly comfortable and respectful spiritual journey for elderly travelers and families. Visit sacred destinations like Haridwar, Rishikesh, Dwarka, Somnath, or the golden temples of Amritsar. We handle all logistics including temple VIP darshan tickets, comfortable transport, and senior-friendly stays.",
    highlights: ["Haridwar Ganga Aarti VIP seating", "Somnath Temple sound & light show", "Dwarkadhish Temple darshan assistance", "Rishikesh spiritual ashram tours", "Golden Temple Amritsar visit", "Satvik pure-vegetarian meals"],
    images: [
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", alt: "Ganga Aarti" },
      { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Golden Temple" },
      { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", alt: "Dwarkadhish Temple" },
      { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", alt: "Somnath Temple" },
      { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", alt: "Rishikesh Ghats" },
      { src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80", alt: "Temple Yatra Food" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Delhi to Haridwar", description: "Arrive in Delhi, transfer to Haridwar.", activities: ["Guaranteed pickup", "Drive to Haridwar", "Evening Ganga Aarti ceremony at Har ki Pauri", "Pure-veg dinner"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Ambrosia Sarovar Portico or similar" },
      { day: 2, title: "Haridwar & Mansa Devi", description: "Explore the sacred temples of Haridwar.", activities: ["Mansa Devi Temple cable car", "Chandi Devi Temple visit", "Local ashram walking tour"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Ambrosia Sarovar Portico or similar" },
      { day: 3, title: "Haridwar to Rishikesh", description: "Drive to Rishikesh for spiritual sightseeing.", activities: ["Laxman Jhula walk", "Geeta Bhawan Ashram visit", "Triveni Ghat spiritual aarti", "Satsang session"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Aloha On The Ganges or similar" },
      { day: 4, title: "Rishikesh Spiritual Leisure", description: "Day of spiritual wellness and meditation.", activities: ["Morning meditation session", "Vashishta Cave visit", "Special temple prayers", "Farewell Satvik feast"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Aloha On The Ganges or similar" },
      { day: 5, title: "Departure via Delhi", description: "Drive back to Delhi airport for departure.", activities: ["Breakfast", "Delhi transfer", "Airport drop"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 9999, priceLabel: "₹9,999 per person", inclusions: ["3-star hotel", "Standard room", "AC Sedan", "Breakfast daily", "LTC certificate assistance"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 16999, priceLabel: "₹16,999 per person", inclusions: ["4-star ashram/resort", "Deluxe room", "AC SUV", "All Satvik meals", "Cable car tickets", "Darshan assistance"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 28999, priceLabel: "₹28,999 per person", inclusions: ["5-star luxury hotel/resort", "Premium suite", "Luxury private car", "All organic meals", "VIP temple aarti access", "Private pandit for rituals"], highlighted: false },
    ],
    inclusions: ["Hotel accommodation", "Daily Satvik meals as per plan", "Private transport", "Darshan and cable car tickets", "LTC document support"],
    exclusions: ["Airfare", "Ritual donation fees", "Personal expenses"],
    category: "domestic", type: "Cultural", price: 9999,
  },
  singapore: {
    slug: "singapore", name: "Singapore", location: "Lion City",
    tagline: "Futuristic Wonder of Asia",
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
    rating: 4.7, reviewCount: 1456, duration: "5 Days / 4 Nights", bestTime: "Year-Round",
    description: "Discover the futuristic city-state of Singapore. Gardens by the Bay and Sentosa Island.",
    longDescription: "Singapore is a dynamic global hub where modern skyscrapers meet lush, futuristic parks. Walk among the giant Supertrees at Gardens by the Bay, ride the cable car to Sentosa Island, enjoy a night safari at the Singapore Zoo, and shop along the famous Orchard Road. Stay at iconic hotels like Marina Bay Sands and experience Singapore's Michelin-starred street food.",
    highlights: ["Gardens by the Bay Supertrees & Flower Dome", "Sentosa Island Cable car & Universal Studios", "Singapore Zoo Night Safari", "Marina Bay Sands SkyPark observatory", "Clarke Quay dinner cruise", "Little India & Chinatown walking tour"],
    images: [
      { src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80", alt: "Marina Bay Sands" },
      { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Gardens by the Bay" },
      { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", alt: "Universal Studios" },
      { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", alt: "Sentosa Beach" },
      { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", alt: "Singapore Skyline" },
      { src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80", alt: "Chinatown Food" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Singapore", description: "Welcome to Singapore! Transfer to your hotel.", activities: ["Airport pickup", "Hotel check-in", "Evening Clarke Quay dinner cruise"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Marina Bay Sands or similar" },
      { day: 2, title: "City Tour & Gardens by the Bay", description: "Explore the city sights and futuristic gardens.", activities: ["Merlion Park photo stop", "Little India walk", "Gardens by the Bay entry", "Supertree light show"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Marina Bay Sands or similar" },
      { day: 3, title: "Sentosa Island Fun", description: "Day trip to Sentosa Island.", activities: ["Sentosa cable car ride", "Universal Studios tickets", "Wings of Time show", "Resort dinner"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "Marina Bay Sands or similar" },
      { day: 4, title: "Night Safari & Shopping", description: "Orchard Road shopping and Zoo Night Safari.", activities: ["Orchard Road shopping", "Zoo Night Safari tour", "Tram ride through zoo"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Marina Bay Sands or similar" },
      { day: 5, title: "Departure", description: "Check out and transfer to Changi airport.", activities: ["Breakfast", "Jewel Changi waterfall tour", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 42999, priceLabel: "₹42,999 per person", inclusions: ["3-star city hotel", "Standard room", "Shared transfers", "Breakfast daily", "City tour"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 64999, priceLabel: "₹64,999 per person", inclusions: ["4-star hotel", "Deluxe room", "Private transfers", "Breakfast & dinner daily", "Universal Studios & Gardens tickets"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 119999, priceLabel: "₹1,19,999 per person", inclusions: ["5-star Marina Bay Sands", "Horizon suite", "Luxury private transport", "All meals fine dining", "VIP entry to attractions", "Private guide"], highlighted: false },
    ],
    inclusions: ["Hotel accommodation", "Daily breakfast", "Airport transfers", "Sightseeing tickets as per plan", "Taxes"],
    exclusions: ["Visa fees", "International flights", "Personal expenses", "Tips"],
    category: "international", type: "Luxury", price: 42999,
  },
  vietnam: {
    slug: "vietnam", name: "Vietnam", location: "Emerald Beauty",
    tagline: "Timeless Culture & Halong Bay Views",
    heroImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&q=80",
    rating: 4.5, reviewCount: 876, duration: "7 Days / 6 Nights", bestTime: "November to April",
    description: "Explore the emerald beauty of Vietnam. Ha Long Bay, Hanoi, and Ho Chi Minh City.",
    longDescription: "Vietnam is a land of incredible natural wonders, rich history, and mouthwatering street food. Walk through the bustling historic quarters of Hanoi, cruise through the dramatic limestone pillars of Ha Long Bay on a luxury overnight cruise, explore the ancient imperial city of Hoi An, and discover the modern energy of Ho Chi Minh City. Stay in handpicked luxury boutique hotels and enjoy local culinary walks.",
    highlights: ["Overnight luxury cruise on Ha Long Bay", "Hanoi Old Quarter rickshaw tour", "Hoi An ancient town walking tour", "Cu Chi tunnels excursion", "Mekong Delta river cruise", "Vietnamese cooking class"],
    images: [
      { src: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80", alt: "Ha Long Bay" },
      { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Hanoi Street" },
      { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", alt: "Hoi An Lanterns" },
      { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", alt: "Mekong Delta" },
      { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", alt: "Ho Chi Minh City" },
      { src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80", alt: "Vietnamese Food" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Hanoi", description: "Welcome to Vietnam! Transfer to your hotel.", activities: ["Airport pickup", "Hotel check-in", "Old Quarter street food tour"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Sofitel Legend Metropole or similar" },
      { day: 2, title: "Hanoi to Ha Long Bay", description: "Drive to Ha Long Bay and board your luxury cruise.", activities: ["Scenic drive", "Board luxury cruise", "Cruise through bay", "Kayaking & cave visit", "Sunset party on deck"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Luxury Ha Long Cruise" },
      { day: 3, title: "Ha Long Bay to Da Nang & Hoi An", description: "Morning cruise activities and flight to Hoi An.", activities: ["Sunrise Tai Chi", "Disembark cruise", "Flight to Da Nang", "Drive to Hoi An", "Night lantern walk"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Four Seasons Hoi An or similar" },
      { day: 4, title: "Hoi An Ancient Town", description: "Explore the historic imperial city.", activities: ["Guided walking tour", "Tailor shop visit", "Vietnamese cooking class", "Boat ride with lanterns"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Four Seasons Hoi An or similar" },
      { day: 5, title: "Hoi An to Ho Chi Minh City", description: "Fly to Saigon and see historical sights.", activities: ["Flight to Saigon", "Notre Dame Cathedral", "Independence Palace tour", "Dinner"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "The Reverie Saigon or similar" },
      { day: 6, title: "Mekong Delta Cruise", description: "Day trip to the lush Mekong Delta.", activities: ["Mekong Delta boat tour", "Traditional music show", "Fruit orchard visit", "Farewell dinner in Saigon"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "The Reverie Saigon or similar" },
      { day: 7, title: "Departure", description: "Transfer to Saigon airport for departure.", activities: ["Breakfast", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 32999, priceLabel: "₹32,999 per person", inclusions: ["3-star hotels", "Standard rooms", "Shared transfers", "Breakfast daily", "Ha Long sharing cruise"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 49999, priceLabel: "₹49,999 per person", inclusions: ["4-star hotels", "Deluxe rooms", "Private AC transfers", "Breakfast & dinner daily", "Luxury Ha Long cruise", "Hoi An walking tour"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 84999, priceLabel: "₹84,999 per person", inclusions: ["5-star Metropole / Four Seasons", "Premium suites", "Luxury private transfers", "All meals fine dining", "VIP cabin on cruise", "Private speedboat Mekong"], highlighted: false },
    ],
    inclusions: ["Hotel accommodation", "Daily breakfast", "Airport transfers", "Ha Long Bay cruise tickets", "Taxes"],
    exclusions: ["Visa fees", "International flights", "Personal expenses", "Tips"],
    category: "international", type: "Adventure", price: 32999,
  },
  malaysia: {
    slug: "malaysia", name: "Malaysia", location: "Truly Asia",
    tagline: "Modern Cities meets Ancient Rainforests",
    heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&q=80",
    rating: 4.5, reviewCount: 765, duration: "6 Days / 5 Nights", bestTime: "March to October",
    description: "Discover the diversity of Malaysia. Kuala Lumpur, Langkawi, and Penang.",
    longDescription: "Malaysia offers a stunning contrast of ultra-modern skyscrapers and ancient tropical rainforests. See the towering Petronas Twin Towers in Kuala Lumpur, climb the colorful steps of Batu Caves, relax on the white sand beaches of Langkawi Island, and taste the world-famous street food of Penang. Stay in premium high-rise hotels and beachside resorts.",
    highlights: ["Petronas Twin Towers skybridge walk", "Batu Caves rainbow staircase", "Langkawi Cable car & Sky Bridge", "Penang street art & food walk", "KL Tower revolving dinner", "Island hopping boat tour"],
    images: [
      { src: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80", alt: "Petronas Towers" },
      { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Batu Caves" },
      { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", alt: "Langkawi Island" },
      { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", alt: "KL Skyline" },
      { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", alt: "Penang Street Art" },
      { src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80", alt: "Malaysian Satay" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kuala Lumpur", description: "Welcome to KL! Transfer to your hotel.", activities: ["Airport pickup", "Hotel check-in", "Evening Bukit Bintang walk", "Dinner"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "EQ Kuala Lumpur or similar" },
      { day: 2, title: "KL City Tour & Batu Caves", description: "Explore the capital and the sacred Batu Caves.", activities: ["Petronas Towers entry", "Batu Caves climb", "Merdeka Square tour", "Revolving dinner at KL Tower"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "EQ Kuala Lumpur or similar" },
      { day: 3, title: "KL to Langkawi", description: "Fly to the tropical island of Langkawi.", activities: ["Flight to Langkawi", "Hotel check-in", "Sunset dinner cruise"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "The Datai Langkawi or similar" },
      { day: 4, title: "Langkawi Sky Bridge & Cable Car", description: "Enjoy the scenic cable car and sky bridge.", activities: ["Langkawi Cable Car", "Sky Bridge walk", "Underwater World visit", "Beach relaxation"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "The Datai Langkawi or similar" },
      { day: 5, title: "Langkawi Island Hopping", description: "Half day boat tour of surrounding islands.", activities: ["Pregnant Maiden Island", "Eagle feeding", "Beras Basah beach", "Farewell seafood dinner"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "The Datai Langkawi or similar" },
      { day: 6, title: "Departure", description: "Check out and transfer to Langkawi airport.", activities: ["Breakfast", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 38999, priceLabel: "₹38,999 per person", inclusions: ["3-star hotels", "Standard rooms", "Shared transfers", "Breakfast daily", "City tour"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 54999, priceLabel: "₹54,999 per person", inclusions: ["4-star hotels", "Deluxe rooms", "Private AC transfers", "Breakfast & dinner daily", "Twin Towers & Cable Car tickets"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 89999, priceLabel: "₹89,999 per person", inclusions: ["5-star luxury hotels", "Premium suites", "Chauffeured private cars", "All meals fine dining", "Private yacht cruise", "VIP entry to attractions"], highlighted: false },
    ],
    inclusions: ["Hotel accommodation", "Daily breakfast", "Airport transfers", "Sightseeing tickets as per plan", "Taxes"],
    exclusions: ["Visa fees", "International flights", "Personal expenses", "Tips"],
    category: "international", type: "Cultural", price: 38999,
  },
  europe: {
    slug: "europe", name: "Europe", location: "The Grand Tour",
    tagline: "Iconic Cities, Art & History",
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
    rating: 4.9, reviewCount: 3456, duration: "12 Days / 11 Nights", bestTime: "May to September",
    description: "Embark on a grand European adventure. Paris, Switzerland, Italy. Luxury tour packages.",
    longDescription: "Our signature grand European tour takes you through the most iconic and romantic highlights of Europe. Walk down the Champs-Élysées in Paris and ride the elevator to Eiffel Tower top, experience the snowy peak of Mt. Titlis and scenic train rides in Switzerland, ride the gondola in Venice, and see the ancient Colosseum in Rome. Stay in world-famous luxury hotels and enjoy dedicated tour directors.",
    highlights: ["Eiffel Tower top observation deck", "Seine River dinner cruise in Paris", "Mt. Titlis cable car & glacier cave in Switzerland", "Venice private Gondola ride", "Rome Colosseum VIP guided tour", "Swiss Alpine train journey"],
    images: [
      { src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80", alt: "Eiffel Tower" },
      { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Swiss Alps" },
      { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", alt: "Venice Canal" },
      { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", alt: "Colosseum Rome" },
      { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", alt: "Swiss Train" },
      { src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80", alt: "Parisian Cafe" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Paris", description: "Welcome to France! Private transfer to your luxury hotel.", activities: ["Airport VIP transfer", "Hotel check-in", "Evening Seine River dinner cruise"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "The Ritz Paris or similar" },
      { day: 2, title: "Paris City Sights", description: "Explore the romantic capital of France.", activities: ["Eiffel Tower observation deck", "Louvre Museum guided tour", "Arc de Triomphe", "Champs-Élysées stroll"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "The Ritz Paris or similar" },
      { day: 3, title: "Paris to Lucerne, Switzerland", description: "Board high-speed train to the beautiful city of Lucerne.", activities: ["TGV train journey", "Lucerne lake walk", "Chapel Bridge visit", "Swiss fondue dinner"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "Hotel Schweizerhof Lucerne or similar" },
      { day: 4, title: "Mt. Titlis Mountain excursion", description: "Day trip to the snow-covered Mt. Titlis.", activities: ["Rotair cable car", "Glacier cave walking", "Ice Flyer ride", "Snow activities"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Hotel Schweizerhof Lucerne or similar" },
      { day: 5, title: "Lucerne to Venice, Italy", description: "Scenic train journey through the Alps to Venice.", activities: ["Swiss-Italian train journey", "Water taxi transfer", "Venice evening walk", "Gondola dinner"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "Belmond Hotel Cipriani or similar" },
      { day: 6, title: "Venice Exploration", description: "Explore the islands and canals of Venice.", activities: ["St. Mark's Basilica", "Doge's Palace tour", "Murano glassblowing show", "Private Gondola ride"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Belmond Hotel Cipriani or similar" },
      { day: 7, title: "Venice to Rome", description: "Board high-speed train to the eternal city, Rome.", activities: ["Italian rail trip", "Rome check-in", "Spanish Steps stroll", "Dinner"], meals: { breakfast: true, lunch: false, dinner: true }, accommodation: "Hotel de Russie Rome or similar" },
      { day: 8, title: "Rome & Vatican City", description: "Explore Rome's ancient wonders and the Vatican.", activities: ["Colosseum VIP tour", "Roman Forum", "Vatican Museum & Sistine Chapel", "St. Peter's Basilica"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Hotel de Russie Rome or similar" },
      { day: 9, title: "Rome Leisure & Shopping", description: "Day of leisure and premium shopping in Rome.", activities: ["Trevi Fountain wish", "Orchard shopping", "Farewell Italian dinner"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Hotel de Russie Rome or similar" },
      { day: 10, title: "Departure", description: "Transfer to Rome Fiumicino airport.", activities: ["Breakfast", "Airport transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 189999, priceLabel: "₹1,89,999 per person", inclusions: ["3-star hotels", "Standard rooms", "TGV train class 2", "Sightseeing shared tours", "Breakfast daily"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 285000, priceLabel: "₹2,85,000 per person", inclusions: ["4-star hotels", "Deluxe rooms", "TGV train class 1", "Private sightseeing transfers", "Eiffel & Colosseum entry", "Breakfast & dinner"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 485000, priceLabel: "₹4,85,000 per person", inclusions: ["5-star palace hotels (Ritz/Taj)", "Horizon suites", "Luxury private chauffeured transport", "All meals fine dining", "VIP entry tickets with guides", "Private Gondola & yacht cruises"], highlighted: false },
    ],
    inclusions: ["Hotel accommodation", "Daily breakfast", "European train tickets", "All VIP monument entrance tickets", "Taxes"],
    exclusions: ["Schengen visa fees", "International flight tickets", "Personal expenses", "Tips"],
    category: "international", type: "Luxury", price: 189999,
  },
  "sri-lanka": {
    slug: "sri-lanka", name: "Sri Lanka", location: "Pearl of Indian Ocean",
    tagline: "Lush Tea Gardens, Beaches & Ruins",
    heroImage: "https://images.unsplash.com/photo-1588598130619-469a584ef057?w=1200&q=80",
    rating: 4.5, reviewCount: 654, duration: "7 Days / 6 Nights", bestTime: "December to March",
    description: "Explore the pearl of the Indian Ocean. Tea plantations, ancient cities, and beaches in luxury comfort.",
    longDescription: "Sri Lanka is a beautiful teardrop-shaped island packed with historic Buddhist temples, misty tea plantations, sandy beaches, and wildlife-rich national parks. Climb the iconic Sigiriya Rock Fortress, take the world's most scenic train ride from Kandy to Nuwara Eliya, spot leopards at Yala National Park, and unwind on the gold sands of Bentota. Enjoy warm Lankan hospitality and spice estate stays.",
    highlights: ["Sigiriya Rock Fortress climb", "Kandy Tooth Relic temple visit", "Nuwara Eliya tea garden train ride", "Yala National Park leopard safari", "Bentota beach water sports", "traditional Sri Lankan spice dinner"],
    images: [
      { src: "https://images.unsplash.com/photo-1588598130619-469a584ef057?w=800&q=80", alt: "Sigiriya Rock" },
      { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Sri Lanka Train" },
      { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", alt: "Tea Plantations" },
      { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", alt: "Bentota Beach" },
      { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", alt: "Yala Safari" },
      { src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80", alt: "Sri Lankan Curry" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Colombo to Dambulla", description: "Arrive in Colombo, transfer to Dambulla.", activities: ["Airport reception", "Drive to Dambulla", "Cave temple tour", "Dinner"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Heritance Kandalama or similar" },
      { day: 2, title: "Sigiriya Rock Fortress", description: "Climb the grand Sigiriya Rock Fortress.", activities: ["Sigiriya rock climb", "Hiriwadunna village walk", "Traditional lunch", "Ayurvedic massage"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Heritance Kandalama or similar" },
      { day: 3, title: "Dambulla to Kandy", description: "Drive to the cultural capital of Kandy.", activities: ["Tooth Relic Temple visit", "Gem museum tour", "Kandyan cultural dance show"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Earl's Regency Kandy or similar" },
      { day: 4, title: "Scenic Train to Nuwara Eliya", description: "Board the iconic train through tea plantations.", activities: ["Scenic train journey", "Nuwara Eliya arrival", "Tea factory tour & tea tasting"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Grand Hotel Nuwara Eliya or similar" },
      { day: 5, title: "Nuwara Eliya to Bentota", description: "Drive to the beach paradise of Bentota.", activities: ["Drive to Bentota", "Madu river boat safari", "Turtle hatchery visit", "Beach dinner"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Taj Bentota Resort or similar" },
      { day: 6, title: "Bentota Beach Relaxation", description: "Day of beach fun and water sports.", activities: ["Water sports at Bentota river", "Beach relaxation", "Farewell seafood BBQ dinner"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Taj Bentota Resort or similar" },
      { day: 7, title: "Departure via Colombo", description: "Colombo city tour and transfer to airport.", activities: ["Colombo shopping tour", "Airport transfer"], meals: { breakfast: true, lunch: true, dinner: false }, accommodation: "" },
    ],
    pricing: [
      { name: "Silver", tag: "Economy", price: 29999, priceLabel: "₹29,999 per person", inclusions: ["3-star hotels", "Standard rooms", "Private AC sedan", "Breakfast daily"], highlighted: false },
      { name: "Gold", tag: "Standard", price: 45999, priceLabel: "₹45,999 per person", inclusions: ["4-star hotels", "Deluxe rooms", "Private AC SUV", "Breakfast & dinner daily", "Sigiriya & train tickets"], highlighted: true },
      { name: "Platinum", tag: "Luxury", price: 79999, priceLabel: "₹79,999 per person", inclusions: ["5-star Heritance / Taj resorts", "Premium suites", "Luxury AC SUV with driver", "All meals fine dining", "VIP entry to sights", "Private ayurvedic spa"], highlighted: false },
    ],
    inclusions: ["Hotel accommodation", "Daily breakfast", "Airport transfers", "All entry tickets as per plan", "Taxes"],
    exclusions: ["Sri Lanka ETA visa", "International flights", "Personal expenses", "Tips"],
    category: "international", type: "Nature", price: 29999,
  },
};

const RELATED_SLUGS: Record<string, string[]> = {
  kerala: ["goa", "kashmir", "thailand"],
  goa: ["kerala", "andaman", "thailand"],
  kashmir: ["himachal", "manali", "uttarakhand"],
  rajasthan: ["gujarat", "dubai", "kerala"],
  himachal: ["kashmir", "manali", "uttarakhand"],
  andaman: ["goa", "maldives", "thailand"],
  dubai: ["singapore", "maldives", "thailand"],
  thailand: ["dubai", "singapore", "vietnam"],
  singapore: ["dubai", "thailand", "malaysia"],
  europe: ["dubai", "maldives", "singapore"],
  maldives: ["dubai", "thailand", "singapore"],
  manali: ["kashmir", "himachal", "uttarakhand"],
  uttarakhand: ["kashmir", "himachal", "manali"],
  gujarat: ["rajasthan", "kerala", "goa"],
  vietnam: ["thailand", "malaysia", "singapore"],
  malaysia: ["thailand", "singapore", "vietnam"],
  "sri-lanka": ["kerala", "thailand", "maldives"],
  "north-east": ["kerala", "himachal", "sri-lanka"],
  "temple-yatra": ["uttarakhand", "kerala", "himachal"],
};

function WhatsAppButton({ slug, name }: { slug: string; name: string }) {
  const text = `Hello%20Mahadev%20Holidays%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(name)}%20package.%20Please%20share%20details%20about%20pricing%2C%20itinerary%2C%20and%20availability.`;
  return (
    <a
      href={`https://wa.me/919328151481?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all shadow-lg"
    >
      <MessageCircle className="w-5 h-5" />
      Chat on WhatsApp
    </a>
  );
}

function RelatedDestinations({ currentSlug }: { currentSlug: string }) {
  const related = RELATED_SLUGS[currentSlug] || [];
  const details = ALL_DETAILS;
  const items = related.map((s) => details[s]).filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <SectionHeader tag="Explore More" title="You May Also Like" subtitle="Discover similar destinations that might capture your imagination." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((dest) => (
          <DestinationCard
            key={dest.slug}
            id={dest.slug}
            image={dest.heroImage}
            title={dest.name}
            location={dest.location}
            rating={dest.rating}
            duration={dest.duration}
            price={dest.price}
            type={dest.type}
            href={`/destinations/${dest.slug}`}
          />
        ))}
      </div>
    </section>
  );
}

export default function DestinationDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const [dest, setDest] = useState<DetailedDestination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        
        // 1. Check browser local storage first to fetch edited/added destinations
        const local = localStorage.getItem("mahadev_destinations");
        if (local) {
          try {
            const list = JSON.parse(local);
            const found = list.find((d: any) => d.slug === slug);
            if (found) {
              const formatted: DetailedDestination = {
                slug: found.slug,
                name: found.title,
                location: found.location,
                tagline: found.tagline || `${found.title} awaits your discovery`,
                heroImage: found.images?.[0] || found.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
                rating: found.rating || 4.7,
                reviewCount: found.reviewCount || 124,
                duration: found.duration,
                bestTime: found.bestTime || "Year-Round",
                description: found.description,
                longDescription: found.longDescription || found.description,
                highlights: found.highlights && found.highlights.length > 0 ? found.highlights : ["VIP Sightseeing Access", "Premium Transport", "Curated Stays", "24/7 Concierge Support"],
                images: found.images && found.images.length > 0 ? found.images.map((img: string) => ({ src: img, alt: found.title })) : [{ src: found.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80", alt: found.title }],
                itinerary: found.itinerary && found.itinerary.length > 0 ? found.itinerary : [
                  { day: 1, title: `Welcome to ${found.title}`, description: `Arrive and receive private transport transfer to your luxury stay.`, activities: ["Hotel Transfer", "Welcome Dinner"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Premium Hotel" },
                  { day: 2, title: `Explore the Local Wonders`, description: `Full day of guided sightseeing, exploring top scenic and historical attractions.`, activities: ["Sightseeing Tour", "Photography Session"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Premium Hotel" },
                  { day: 3, title: `Adventure & Discovery`, description: `Enjoy curated outdoor activities, local markets, and scenic nature views.`, activities: ["Outdoor Activity", "Market Walk"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Premium Hotel" },
                  { day: 4, title: `Leisure & Relaxation`, description: `Relax at the resort, experience local traditional spa sessions or fine dining.`, activities: ["Resort Leisure", "Spa Treatment"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Premium Hotel" },
                  { day: 5, title: `Departure with Memories`, description: `Enjoy a final breakfast before checking out and transferring to the airport.`, activities: ["Souvenir Shopping", "Airport Transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" }
                ],
                pricing: found.pricing && found.pricing.length > 0 ? found.pricing : [
                  { name: "Silver", tag: "Economy", price: found.price, priceLabel: `₹${found.price.toLocaleString()} per person`, inclusions: ["3-star accommodation", "Breakfast only", "Private transport", "Standard sightseeing"] },
                  { name: "Gold", tag: "Standard", price: Math.round(found.price * 1.5), priceLabel: `₹${Math.round(found.price * 1.5).toLocaleString()} per person`, inclusions: ["4-star accommodation", "Breakfast & dinner daily", "Private luxury transport", "VIP entry passes", "Guided tours"], highlighted: true },
                  { name: "Platinum", tag: "Luxury", price: Math.round(found.price * 2.5), priceLabel: `₹${Math.round(found.price * 2.5).toLocaleString()} per person`, inclusions: ["5-star heritage resorts", "All meals included", "Chauffeured luxury cars", "Helicopter/yacht tour", "24/7 butler service"] }
                ],
                inclusions: found.inclusions && found.inclusions.length > 0 ? found.inclusions : ["Hotel Stay", "Daily Meals", "Private transfers", "Tour Guide"],
                exclusions: found.exclusions && found.exclusions.length > 0 ? found.exclusions : ["Airfare", "Personal Bills", "Tips"],
                category: found.category,
                type: found.type || "Nature",
                price: found.price,
              };
              setDest(formatted);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error(e);
          }
        }

        // 2. Check static details
        if (ALL_DETAILS[slug]) {
          setDest(ALL_DETAILS[slug]);
          setLoading(false);
          return;
        }

        // 3. Fallback fetch from API
        const res = await fetch(`/api/destinations/${slug}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        
        if (data.destination) {
          const d = data.destination;
          const formatted: DetailedDestination = {
            slug: d.slug,
            name: d.title,
            location: d.location,
            tagline: d.tagline || `${d.title} await your discovery`,
            heroImage: d.images?.[0] || d.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
            rating: d.rating || 4.7,
            reviewCount: d.reviewCount || 124,
            duration: d.duration,
            bestTime: d.bestTime || "Year-Round",
            description: d.description,
            longDescription: d.longDescription,
            highlights: d.highlights && d.highlights.length > 0 ? d.highlights : ["VIP Sightseeing Access", "Premium Transport", "Curated Stays", "24/7 Concierge Support"],
            images: d.images && d.images.length > 0 ? d.images.map((img: string) => ({ src: img, alt: d.title })) : [{ src: d.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80", alt: d.title }],
            itinerary: d.itinerary && d.itinerary.length > 0 ? d.itinerary : [
              { day: 1, title: `Welcome to ${d.title}`, description: `Arrive and receive private transport transfer to your luxury stay.`, activities: ["Hotel Transfer", "Welcome Dinner"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Premium Hotel" },
              { day: 2, title: `Explore the Local Wonders`, description: `Full day of guided sightseeing, exploring top scenic and historical attractions.`, activities: ["Sightseeing Tour", "Photography Session"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Premium Hotel" },
              { day: 3, title: `Adventure & Discovery`, description: `Enjoy curated outdoor activities, local markets, and scenic nature views.`, activities: ["Outdoor Activity", "Market Walk"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Premium Hotel" },
              { day: 4, title: `Leisure & Relaxation`, description: `Relax at the resort, experience local traditional spa sessions or fine dining.`, activities: ["Resort Leisure", "Spa Treatment"], meals: { breakfast: true, lunch: true, dinner: true }, accommodation: "Premium Hotel" },
              { day: 5, title: `Departure with Memories`, description: `Enjoy a final breakfast before checking out and transferring to the airport.`, activities: ["Souvenir Shopping", "Airport Transfer"], meals: { breakfast: true, lunch: false, dinner: false }, accommodation: "" }
            ],
            pricing: d.pricing && d.pricing.length > 0 ? d.pricing : [
              { name: "Silver", tag: "Economy", price: d.price, priceLabel: `₹${d.price.toLocaleString()} per person`, inclusions: ["3-star accommodation", "Breakfast only", "Private transport", "Standard sightseeing"] },
              { name: "Gold", tag: "Standard", price: Math.round(d.price * 1.5), priceLabel: `₹${Math.round(d.price * 1.5).toLocaleString()} per person`, inclusions: ["4-star accommodation", "Breakfast & dinner daily", "Private luxury transport", "VIP entry passes", "Guided tours"], highlighted: true },
              { name: "Platinum", tag: "Luxury", price: Math.round(d.price * 2.5), priceLabel: `₹${Math.round(d.price * 2.5).toLocaleString()} per person`, inclusions: ["5-star heritage resorts", "All meals included", "Chauffeured luxury cars", "Helicopter/yacht tour", "24/7 butler service"] }
            ],
            inclusions: d.inclusions && d.inclusions.length > 0 ? d.inclusions : ["Hotel Stay", "Daily Meals", "Private transfers", "Tour Guide"],
            exclusions: d.exclusions && d.exclusions.length > 0 ? d.exclusions : ["Airfare", "Personal Bills", "Tips"],
            category: d.category,
            type: d.type || "Nature",
            price: d.price,
          };
          setDest(formatted);
        }
      } catch (err) {
        console.error("Failed to load destination details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [slug]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: dest?.name || "Destination" },
  ];

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-primary/70 font-bold">Loading destination details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!dest) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-primary mb-4">Destination Not Found</h1>
            <p className="text-primary/80 mb-6 font-semibold">The destination you are looking for does not exist.</p>
            <Link href="/destinations" className="px-6 py-3 bg-accent text-white font-semibold rounded-full text-sm hover:bg-accent-600 transition-all">Browse All Destinations</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <ScrollToTop />

      <section className="relative h-[50vh] md:h-[70vh] min-h-[400px] overflow-hidden">
        <Image src={dest.heroImage} alt={dest.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-gold/15 to-secondary/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-primary/50 text-xs mb-4">
              {breadcrumbs.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="w-3 h-3" />}
                  {item.href ? <Link href={item.href} className="hover:text-accent transition-colors">{item.label}</Link> : <span className="text-primary/80">{item.label}</span>}
                </span>
              ))}
            </nav>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-2">
              {dest.name}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-primary/60 text-lg md:text-xl font-light">
              {dest.tagline}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-primary/85">
              <MapPin className="w-4 h-4 text-gold" />
              <span>{dest.location}</span>
            </div>
            <div className="flex items-center gap-2 text-primary/85">
              <Clock className="w-4 h-4 text-gold" />
              <span>{dest.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-primary/85">
              <Sun className="w-4 h-4 text-gold" />
              <span>Best: {dest.bestTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary/85 ml-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(dest.rating) ? "fill-gold text-gold" : i < dest.rating ? "fill-gold/50 text-gold" : "fill-gray-200 text-gray-200"}`} />
              ))}
              <span className="font-semibold text-primary ml-1">{dest.rating}</span>
              <span className="text-primary/70 font-semibold">({dest.reviewCount.toLocaleString()} reviews)</span>
            </div>
          </div>
        </motion.div>
      </section>

      <AnimatedSection className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader tag="Overview" title={dest.name} subtitle={dest.description} centered={false} />
            <p className="text-primary/90 leading-relaxed mb-6">{dest.longDescription}</p>
            <div className="grid grid-cols-2 gap-3">
              {dest.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span className="text-primary/90 text-sm font-semibold">{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image src={dest.images[1]?.src || dest.heroImage} alt={dest.name} fill className="object-cover" />
          </div>
        </div>
      </AnimatedSection>

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Journey" title="Your Itinerary" subtitle="Day-by-day breakdown of your luxury travel experience." />

          <div className="max-w-3xl mx-auto space-y-4">
            {dest.itinerary.map((day) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-primary/5"
              >
                <button
                  onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-primary/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-gold/10 text-gold font-heading font-bold text-sm flex items-center justify-center shrink-0">
                      {day.day}
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold text-primary">{day.title}</h3>
                      <p className="text-primary/40 text-xs">{day.accommodation}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-primary/30 transition-transform duration-300 ${expandedDay === day.day ? "rotate-180" : ""}`} />
                </button>
                {expandedDay === day.day && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-primary/60 text-sm mb-4">{day.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {day.activities.map((activity, i) => (
                        <span key={i} className="px-3 py-1.5 bg-primary/5 rounded-full text-xs text-primary/60">{activity}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5 text-primary/50">
                        Meals: {day.meals.breakfast ? <span className="text-emerald-500 font-medium">B</span> : <span className="text-red-300">-</span>}
                        / {day.meals.lunch ? <span className="text-emerald-500 font-medium">L</span> : <span className="text-red-300">-</span>}
                        / {day.meals.dinner ? <span className="text-emerald-500 font-medium">D</span> : <span className="text-red-300">-</span>}
                      </span>
                      {day.accommodation && (
                        <span className="flex items-center gap-1.5 text-primary/50">
                          <Home className="w-3 h-3" /> {day.accommodation}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Details" title="Inclusions & Exclusions" subtitle="What's included in your package and what's not." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-primary/5">
              <h3 className="font-heading text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500" /> Included
              </h3>
              <ul className="space-y-3">
                {dest.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-500" />
                    </div>
                    <span className="text-primary/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-primary/5">
              <h3 className="font-heading text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <X className="w-5 h-5 text-red-400" /> Not Included
              </h3>
              <ul className="space-y-3">
                {dest.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-400" />
                    </div>
                    <span className="text-primary/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Gallery" title="Visual Journey" subtitle="Get a glimpse of the beauty that awaits you." />
          <ImageGallery images={dest.images} cols={3} />
        </div>
      </AnimatedSection>

      <section className="bg-gradient-to-br from-accent/5 via-gold/5 to-secondary/5 py-20 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader tag="Book Now" title="Plan Your Trip" subtitle="Chat with our travel experts on WhatsApp and get a personalized itinerary in minutes." light />
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 flex flex-col items-center justify-center text-center">
              <MessageCircle className="w-16 h-16 text-green-400 mb-4" />
              <p className="text-primary/70 text-sm mb-6 max-w-sm">Skip the form! Message us directly on WhatsApp for instant assistance.</p>
              <WhatsAppButton slug={slug} name={dest.name} />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-cream pt-20">
        <RelatedDestinations currentSlug={slug} />
      </div>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <Newsletter />
      </section>

      <Footer />

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-lg border-t border-gold/10 px-4 py-3 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-accent font-heading font-bold text-lg">₹{dest.price.toLocaleString("en-IN")}</p>
            <p className="text-primary/40 text-xs">per person</p>
          </div>
          <div className="flex items-center gap-2">
            <a href="tel:+919328151481" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary/70 hover:text-accent hover:border-accent/30 transition-all">
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/919328151481?text=Hello%20Mahadev%20Holidays%2C%20I%27m%20interested%20in%20${encodeURIComponent(dest.name)}.%20Please%20share%20details%20about%20pricing%20and%20availability.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full text-sm transition-all shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Book Now
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

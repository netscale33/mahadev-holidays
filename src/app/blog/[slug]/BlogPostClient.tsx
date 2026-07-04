"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  ChevronRight,
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import Newsletter from "@/components/Newsletter";

interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorBio?: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  sections: { id: string; title: string }[];
}

const BLOG_DATA: Record<string, BlogPostData> = {
  "top-10-luxury-destinations-in-india-2026": {
    slug: "top-10-luxury-destinations-in-india-2026",
    title: "Top 10 Luxury Destinations in India for 2026",
    excerpt: "Discover the most opulent and breathtaking destinations across India that redefine luxury travel.",
    coverImage: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&q=80",
    author: "Mahadev Holidays Team",
    authorBio: "Travel experts curating the finest luxury experiences across India and the world.",
    category: "Luxury Travel",
    date: "March 15, 2026",
    readTime: "8 min read",
    tags: ["Luxury Travel", "India Destinations", "Travel Guide 2026", "Premium Holidays"],
    sections: [
      { id: "introduction", title: "Introduction" },
      { id: "rajasthan", title: "1. Rajasthan - Royal Heritage" },
      { id: "kerala", title: "2. Kerala - Backwater Bliss" },
      { id: "kashmir", title: "3. Kashmir - Paradise on Earth" },
      { id: "goa", title: "4. Goa - Beachside Luxury" },
      { id: "himachal", title: "5. Himachal Pradesh" },
    ],
    content: `
## Introduction
India is a land of extraordinary diversity, offering some of the world's most luxurious travel experiences. As we step into 2026, the Indian luxury travel landscape has evolved to offer unprecedented levels of comfort, exclusivity, and authentic experiences. From heritage palace conversions to ultra-luxury wellness retreats, India's hospitality sector has embraced the global standards of opulence while retaining its unique cultural soul.

The discerning traveler today seeks more than just accommodation; they seek transformative experiences that connect them with the destination's essence. India delivers this in abundance, whether through a private dinner overlooking the Taj Mahal, a helicopter transfer to a remote Himalayan lodge, or a sunset cruise on the serene backwaters of Kerala.

In this comprehensive guide, we explore the top 10 luxury destinations in India that promise to make your 2026 travels truly unforgettable.

## Rajasthan - Royal Heritage
Rajasthan remains the crown jewel of Indian luxury travel. The state's magnificent palaces have been transformed into world-class heritage hotels that offer a glimpse into the royal lifestyle of the Maharajas. Properties like the Rambagh Palace in Jaipur, Umaid Bhawan Palace in Jodhpur, and the Lake Palace in Udaipur set the benchmark for regal hospitality.

Beyond the palace stays, Rajasthan offers unique luxury experiences including private desert camps in Jaisalmer, hot air balloon rides over Jaipur, and exclusive wildlife safaris at Ranthambore National Park. The state's rich culinary heritage, vibrant festivals, and traditional crafts make every moment a cultural immersion.

**Must-try experiences:**
- Private dinner at Amber Fort with light and sound show
- Heritage walk through Jaipur's pink city with a royal historian
- Luxury train journey aboard the Palace on Wheels

## Kerala - Backwater Bliss
Kerala, often called God's Own Country, has perfected the art of luxury wellness tourism. The state's backwaters offer an unparalleled experience of tranquility aboard private houseboats that come with dedicated crews, gourmet chefs, and all modern amenities.

The hill stations of Munnar and Wayanad feature luxury tea estate bungalows where guests can walk through sprawling tea gardens and enjoy freshly brewed tea while overlooking misty valleys. Kerala's Ayurvedic resorts combine ancient healing traditions with world-class spa facilities, offering personalized wellness programs that rejuvenate body, mind, and soul.

**Recommended luxury stays:**
- Kumarakom Lake Resort - Overwater villas on Vembanad Lake
- Spice Village, Thekkady - Luxury cottages in a spice plantation
- Taj Green Cove, Kovalam - Cliff-top beachside luxury

## Kashmir - Paradise on Earth
Kashmir's breathtaking beauty has earned it the title of Paradise on Earth, and luxury travel here has reached new heights. The iconic Dal Lake offers stays on heritage houseboats that have hosted dignitaries and celebrities from around the world. These floating palaces combine Kashmiri craftsmanship with modern luxury.

Gulmarg has emerged as a premium ski destination with luxury resorts offering direct slope access. The Gulmarg Gondola, one of the highest cable cars in the world, provides breathtaking views of the snow-capped Himalayas. In Pahalgam, luxury riverside resorts offer trout fishing, horseback riding, and trekking expeditions.

**Insider tip:** Visit during the spring season (March-April) when the entire valley is carpeted with blooming flowers, creating a surreal landscape.

## Goa - Beachside Luxury
Goa has transcended its backpacker reputation to become a premier luxury beach destination. The state now boasts some of India's finest beach resorts, with properties like the W Goa, Taj Fort Aguada, and Alila Diwa offering world-class amenities.

North Goa's vibrant energy and South Goa's serene beaches cater to different luxury preferences. Private yacht charters, helicopter tours, exclusive beach clubs, and gourmet dining experiences have elevated Goa's luxury quotient. The state's Portuguese heritage adds a unique cultural dimension to the luxury experience.

**Luxury experiences not to miss:**
- Private sundowner cruise on the Mandovi River
- Fine dining at celebrity chef restaurants
- Exclusive spa treatments using local ingredients

## Himachal Pradesh
Himachal Pradesh offers luxury mountain retreats that rival the Alps. The state's hill stations - Shimla, Manali, Dharamshala, and the less-explored Tirthan Valley - feature boutique luxury properties that emphasize sustainability and local experiences.

The region is perfect for luxury adventure tourism, offering heli-skiing, private guided treks, fly fishing expeditions, and yoga retreats with panoramic Himalayan views. The apple orchards of Shimla and the pine forests of Manali provide a picturesque backdrop for romantic getaways and family vacations alike.

**Top picks:** The Himalayan, Manali - A luxury spa resort with stunning valley views; Wildflower Hall, Shimla - A heritage property with unparalleled mountain vistas.`,
  },
  "ultimate-honeymoon-guide-romantic-getaways": {
    slug: "ultimate-honeymoon-guide-romantic-getaways",
    title: "The Ultimate Honeymoon Guide: Romantic Getaways for Newlyweds",
    excerpt: "Plan your dream honeymoon with our curated list of the most romantic destinations that promise unforgettable memories for couples.",
    coverImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=80",
    author: "Priya Sharma",
    authorBio: "Honeymoon travel specialist and luxury travel consultant.",
    category: "Travel Tips",
    date: "March 10, 2026",
    readTime: "6 min read",
    tags: ["Honeymoon", "Romantic Getaways", "Couple Travel", "Wedding"],
    sections: [
      { id: "intro", title: "Introduction" },
      { id: "maldives", title: "Maldives - Overwater Romance" },
      { id: "kashmir", title: "Kashmir - Love in the Valleys" },
      { id: "goa", title: "Goa - Beachside Bliss" },
      { id: "tips", title: "Tips for the Perfect Honeymoon" },
    ],
    content: `
## Introduction
Your honeymoon is the first chapter of your married life together, and it deserves to be nothing short of magical. At Mahadev Holidays, we understand the importance of this special journey and have curated a selection of the world's most romantic destinations that promise to create memories lasting a lifetime.

Whether you dream of waking up to turquoise lagoons from an overwater villa, watching the sunset over snow-capped mountains, or strolling hand-in-hand on pristine beaches, we have the perfect destination for you. Let us guide you through the most enchanting romantic getaways that cater to every couple's unique vision of paradise.

## Maldives - Overwater Romance
The Maldives remains the world's most iconic honeymoon destination, and for good reason. Picture this: a private overwater villa with a glass floor revealing the marine life below, a private infinity pool overlooking the endless Indian Ocean, and a personal butler attending to your every need.

The Maldives offers unparalleled privacy and romance. Couples can enjoy private sandbank dinners under the stars, couple's spa treatments in overwater treatment rooms, and sunset dolphin cruises. The underwater world of the Maldives provides incredible snorkeling and diving experiences for adventurous couples.

**Top resorts for honeymooners:**
- Soneva Jani - Overwater villas with water slides
- Gili Lankanfushi - Ultimate privacy and romance
- Mirihi Island Resort - Intimate island experience

## Kashmir - Love in the Valleys
For couples who prefer mountain romance over beachside luxury, Kashmir offers an ethereal setting that has inspired poets and lovers for centuries. A shikara ride on Dal Lake during sunset, with the Himalayas reflecting in the calm waters, is an experience that defines romance.

Stay in a heritage houseboat that has been meticulously restored to its former glory, or choose a luxury resort in Gulmarg with views of snow-capped peaks. The Mughal Gardens, with their terraced lawns and flowing fountains, provide a perfect backdrop for romantic strolls.

**Must-do romantic experiences:**
- Private shikara dinner on Dal Lake
- Couple's spa treatment using Kashmiri ingredients
- Sunrise photography session at Mughal Gardens

## Goa - Beachside Bliss
Goa offers the perfect blend of relaxation and adventure for honeymooning couples. The state's luxury resorts provide private beach access, infinity pools, and world-class dining. South Goa, in particular, offers a more serene and romantic atmosphere compared to the bustling northern beaches.

**Recommended for couples:** Private sunset cruises, couples cooking classes featuring Goan cuisine, and beachfront candlelight dinners.

## Tips for the Perfect Honeymoon
1. Plan ahead but leave room for spontaneity
2. Choose a destination that reflects both your personalities
3. Invest in experiences over material souvenirs
4. Disconnect from technology and connect with each other
5. Consider upgrading to premium experiences - this is your honeymoon!`,
  },
  "exploring-kerala-gods-own-country-in-style": {
    slug: "exploring-kerala-gods-own-country-in-style",
    title: "Exploring Kerala: God's Own Country in Style",
    excerpt: "Experience the lush backwaters, pristine beaches, and rich culture of Kerala with our luxury travel guide.",
    coverImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80",
    author: "Rahul Verma",
    authorBio: "Travel writer and Kerala tourism expert.",
    category: "Destination Guides",
    date: "March 5, 2026",
    readTime: "7 min read",
    tags: ["Kerala", "God's Own Country", "India Travel", "Backwaters"],
    sections: [
      { id: "intro", title: "Introduction" },
      { id: "backwaters", title: "The Backwater Experience" },
      { id: "munnar", title: "Munnar's Tea Gardens" },
      { id: "ayurveda", title: "Ayurvedic Wellness" },
      { id: "cuisine", title: "Kerala Cuisine" },
    ],
    content: `
## Introduction
Kerala, nestled between the Arabian Sea and the Western Ghats, is a tropical paradise that offers a unique blend of natural beauty, rich culture, and luxurious experiences. Known as God's Own Country, this slender strip of land on India's southwestern coast has been enchanting travelers for centuries with its lush landscapes, serene backwaters, and warm hospitality.

Luxury travel in Kerala is about experiencing authenticity without compromising on comfort. It's about waking up to the sound of birds in a treehouse overlooking a spice plantation, cruising through palm-fringed backwaters on a private houseboat, and rejuvenating your senses with ancient Ayurvedic treatments. Let us take you on a journey through the best of Kerala, luxury style.

## The Backwater Experience
The backwaters of Kerala are a network of interconnected canals, rivers, lakes, and inlets that stretch across the state. The most famous stretch is in Alleppey (Alappuzha), often called the Venice of the East. A luxury houseboat cruise through these tranquil waters is an experience unlike any other.

Our premium houseboats come with spacious bedrooms, attached bathrooms, a living area, and an open deck where you can relax and watch village life unfold along the banks. A dedicated crew including a chef prepares fresh Kerala cuisine using local ingredients. As the sun sets, the houseboat anchors in a quiet spot, and you can enjoy a candlelit dinner on deck under a canopy of stars.

## Munnar's Tea Gardens
Munnar, located at an altitude of 1,600 meters, is famous for its sprawling tea plantations that carpet the hills in vibrant green. The cool climate, misty mornings, and breathtaking views make it a perfect hill station retreat.

Luxury accommodation in Munnar includes heritage tea bungalows that date back to the British colonial era. These properties have been restored to offer modern amenities while retaining their old-world charm. Guests can take guided walks through tea estates, visit tea factories to understand the processing, and enjoy freshly brewed tea while soaking in panoramic views.

**Recommended stays:** The Windflower Resort & Spa, Blanket Hotel & Spa, and Chandy's Windy Woods.

## Ayurvedic Wellness
Kerala is the birthplace of Ayurveda, the ancient Indian system of medicine. The state is dotted with world-class Ayurvedic resorts that offer personalized wellness programs under the supervision of experienced practitioners. From rejuvenating massages to detoxification therapies, these treatments use natural herbs and oils to restore balance and vitality.

## Kerala Cuisine
No visit to Kerala is complete without savoring its culinary delights. Kerala cuisine is characterized by the abundant use of coconut, seafood, and spices. A traditional Sadya (feast) served on a banana leaf is a gastronomic experience that showcases the diversity of Kerala's flavors.`,
  },
  "why-choose-customized-tour-package": {
    slug: "why-choose-customized-tour-package",
    title: "Why Choose a Customized Tour Package? The Benefits of Personalized Travel",
    excerpt: "Discover how customized tour packages offer flexibility, unique experiences, and unparalleled value compared to off-the-shelf travel deals.",
    coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    author: "Ananya Gupta",
    authorBio: "Travel planning expert and customer experience manager.",
    category: "Travel Tips",
    date: "February 28, 2026",
    readTime: "5 min read",
    tags: ["Customized Tours", "Personalized Travel", "Travel Tips", "Planning"],
    sections: [
      { id: "intro", title: "Introduction" },
      { id: "flexibility", title: "Complete Flexibility" },
      { id: "value", title: "Better Value for Money" },
      { id: "experience", title: "Unique Experiences" },
      { id: "support", title: "Dedicated Support" },
    ],
    content: `
## Introduction
In an era of one-size-fits-all travel packages, customized tour packages stand out as the superior choice for discerning travelers. At Mahadev Holidays, we believe that every journey should be as unique as the traveler undertaking it. A customized tour package is designed around your preferences, interests, budget, and schedule, ensuring that every moment of your vacation is exactly what you want it to be.

## Complete Flexibility
The most significant advantage of a customized tour package is the flexibility it offers. Unlike fixed itineraries that force you to follow a predetermined schedule, customized packages allow you to:
- Choose your travel dates and duration
- Select destinations that interest you
- Decide on the pace of your travel
- Modify the itinerary as you go
- Pick accommodation that matches your style
- Choose activities that excite you

## Better Value for Money
Contrary to popular belief, customized tour packages often provide better value than standard packages. When you customize, you pay only for what you actually want, eliminating the cost of unwanted inclusions. Moreover, our travel experts have access to exclusive deals and partnerships that ensure you get the best rates for accommodation, transportation, and activities.

## Unique Experiences
Standard packages offer standard experiences. Customized packages open doors to unique, off-the-beaten-path experiences that create lasting memories. Whether it's a private cooking class with a local family, a helicopter tour over a scenic landscape, or a midnight photography session at a historic monument, customization makes the extraordinary possible.

## Dedicated Support
When you book a customized package with Mahadev Holidays, you get a dedicated travel expert who is available 24/7 to assist you. From the initial planning stages to the moment you return home, your personal travel consultant ensures everything goes smoothly. This level of personalized service is simply not available with standard tour packages.`,
  },
  "kashmir-paradise-on-earth-complete-travel-guide": {
    slug: "kashmir-paradise-on-earth-complete-travel-guide",
    title: "Kashmir: Paradise on Earth - A Complete Travel Guide",
    excerpt: "From Dal Lake shikaras to Gulmarg's snowy peaks, explore everything you need for an unforgettable Kashmir vacation.",
    coverImage: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80",
    author: "Vikram Singh",
    authorBio: "Kashmir travel specialist with over a decade of experience.",
    category: "Destination Guides",
    date: "February 20, 2026",
    readTime: "10 min read",
    tags: ["Kashmir", "Paradise on Earth", "Srinagar", "Gulmarg"],
    sections: [
      { id: "intro", title: "Introduction" },
      { id: "srinagar", title: "Srinagar & Dal Lake" },
      { id: "gulmarg", title: "Gulmarg - Meadow of Flowers" },
      { id: "pahalgam", title: "Pahalgam - Valley of Shepherds" },
      { id: "cuisine", title: "Kashmiri Cuisine" },
      { id: "tips", title: "Travel Tips" },
    ],
    content: `
## Introduction
Kashmir, often described as Paradise on Earth, is a land of breathtaking beauty that has captivated travelers for centuries. Nestled in the Himalayas, this stunning region offers a perfect blend of natural wonders, rich culture, and warm hospitality. From the iconic Dal Lake to the snow-capped peaks of Gulmarg, from the Mughal gardens to the apple orchards, Kashmir is a destination that stays with you long after you've left.

## Srinagar & Dal Lake
The summer capital of Jammu and Kashmir, Srinagar is the heart of tourism in the region. The city is famous for its stunning Dal Lake, which is actually a network of lakes, canals, and waterways. A stay on a traditional Kashmiri houseboat is an essential experience - these floating homes are beautifully carved from cedar wood and offer modern amenities while retaining their classic charm.

**Top attractions in Srinagar:**
- Shalimar Bagh - The crown jewel of Mughal gardens
- Nishat Bagh - The Garden of Joy with 12 terraces
- Shankaracharya Temple - Hilltop temple with panoramic views
- Floating vegetable market - A unique early morning experience

## Gulmarg - Meadow of Flowers
Gulmarg, meaning Meadow of Flowers, is one of India's premier hill stations and ski destinations. The Gulmarg Gondola is one of the highest cable cars in the world, taking visitors to an altitude of 3,980 meters for stunning panoramic views of the Himalayas.

In winter, Gulmarg transforms into a skiing paradise with some of the best powder snow in Asia. Summer brings meadows carpeted with wildflowers, making it perfect for golfing (it has one of the highest green golf courses in the world), horseback riding, and trekking.

## Pahalgam - Valley of Shepherds
Pahalgam is the base camp for the famous Amarnath Yatra and a beautiful destination in its own right. The Lidder River flows through the valley, offering excellent trout fishing opportunities. Betaab Valley and Aru Valley are nearby attractions that offer stunning landscapes and peaceful walks.

## Kashmiri Cuisine
Kashmiri food is a delightful blend of flavors influenced by Central Asian, Persian, and North Indian cuisines. The famous Wazwan is a multi-course meal that is an integral part of Kashmiri culture. Rogan Josh, Yakhni, and Gushtaba are must-try dishes. Don't forget to end your meal with a cup of traditional Kashmiri Kahwa - a green tea infused with saffron, cinnamon, and almonds.

## Travel Tips
- Best time to visit: April to October for pleasant weather; December to February for snow sports
- Pack layers as temperatures can vary significantly
- Try to include at least one night on a houseboat
- Book Gulmarg Gondola tickets in advance during peak season
- Carry cash as card acceptance can be limited in some areas`,
  },
  "international-travel-tips-first-time-travelers": {
    slug: "international-travel-tips-first-time-travelers",
    title: "International Travel Tips for First-Time Travelers",
    excerpt: "Planning your first international trip? Here's everything you need to know - from visa requirements to packing essentials.",
    coverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
    author: "Neha Kapoor",
    authorBio: "International travel consultant and globetrotter.",
    category: "Travel Tips",
    date: "February 14, 2026",
    readTime: "6 min read",
    tags: ["International Travel", "First Time", "Travel Tips", "Beginners Guide"],
    sections: [
      { id: "intro", title: "Introduction" },
      { id: "documents", title: "Documents & Visa" },
      { id: "packing", title: "Packing Essentials" },
      { id: "health", title: "Health & Safety" },
      { id: "money", title: "Money Matters" },
      { id: "culture", title: "Cultural Tips" },
    ],
    content: `
## Introduction
Congratulations on planning your first international trip! The world is full of incredible destinations waiting to be explored, and traveling abroad is one of the most enriching experiences you can have. While the prospect of traveling to a new country can be exciting, it can also feel overwhelming for first-time travelers.

At Mahadev Holidays, we've helped thousands of first-time travelers plan their international adventures. In this guide, we share essential tips and insights to ensure your first international trip is smooth, enjoyable, and memorable.

## Documents & Visa
The most critical aspect of international travel is ensuring you have the right documents:
- **Passport:** Ensure your passport is valid for at least 6 months beyond your travel dates
- **Visa:** Research visa requirements well in advance - processing times vary by country
- **Travel Insurance:** Highly recommended for medical emergencies, trip cancellations, and lost baggage
- **Copies:** Keep digital and physical copies of all important documents

## Packing Essentials
Packing for an international trip requires strategic planning:
- Pack versatile clothing that can be layered
- Carry a universal power adapter
- Include a basic first-aid kit
- Pack a reusable water bottle
- Carry a small daypack for excursions
- Leave valuables at home when possible

## Health & Safety
Your health and safety should be the top priority:
- Check required vaccinations for your destination
- Carry prescribed medications with proper documentation
- Register with your country's embassy
- Share your itinerary with family back home
- Save emergency contact numbers

## Money Matters
Managing finances while traveling abroad:
- Notify your bank about your travel plans
- Carry a mix of cash and cards
- Use airport ATMs for the best exchange rates
- Keep emergency cash in a separate location
- Understand local tipping customs

## Cultural Tips
Respecting local culture enhances your travel experience:
- Research local customs and dress codes
- Learn a few basic phrases in the local language
- Be aware of photography restrictions
- Respect religious sites and practices
- Try local cuisine and be open to new experiences`,
  },
  "culinary-journey-through-india-regional-cuisines": {
    slug: "culinary-journey-through-india-regional-cuisines",
    title: "A Culinary Journey Through India's Regional Cuisines",
    excerpt: "Embark on a gastronomic adventure across India's diverse culinary landscape, from spicy street food to royal thalis and coastal delicacies.",
    coverImage: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=1200&q=80",
    author: "Mahadev Holidays Team",
    authorBio: "Food and travel curators exploring the richest flavors of India.",
    category: "Food & Travel",
    date: "February 8, 2026",
    readTime: "7 min read",
    tags: ["Food & Travel", "Indian Cuisine", "Gastronomy", "Street Food"],
    sections: [
      { id: "intro", title: "Introduction" },
      { id: "north", title: "North Indian Delights" },
      { id: "south", title: "South Indian Coastal Flavors" },
      { id: "east", title: "East Indian Sweet Traditions" },
      { id: "west", title: "West Indian Royal Platters" },
      { id: "conclusion", title: "Conclusion" },
    ],
    content: `
## Introduction
Indian cuisine is as diverse as its culture, geography, and languages. Each region boasts its own unique cooking styles, native spices, and signature dishes. At Mahadev Holidays, we believe that exploring a country's food is just as important as visiting its sights. Embark on a delicious journey through the four corners of India to explore the incredible flavors that define regional Indian cuisine.

## North Indian Delights
North Indian cuisine is characterized by rich, creamy gravies, roasted meats, and fresh breads baked in a tandoor (clay oven). Heavily influenced by Mughal cooking techniques, this region uses rich ingredients like saffron, nuts, cream, and ghee.
- **Punjab:** Famous for its hearty, butter-rich dishes like Butter Chicken, Dal Makhani, and fluffy tandoori naans.
- **Awadh (Lucknow):** Renowned for its melt-in-the-mouth galouti kebabs, slow-cooked biryanis, and rich kormas.
- **Kashmir:** Known for Rogan Josh (spiced lamb curry) and Kashmiri Kahwa (saffron tea).

## South Indian Coastal Flavors
South Indian food shifts the focus to rice, coconut, lentils, and souring agents like tamarind. It is typically lighter but highly aromatic due to mustard seeds, curry leaves, and fresh spices.
- **Kerala:** Coastal dishes featuring fresh fish, prawns, and coconut milk curry, served with steamed appams.
- **Tamil Nadu:** The land of crispy dosas, fluffy idlis, and hot sambar, along with spicy Chettinad curries.
- **Karnataka & Andhra Pradesh:** Famous for Bisi Bele Bath and the legendary, highly spiced Hyderabadi Biryani.

## East Indian Sweet Traditions
East Indian cuisine focuses on fish, rice, mustard paste, and an array of famous dairy-based desserts.
- **Bengal:** Famous for Machher Jhol (fish curry in mustard oil) and sweets like Rasgulla and Sandesh.
- **Odisha:** Known for temple foods like Dalma and sweet treats like Chhena Poda (baked cheese dessert).

## West Indian Royal Platters
West Indian food ranges from the purely vegetarian thalis of Gujarat and Rajasthan to the fiery seafood curries of Goa.
- **Rajasthan & Gujarat:** Vegetarian platters featuring Dal Baati Churma and sweet-and-sour Gujarati Kadhi.
- **Goa:** Heavily Portuguese-influenced coastal curries like Goan Fish Curry and spicy Vindaloo.

## Conclusion
Exploring regional Indian food is a lifetime adventure. Whether you are enjoying a royal meal in a palace hotel in Rajasthan or sipping fresh coconut water in Kerala, every flavor tells a story.`,
  },
  "rich-cultural-heritage-rajasthan-beyond-palaces": {
    slug: "rich-cultural-heritage-rajasthan-beyond-palaces",
    title: "The Rich Cultural Heritage of Rajasthan: Beyond the Palaces",
    excerpt: "Dive deep into Rajasthan's vibrant culture, folk music, traditional crafts, and timeless architecture that make it India's most colorful state.",
    coverImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
    author: "Arjun Mehta",
    authorBio: "Heritage writer and historian capturing the soul of Indian traditions.",
    category: "Culture & Heritage",
    date: "February 1, 2026",
    readTime: "9 min read",
    tags: ["Culture & Heritage", "Rajasthan", "Indian Traditions", "Folk Art"],
    sections: [
      { id: "intro", title: "Introduction" },
      { id: "folk-art", title: "Folk Music & Dance" },
      { id: "crafts", title: "Traditional Crafts" },
      { id: "festivals", title: "Colorful Festivals" },
      { id: "architecture", title: "Stepwells & Havelis" },
      { id: "summary", title: "Summary" },
    ],
    content: `
## Introduction
While Rajasthan is globally famous for its massive forts and grand palaces, the true soul of the state lies in its living traditions. The vibrant clothing, the haunting tunes of stringed instruments, the centuries-old crafts, and the bustling local festivals create a cultural experience that is unmatched. In this article, we explore the rich heritage of Rajasthan that goes beyond the grand royal structures.

## Folk Music & Dance
The arid deserts of Rajasthan echo with the beautiful music of nomadic communities like the Manganiyars and Langas. Using traditional instruments like the Kamayacha and Khartal, they sing songs of royal heroism and lost love.
- **Ghoomar:** The graceful dance of royal women, characterized by swirling colorful skirts.
- **Kalbelia:** The snake charmer dance, marked by acrobatic movements and fast-paced rhythms.
- **Chari:** A spectacular dance where performers balance brass pots with burning fires on their heads.

## Traditional Crafts
Rajasthan is a paradise for art lovers. Generations of artisans have preserved unique craft techniques that are highly prized worldwide.
- **Block Printing:** Hand-printed cotton textiles from Bagru and Sanganer using organic vegetable dyes.
- **Blue Pottery:** A unique glazing technique imported from Persia, using ground quartz rather than clay.
- **Bandhani:** The intricate art of tie-and-dye that produces patterns in bright reds, yellows, and greens.

## Colorful Festivals
To witness Rajasthan in all its glory, plan your visit during one of its spectacular local festivals.
- **Pushkar Camel Fair:** A massive gathering of camels, horses, and traders, alongside cultural contests.
- **Desert Festival Jaisalmer:** Folk dances, camel races, and turban-tying competitions set against the golden dunes.

## Stepwells & Havelis
Beyond royal fortresses, the heritage architecture of stepwells (baoris) and merchant mansions (havelis) is stunning. The Shekhawati region is known as an open-air art gallery due to its richly painted havelis showing mythological tales and historical events.

## Summary
Rajasthan's heritage is not static history; it is a living, breathing experience. We invite you to explore this beautiful state with us and witness the warmth of traditional Rajasthani hospitality.`,
  },
};

const RELATED_POSTS: Record<string, string[]> = {
  "top-10-luxury-destinations-in-india-2026": ["kashmir-paradise-on-earth-complete-travel-guide", "exploring-kerala-gods-own-country-in-style", "rich-cultural-heritage-rajasthan-beyond-palaces"],
  "ultimate-honeymoon-guide-romantic-getaways": ["top-10-luxury-destinations-in-india-2026", "kashmir-paradise-on-earth-complete-travel-guide", "exploring-kerala-gods-own-country-in-style"],
  "exploring-kerala-gods-own-country-in-style": ["top-10-luxury-destinations-in-india-2026", "kashmir-paradise-on-earth-complete-travel-guide", "culinary-journey-through-india-regional-cuisines"],
  "why-choose-customized-tour-package": ["international-travel-tips-first-time-travelers", "top-10-luxury-destinations-in-india-2026", "ultimate-honeymoon-guide-romantic-getaways"],
  "kashmir-paradise-on-earth-complete-travel-guide": ["top-10-luxury-destinations-in-india-2026", "exploring-kerala-gods-own-country-in-style", "rich-cultural-heritage-rajasthan-beyond-palaces"],
  "international-travel-tips-first-time-travelers": ["why-choose-customized-tour-package", "top-10-luxury-destinations-in-india-2026", "ultimate-honeymoon-guide-romantic-getaways"],
  "culinary-journey-through-india-regional-cuisines": ["exploring-kerala-gods-own-country-in-style", "rich-cultural-heritage-rajasthan-beyond-palaces", "kashmir-paradise-on-earth-complete-travel-guide"],
  "rich-cultural-heritage-rajasthan-beyond-palaces": ["top-10-luxury-destinations-in-india-2026", "exploring-kerala-gods-own-country-in-style", "culinary-journey-through-india-regional-cuisines"],
};

const ALL_BLOG_SLUGS = Object.keys(BLOG_DATA);

const ALL_POSTS_MINI: Record<string, { title: string; slug: string; coverImage: string; category: string; date: string }> = {};
ALL_BLOG_SLUGS.forEach((slug) => {
  const post = BLOG_DATA[slug];
  if (post) {
    ALL_POSTS_MINI[slug] = {
      title: post.title,
      slug: post.slug,
      coverImage: post.coverImage,
      category: post.category,
      date: post.date,
    };
  }
});

function CommentSection() {
  return (
    <div className="text-center">
      <h3 className="font-heading text-2xl font-bold text-primary mb-4">Share Your Thoughts</h3>
      <p className="text-primary/75 text-sm mb-6 max-w-md mx-auto font-semibold">
        Have questions or feedback about this article? Chat with us on WhatsApp!
      </p>
      <a
        href="https://wa.me/919328151481?text=Hello%20Mahadev%20Holidays%2C%20I%20have%20a%20question%20about%20your%20blog%20post.%20Could%20you%20help%20me%20with%20more%20information%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all shadow-lg"
      >
        <MessageCircle className="w-5 h-5" />
        Chat on WhatsApp
      </a>
    </div>
  );
}

export default function BlogPostClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const post = BLOG_DATA[slug];

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-primary mb-4">Post Not Found</h1>
            <p className="text-primary/80 mb-6 font-semibold">The blog post you are looking for does not exist.</p>
            <Link href="/blog" className="px-6 py-3 bg-accent text-white font-semibold rounded-full text-sm hover:bg-accent-600 transition-all">Back to Blog</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedSlugs = RELATED_POSTS[slug] || [];
  const relatedPosts = relatedSlugs.map((s) => ALL_POSTS_MINI[s]).filter(Boolean);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Header />
      <ScrollToTop />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-gold/10 to-secondary/20" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary/75 hover:text-accent text-xs uppercase tracking-wider transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </Link>
          <nav className="flex items-center justify-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary/70">{post.title}</span>
          </nav>
          <span className="px-3 py-1 bg-gold/20 text-accent text-[10px] font-semibold uppercase tracking-wider rounded-full mb-6 inline-block">
            {post.category}
          </span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary leading-tight mb-6">
            {post.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-4 text-primary/50 text-sm">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8 lg:gap-12">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-primary/5">
                <h4 className="font-heading font-semibold text-primary text-sm mb-4">Table of Contents</h4>
                <nav className="space-y-1">
                  {post.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setActiveSection(section.id)}
                      className={`block text-xs py-1.5 transition-colors ${
                        activeSection === section.id ? "text-gold font-medium" : "text-primary/75 hover:text-primary"
                      }`}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-primary/5">
                <h4 className="font-heading font-semibold text-primary text-sm mb-4">Share This Post</h4>
                <div className="flex flex-wrap gap-2">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors" aria-label="Share on Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 hover:bg-sky-100 transition-colors" aria-label="Share on Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </a>
                  <a href={`https://api.whatsapp.com/send?text=${post.title} ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors" aria-label="Share on WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-colors" aria-label="Share on LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setLiked(!liked)} className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                  liked ? "bg-red-50 text-red-500" : "bg-primary/5 text-primary/50 hover:bg-primary/10"
                }`}>
                  <Heart className={`w-3.5 h-3.5 ${liked ? "fill-red-500 text-red-500" : ""}`} /> Like
                </button>
                <button onClick={() => setBookmarked(!bookmarked)} className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                  bookmarked ? "bg-gold/10 text-gold-dark" : "bg-primary/5 text-primary/75 hover:bg-primary/10"
                }`}>
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-gold-dark" : ""}`} /> Save
                </button>
              </div>
            </div>
          </aside>

          <article className="flex-1 max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gold/5 text-gold-dark text-[10px] font-medium rounded-full border border-gold/10">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="prose-headings:font-heading prose-headings:text-primary prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3 prose-p:text-primary/70 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-primary prose-li:text-primary/70 prose-ul:mb-6 prose-ol:mb-6 text-primary/70 leading-relaxed">
              {(() => {
                const lines = post.content.split("\n");
                const elements: React.ReactNode[] = [];
                let inList = false;
                let listItems: string[] = [];
                let listType: "ul" | "ol" = "ul";

                const flushList = () => {
                  if (listItems.length > 0) {
                    const Tag = listType;
                    elements.push(
                      <Tag key={`list-${elements.length}`} className="mb-6 space-y-2 pl-6">
                        {listItems.map((item, idx) => (
                          <li key={idx} className="text-primary/70 text-sm">{item.replace(/^[-*]\s/, "").replace(/^\d+\.\s/, "")}</li>
                        ))}
                      </Tag>
                    );
                    listItems = [];
                    inList = false;
                  }
                };

                lines.forEach((line, idx) => {
                  if (line.startsWith("## ")) {
                    flushList();
                    const title = line.replace("## ", "");
                    const sectionId = post.sections.find((s) => title.includes(s.title.replace(/^\d+\.\s/, "")) || title.toLowerCase().includes(s.title.toLowerCase()))?.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    elements.push(
                      <h2 key={idx} id={sectionId} className="text-2xl md:text-3xl font-heading font-bold text-primary mt-12 mb-4 scroll-mt-28">{title}</h2>
                    );
                  } else if (line.startsWith("**") && line.endsWith("**")) {
                    flushList();
                    elements.push(
                      <h3 key={idx} className="text-xl font-heading font-bold text-primary mt-8 mb-3">{line.replace(/\*\*/g, "")}</h3>
                    );
                  } else if (line.startsWith("- ")) {
                    if (!inList) { inList = true; listType = "ul"; }
                    listItems.push(line);
                  } else if (/^\d+\.\s/.test(line)) {
                    if (!inList) { inList = true; listType = "ol"; }
                    listItems.push(line);
                  } else if (line.trim() === "") {
                    flushList();
                  } else {
                    flushList();
                    if (!line.startsWith("**") && line.trim()) {
                      elements.push(
                        <p key={idx} className="text-primary/70 leading-relaxed mb-4 text-sm md:text-base">{line}</p>
                      );
                    }
                  }
                });
                flushList();
                return elements;
              })()}
            </div>

            <div className="mt-12 p-6 bg-cream rounded-2xl">
              <Newsletter />
            </div>

            <div className="mt-12 pt-8 border-t border-primary/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-primary font-heading font-bold text-lg shrink-0">
                  {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-heading font-semibold text-primary">{post.author}</p>
                  {post.authorBio && <p className="text-primary/75 text-xs font-semibold">{post.authorBio}</p>}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-primary/10">
              <div className="flex lg:hidden items-center gap-3 mb-6">
                <span className="text-primary/75 text-xs font-semibold">Share:</span>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors" aria-label="Share on Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 hover:bg-sky-100 transition-colors" aria-label="Share on Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href={`https://api.whatsapp.com/send?text=${post.title} ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors" aria-label="Share on WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-colors" aria-label="Share on LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-primary/10">
              <CommentSection />
            </div>
          </article>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader tag="Continue Reading" title="Related Posts" subtitle="Explore more articles you might enjoy." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={rp.coverImage} alt={rp.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-gold/10 to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-gold text-primary text-[10px] font-semibold uppercase tracking-wider rounded-full">{rp.category}</span>
                    </div>
                    <div className="p-5">
                      <p className="text-primary/65 text-xs mb-2 font-semibold">{rp.date}</p>
                      <h3 className="font-heading text-base font-bold text-primary group-hover:text-gold transition-colors line-clamp-2">{rp.title}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <Newsletter />
      </div>

      <Footer />
    </>
  );
}

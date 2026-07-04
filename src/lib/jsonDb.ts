import fs from 'fs';
import path from 'path';

// Define database file path inside the project root
const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db_local.json');

// Helper to ensure the directory exists
function ensureDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Initial default database state
const INITIAL_DB = {
  destinations: [
    { id: "1", title: "Kerala", slug: "kerala", location: "God's Own Country", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80", price: 15999, rating: 4.8, reviewCount: 1247, duration: "6D/5N", type: "Nature", category: "domestic", isAvailable: true, isFeatured: true, description: "Kerala, God's Own Country, is a tropical paradise of houseboats, tea gardens, and beaches.", longDescription: "Experience the ultimate luxury backwater cruise, stay in misty Munnar plantations, and unwind in Kovalam's beachside resorts.", inclusions: ["Houseboat Stay", "5-star Resorts", "Private Car", "Daily Breakfast"], exclusions: ["Airfare", "Personal Bills"], itinerary: [{ day: 1, title: "Kochi Arrival", description: "Receive private transport to hotel and relax.", activities: ["Hotel transfer", "Sightseeing"], meals: { breakfast: false, lunch: false, dinner: true }, accommodation: "Brunton Boatyard" }] },
    { id: "2", title: "Goa", slug: "goa", location: "Beach Paradise", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", price: 12999, rating: 4.6, reviewCount: 983, duration: "4D/3N", type: "Beach", category: "domestic", isAvailable: true, isFeatured: true, description: "Goa is India's ultimate beach destination with Portuguese heritage and lively beaches.", longDescription: "Enjoy premium beachside resorts, sunset dolphin spotting, water sports, and fine dining.", inclusions: ["Beach Villa Stay", "Water Sports Package", "Airport Transfers"], exclusions: ["Flights", "Tips"], itinerary: [] },
    { id: "3", title: "Kashmir", slug: "kashmir", location: "Paradise on Earth", image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80", price: 18999, rating: 4.9, reviewCount: 1562, duration: "7D/6N", type: "Nature", category: "domestic", isAvailable: true, isFeatured: true, description: "Kashmir is a breathtaking valley of snow mountains, Shikaras, and heritage houseboats.", longDescription: "Glide on Dal Lake, ride the Gondola in Gulmarg, and trek Pahalgam in unparalleled luxury.", inclusions: ["Heritage Houseboat", "Premium Hotels", "Shikara Ride", "All Meals"], exclusions: ["Flights", "Tips"], itinerary: [] },
    { id: "5", title: "Himachal Pradesh", slug: "himachal", location: "Mountain Retreat", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80", price: 13999, rating: 4.7, reviewCount: 876, duration: "6D/5N", type: "Adventure", category: "domestic", isAvailable: true, isFeatured: false, description: "Scenic hill stations, snow-capped peaks, and river valleys of Himachal Pradesh.", longDescription: "Experience the majestic colonial architecture of Shimla, paragliding in Solang Valley, and organic farm stays.", inclusions: ["Luxury Hotels", "Private transport", "Activities"], exclusions: ["Flights"], itinerary: [] },
    { id: "9", title: "Manali", slug: "manali", location: "Himalayan Haven", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", price: 10999, rating: 4.5, reviewCount: 721, duration: "5D/4N", type: "Adventure", category: "domestic", isAvailable: true, isFeatured: false, description: "A beautiful Himalayan town surrounded by majestic pine forests and Beas River.", longDescription: "Visit Hadimba temple, Atal Tunnel, and Sissu snow waterfalls in custom luxury transport.", inclusions: ["Premium stays", "Private transfers", "Tour Guide"], exclusions: ["Flights"], itinerary: [] },
    { id: "10", title: "North East India", slug: "north-east", location: "Seven Sisters", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80", price: 26999, rating: 4.6, reviewCount: 387, duration: "10D/9N", type: "Nature", category: "domestic", isAvailable: true, isFeatured: false, description: "Untouched beauty of India's Northeast: living root bridges, tea valleys, and falls.", longDescription: "Trek double-decker living root bridges of Meghalaya and go on Kaziranga rhino safaris.", inclusions: ["Mountain stays", "Private transport", "Rhino safari tickets"], exclusions: ["Flights"], itinerary: [] },
    { id: "12", title: "Temple Yatra", slug: "temple-yatra", location: "Sacred Pilgrimage", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", price: 9999, rating: 4.4, reviewCount: 365, duration: "5D/4N", type: "Cultural", category: "domestic", isAvailable: true, isFeatured: false, description: "Comfortable and senior-friendly spiritual journeys with pure-veg food.", longDescription: "Visit Ganga Aarti in Haridwar, Somnath sound & light show, and Dwarka temple with darshan assistance.", inclusions: ["Elderly-friendly stays", "Pure veg meals", "VIP Darshan tickets"], exclusions: ["Flights"], itinerary: [] },
    { id: "13", title: "Dubai", slug: "dubai", location: "City of Gold", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", price: 45999, rating: 4.8, reviewCount: 2134, duration: "5D/4N", type: "Luxury", category: "international", isAvailable: true, isFeatured: true, description: "Dubai offers towering skyscrapers, shopping malls, desert safaris, and premium cruises.", longDescription: "Stay at world-class luxury hotels, enjoy dinner cruises, private yacht tours, and desert safari camps.", inclusions: ["5-star Stays", "Desert Safari VIP", "Dhow Cruise", "Transfers"], exclusions: ["Flights", "Visa"], itinerary: [] },
    { id: "15", title: "Singapore", slug: "singapore", location: "Lion City", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80", price: 42999, rating: 4.7, reviewCount: 1456, duration: "5D/4N", type: "Luxury", category: "international", isAvailable: true, isFeatured: true, description: "Discover high-tech gardens, futuristic structures, luxury shopping, and Universal Studios.", longDescription: "Visit Gardens by the Bay, enjoy premium Marina Bay Sands viewing, and take custom city tours.", inclusions: ["Boutique Hotels", "Universal tickets", "Private tours"], exclusions: ["Flights", "Visa"], itinerary: [] },
    { id: "18", title: "Europe", slug: "europe", location: "The Grand Tour", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80", price: 189999, rating: 4.9, reviewCount: 3456, duration: "12D/11N", type: "Luxury", category: "international", isAvailable: true, isFeatured: true, description: "Bespoke tour covering Paris, Switzerland, Venice, and Rome in luxury comfort.", longDescription: "Stay at boutique premium hotels, enjoy private tours, first-class Swiss train tickets, and gondola rides.", inclusions: ["Premium stays", "First-class Swiss pass", "Private guides", "VIP entries"], exclusions: ["Flights", "Visa"], itinerary: [] },
    { id: "20", title: "Sri Lanka", slug: "sri-lanka", location: "Pearl of Indian Ocean", image: "https://images.unsplash.com/photo-1588598130619-469a584ef057?w=800&q=80", price: 29999, rating: 4.5, reviewCount: 654, duration: "7D/6N", type: "Nature", category: "international", isAvailable: true, isFeatured: false, description: "Lush tea gardens, ancient Sigiriya rock, beaches, and safaris in teardrop island.", longDescription: "Take the world's most scenic Kandy train ride, climb Sigiriya rock, and spot leopards in Yala.", inclusions: ["4-star stays", "Scenic train ticket", "Private transport", "All park entry"], exclusions: ["Flights", "Visa"], itinerary: [] }
  ],
  bookings: [
    { id: "bk-1", destinationId: "3", customerName: "Rahul Patel", customerEmail: "rahul@gmail.com", customerPhone: "+91 9876543210", travelDate: "2026-10-15", status: "confirmed", guests: 3, totalPrice: 56997, createdAt: new Date().toISOString() },
    { id: "bk-2", destinationId: "1", customerName: "Anjali Shah", customerEmail: "anjali@yahoo.com", customerPhone: "+91 9328151481", travelDate: "2026-11-20", status: "pending", guests: 2, totalPrice: 31998, createdAt: new Date().toISOString() }
  ],
  contacts: [
    { id: "c-1", name: "Dinesh Kumar", email: "dinesh@gmail.com", phone: "9876543210", subject: "Kashmir package inquiry", message: "Need customized quote for family of 6.", status: "unread", createdAt: new Date().toISOString() }
  ],
  newsletter: [
    { email: "newsletter@zorvent.com", createdAt: new Date().toISOString() }
  ],
  testimonials: [
    { id: "t-1", quote: "Our vacation was absolutely fantastic! The attention to detail and personalized service made all the difference.", author: "Harish Patel", location: "Gujarat", rating: 5, createdAt: new Date().toISOString() }
  ]
};

// Read database from file
export function readDb() {
  ensureDir();
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
    return INITIAL_DB;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading JSON DB, resetting to defaults:', e);
    return INITIAL_DB;
  }
}

// Write database to file
export function writeDb(data: any) {
  ensureDir();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Helper query operations
export function getDestinations() {
  const db = readDb();
  return db.destinations || [];
}

export function saveDestination(dest: any) {
  const db = readDb();
  if (!db.destinations) db.destinations = [];
  
  if (dest.id) {
    db.destinations = db.destinations.map((d: any) => d.id === String(dest.id) ? { ...d, ...dest, updatedAt: new Date().toISOString() } : d);
  } else {
    const newDest = {
      ...dest,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.destinations.unshift(newDest);
  }
  writeDb(db);
}

export function deleteDestination(id: string) {
  const db = readDb();
  if (db.destinations) {
    db.destinations = db.destinations.filter((d: any) => d.id !== String(id));
    writeDb(db);
  }
}

# Mahadev Holidays — Database Schema Documentation

## Entity Relationship Diagram

```
┌──────────────┐     ┌──────────────┐
│    users     │     │ destinations │
├──────────────┤     ├──────────────┤
│ PK _id       │     │ PK _id       │
│   name       │     │   title      │
│   email (U)  │     │   slug (U)   │
│   username(U)│     │   location   │
│   password   │     │   price      │
│   role       │     │   category   │
│   avatar     │     │   isFeatured │
│   createdAt  │     │   itinerary[]│◄────── embedded
│   updatedAt  │     │   seoMetadata│◄────── embedded
└──────────────┘     └──────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
       ┌──────▼──────┐ ┌───▼──────┐ ┌────▼──────┐
       │  bookings   │ │contacts  │ │testimonials│
       ├─────────────┤ ├──────────┤ ├───────────┤
       │ PK _id      │ │ PK _id   │ │ PK _id    │
       │   name      │ │  name    │ │  name     │
       │   email     │ │  email   │ │  rating   │
       │   phone     │ │  subject │ │  isApproved│
       │ destTitle   │ │  isRead  │ │  isFeatured│
       │   status    │ │  createdAt│ │  createdAt │
       │   createdAt │ └──────────┘ └───────────┘
       └─────────────┘
              │
       ┌──────▼──────┐     ┌──────────────┐
       │ newsletters │     │  blogposts   │
       ├─────────────┤     ├──────────────┤
       │ PK _id      │     │ PK _id       │
       │ email (U)   │     │   slug (U)   │
       │ isActive    │     │   title      │
       │ createdAt   │     │   content    │
       └─────────────┘     │   isPublished│
                           │   seoMetadata│◄── embedded
                           │   createdAt  │
                           └──────────────┘

       ┌──────────────┐
       │    media     │
       ├──────────────┤
       │ PK _id       │
       │   url        │
       │   type       │
       │   dimensions?│
       │   createdAt  │
       └──────────────┘
```

---

## Collection Descriptions

| Collection | Document | Description | Public Write? | Public Read? |
|---|---|---|---|---|
| `destinations` | Destination | Travel packages and tour offerings | No | Yes |
| `bookings` | Booking | Customer booking requests | Yes (create only) | No |
| `testimonials` | Testimonial | Customer reviews and ratings | Yes (create only) | Yes (approved only) |
| `blogposts` | BlogPost | Travel articles and guides | No | Yes |
| `users` | User | Admin panel user accounts | No | No |
| `contacts` | ContactMessage | Contact form submissions | Yes (create only) | No |
| `media` | MediaItem | Image and video references | No | Yes |
| `newsletters` | Newsletter | Newsletter subscribers | Yes (create only) | No |

---

## Destinations (`destinations`)

```typescript
interface Destination {
  _id: ObjectId;
  title: string;                        // Required — Display name
  slug: string;                         // Required, Unique — URL path (e.g. "kerala-backwaters")
  location: string;                     // Required — Geographic location string
  description: string;                  // Required — Short summary (~200 chars)
  longDescription: string;              // Required — Full description (HTML or Markdown)
  images: string[];                     // Array of image URLs
  price: number;                        // Required — Current price in INR
  originalPrice?: number;               // Optional — Strikethrough original price
  duration: string;                     // Required — e.g. "5 Nights / 6 Days"
  itinerary: ItineraryDay[];            // Array of day-by-day itinerary
  inclusions: string[];                 // What's included (list)
  exclusions: string[];                 // What's not included (list)
  category: 'domestic' | 'international' | 'weekend';  // Required
  tags: string[];                       // Search keywords
  rating: number;                       // Default 0 (0.0–5.0)
  reviewCount: number;                  // Default 0
  isAvailable: boolean;                 // Default true — Controls visibility
  isFeatured: boolean;                  // Default false — Homepage featured
  isPopular: boolean;                   // Default false — Popular section
  seoMetadata: SEO;                     // SEO configuration (embedded)
  createdAt: Date;                      // Auto-managed
  updatedAt: Date;                      // Auto-managed
}
```

### Embedded: ItineraryDay

```typescript
interface ItineraryDay {
  day: number;                          // Day number (1, 2, 3...)
  title: string;                        // Day title (e.g. "Arrival in Kochi")
  description: string;                  // Day description
  activities: string[];                 // List of activities
  meals: {
    breakfast: boolean;                 // Default false
    lunch: boolean;                     // Default false
    dinner: boolean;                    // Default false
  };
  accommodation: string;                // Hotel/resort name
}
```

### Embedded: SEO

```typescript
interface SEO {
  title: string;                        // Meta title (<title> tag)
  description: string;                  // Meta description
  keywords: string;                     // Meta keywords (comma-separated)
  ogImage?: string;                     // Open Graph image URL
  ogTitle?: string;                     // OG title override
  ogDescription?: string;               // OG description override
}
```

### Indexes

```js
db.destinations.createIndex({ slug: 1 }, { unique: true });
db.destinations.createIndex({ category: 1 });
db.destinations.createIndex({ isFeatured: 1 });
db.destinations.createIndex({ isPopular: 1 });
```

### Sample Document

```json
{
  "_id": ObjectId("663f1a2b3c4d5e6f7a8b9c0d"),
  "title": "Kerala Backwaters",
  "slug": "kerala-backwaters",
  "location": "Kerala, India",
  "description": "Explore the serene backwaters of Kerala on a luxurious houseboat.",
  "longDescription": "<h2>Overview</h2><p>Kerala's backwaters are a network of...",
  "images": [
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc3"
  ],
  "price": 25000,
  "originalPrice": 30000,
  "duration": "5 Nights / 6 Days",
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Kochi",
      "description": "Arrive at Kochi airport. Transfer to hotel.",
      "activities": ["Evening harbor cruise", "Welcome dinner"],
      "meals": { "breakfast": false, "lunch": false, "dinner": true },
      "accommodation": "Brunton Boatyard"
    }
  ],
  "inclusions": ["Accommodation", "All meals", "Houseboat stay", "Transfers"],
  "exclusions": ["Airfare", "Personal expenses", "Tips"],
  "category": "domestic",
  "tags": ["backwaters", "houseboat", "kerala"],
  "rating": 4.5,
  "reviewCount": 128,
  "isAvailable": true,
  "isFeatured": true,
  "isPopular": true,
  "seoMetadata": {
    "title": "Kerala Backwaters Tour | Mahadev Holidays",
    "description": "Book the best Kerala backwaters tour package with luxury houseboat stay.",
    "keywords": "kerala backwaters, houseboat, kerala tour",
    "ogImage": "https://images.unsplash.com/photo-1593693397690-362cb9666fc3",
    "ogTitle": "Kerala Backwaters - Mahadev Holidays",
    "ogDescription": "Experience the serene backwaters of Kerala"
  },
  "createdAt": ISODate("2026-01-15T10:00:00Z"),
  "updatedAt": ISODate("2026-03-20T14:30:00Z")
}
```

---

## Bookings (`bookings`)

```typescript
interface Booking {
  _id: ObjectId;
  name: string;                         // Required — Customer full name
  email: string;                        // Required — Customer email
  phone: string;                        // Required — Customer phone number
  destinationId: string;                // Required — Reference to destination _id
  destinationTitle: string;             // Required — Denormalized destination name
  packageType: string;                  // Required — e.g. "Standard", "Premium", "Luxury"
  travelDate: Date;                     // Required — Planned travel start date
  travelers: number;                    // Required — Number of travelers (min 1)
  specialRequests?: string;             // Optional — Customer notes
  status: 'new' | 'in-progress' | 'confirmed' | 'completed' | 'cancelled';
                                        // Default 'new'
  totalPrice: number;                   // Required — Total booking cost in INR
  createdAt: Date;                      // Auto-managed
  updatedAt: Date;                      // Auto-managed
}
```

### Indexes

```js
db.bookings.createIndex({ email: 1 });
db.bookings.createIndex({ status: 1 });
db.bookings.createIndex({ createdAt: -1 });
```

### Sample Document

```json
{
  "_id": ObjectId("664a1b2c3d4e5f6a7b8c9d0e"),
  "name": "Rahul Sharma",
  "email": "rahul.sharma@email.com",
  "phone": "+91-9876543210",
  "destinationId": "663f1a2b3c4d5e6f7a8b9c0d",
  "destinationTitle": "Kerala Backwaters",
  "packageType": "Premium",
  "travelDate": ISODate("2026-05-15T00:00:00Z"),
  "travelers": 2,
  "specialRequests": "Vegan meal preferences for both travelers",
  "status": "confirmed",
  "totalPrice": 50000,
  "createdAt": ISODate("2026-04-01T10:00:00Z"),
  "updatedAt": ISODate("2026-04-02T14:00:00Z")
}
```

---

## Testimonials (`testimonials`)

```typescript
interface Testimonial {
  _id: ObjectId;
  name: string;                         // Required — Reviewer name
  location: string;                     // Required — Customer location
  avatar?: string;                      // Optional — Profile image URL
  rating: number;                       // Required — 1–5 rating
  content: string;                      // Required — Review text
  destinationName: string;              // Required — Denormalized destination name
  isApproved: boolean;                  // Default false — Admin moderation
  isFeatured: boolean;                  // Default false — Homepage highlight
  createdAt: Date;                      // Auto-managed
  updatedAt: Date;                      // Auto-managed
}
```

### Indexes

```js
db.testimonials.createIndex({ isApproved: 1 });
db.testimonials.createIndex({ isFeatured: 1 });
```

### Sample Document

```json
{
  "_id": ObjectId("665b2c3d4e5f6a7b8c9d0e1f"),
  "name": "Priya Patel",
  "location": "Mumbai, India",
  "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "rating": 5,
  "content": "Absolutely magical experience! The houseboat stay was the highlight of our trip. Every detail was perfectly arranged by the Mahadev Holidays team.",
  "destinationName": "Kerala Backwaters",
  "isApproved": true,
  "isFeatured": true,
  "createdAt": ISODate("2026-03-10T08:00:00Z"),
  "updatedAt": ISODate("2026-03-11T12:00:00Z")
}
```

---

## Blog Posts (`blogposts`)

```typescript
interface BlogPost {
  _id: ObjectId;
  title: string;                        // Required — Post headline
  slug: string;                         // Required, Unique — URL path
  excerpt: string;                      // Required — Short summary (meta description)
  content: string;                      // Required — Full article (HTML)
  coverImage: string;                   // Required — Hero image URL
  author: string;                       // Required — Author display name
  category: string;                     // Required — e.g. "Destinations", "Travel Tips"
  tags: string[];                       // SEO keywords
  publishedAt?: Date;                   // Date when published (for scheduling)
  isPublished: boolean;                 // Default false — Visibility toggle
  seoMetadata: SEO;                     // SEO configuration (embedded)
  createdAt: Date;                      // Auto-managed
  updatedAt: Date;                      // Auto-managed
}
```

### Indexes

```js
db.blogposts.createIndex({ slug: 1 }, { unique: true });
db.blogposts.createIndex({ isPublished: 1, publishedAt: -1 });
db.blogposts.createIndex({ category: 1 });
```

### Sample Document

```json
{
  "_id": ObjectId("666c3d4e5f6a7b8c9d0e1f2a"),
  "title": "Top 10 Places to Visit in Kerala",
  "slug": "top-10-places-kerala",
  "excerpt": "Discover the best destinations in God's Own Country, from the serene backwaters to the lush hill stations of Munnar.",
  "content": "<h2>Introduction</h2><p>Kerala, often called 'God's Own Country'...</p><h2>1. Alleppey</h2><p>Known as the Venice of the East...</p>",
  "coverImage": "https://images.unsplash.com/photo-1602216054348-7d07a1f1e8b0",
  "author": "Vishal Chouhan",
  "category": "Destinations",
  "tags": ["kerala", "travel tips", "top 10"],
  "publishedAt": ISODate("2026-02-01T10:00:00Z"),
  "isPublished": true,
  "seoMetadata": {
    "title": "Top 10 Kerala Destinations | Mahadev Holidays Blog",
    "description": "Explore the 10 best places to visit in Kerala, from backwaters to hill stations.",
    "keywords": "kerala, top 10, destinations, travel"
  },
  "createdAt": ISODate("2026-01-28T14:00:00Z"),
  "updatedAt": ISODate("2026-02-01T10:00:00Z")
}
```

---

## Users (`users`)

```typescript
interface User {
  _id: ObjectId;
  name: string;                         // Required — Full name
  email: string;                        // Required, Unique, Lowercased — Login identifier
  username: string;                     // Required, Unique — Login identifier
  password: string;                     // Required — bcrypt-hashed (12 rounds)
  role: 'super-admin' | 'editor' | 'manager';
                                        // Default 'editor'
  avatar?: string;                      // Optional — Profile image URL
  createdAt: Date;                      // Auto-managed
  updatedAt: Date;                      // Auto-managed
}
```

### Indexes

```js
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });
```

### Sample Document

```json
{
  "_id": ObjectId("667d4e5f6a7b8c9d0e1f2a3b"),
  "name": "Vishal Chouhan",
  "email": "vishal@mahadevholidays.com",
  "username": "@vishalchouhan",
  "password": "$2a$12$LJ3m6ys2L9x7y8z0A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U",
  "role": "super-admin",
  "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  "createdAt": ISODate("2026-01-01T00:00:00Z"),
  "updatedAt": ISODate("2026-06-01T12:00:00Z")
}
```

---

## Contacts (`contacts`)

```typescript
interface ContactMessage {
  _id: ObjectId;
  name: string;                         // Required — Sender name
  email: string;                        // Required — Sender email
  phone?: string;                       // Optional — Contact phone number
  subject: string;                      // Required — Message subject
  message: string;                      // Required — Message body
  isRead: boolean;                      // Default false — Admin read status
  createdAt: Date;                      // Auto-managed
  updatedAt: Date;                      // Auto-managed
}
```

### Indexes

```js
db.contacts.createIndex({ isRead: 1 });
db.contacts.createIndex({ createdAt: -1 });
```

### Sample Document

```json
{
  "_id": ObjectId("667d4e5f6a7b8c9d0e1f2a3b"),
  "name": "Amit Singh",
  "email": "amit.singh@email.com",
  "phone": "+91-9988776655",
  "subject": "Custom Tour Package Inquiry",
  "message": "Hello, I'm looking for a custom 7-day tour package covering Kerala and Goa for a family of 4. Could you please share a quote?",
  "isRead": false,
  "createdAt": ISODate("2026-06-20T15:30:00Z"),
  "updatedAt": ISODate("2026-06-20T15:30:00Z")
}
```

---

## Media (`media`)

```typescript
interface MediaItem {
  _id: ObjectId;
  url: string;                          // Required — Media URL (external hosting)
  alt: string;                          // Required — Alt text for accessibility/SEO
  type: 'image' | 'video';             // Required — Media type
  size?: number;                        // Optional — File size in bytes
  dimensions?: {                        // Optional — Image/video dimensions
    width: number;                      // Pixels
    height: number;                     // Pixels
  };
  createdAt: Date;                      // Auto-managed
  updatedAt: Date;                      // Auto-managed
}
```

### Sample Document

```json
{
  "_id": ObjectId("668e5f6a7b8c9d0e1f2a3b4c"),
  "url": "https://images.unsplash.com/photo-1593693397690-362cb9666fc3",
  "alt": "Kerala houseboat at sunset on the backwaters",
  "type": "image",
  "size": 245000,
  "dimensions": {
    "width": 1920,
    "height": 1080
  },
  "createdAt": ISODate("2026-06-01T10:00:00Z"),
  "updatedAt": ISODate("2026-06-01T10:00:00Z")
}
```

---

## Newsletters (`newsletters`)

```typescript
interface Newsletter {
  _id: ObjectId;
  email: string;                        // Required, Unique, Lowercased — Subscriber email
  isActive: boolean;                    // Default true — Active subscription status
  createdAt: Date;                      // Auto-managed
  updatedAt: Date;                      // Auto-managed
}
```

### Indexes

```js
db.newsletters.createIndex({ email: 1 }, { unique: true });
db.newsletters.createIndex({ isActive: 1 });
```

### Sample Document

```json
{
  "_id": ObjectId("669f6a7b8c9d0e1f2a3b4c5d"),
  "email": "traveler@example.com",
  "isActive": true,
  "createdAt": ISODate("2026-05-01T12:00:00Z"),
  "updatedAt": ISODate("2026-05-01T12:00:00Z")
}
```

---

## Relationships Summary

| Relationship | Type | Field | References |
|---|---|---|---|
| Booking → Destination | Loose reference | `destinationId` | `destinations._id` (string, not ObjectId — no FK constraint) |
| Testimonial → Destination | Denormalized name | `destinationName` | `destinations.title` (no FK constraint) |
| Customer ← Booking | Email-based merge | `email` | Merged in application layer |
| Customer ← Contact | Email-based merge | `email` | Merged in application layer |
| Itinerary → Destination | Embedded array | `itinerary` | Inside `destinations` document |
| SEO metadata → Destination/Blog | Embedded document | `seoMetadata` | Inside parent document |

> **Note on data integrity**: Booking–Destination and Testimonial–Destination relationships are **loose references** (string-based). Deleting a destination does not cascade to bookings or testimonials. The application handles orphaned references gracefully.

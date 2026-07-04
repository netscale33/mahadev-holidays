# Mahadev Holidays — API Documentation

## Base URL

| Environment | URL |
|---|---|
| Development | `http://localhost:3000` |
| Production | `https://<your-domain>` |

## Authentication

Most admin endpoints require a JWT Bearer token.

**Obtain a token:**

```
POST /api/auth/login
Content-Type: application/json

{
  "username": "@vishalchouhan",
  "password": "@vishalchouhantravel77"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "username": "@vishalchouhan",
    "role": "super-admin"
  }
}
```

**Use the token:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Token expiry:** 7 days from issuance.

---

## Status Codes

| Code | Meaning |
|---|---|
| `200` | OK — Successful GET/PUT |
| `201` | Created — Successful POST |
| `400` | Bad Request — Missing or invalid fields |
| `401` | Unauthorized — No token or invalid token |
| `404` | Not Found — Resource does not exist |
| `409` | Conflict — Duplicate slug/email |
| `500` | Internal Server Error |

## Error Response Format

All error responses follow this shape:

```json
{
  "error": "Human-readable error message"
}
```

---

## Endpoints

### Auth

#### `POST /api/auth/login`

Authenticate and receive a JWT token.

**Auth required:** No

**Request body:**

```typescript
interface LoginRequest {
  username: string;   // Username or email
  password: string;
}
```

**Response `200`:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "663f...",
    "name": "Vishal Chouhan",
    "email": "vishal@example.com",
    "username": "@vishalchouhan",
    "role": "super-admin",
    "avatar": "https://..."
  }
}
```

**Response `401`:**

```json
{ "error": "Invalid credentials" }
```

---

#### `GET /api/auth/verify`

Verify the current JWT token and return the user object.

**Auth required:** Yes

**Response `200`:**

```json
{
  "user": {
    "id": "663f...",
    "name": "Vishal Chouhan",
    "email": "vishal@example.com",
    "username": "@vishalchouhan",
    "role": "super-admin",
    "avatar": "https://..."
  }
}
```

**Response `401`:**

```json
{ "error": "No token provided" }
```

---

### Destinations

#### `GET /api/destinations`

List destinations with optional filters and pagination.

**Auth required:** No

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `category` | string | Filter by `domestic`, `international`, or `weekend` |
| `search` | string | Search in title, location, description |
| `featured` | boolean | Filter featured destinations (`true`) |
| `page` | number | Page number (default `1`) |
| `limit` | number | Items per page (default `10`) |

**Response `200`:**

```json
{
  "destinations": [
    {
      "_id": "663f...",
      "title": "Kerala Backwaters",
      "slug": "kerala-backwaters",
      "location": "Kerala, India",
      "description": "Explore the serene backwaters...",
      "longDescription": "A detailed description...",
      "images": ["https://images.unsplash.com/..."],
      "price": 25000,
      "originalPrice": 30000,
      "duration": "5 Nights / 6 Days",
      "itinerary": [
        {
          "day": 1,
          "title": "Arrival in Kochi",
          "description": "Arrive and check in...",
          "activities": ["City tour", "Sunset cruise"],
          "meals": { "breakfast": false, "lunch": true, "dinner": true },
          "accommodation": "Lake Resort"
        }
      ],
      "inclusions": ["Hotel", "Meals", "Transport"],
      "exclusions": ["Flights", "Personal expenses"],
      "category": "domestic",
      "tags": ["backwaters", "houseboat"],
      "rating": 4.5,
      "reviewCount": 128,
      "isAvailable": true,
      "isFeatured": true,
      "isPopular": true,
      "seoMetadata": {
        "title": "Kerala Backwaters Tour | Mahadev Holidays",
        "description": "Explore Kerala backwaters...",
        "keywords": "kerala, backwaters, houseboat",
        "ogImage": "https://...",
        "ogTitle": "Kerala Backwaters",
        "ogDescription": "Serene backwaters await..."
      },
      "createdAt": "2026-01-15T10:00:00.000Z",
      "updatedAt": "2026-03-20T14:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

---

#### `POST /api/destinations`

Create a new destination.

**Auth required:** Yes

**Request body:**

```typescript
interface CreateDestinationRequest {
  title: string;                    // Required
  slug: string;                     // Required, unique
  location: string;                 // Required
  description: string;              // Required
  longDescription: string;          // Required
  images: string[];                 // Optional
  price: number;                    // Required
  originalPrice?: number;           // Optional
  duration: string;                 // Required
  itinerary: ItineraryDay[];        // Optional
  inclusions: string[];             // Optional
  exclusions: string[];             // Optional
  category: 'domestic' | 'international' | 'weekend';  // Required
  tags: string[];                   // Optional
  rating?: number;                  // Default 0
  reviewCount?: number;             // Default 0
  isAvailable?: boolean;            // Default true
  isFeatured?: boolean;             // Default false
  isPopular?: boolean;              // Default false
  seoMetadata?: SEO;                // Optional
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: { breakfast: boolean; lunch: boolean; dinner: boolean };
  accommodation: string;
}
```

**Response `201`:**

```json
{ "destination": { /* full destination object */ } }
```

**Response `409`:**

```json
{ "error": "A destination with this slug already exists" }
```

---

#### `GET /api/destinations/[id]`

Get a single destination by ID or slug.

**Auth required:** No

**Path parameters:**

| Param | Description |
|---|---|
| `id` | MongoDB `_id` or `slug` string |

**Response `200`:**

```json
{ "destination": { /* full destination object */ } }
```

---

#### `PUT /api/destinations/[id]`

Update a destination by ID.

**Auth required:** Yes

**Request body:** Partial destination fields (same shape as POST).

**Response `200`:**

```json
{ "destination": { /* updated destination object */ } }
```

---

#### `DELETE /api/destinations/[id]`

Delete a destination by ID.

**Auth required:** Yes

**Response `200`:**

```json
{ "message": "Destination deleted successfully" }
```

---

### Bookings

#### `GET /api/bookings`

List bookings with optional filtering and pagination.

**Auth required:** Yes

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `status` | string | Filter by `new`, `in-progress`, `confirmed`, `completed`, `cancelled` |
| `search` | string | Search in name, email, phone, destination title |
| `page` | number | Page number (default `1`) |
| `limit` | number | Items per page (default `10`) |

**Response `200`:**

```json
{
  "bookings": [
    {
      "_id": "664a...",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "phone": "+91-9876543210",
      "destinationId": "663f...",
      "destinationTitle": "Kerala Backwaters",
      "packageType": "Premium",
      "travelDate": "2026-05-15T00:00:00.000Z",
      "travelers": 2,
      "specialRequests": "Vegan meals",
      "status": "confirmed",
      "totalPrice": 50000,
      "createdAt": "2026-04-01T10:00:00.000Z",
      "updatedAt": "2026-04-02T14:00:00.000Z"
    }
  ],
  "pagination": { "total": 50, "page": 1, "limit": 10, "totalPages": 5 }
}
```

---

#### `POST /api/bookings`

Create a new booking (public endpoint).

**Auth required:** No

**Request body:**

```typescript
interface CreateBookingRequest {
  name: string;                 // Required
  email: string;                // Required
  phone: string;                // Required
  destinationId: string;        // Required
  destinationTitle: string;     // Required
  packageType: string;          // Required
  travelDate: string;           // Required (ISO date)
  travelers: number;            // Required, min 1
  specialRequests?: string;     // Optional
  totalPrice: number;           // Required
}
```

**Response `201`:**

```json
{ "booking": { /* full booking object */ } }
```

---

#### `GET /api/bookings/[id]`

Get a single booking by ID.

**Auth required:** Yes

**Response `200`:**

```json
{ "booking": { /* full booking object */ } }
```

---

#### `PUT /api/bookings/[id]`

Update a booking (e.g. change status).

**Auth required:** Yes

**Request body:** Partial booking fields.

**Valid status values:** `new`, `in-progress`, `confirmed`, `completed`, `cancelled`

**Response `200`:**

```json
{ "booking": { /* updated booking object */ } }
```

---

#### `DELETE /api/bookings/[id]`

Delete a booking (admin only).

**Auth required:** Yes

**Response `200`:**

```json
{ "message": "Booking deleted successfully" }
```

---

### Testimonials

#### `GET /api/testimonials`

List testimonials with optional approval filter.

**Auth required:** No

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `approved` | boolean | `true` (approved only), `false` (unapproved only), omit (all) |

**Response `200`:**

```json
{
  "testimonials": [
    {
      "_id": "665b...",
      "name": "Priya Patel",
      "location": "Mumbai, India",
      "avatar": "https://...",
      "rating": 5,
      "content": "Amazing experience! The houseboat stay was unforgettable.",
      "destinationName": "Kerala Backwaters",
      "isApproved": true,
      "isFeatured": true,
      "createdAt": "2026-03-10T08:00:00.000Z",
      "updatedAt": "2026-03-11T12:00:00.000Z"
    }
  ]
}
```

---

#### `POST /api/testimonials`

Submit a new testimonial (public endpoint).

**Auth required:** No

**Request body:**

```typescript
interface CreateTestimonialRequest {
  name: string;              // Required
  location: string;          // Required
  avatar?: string;           // Optional
  rating: number;            // Required, 1–5
  content: string;           // Required
  destinationName: string;   // Required
}
```

**Response `201`:**

```json
{ "testimonial": { /* full testimonial object (isApproved defaults to false) */ } }
```

---

#### `PUT /api/testimonials/[id]`

Update a testimonial (approve, feature, edit).

**Auth required:** Yes

**Request body:** Partial testimonial fields.

**Response `200`:**

```json
{ "testimonial": { /* updated testimonial object */ } }
```

---

#### `DELETE /api/testimonials/[id]`

Delete a testimonial.

**Auth required:** Yes

**Response `200`:**

```json
{ "message": "Testimonial deleted successfully" }
```

---

### Blog

#### `GET /api/blog`

List blog posts with optional filters and pagination.

**Auth required:** No

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `category` | string | Filter by category |
| `search` | string | Search in title, excerpt, content |
| `page` | number | Page number (default `1`) |
| `limit` | number | Items per page (default `10`) |

**Response `200`:**

```json
{
  "posts": [
    {
      "_id": "666c...",
      "title": "Top 10 Places to Visit in Kerala",
      "slug": "top-10-places-kerala",
      "excerpt": "Discover the best destinations in God's Own Country...",
      "content": "<h2>Introduction</h2><p>Kerala, often called...</p>",
      "coverImage": "https://images.unsplash.com/...",
      "author": "Vishal Chouhan",
      "category": "Destinations",
      "tags": ["kerala", "travel tips"],
      "publishedAt": "2026-02-01T10:00:00.000Z",
      "isPublished": true,
      "seoMetadata": {
        "title": "Top 10 Kerala Destinations | Mahadev Holidays Blog",
        "description": "Explore the best places in Kerala...",
        "keywords": "kerala, top 10, destinations"
      },
      "createdAt": "2026-01-28T14:00:00.000Z",
      "updatedAt": "2026-02-01T10:00:00.000Z"
    }
  ],
  "pagination": { "total": 12, "page": 1, "limit": 10, "totalPages": 2 }
}
```

---

#### `POST /api/blog`

Create a new blog post.

**Auth required:** Yes

**Request body:**

```typescript
interface CreateBlogPostRequest {
  title: string;                // Required
  slug: string;                 // Required, unique
  excerpt: string;              // Required
  content: string;              // Required (HTML or Markdown)
  coverImage: string;           // Required (URL)
  author: string;               // Required
  category: string;             // Required
  tags?: string[];              // Optional
  publishedAt?: string;         // Optional (ISO date, sets isPublished)
  isPublished?: boolean;        // Default false
  seoMetadata?: SEO;            // Optional
}
```

**Response `201`:**

```json
{ "post": { /* full blog post object */ } }
```

---

#### `GET /api/blog/[id]`

Get a single blog post by ID or slug.

**Auth required:** No

**Response `200`:**

```json
{ "post": { /* full blog post object */ } }
```

---

#### `PUT /api/blog/[id]`

Update a blog post.

**Auth required:** Yes

**Response `200`:**

```json
{ "post": { /* updated blog post object */ } }
```

---

#### `DELETE /api/blog/[id]`

Delete a blog post.

**Auth required:** Yes

**Response `200`:**

```json
{ "message": "Blog post deleted successfully" }
```

---

### Contact

#### `GET /api/contact`

List contact messages.

**Auth required:** Yes

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default `1`) |
| `limit` | number | Items per page (default `20`) |

**Response `200`:**

```json
{
  "messages": [
    {
      "_id": "667d...",
      "name": "Amit Singh",
      "email": "amit@example.com",
      "phone": "+91-9988776655",
      "subject": "Custom Tour Inquiry",
      "message": "I'd like a customized tour package for my family...",
      "isRead": false,
      "createdAt": "2026-06-20T15:30:00.000Z",
      "updatedAt": "2026-06-20T15:30:00.000Z"
    }
  ],
  "pagination": { "total": 8, "page": 1, "limit": 20, "totalPages": 1 }
}
```

---

#### `POST /api/contact`

Submit a contact message (public endpoint).

**Auth required:** No

**Request body:**

```typescript
interface CreateContactRequest {
  name: string;          // Required
  email: string;         // Required
  phone?: string;        // Optional
  subject: string;       // Required
  message: string;       // Required
}
```

**Response `201`:**

```json
{ "message": { /* full message object */ } }
```

---

#### `GET /api/contact/[id]`

Get a single contact message.

**Auth required:** Yes

**Response `200`:**

```json
{ "message": { /* full message object */ } }
```

---

#### `PUT /api/contact/[id]`

Update a contact message (e.g. mark as read).

**Auth required:** Yes

**Response `200`:**

```json
{ "message": { /* updated message object */ } }
```

---

#### `DELETE /api/contact/[id]`

Delete a contact message.

**Auth required:** Yes

**Response `200`:**

```json
{ "message": "Message deleted successfully" }
```

---

### Newsletter

#### `GET /api/newsletter`

List active subscribers.

**Auth required:** Yes

**Response `200`:**

```json
{
  "subscribers": [
    {
      "_id": "668e...",
      "email": "user@example.com",
      "isActive": true,
      "createdAt": "2026-05-01T12:00:00.000Z",
      "updatedAt": "2026-05-01T12:00:00.000Z"
    }
  ]
}
```

---

#### `POST /api/newsletter`

Subscribe a new email (public endpoint).

**Auth required:** No

**Request body:**

```typescript
interface SubscribeRequest {
  email: string;    // Required, valid email format
}
```

**Response `201`:**

```json
{ "subscriber": { /* full subscriber object */ } }
```

**Response `409`:**

```json
{ "error": "Email already subscribed" }
```

---

### Media

#### `GET /api/media`

List media items with optional filtering.

**Auth required:** No

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `type` | string | Filter by `image` or `video` |
| `page` | number | Page number (default `1`) |
| `limit` | number | Items per page (default `20`) |

**Response `200`:**

```json
{
  "media": [
    {
      "_id": "669f...",
      "url": "https://images.unsplash.com/...",
      "alt": "Kerala houseboat at sunset",
      "type": "image",
      "size": 245000,
      "dimensions": { "width": 1920, "height": 1080 },
      "createdAt": "2026-06-01T10:00:00.000Z",
      "updatedAt": "2026-06-01T10:00:00.000Z"
    }
  ],
  "pagination": { "total": 40, "page": 1, "limit": 20, "totalPages": 2 }
}
```

---

#### `POST /api/media`

Add a media record (image or video URL).

**Auth required:** Yes

**Request body:**

```typescript
interface CreateMediaRequest {
  url: string;                    // Required
  alt: string;                    // Required
  type: 'image' | 'video';       // Required
  size?: number;                  // Optional (bytes)
  dimensions?: {                  // Optional
    width: number;
    height: number;
  };
}
```

**Response `201`:**

```json
{ "media": { /* full media object */ } }
```

---

#### `DELETE /api/media/[id]`

Delete a media record.

**Auth required:** Yes

**Response `200`:**

```json
{ "message": "Media deleted successfully" }
```

---

### Customers

#### `GET /api/customers`

List all customers (aggregated from bookings and contacts). Supports CSV export.

**Auth required:** Yes

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `search` | string | Search by name, email, or phone |
| `export` | string | Set to `csv` to download as CSV file |

**Response `200` (JSON):**

```json
{
  "customers": [
    {
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "phone": "+91-9876543210",
      "firstContact": "2026-01-15T10:00:00.000Z",
      "bookingCount": 2,
      "messageCount": 1
    }
  ],
  "total": 1
}
```

**Response `200` (CSV — with `?export=csv`):**

```
Name,Email,Phone,First Contact,Bookings,Messages
"Rahul Sharma","rahul@example.com","+91-9876543210",2026-01-15,2,1
```

Content-Type: `text/csv`  
Content-Disposition: `attachment; filename="customers.csv"`

---

### Stats

#### `GET /api/stats`

Get dashboard statistics and aggregated data.

**Auth required:** Yes

**Response `200`:**

```json
{
  "stats": {
    "totalBookings": 150,
    "totalDestinations": 25,
    "totalTestimonials": 48,
    "totalBlogPosts": 12,
    "totalMessages": 80,
    "newBookingsThisYear": 45
  },
  "recentBookings": [
    {
      "_id": "664a...",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "destinationTitle": "Kerala Backwaters",
      "status": "confirmed",
      "totalPrice": 50000,
      "createdAt": "2026-06-20T10:00:00.000Z"
    }
  ],
  "popularDestinations": [
    { "_id": "Kerala Backwaters", "count": 35 },
    { "_id": "Goa Beaches", "count": 28 }
  ],
  "monthlyTrends": [
    { "year": 2026, "month": 1, "count": 10, "revenue": 450000 },
    { "year": 2026, "month": 2, "count": 15, "revenue": 750000 }
  ]
}
```

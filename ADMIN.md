# Mahadev Holidays — Admin Panel User Manual

## Accessing the Admin Panel

1. Navigate to `https://<your-domain>/admin/login`
2. Enter your credentials (see **Login Credentials** below)
3. You will be redirected to the dashboard

> **Note**: The admin panel is at the `/admin/*` route, separate from the public-facing site.

---

## Login Credentials

Two authentication methods are supported:

### Method 1: Environment Variable Login (Super Admin)

These credentials are set in `.env.local` and bypass the database:

| Field | Value |
|---|---|
| Username | As set in `ADMIN_USERNAME` (default: `@vishalchouhan`) |
| Password | As set in `ADMIN_PASSWORD` |

### Method 2: Database User Login

Users stored in the `users` collection can log in with their username or email.

| Role | Permissions |
|---|---|
| `super-admin` | Full access — all CRUD, user management, settings |
| `editor` | Create and edit content (destinations, blog, testimonials), no user management |
| `manager` | View and manage bookings, contacts, customers; limited content editing |

---

## Dashboard Overview

The dashboard displays high-level statistics and recent activity:

| Stat | Source | Description |
|---|---|---|
| **Total Bookings** | `bookings` collection | All bookings ever created |
| **Total Destinations** | `destinations` collection | All destinations in the system |
| **Approved Testimonials** | `testimonials` collection (`isApproved: true`) | Only published testimonials count |
| **Published Posts** | `blogposts` collection (`isPublished: true`) | Only live blog posts count |
| **Total Messages** | `contacts` collection | All contact form submissions |
| **Bookings This Year** | `bookings` collection | Filtered by current calendar year |

Additional sections on the dashboard:

- **Recent Bookings** — last 5 bookings with names, destinations, statuses, and prices
- **Popular Destinations** — top 5 destinations by booking count
- **Monthly Trends** — booking counts and revenue for the last 6 months

---

## Managing Destinations

### List View

Shows all destinations in a table with columns: Title, Location, Category, Price, Featured, Available, Actions.

### Create Destination

| Field | Type | Required | Notes |
|---|---|---|---|
| Title | Text | Yes | Display name of the destination |
| Slug | Text | Yes | URL-friendly identifier (auto-generated from title if left empty) |
| Location | Text | Yes | Geographic location |
| Description | Textarea | Yes | Short description (shown on cards) |
| Long Description | Rich Text | Yes | Full description (shown on detail page) |
| Images | URL list | No | Array of image URLs (use Media Library to host) |
| Price | Number | Yes | Current price (in INR) |
| Original Price | Number | No | Strikethrough original price |
| Duration | Text | Yes | e.g. "5 Nights / 6 Days" |
| Category | Select | Yes | `domestic`, `international`, or `weekend` |
| Tags | Tags Input | No | Search keywords |
| Rating | Number (0–5) | No | Average rating |
| Review Count | Number | No | Number of reviews |
| Available | Toggle | No | Controls visibility on site |
| Featured | Toggle | No | Shows on homepage featured section |
| Popular | Toggle | No | Shows on popular destinations section |
| SEO Metadata | Group | No | Custom title, description, keywords, OG tags |

**Itinerary Days:** Add days one by one. Each day has:
- Day number, title, description
- Activities (multi-line or list)
- Meals included (breakfast/lunch/dinner checkboxes)
- Accommodation details

**Inclusions/Exclusions:** Space-separated or comma-separated lists of what's included or excluded.

### Edit Destination

Click the edit button on any destination row. All fields from the create form are available.

### Delete Destination

Click the delete button and confirm. This action is irreversible.

---

## Managing Bookings

### Status Workflow

```
New → In Progress → Confirmed → Completed
                    ↘ Cancelled
```

| Status | Meaning | When to Use |
|---|---|---|
| `new` | Recently submitted | Initial state after customer submits booking |
| `in-progress` | Being processed | Admin is reviewing details, contacting customer |
| `confirmed` | Verified and accepted | Payment received, itinerary confirmed |
| `completed` | Trip finished | After the travel date has passed |
| `cancelled` | Voided | Customer cancelled or request was rejected |

### List View

Table with: Name, Email, Destination, Date, Travelers, Price, Status, Actions. Filter by status or search by name/email/phone.

### Create/Edit Booking

- **From frontend**: Customers submit bookings via the public booking form
- **From admin**: Admin can manually create or edit bookings
- Key fields: name, email, phone, destination, package type, travel date, travelers, special requests, total price

### Changing Status

Select a new status from the dropdown. The system stores a `createdAt` timestamp for audit.

---

## Managing Testimonials

### Approval Workflow

```
Submitted (isApproved: false) → Admin Reviews → Approved (isApproved: true)
                                              → Rejected (Deleted)
```

1. Testimonials submitted from the public site start as **unapproved**
2. Admin reviews the content in the admin panel
3. Admin can **approve** (visible on site), **feature** (highlighted), or **delete**
4. Unapproved testimonials are not displayed on the public site

### Featured Testimonials

Setting `isFeatured: true` highlights the testimonial on the homepage. Only 3–5 testimonials should be featured at any time.

---

## Blog Management

### Creating a Post

| Field | Type | Required | Notes |
|---|---|---|---|
| Title | Text | Yes | Post headline |
| Slug | Text | Yes | URL identifier (auto-generated if empty) |
| Excerpt | Textarea | Yes | Short summary for cards and meta descriptions |
| Content | Rich Text | Yes | Full article content (HTML supported) |
| Cover Image | URL | Yes | Hero image for the post |
| Author | Text | Yes | Display name of the writer |
| Category | Select | Yes | Predefined blog categories |
| Tags | Tags Input | No | SEO keywords |
| Published | Toggle | No | Controls visibility on site |
| Publish Date | Date | No | Set to schedule future publishing |
| SEO Metadata | Group | No | Custom title, description, keywords, OG tags |

### Publishing

- Toggle **Published** to `true` to make the post visible on the public blog
- Set a **Publish Date** to schedule automatic publishing
- Unpublishing sets `isPublished: false` and hides the post

### SEO Best Practices for Blog

- Use descriptive, keyword-rich titles (50–60 characters)
- Write compelling excerpts (under 160 characters) as meta descriptions
- Add 3–5 relevant tags per post
- Use a high-quality cover image (1200×630px recommended for OG)

---

## Media Library

### Uploading Media

1. Navigate to **Media** in the admin panel
2. Click **Add Media** or **Upload**
3. Currently, media requires a URL (external hosting). Enter:
   - **URL** — Full URL to the image/video
   - **Alt Text** — Descriptive text for accessibility and SEO
   - **Type** — `image` or `video`
   - **Size** (optional) — File size in bytes
   - **Dimensions** (optional) — Width and height in pixels

### Organizing Media

- Filter by type (image/video)
- Sort by newest first
- Search is not yet supported — use consistent naming for alt text

### Getting URLs

Click on any media item to copy its URL. Use these URLs when creating destinations, blog posts, or page content.

---

## Customer Database

### Viewing Customers

Customers are **aggregated** from two sources:
- **Bookings** — Anyone who has made a booking
- **Contact Messages** — Anyone who submitted a contact form

The system merges records by email. Each customer entry shows:

| Field | Description |
|---|---|
| Name | Name from latest booking/message |
| Email | Unique identifier |
| Phone | Phone from latest interaction |
| First Contact | Date of first booking or message |
| Bookings | Number of bookings made |
| Messages | Number of contact messages sent |

### Searching

Use the search bar to filter by name, email, or phone number.

### Exporting to CSV

Click **Export CSV** to download a `customers.csv` file with all current results (respects the search filter). Columns:

```
Name, Email, Phone, First Contact, Bookings, Messages
```

---

## Contact Messages

### Reading Messages

The contact inbox shows all form submissions sorted by newest first. Each message displays:
- Sender name and email
- Phone number (if provided)
- Subject line
- Full message body
- Timestamp

### Marking as Read

Click a message to view it. Unread messages are visually distinguished (bold/filled). Toggle the read status manually if needed.

### Replying

The admin panel does not include a built-in email client. To reply:
1. Note the sender's email address
2. Reply from your business email account
3. Consider marking the message with a system note or custom status

---

## SEO Settings

### Global Meta Settings

Configured in code (`layout.tsx` files). To modify:
- **Site Name**: Set via `NEXT_PUBLIC_SITE_NAME` environment variable
- **Default Description**: Edit the root `layout.tsx`
- **Default OG Image**: Edit the root `layout.tsx`
- **Favicon**: Replace `/favicon.ico` in the public folder

### Per-Page Meta

Each destination and blog post has a `seoMetadata` field including:
- `title` — Browser tab title and OG title
- `description` — Meta description for search results
- `keywords` — Comma-separated keywords
- `ogImage` — Custom Open Graph image (1200×630px)
- `ogTitle` — Override title for social shares
- `ogDescription` — Override description for social shares

### Sitemap

The sitemap is auto-generated by Next.js. Ensure `NEXT_PUBLIC_SITE_URL` is set correctly in production for proper canonical URLs.

---

## User Management

### Roles

| Role | Capabilities |
|---|---|
| `super-admin` | Full access — manage users, all CRUD, export data, system settings |
| `editor` | Content creation — destinations, blog, testimonials, media. Cannot manage users or view sensitive data |
| `manager` | Operations — bookings, contacts, customers. Limited content editing |

### Creating Users

Users are stored in the `users` MongoDB collection. To add a user:

1. Connect to MongoDB (via Compass, `mongosh`, or an API client)
2. Insert a document into the `users` collection with:
   - `name`, `email` (unique), `username` (unique), `password` (bcrypt-hashed), `role`
3. Use the API endpoint `POST /api/users` (if implemented) or a seed script

### Editing/Deleting Users

Only `super-admin` role can modify or delete users. Changes apply immediately — affected users will need to re-login.

---

## Best Practices and Tips

1. **Regular Backups** — Use MongoDB Atlas automated backups or `mongodump` weekly before making bulk changes.
2. **Test on Staging** — Always test new destinations and blog posts on a staging environment first.
3. **Image Optimization** — Use compressed WebP images (under 200KB). Recommended dimensions:
   - Destination hero: 1920×1080px
   - Blog cover: 1200×630px
   - Thumbnails: 400×300px
4. **Booking Confirmation** — After confirming a booking, contact the customer via email/phone to share the itinerary.
5. **Testimonial Moderation** — Review testimonials daily. Approve genuine reviews promptly (within 24 hours).
6. **SEO Hygiene** — Every destination and blog post should have unique meta title and description. Avoid duplicates.
7. **Slug Uniqueness** — Slugs must be unique. If you see a "slug already exists" error, append a number (e.g. `kerala-backwaters-2`).
8. **Session Expiry** — JWT tokens expire after 7 days. Log out and log back in if you see authorization errors.
9. **Browser Support** — The admin panel supports modern browsers (Chrome, Firefox, Edge, Safari). IE11 is not supported.

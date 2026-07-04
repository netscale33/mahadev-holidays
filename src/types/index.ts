export interface SEO {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  accommodation: string;
}

export type DestinationCategory = 'domestic' | 'international' | 'weekend';

export interface Destination {
  id: string;
  title: string;
  slug: string;
  location: string;
  description: string;
  longDescription: string;
  images: string[];
  price: number;
  originalPrice?: number;
  duration: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  category: DestinationCategory;
  tags: string[];
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  seoMetadata: SEO;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 'new' | 'in-progress' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  destinationId: string;
  destinationTitle: string;
  packageType: string;
  travelDate: Date;
  travelers: number;
  specialRequests?: string;
  status: BookingStatus;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  content: string;
  destinationName: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt?: Date;
  isPublished: boolean;
  seoMetadata: SEO;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export type UserRole = 'super-admin' | 'editor' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  url: string;
  alt: string;
  type: MediaType;
  size?: number;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadedAt: Date;
}

export interface Newsletter {
  id: string;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}

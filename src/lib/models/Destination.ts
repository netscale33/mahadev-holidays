import mongoose, { Schema, Document, Model } from 'mongoose';
import { ItineraryDay } from '@/types';

export interface IDestination extends Document {
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
  category: 'domestic' | 'international' | 'weekend';
  tags: string[];
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  seoMetadata: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ItineraryDaySchema = new Schema<ItineraryDay>({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  activities: [{ type: String }],
  meals: {
    breakfast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
  },
  accommodation: { type: String, required: true },
}, { _id: false });

const SEOSchema = new Schema({
  title: { type: String },
  description: { type: String },
  keywords: { type: String },
  ogImage: { type: String },
  ogTitle: { type: String },
  ogDescription: { type: String },
}, { _id: false });

const DestinationSchema = new Schema<IDestination>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  duration: { type: String, required: true },
  itinerary: [ItineraryDaySchema],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  category: { type: String, enum: ['domestic', 'international', 'weekend'], required: true },
  tags: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isPopular: { type: Boolean, default: false },
  seoMetadata: SEOSchema,
}, { timestamps: true });

DestinationSchema.index({ slug: 1 });
DestinationSchema.index({ category: 1 });
DestinationSchema.index({ isFeatured: 1 });
DestinationSchema.index({ isPopular: 1 });

const Destination: Model<IDestination> = mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema);

export default Destination;

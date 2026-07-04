import mongoose, { Schema, Document, Model } from 'mongoose';
import { BookingStatus } from '@/types';

export interface IBooking extends Document {
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

const BookingSchema = new Schema<IBooking>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  destinationId: { type: String, required: true },
  destinationTitle: { type: String, required: true },
  packageType: { type: String, required: true },
  travelDate: { type: Date, required: true },
  travelers: { type: Number, required: true, min: 1 },
  specialRequests: { type: String },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'confirmed', 'completed', 'cancelled'],
    default: 'new',
  },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

BookingSchema.index({ email: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ createdAt: -1 });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;

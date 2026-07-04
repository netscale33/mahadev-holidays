import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
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

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  avatar: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  content: { type: String, required: true },
  destinationName: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

TestimonialSchema.index({ isApproved: 1 });
TestimonialSchema.index({ isFeatured: 1 });

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;

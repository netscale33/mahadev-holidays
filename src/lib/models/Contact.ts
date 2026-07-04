import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

ContactMessageSchema.index({ isRead: 1 });
ContactMessageSchema.index({ createdAt: -1 });

const Contact: Model<IContactMessage> = mongoose.models.Contact || mongoose.model<IContactMessage>('Contact', ContactMessageSchema);

export default Contact;

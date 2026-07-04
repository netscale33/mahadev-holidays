import mongoose, { Schema, Document, Model } from 'mongoose';
import { MediaType } from '@/types';

export interface IMediaItem extends Document {
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

const MediaSchema = new Schema<IMediaItem>({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], required: true },
  size: { type: Number },
  dimensions: {
    width: { type: Number },
    height: { type: Number },
  },
}, { timestamps: true });

const Media: Model<IMediaItem> = mongoose.models.Media || mongoose.model<IMediaItem>('Media', MediaSchema);

export default Media;

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
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
  seoMetadata: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
}

const SEOSchema = new Schema({
  title: { type: String },
  description: { type: String },
  keywords: { type: String },
  ogImage: { type: String },
  ogTitle: { type: String },
  ogDescription: { type: String },
}, { _id: false });

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  publishedAt: { type: Date },
  isPublished: { type: Boolean, default: false },
  seoMetadata: SEOSchema,
}, { timestamps: true });

BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ isPublished: 1, publishedAt: -1 });
BlogPostSchema.index({ category: 1 });

const Blog: Model<IBlogPost> = mongoose.models.Blog || mongoose.model<IBlogPost>('Blog', BlogPostSchema);

export default Blog;

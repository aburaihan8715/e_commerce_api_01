import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: [String], default: [] },
    size: {
      type: [String],
      enum: ['XS', 'S', 'M', 'L', 'XL'],
      default: [],
    },
    color: { type: [String], default: [] },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Indexing `categories` for faster queries by category
ProductSchema.index({ categories: 1 });

export const Product =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

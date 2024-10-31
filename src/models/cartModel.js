import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

// Indexing userId for faster queries
CartSchema.index({ userId: 1 });

export const Cart =
  mongoose.models.Cart || mongoose.model('Cart', CartSchema);

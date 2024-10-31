import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const OrderSchema = new Schema(
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
          min: 1, // Optional: Minimum quantity of 1
        },
      },
    ],
    amount: { type: Number, required: true, min: 0 },
    address: { type: Object, required: true },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

// Indexing userId and status for faster queries
OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });

export const Order =
  mongoose.models.Order || mongoose.model('Order', OrderSchema);

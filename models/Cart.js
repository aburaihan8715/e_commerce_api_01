import { Schema, model, models } from "mongoose";

const CartSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = models.Cart || model("Cart", CartSchema);

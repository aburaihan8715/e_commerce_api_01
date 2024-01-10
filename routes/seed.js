import express from "express";
import { products } from "../data/data.js";
import { Product } from "../models/Product.js";
const router = express.Router();

//products
router.post("/products", async (req, res) => {
  try {
    // 01. Delete all products from the collection
    await Product.deleteMany({});
    // 02. Insert products in the collection
    const productsData = await Product.insertMany(products);
    // 03. success response
    res.status(200).json({
      result: productsData.length,
      message: "Products returned!",
      productsData,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "server error" + error });
  }
});

export { router as seedRoute };

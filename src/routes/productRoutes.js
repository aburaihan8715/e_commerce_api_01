import express from "express";

const router = express.Router();

export { router as productRouter };
/*
import express from "express";
import { Product } from "../models/Product.js";
import { verifyTokenAndAdmin } from "./verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({ status: "success", message: "product created!", data: savedProduct });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "success", message: "product updated!", data: updatedProduct });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", message: "product deleted!", data: deletedProduct });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

//GET A PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ status: "success", message: "product returned!", data: product });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  let products;
  try {
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(4);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json({ status: "success", message: "products returned", result: products.length, data: products });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

export { router as productRoute };
*/

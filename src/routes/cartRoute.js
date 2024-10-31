/*
import express from "express";
import { Cart } from "../models/Cart.js";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json({ status: "success", message: "cart created!", data: savedCart });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "success", message: "cart updated!", data: updatedCart });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", message: "cart deleted!", data: deletedCart });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json({ status: "success", message: "cart returned!", data: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ status: "success", result: carts.length, message: "cart returned!", data: carts });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

export { router as cartRoute };
*/

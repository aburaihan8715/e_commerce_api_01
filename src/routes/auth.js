/*
import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ status: "success", message: "user registered successfully!", data: savedUser });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user && res.status(401).json("Wrong credentials");

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword && res.status(401).json("Wrong credentials");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ status: "success", message: "login success!", data: { ...others, accessToken } });
  } catch (err) {
    res.status(500).json({ status: "error", message: "server error" + err });
  }
});

export { router as authRoute };

*/

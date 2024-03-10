import bcrypt from "bcryptjs";
import createError from "http-errors";

import { User } from "../models/userModel.js";
import { createJWT } from "../utils/createJWT.js";
import { jwtSecretForAccessToken } from "../config/secret.js";

// REGISTER
const register = async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(8)),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ status: "success", data: savedUser });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    // check isExist user based on body email
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw createError(404, "Wrong credentials!");

    // check isPassword correct
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) throw createError(401, "Wrong credentials!");

    // create accessToken
    const accessToken = createJWT({ email: user.email, role: user.role }, jwtSecretForAccessToken, "7d");

    // send response
    const { password, updatedAt, __v, ...others } = user._doc;
    res.status(200).json({ status: "success", data: { ...others, accessToken } });
  } catch (error) {
    next(error);
  }
};

export { register, login };

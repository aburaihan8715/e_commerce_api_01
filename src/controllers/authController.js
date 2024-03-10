import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import { User } from '../models/userModel.js';
import { createJWT } from '../utils/createJWT.js';
import { jwtSecretForAccessToken } from '../config/secret.js';

const verifyAuthentication = async (req, res, next) => {
  // 1) Getting token and check of it's there

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(createError(401, 'You are not authenticated!'));

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, jwtSecretForAccessToken);

  // 3) Check if user still exists
  const currentUser = await User.findOne({ email: decoded.email });

  if (!currentUser) {
    return next(
      createError(401, 'The user belonging to this token does no longer exist')
    );
  }

  // grant access to the protected routes
  req.user = currentUser;
  next();
};

const verifyAuthorization = (...roles) => {
  return (req, res, next) => {
    // roles ['admin','user']
    if (!roles.includes(req.user.role)) {
      return next(
        createError(403, 'You do not have permission to access this route!')
      );
    }
    next();
  };
};

// REGISTER
const register = async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(8)),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ status: 'success', data: savedUser });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    // check isExist user based on body email
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw createError(404, 'Wrong credentials!');

    // check isPassword correct
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) throw createError(401, 'Wrong credentials!');

    // create accessToken
    const accessToken = createJWT(
      { email: user.email, role: user.role },
      jwtSecretForAccessToken,
      '7d'
    );

    // send response
    const { password, updatedAt, __v, ...others } = user._doc;
    res.status(200).json({
      status: 'success',
      data: { ...others, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, verifyAuthentication, verifyAuthorization };

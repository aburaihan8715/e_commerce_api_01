import createError from 'http-errors';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import { jwtSecretForAccessToken } from '../config/secret.js';
import { User } from '../models/userModel.js';

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

export { verifyAuthentication, verifyAuthorization };

/*
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
*/

import AppError from '../errors/AppError';
import { User } from '../models/userModel';
import httpStatus from 'http-status';
import { createToken } from '../utils/createToken';
import config from '../config';

// REGISTER OR CREATE USER
const registerIntoDB = async (payload) => {
  let newUser = await User.create(payload);

  if (!newUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to cerate user. Try again!',
    );
  }
  newUser = newUser.toObject();
  delete newUser.password;
  delete newUser.__v;

  return newUser;
};

// LOGIN USER
const loginFromDB = async (payload) => {
  // 01. checking if the user is exist
  let user = await User.getUserByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // 02. checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // 03. checking if the password is correct
  const isPasswordCorrect = await User.isPasswordCorrect(
    payload?.password,
    user?.password,
  );

  if (!isPasswordCorrect) {
    throw new AppError(400, 'Wrong credentials!');
  }

  // 04. create accessToken and refreshToken
  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );

  // 05. delete password form the user
  user = user.toObject();
  delete user.password;
  delete user.__v;

  // 06. return tokens and user to the controller
  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const AuthService = { registerIntoDB, loginFromDB };

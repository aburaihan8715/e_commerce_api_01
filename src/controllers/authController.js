import { AuthService } from '../services/authService.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';
import httpStatus from 'http-status';
import config from '../config/index.js';

// REGISTER OR CREATE USER
const register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const registerData = { username, email, password };
  const newUser = await AuthService.registerIntoDB(registerData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: newUser,
  });
});

// LOGIN
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const loginData = { email, password };
  const userInfo = await AuthService.loginFromDB(loginData);

  const { refreshToken, accessToken, user } = userInfo;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken, refreshToken, user },
  });
});

export const AuthController = { register, login };

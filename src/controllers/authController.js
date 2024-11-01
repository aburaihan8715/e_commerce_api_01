import envConfig from '../config/envConfig.js';
import { AuthService } from '../services/authService.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';
import httpStatus from 'http-status';

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
    secure: envConfig.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken, refreshToken, user },
  });
});

// CHANGE PASSWORD
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const id = req.user?._id;

  const result = await AuthService.changePasswordIntoDB(id, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully!',
    data: result,
  });
});

// UPDATE PROFILE
const updateProfile = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const userInfo = await AuthService.updateProfileIntoDB(userId, {
    ...JSON.parse(req.body.data),
    profilePicture: req.file?.path,
  });

  const { refreshToken, accessToken, user } = userInfo;

  res.cookie('refreshToken', refreshToken, {
    secure: envConfig.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Settings updated successfully',
    data: { accessToken, refreshToken, user },
  });
});

export const AuthController = {
  register,
  login,
  changePassword,
  updateProfile,
};

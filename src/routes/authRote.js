import express from 'express';
import { AuthController } from '../controllers/authController.js';
import validateRequest from '../middlewares/validateRequest.js';
import { AuthValidations } from '../validation/authValidation.js';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidations.registerValidationSchema),
  AuthController.register,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthController.login,
);

router.patch('/change-password', AuthController.changePassword);

router.patch('/update-profile', AuthController.updateProfile);

export const AuthRoutes = router;

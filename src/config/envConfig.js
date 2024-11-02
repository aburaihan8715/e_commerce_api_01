import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,

  reset_pass_ui_link:
    process.env.NODE_ENV === 'production'
      ? process.env.RESET_PASS_UI_LINK_CLOUD
      : process.env.RESET_PASS_UI_LINK_LOCAL,

  port: process.env.PORT,

  mongodb_url: process.env.MONGODB_URL,

  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  jwt_password_reset_secret: process.env.JWT_PASSWORD_RESET_SECRET,
  jwt_password_reset_expires_in: process.env.JWT_PASSWORD_RESET_EXPIRES_IN,

  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
};

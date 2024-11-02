import nodemailer from 'nodemailer';
import envConfig from '../config/envConfig';

export const sendEmail = async (to, html) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: envConfig.NODE_ENV === 'production' ? 465 : 587,
    secure: envConfig.NODE_ENV === 'production',
    auth: {
      user: envConfig.email_user,
      pass: envConfig.email_pass,
    },
  });

  await transporter.sendMail({
    from: 'raihan@gmail.com',
    to,
    subject: 'Reset your password within 10 minutes!',
    text: '',
    html,
  });
};

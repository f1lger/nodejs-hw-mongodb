import nodemailer from 'nodemailer';
import { env } from './env.js';
import { SMTP } from '../constant/index.js';

export const transport = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export const sendMail = async (options) => {
  return await transport.sendMail(options);
};

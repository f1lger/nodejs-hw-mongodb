import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import {
  FIFTEEN_MINUTES,
  ONE_DAY,
  SMTP,
  TEMPLATES_DIR,
} from '../constant/index.js';
import { Session } from '../db/models/session.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { sendMail } from '../utils/sendMail.js';
import Handlebars from 'handlebars';
import fs from 'node:fs/promises';
import path from 'node:path';

const createSession = () => {
  return {
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const createUser = async (payload) => {
  const hashedPasword = await bcrypt.hash(payload.password, 10);

  const user = await User.findOne({
    email: payload.email,
  });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  return await User.create({
    ...payload,
    password: hashedPasword,
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not fourd');
  }
  const areEqual = await bcrypt.compare(password, user.password);
  if (!areEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: user._id });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};

export const logoutUser = async ({ userId, sessionToken }) => {
  return await Session.deleteOne({
    _id: userId,
    refreshToken: sessionToken,
  });
};

export const findSession = async ({ accessToken }) =>
  await Session.findOne({ accessToken });
export const deleteSession = (id) => Session.deleteOne({ userId: id });

export const refreshSesion = async (userId) => {
  const session = createSession();

  const user = await User.findById({ _id: userId });

  if (!user) throw createHttpError(404, 'User not fourd');
  await deleteSession(userId);

  return await Session.create({
    userId,
    ...session,
  });
};

export const sendResetPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw createHttpError(404, 'User not found!');

  const token = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env(SMTP.JWT_SECRET),
    {
      expiresIn: '5m',
    },
  );

  const teamplateSourse = await fs.readFile(
    path.join(TEMPLATES_DIR, 'reset-password-email.html'),
  );

  const template = Handlebars.compile(teamplateSourse.toString());

  const html = template({
    name: user.name,
    link: `${env(SMTP.APP_DOMAIN)}/reset-password?token=${token}`,
  });

  try {
    await sendMail({
      html,
      to: email,
      subject: 'Reset your password',
      from: env(SMTP.SMTP_FROM),
    });
  } catch (err) {
    console.log(err.message);
    throw createHttpError(500, 'Problem with sending email');
  }
};

export const resetPassword = async ({ token, password }) => {
  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, env(SMTP.JWT_SECRET));
  } catch (err) {
    console.log(err.message);
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  await deleteSession(tokenPayload.sub);

  const hashedPasword = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(
    {
      _id: tokenPayload.sub,
    },
    { password: hashedPasword },
  );

  if (!user) throw createHttpError(404, 'User not found!');
};

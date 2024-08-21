import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constant/index.js';
import { Session } from '../db/models/session.js';

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

export const findSession = (filter) => Session.findOne(filter);
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

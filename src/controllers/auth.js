// import { ONE_DAY } from '../constant/index.js';
import createHttpError from 'http-errors';
import {
  createUser,
  findSession,
  loginUser,
  logoutUser,
  refreshSesion,
} from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('userId', session.userId, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // ONE_DAY
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // ONE_DAY
  });
};

export const registerUserController = async (req, res, next) => {
  const user = await createUser(req.body);
  res.status(200).json({
    status: 200,
    message: 'Successfully registered a user!',
    data: { user },
  });
};

export const loginUserController = async (req, res, next) => {
  const user = await loginUser(req.body);

  setupSession(res, user);

  res.status(200).json({
    status: 200,
    message: 'User is loged in',
    data: { accessToken: user.accessToken },
  });
};

export const logoutUserController = async (req, res, next) => {
  await logoutUser({
    userId: req.cookies.userId,
    refreshToken: req.cookies.refreshToken,
  });

  res.clearCookie('refreshToken');
  res.clearCookie('userId');
  res.status(204).send();
};

export const refreshTokenController = async (req, res, next) => {
  const { userId } = req.cookies;
  const session = await findSession();

  if (!session) {
    throw createHttpError(401, 'Sesion not found');
  }
  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token is expired!');
  }

  const newSession = await refreshSesion(userId); 

  setupSession(res, newSession);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: newSession.accessToken },
  });
};

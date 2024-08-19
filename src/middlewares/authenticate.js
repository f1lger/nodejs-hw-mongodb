import createHttpError from 'http-errors';
import { findSession } from '../services/auth.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const header = req.get('Authorization');
  console.log(header);

  if (!header) {
    next(createHttpError(401, 'Auth header is not provided'));
  }
  const [bearer, token] = header.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of bearer type'));
  }
  const session = await findSession({ accessToken: token });
  if (!session) {
    next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, 'Access token expired'));
  }
  const user = User.findOne(session.userId);

  if (!user) {
    next(
      createHttpError(401, 'User associated with this session is not found'),
    );
  }

  req.user = user;
  next();
};

import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserShema,
  registerUserShema,
} from '../validation/auth.js';

import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
} from '../controllers/auth.js';

const authRouter = Router();
authRouter.post(
  '/register',
  validateBody(registerUserShema),
  ctrlWrapper(registerUserController),
);
authRouter.post(
  '/login',
  validateBody(loginUserShema),
  ctrlWrapper(loginUserController),
);
authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshTokenController));

export default authRouter;

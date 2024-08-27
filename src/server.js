import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS, UPLOAD_DIR } from './constant/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import rootRouter from './routers/index.js';
import cookieParser from 'cookie-parser';

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res, next) => {
    res.send('Hello world');
  });

  app.use('/upload', express.static(UPLOAD_DIR));

  app.use(rootRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(env(ENV_VARS.PORT));
  app.listen(PORT, () => {
    console.log(`Server was start on port ${PORT}`);
  });
};

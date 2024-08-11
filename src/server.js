import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constant/index.js';
import contactRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

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

  app.use(contactRouter);

  app.use('*', notFoundHandler); 

  app.use(errorHandler);

  const PORT = Number(env(ENV_VARS.PORT));
  app.listen(PORT, () => {
    console.log(
      `Server was start on port ${PORT}`,
    );
  });
};

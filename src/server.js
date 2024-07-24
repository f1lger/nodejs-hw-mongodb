import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constant/index.js';
import {
  getAllContacts,
  getContactById,
} from './services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());

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

  app.get('/contacts', async (req, res, next) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get(
    '/contacts/:contactId',
    async (req, res, next) => {
      const contacts = await getContactById(
        req.params.contactId,
      );
      console.log(contacts);
      if (!contacts)
        return res.json({
          message: 'Contact not found',
        });

      res.json({
        status: 200,
        message: `Successfully found contact with id ${req.params.contactId}`,
        data: contacts,
      });
    },
  );

  app.use((req, res, next) => {
    res.status(404).send({
      message: 'Not found',
    });
  });

  const PORT = Number(env(ENV_VARS.PORT));
  app.listen(PORT, () => {
    console.log(
      `Server was start on port ${PORT}`,
    );
  });
};

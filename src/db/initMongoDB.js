import mongoose from 'mongoose';
import { ENV_VARS } from '../constant/index.js';
import { env } from '../utils/env.js';

export const initMongoDB = async () => {
  const user = env(ENV_VARS.MONGODB_USER);
  const pwd = env(ENV_VARS.MONGODB_PASSWORD);
  const url = env(ENV_VARS.MONGODB_URL);
  const db = env(ENV_VARS.MONGODB_DB);

  mongoose
    .connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    )
    .then(
      console.log(
        'Mongo connection successfully established!',
      ),
    )
    .catch((e) => {
      console.log(
        'Error while setting up mongo connection',
        e,
      );
      throw e;
    });
};

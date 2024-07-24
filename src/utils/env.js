import dotenv from 'dotenv';

dotenv.config();

export const env = (envName) => {
  return process.env[envName];
};

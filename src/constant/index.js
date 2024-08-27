import path from 'node:path';

export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
  BACKEND_HOST: 'BACKEND_HOST',
  CLOUDINARY_NAME: 'CLOUDINARY_NAME',
  CLOUDINARY_API_KEY: 'CLOUDINARY_API_KEY',
  CLOUDINARY_API_SECRET: 'CLOUDINARY_API_SECRET',
  IS_CLOUDINARY_ENABLE: 'IS_CLOUDINARY_ENABLE',
};
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
export const CONTACT_TYPE_VALUES = ['work', 'home', 'personal'];

export const CONTACT_KEYS = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
  JWT_SECRET: 'JWT_SECRET',
  APP_DOMAIN: 'APP_DOMAIN',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'upload');

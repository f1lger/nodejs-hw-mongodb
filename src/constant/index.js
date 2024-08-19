export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
export const CONTACT_TYPE_VALUES = [
  'work',
  'home',
  'personal',
];

export const CONTACT_KEYS = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000; // 24 * 60 * 60 *
import Joi from 'joi';

export const registerUserShema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required(),
});

export const loginUserShema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required(),
});

export const sendResetPasswordShema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required().min(2).max(12),
  token: Joi.string().required()
});

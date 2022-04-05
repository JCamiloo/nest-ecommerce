import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.number().required(),
  API_KEY: Joi.number().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().required()
})

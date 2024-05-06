import * as Joi from 'joi';

export const ENV_VALIDATION_SCHEMS = Joi.object({
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_DATABASE: Joi.string().required(),
  DB_URL: Joi.string().required(),
});

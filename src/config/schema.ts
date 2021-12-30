import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
    NODE_ENV: Joi.string().required(),

    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME_IN_MINUTES: Joi.string().required(),

    MONGODB_PORT: Joi.number().when('NODE_ENV', {
        is: 'development',
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    MONGODB_HOST: Joi.string().required(),
    MONGODB_URI_PREFIX: Joi.string().required(),
    MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
    MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
    MONGODB_USERNAME: Joi.string().required(),
    MONGODB_PASSWORD: Joi.string().required(),
    MONGO_INITDB_DATABASE: Joi.string().required(),

    IPSTACK_API_KEY: Joi.string().required(),
    IPSTACK_API_BASE_URL: Joi.string().required()
});

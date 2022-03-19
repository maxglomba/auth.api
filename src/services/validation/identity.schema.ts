import Joi, { Schema } from 'joi';

const identityCreateSchema = Joi.object({
    email: Joi.string()
        .min(5)
        .max(100)
        .required(),
    password: Joi.string()
        .min(6)
        .max(100)
        .required()
});

const identityAuthenticateSchema = Joi.object({
    email: Joi.string()
        .min(5)
        .max(100)
        .required(),
    password: Joi.string()
        .min(6)
        .max(100)
        .required()
});

module.exports = {
    identityCreateSchema,
    identityAuthenticateSchema
}
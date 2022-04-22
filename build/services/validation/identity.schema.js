"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const identityCreateSchema = joi_1.default.object({
    email: joi_1.default.string()
        .min(5)
        .max(100)
        .required(),
    password: joi_1.default.string()
        .min(6)
        .max(100)
        .required()
});
const identityAuthenticateSchema = joi_1.default.object({
    email: joi_1.default.string()
        .min(5)
        .max(100)
        .required(),
    password: joi_1.default.string()
        .min(6)
        .max(100)
        .required()
});
module.exports = {
    identityCreateSchema,
    identityAuthenticateSchema
};

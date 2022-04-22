"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityService = void 0;
const application_exception_1 = require("../common/exceptions/application.exception");
const sha_js_1 = __importDefault(require("sha.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JoiValidations = require('./validation/identity.schema');
class IdentityService {
    constructor(identityRepository) {
        this.identityRepository = identityRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.identityRepository.all();
            return users;
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateSchema = JoiValidations.identityAuthenticateSchema;
            try {
                yield validateSchema.validateAsync({ email, password });
            }
            catch (error) {
                throw new application_exception_1.ApplicationExceptions(error);
            }
            // Hash passowrd
            password = sha_js_1.default('sha256').update(password).digest('base64');
            const validUser = yield this.identityRepository.find(email, password);
            if (validUser) {
                if (process.env.jwt_secret_key) {
                    const secretKey = process.env.jwt_secret_key;
                    return jsonwebtoken_1.default.sign({
                        id: validUser.id,
                        email: validUser.email
                    }, secretKey, { expiresIn: '7h', algorithm: 'HS256' });
                }
                else {
                    throw new Error('Secret key is not defined.');
                }
            }
            throw new application_exception_1.ApplicationExceptions('Invalid user credentials supplied.');
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateSchema = JoiValidations.identityCreateSchema;
            try {
                yield validateSchema.validateAsync(user);
            }
            catch (error) {
                throw new application_exception_1.ApplicationExceptions(error);
            }
            //unique email check
            const alreadyExistsUser = yield this.identityRepository.find(user.email, null);
            if (alreadyExistsUser)
                throw new application_exception_1.ApplicationExceptions('Email already exists.');
            // Hash password
            user.password = sha_js_1.default('sha256').update(user.password).digest('base64');
            yield this.identityRepository.create(user);
        });
    }
}
exports.IdentityService = IdentityService;

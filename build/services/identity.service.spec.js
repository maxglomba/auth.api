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
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const identity_service_1 = require("./identity.service");
const identity_repository_1 = require("./repositories/impl/mock/identity.repository");
const identityService = new identity_service_1.IdentityService(new identity_repository_1.IdentityMOCKRepository());
describe('Identity.Service', () => {
    describe('Store', () => {
        it('try create user', () => __awaiter(void 0, void 0, void 0, function* () {
            yield identityService.create({
                email: 'testuser2@gmail.com',
                password: 'test1234'
            });
        }));
        it('try create user with invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield identityService.create({
                    email: '1234',
                    password: 'test1234'
                });
            }
            catch (error) {
                let errorMessage = 'Failed to do something exceptional';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                assert.match(errorMessage, new RegExp('ValidationError: "email" length must be at least'));
            }
        }));
        it('try create user with invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield identityService.create({
                    email: 'testuser2@gmail.com',
                    password: '1'
                });
            }
            catch (error) {
                let errorMessage = 'Failed to do something exceptional';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                assert.match(errorMessage, new RegExp('ValidationError: "password" length must be at least'));
            }
        }));
        it('try create user with existing email', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield identityService.create({
                    email: 'testuser@gmail.com',
                    password: 'test1234'
                });
            }
            catch (error) {
                let errorMessage = 'Failed to do something exceptional';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                assert.equal(errorMessage, 'Email already exists.');
            }
        }));
    });
});

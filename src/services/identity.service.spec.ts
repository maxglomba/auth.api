import assert = require('assert');
import { IdentityService } from './identity.service';

import { IdentityMOCKRepository } from './repositories/impl/mock/identity.repository';
import { UserCreateDto } from '../dtos/user.dto'

const identityService = new IdentityService(
    new IdentityMOCKRepository()
);

describe('Identity.Service', () => {
    describe('Store', () => {
        it('try create user', async () => {
            await identityService.create({
                email: 'testuser2@gmail.com',
                password: 'test1234'
            } as UserCreateDto);
        });

        it('try create user with invalid email', async () => {
            try {
                await identityService.create({
                    email: '1234',
                    password: 'test1234'
                } as UserCreateDto);

            } catch (error) {
                assert.match(error.message, new RegExp('ValidationError: "email" length must be at least'));
            }
        });

        it('try create user with invalid password', async () => {
            try {
                await identityService.create({
                    email: 'testuser2@gmail.com',
                    password: '1'
                } as UserCreateDto);
            } catch (error) {
                assert.match(error.message , new RegExp('ValidationError: "password" length must be at least'));
            }

        });

        it('try create user with existing email', async () => {

            try {
                await identityService.create({
                    email: 'testuser@gmail.com',
                    password: 'test1234'
                } as UserCreateDto);
            } catch (error) {
                assert.equal(error.message, 'Email already exists.');
            }
        });
    });
});
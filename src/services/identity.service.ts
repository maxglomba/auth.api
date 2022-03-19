import { UserCreateDto } from '../dtos/user.dto';
import { ApplicationException } from '../common/exceptions/application.exception';
import SHA from 'sha.js';
import jwt from 'jsonwebtoken';
import { Schema } from 'joi';
import { IdentityRepository } from './repositories/identity.repository';
import { Identity } from './repositories/domain/identity';
const JoiValidations = require('./validation/identity.schema');

export class IdentityService {
    constructor(
        private readonly identityRepository: IdentityRepository
    ) { }

    async getAll(): Promise<Identity[]> {

        const users = await this.identityRepository.all();
        return users;
    }

    async authenticate(email: string, password: string): Promise<string> {
        const validateSchema: Schema = JoiValidations.identityAuthenticateSchema;
        try {
            await validateSchema.validateAsync({email, password});
        } catch (error:any) {
            throw new ApplicationException(error)
        }

        // Hash passowrd
        password = SHA('sha256').update(password).digest('base64');

        const validUser = await this.identityRepository.find(email, password);
        if(validUser){
            if (process.env.jwt_secret_key) {
                const secretKey: string = process.env.jwt_secret_key;
                return jwt.sign({
                    id: validUser.id,
                    email: validUser.email
                }, secretKey, { expiresIn: '7h' });
            } else {
                throw new Error('Secret key is not defined.');
            }
        }
        

        throw new ApplicationException('Invalid user credentials supplied.');
    }

    async create(user: UserCreateDto): Promise<void> {

        const validateSchema: Schema = JoiValidations.identityCreateSchema;
        try {
            await validateSchema.validateAsync(user);
        } catch (error:any) {
            throw new ApplicationException(error)
        }

        //unique email check
        const alreadyExistsUser = await this.identityRepository.find(user.email, null);
        if(alreadyExistsUser) throw new ApplicationException('Email already exists.')

        // Hash password
        user.password = SHA('sha256').update(user.password).digest('base64');

        await this.identityRepository.create(user);
    }

}
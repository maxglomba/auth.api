import connection from '../common/persistence/persistence.mysql';
import { UserCreateDto } from '../dtos/user.dto';
import { ApplicationException } from '../common/exceptions/application.exception';
import SHA from 'sha.js';
import jwt from 'jsonwebtoken';
import { Schema } from 'joi';
const JoiValidations = require('./validation/identity.schema');

export class IdentityService {
    async authenticate(email: string, password: string): Promise<string> {
        const validateSchema: Schema = JoiValidations.identityAuthenticateSchema;
        try {
            await validateSchema.validateAsync({email, password});
        } catch (error:any) {
            throw new ApplicationException(error)
        }

        const con = await connection;
        // Hash passowrd
        password = SHA('sha256').update(password).digest('base64');
        const [rows]: any[] = await con.execute(
            'SELECT * FROM auth_user WHERE email = ? AND password = ?',
            [email, password]
        );

        if (process.env.jwt_secret_key) {
            const secretKey: string = process.env.jwt_secret_key;

            if (rows.length) {

                return jwt.sign({
                    id: rows[0].id,
                    email: rows[0].email
                }, secretKey, { expiresIn: '7h' });
            }
        } else {
            throw new Error('Secret key is not defined.');
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

        const con = await connection;
        const userExists = await this.checkUserExists(user);
        if (userExists) throw new ApplicationException('Email already exists.')
        // Hash password
        user.password = SHA('sha256').update(user.password).digest('base64');

        await con.execute(
            'INSERT INTO auth_user(email, password, created_at) VALUES(?, ?, ?)',
            [user.email, user.password, new Date()]
        );
    }

    private async checkUserExists(user: UserCreateDto): Promise<Boolean> {
        const con = await connection;

        const result = await con.execute(
            'SELECT * FROM auth_user WHERE email = ?',
            [user.email]
        );
        if (result) {
            return true;
        }
        return false;
    }
}
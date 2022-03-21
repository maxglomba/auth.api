import { Request, Response } from 'express';
import { route, POST, GET } from 'awilix-express';
import { IdentityService } from '../services/identity.service';
import { BaseController } from '../common/controllers/base.controller';
import { UserPayloadDto } from '../dtos/user.dto';

@route('/identity')
export default class IdentityController extends BaseController {
    constructor(private identityService: IdentityService) {
        super();
    }

/**
 * @swagger
 * components:
 *  schemas:
 * 
 *   User:
 *    type: object
 *    properties:
 *     id: 
 *      type: string
 *      description: the auto-generated id of user
 *     email:
 *      type: string
 *      description: the name of the user
 *     created_at:
 *      type: date | null
 *      description: the date when the user was created
 *     updated_at:
 *      type: date | null
 *      description: the date when the user was updated
 *    required:
 *     - email
 *    example:
 *     id: 1
 *     email: testuser@gmail.com
 *     created_at: 2022-03-20T01:21:31.607Z
 *     updated_at: null
 * 
 *   UserPayload:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      description: the name of the user
 *     password:
 *      type: string
 *      description: the password to the user
 *    required:
 *     - email
 *     - password
 *    example:
 *     email: testuser@gmail.com
 *     password: test1234
 *    responses:
 *     200:
 *      description: Success
*/

/**
 * @swagger
 * /identity/users:
 *  get:
 *   summary: Get all users registered
 *   tags: [Users]
 *   responses:
 *    200:
 *     description: the list of users
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 *         
 *         
 */
    @route('/users')
    @GET()
    async all(req: Request, res: Response) {
        const result = await this.identityService.getAll();
        res.send(result);
    }

/**
 * @swagger
 * /identity/authenticate:
 *  post:
 *   description: Authenticate user in platform
 *   requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UserPayload'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      text/plain:
 *       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJpYXQiOjE2NDc4ODU3MjUsImV4cCI6MTY0NzkxMDkyNX0.VKVLsYkBTl0HX4pMY0UYxc7hu2kaUflQWom1vC0iOPI
 *    401:
 *     description: Unauthorized
 *    400:
 *     description: Bad Request
 */
    @route('/authenticate')
    @POST()
    async index(req: Request, res: Response) {
        try {
            const result = await this.identityService.authenticate(
                req.body.email, req.body.password
            );
            res.send(result);
        } catch (error) {
            this.handleException(error, res);
        }
    }
/**
 * @swagger
 * /identity/create:
 *  post:
 *   description: Create user in platform
 *   requestBody:
 *     content:
 *      application/json:
 *       schema:
 *         $ref: '#/components/schemas/UserPayload'
 *   responses:
 *    204:
 *     description: Success
 *    400:
 *     description: Invalid Email
 *     content:
 *      text/plain:
 *       type: string
 *       description: Invalid email message
 *       example: Email already exists.
 */
    @route('/create')
    @POST()
    async create(req: Request, res: Response) {
        try {
            await this.identityService.create({
                email: req.body.email,
                password: req.body.password
            } as UserPayloadDto);

            res.status(204);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const awilix_express_1 = require("awilix-express");
const identity_service_1 = require("../services/identity.service");
const base_controller_1 = require("../common/controllers/base.controller");
let IdentityController = class IdentityController extends base_controller_1.BaseController {
    constructor(identityService) {
        super();
        this.identityService = identityService;
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
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.identityService.getAll();
            res.send(result);
        });
    }
    /**
     * @swagger
     * /identity/authenticate:
     *  post:
     *   description: Authenticate user in platform
     *   requestBody:
     *    required: true
     *    content:
     *     application/json:
     *      schema:
     *       $ref: '#/components/schemas/UserPayload'
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
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.identityService.authenticate(req.body.email, req.body.password);
                res.send(result);
            }
            catch (error) {
                this.handleException(error, res);
            }
        });
    }
    /**
     * @swagger
     * /identity/create:
     *  post:
     *   description: Create user in platform
     *   requestBody:
     *     required: true
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.identityService.create({
                    email: req.body.email,
                    password: req.body.password
                });
                res.status(204);
                res.send();
            }
            catch (error) {
                this.handleException(error, res);
            }
        });
    }
};
__decorate([
    awilix_express_1.route('/users'),
    awilix_express_1.GET(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "all", null);
__decorate([
    awilix_express_1.route('/authenticate'),
    awilix_express_1.POST(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "index", null);
__decorate([
    awilix_express_1.route('/create'),
    awilix_express_1.POST(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "create", null);
IdentityController = __decorate([
    awilix_express_1.route('/identity'),
    __metadata("design:paramtypes", [identity_service_1.IdentityService])
], IdentityController);
exports.default = IdentityController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const awilix_express_1 = require("awilix-express");
const identity_service_1 = require("./services/identity.service");
//MSSQL
//import { IdentityMSSQLRepository } from './services/repositories/impl/mssql/identity.repository';
//MYSQL
//import { IdentityMYSQLRepository } from './services/repositories/impl/mysql/identity.repository';
//MOCK
const identity_repository_1 = require("./services/repositories/impl/mock/identity.repository");
exports.default = (app) => {
    const container = awilix_1.createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        //REPOSITORIES
        //MSSQL
        //identityRepository: asClass(IdentityMSSQLRepository).scoped(),
        //MSYSQL
        //identityRepository: asClass(IdentityMYSQLRepository).scoped(),
        //MOCK
        identityRepository: awilix_1.asClass(identity_repository_1.IdentityMOCKRepository).scoped(),
        //SERVICES
        identityService: awilix_1.asClass(identity_service_1.IdentityService).scoped()
    });
    app.use(awilix_express_1.scopePerRequest(container));
};

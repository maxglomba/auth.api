import { Application } from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { IdentityService } from './services/identity.service';
//MSSQL
//import { IdentityMSSQLRepository } from './services/repositories/impl/mssql/identity.repository';
//MYSQL
//import { IdentityMYSQLRepository } from './services/repositories/impl/mysql/identity.repository';
//MOCK
import { IdentityMOCKRepository } from './services/repositories/impl/mock/identity.repository';

export default (app: Application) => {
    const container = createContainer({
        injectionMode: "CLASSIC"
    });

    container.register({
        //REPOSITORIES
        //MSSQL
        //identityRepository: asClass(IdentityMSSQLRepository).scoped(),
        //MSYSQL
        //identityRepository: asClass(IdentityMYSQLRepository).scoped(),
        //MOCK
        identityRepository: asClass(IdentityMOCKRepository).scoped(),

        //SERVICES
        identityService: asClass(IdentityService).scoped()
    });

    app.use(scopePerRequest(container));
}
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

// Env files
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

import express from 'express';
import { json } from 'express';
import { loadControllers } from 'awilix-express';
import container from './container';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tasks API',
            version: '1.0.0',
            description: 'A simple express library API'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis: ['./src/controllers/*.ts']
        
};

// Create a new express app instance
const app: express.Application = express();

if(process.env.APP_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(json());

// Load dependencies
container(app);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

console.log(__dirname);
// Load controllers
app.use(loadControllers(
    'controllers/*.js',
    { cwd: __dirname })
);

export { app };
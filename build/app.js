"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';
// Env files
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const awilix_express_1 = require("awilix-express");
const container_1 = __importDefault(require("./container"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
const app = express_1.default();
exports.app = app;
if (process.env.APP_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
app.use(express_2.json());
// Load dependencies
container_1.default(app);
const swaggerDocs = swagger_jsdoc_1.default(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
console.log(__dirname);
// Load controllers
app.use(awilix_express_1.loadControllers('controllers/*.js', { cwd: __dirname }));

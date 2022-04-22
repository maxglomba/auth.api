"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const config = {
    server: process.env.db_mssql_server,
    database: process.env.db_mssql_database,
    user: process.env.db_mssql_user,
    password: process.env.db_mssql_password,
    options: {
        enableArithAbort: true,
        trustServerCertificate: true
    }
};
exports.default = new mssql_1.ConnectionPool(config).connect();

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityMSSQLRepository = void 0;
const mssql_persistence_1 = __importDefault(require("../../../../common/persistence/mssql.persistence"));
class IdentityMSSQLRepository {
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_persistence_1.default;
            const result = yield pool.query `SELECT id, email, created_at, updated_at FROM auth_user`;
            return result.recordset;
        });
    }
    find(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_persistence_1.default;
            let result;
            if (password) {
                result = yield pool.query `SELECT TOP 1 * FROM auth_user WHERE email = ${email} AND password = ${password} `;
            }
            else {
                result = yield pool.query `SELECT TOP 1 * FROM auth_user WHERE email = ${email} `;
            }
            if (result) {
                return result.recordset[0];
            }
            return null;
        });
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_persistence_1.default;
            yield pool.query `INSERT INTO auth_user(email, password, created_at) VALUES(${entry.email}, ${entry.password}, ${new Date})`;
        });
    }
}
exports.IdentityMSSQLRepository = IdentityMSSQLRepository;

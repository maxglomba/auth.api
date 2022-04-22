"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const application_exception_1 = require("../exceptions/application.exception");
class BaseController {
    handleException(err, res) {
        if (err instanceof application_exception_1.ApplicationExceptions) {
            res.status(400);
            res.send(err.message);
        }
        else {
            throw new Error(err);
        }
    }
}
exports.BaseController = BaseController;

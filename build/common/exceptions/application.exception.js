"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationExceptions = void 0;
class ApplicationExceptions extends Error {
    constructor(message = 'An unexpected error ocurred.') {
        super(message);
    }
}
exports.ApplicationExceptions = ApplicationExceptions;

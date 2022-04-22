"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = {
    users: [
        {
            id: 1,
            email: 'testuser@gmail.com',
            password: 'k36NX7tIvUlJU2zWW401xCa4DS+DDFwwjizexCKuIkQ=',
            created_at: new Date('2022-03-19 22:21:31.607'),
            updated_at: null
        }
    ],
    _userId: 0
};
db._userId = db.users.length;
exports.default = db;

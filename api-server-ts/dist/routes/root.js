"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(fastify, opts) {
    fastify.get('/', async function (request, reply) {
        return { root: true };
    });
}
exports.default = default_1;

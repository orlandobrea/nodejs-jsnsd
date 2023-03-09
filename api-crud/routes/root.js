"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    reply.status(404);
    return { message: "Try with /posts" };
  });
};

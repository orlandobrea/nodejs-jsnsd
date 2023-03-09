"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    reply.header("developer", "Orlando Brea");
    reply.header("toRemove", "This will be removed");
    console.log(reply.getHeaders());
    reply.removeHeader("toRemove");
    return { root: true };
  });
};

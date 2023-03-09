"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register((fastify, opts, done) => {
    fastify.get("/plugin", (request, reply) => {
      reply.status(201);
      return { message: "Plugin response" };
    });
    done(); // Loading done
  });
});

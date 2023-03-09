"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/cors"), {
    origin: (o, cb) => {
      console.log(o);
      cb(null, "http://localhost:6000");
    },
    methods: "GET,POST,PUT,DELETE"
  });
});

"use strict";

module.exports = async function (fastify, opts) {
  fastify.get(
    "/",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
          additionalProperties: false,
        },
      },
    },
    async function (request, reply) {
      console.log(request.query);
      return reply.view("test", {
        name: request.query.name || "Sin Nombre",
        date: new Date(),
      });
    }
  );
};

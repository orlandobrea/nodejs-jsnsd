"use strict";

module.exports = async function (fastify, opts) {
  fastify.get(
    "/params/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: { id: { type: "number" } },
          additionalProperties: false,
        },
        querystring: {
          type: "object",
          properties: { q: { type: "string" } },
          additionalProperties: false,
        },
      },
    },
    async function (request, reply) {
      return {
        params: request.params,
        query: request.query,
      };
    }
  );
};

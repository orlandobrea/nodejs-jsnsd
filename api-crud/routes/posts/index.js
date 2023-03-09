"use strict";
const {
  list,
  get,
  create,
  update,
  remove,
} = require("../../services/postsService");

module.exports = async function (fastify, opts) {
  const listRequest = {
    schema: {
      params: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      query: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      response: {
        200: {
          type: "array",
          items: {
            properties: {
              id: { type: "number" },
              title: { type: "string" },
              body: { type: "string" },
            },
            additionalProperties: false,
          },
        },
      },
    },
  };
  fastify.get("/", listRequest, async function (request, reply) {
    const data = await list();
    return data;
  });

  const getOneRequest = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
        additionalProperties: false,
      },
      query: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "number" },
            title: { type: "string" },
            body: { type: "string" },
          },
          additionalProperties: false,
        },
      },
    },
  };
  fastify.get("/:id", getOneRequest, async function (request, reply) {
    const { id } = request.params;
    const data = await get(id);
    return data;
  });

  const createRequest = {
    schema: {
      params: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      query: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      body: {
        type: "object",
        properties: {
          id: { type: "number" },
          title: { type: "string" },
          body: { type: "string" },
        },
        required: ["id", "title"],
        additionalProperties: false,
      },
      response: {
        201: {
          properties: {
            status: { type: "string" },
          },
          additionalProperties: false,
        },
      },
    },
  };
  fastify.post("/", createRequest, async function (request, reply) {
    const data = request.body;
    await create(data);
    reply.status(201);
    return { status: "ok" };
  });
  const updateRequest = {
    schema: {
      params: {
        type: "object",
        properties: { id: { type: "number" } },
        additionalProperties: false,
      },
      query: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      body: {
        type: "object",
        properties: {
          title: { type: "string" },
          body: { type: "string" },
        },
        required: ["title"],
        additionalProperties: false,
      },
      response: {
        200: {
          properties: {
            status: { type: "string" },
          },
          additionalProperties: false,
        },
      },
    },
  };
  fastify.put("/:id", updateRequest, async function (request, reply) {
    const { id } = request.params;
    const data = request.body;
    console.log(id, data);
    await update(id, data);
    reply.status(200);
    return { status: "ok" };
  });
  const removeRequest = {
    schema: {
      params: {
        type: "object",
        properties: { id: { type: "number" } },
        additionalProperties: false,
      },
      query: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      response: {
        200: {
          properties: {
            status: { type: "string" },
          },
          additionalProperties: false,
        },
      },
    },
  };
  fastify.delete("/:id", removeRequest, async function (request, reply) {
    const { id } = request.params;
    await remove(id);
    reply.status(200);
    return { status: "ok" };
  });
};

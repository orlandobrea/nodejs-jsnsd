"use strict";
const axios = require("axios");
const fastify = require("fastify");

class ErrorWithCode extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

async function getProductsInCategory(category) {
  try {
    const res = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    return res.data.products;
  } catch (e) {
    if (e.response.status === 404)
      throw new ErrorWithCode("NOT_FOUND", "Category not found", 400);
    throw e;
  }
}

async function getProducts(q) {
  try {
    const res = await axios.get(`https://dummyjson.com/products/search?q=${q}`);
    return res.data.products;
  } catch (e) {
    if (e.response.status === 404)
      throw new ErrorWithCode("NOT_FOUND", "Category not found", 400);
    throw e;
  }
}

async function addProductsInCategory(products) {
  return Promise.all(
    products.map(async (product) => {
      product.similar = await getProductsInCategory(product.category);
      return product;
    })
  );
}

module.exports = async function (fastify, opts) {
  // Get all products that matches the q in name
  //
  fastify.get(
    "/",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            q: {
              type: "string",
            },
          },
          additionalProperties: false,
        },
      },
    },
    async function (request, reply) {
      try {
        const { q } = request.query;
        if (!q) {
          reply.status(400);
          return { message: "q is required" };
        }
        return await addProductsInCategory(await getProducts(q));
      } catch (e) {
        if (e.code === "NOT_FOUND") {
          return reply.notFound(e.message);
        }
      }
    }
  );
};

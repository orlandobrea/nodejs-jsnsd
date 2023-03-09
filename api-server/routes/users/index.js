"use strict";

const { default: got } = require("got/dist/source");

async function get(endpoint) {
  console.log(`https://jsonplaceholder.typicode.com/${endpoint}`);
  const data = await got
    .get(`https://jsonplaceholder.typicode.com/${endpoint}`)
    .json();
  return data;
}

module.exports = async function (fastify, opts) {
  fastify.get(
    "/:id",
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
      try {
        console.log(request.params);
        console.log(request.query);
        const { id } = request.params;
        const user = await get(`users/${id}`);
        const posts = await get(`users/${id}/posts`);
        const postsComments = await Promise.all(
          posts.map((aPost) => get(`/posts/${aPost.id}/comments`))
        );

        // /users/:id
        // /users/:id/posts
        // /posts/:postId/comments
        return {
          ...user,
          posts: posts.map((aPost, idx) => ({
            ...aPost,
            comments: postsComments[idx],
          })),
        };
      } catch (e) {
        console.log(
          "----------------------------",
          e,
          "-------------------------",
          e.code
        );
        reply.statusCode = 400;
        return { status: "error" };
      }
    }
  );
};

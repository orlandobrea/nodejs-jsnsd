export default async function (fastify: any, opts: any) {
  fastify.get('/', async function (request: any, reply: any) {
    return { root: true }
  })
}

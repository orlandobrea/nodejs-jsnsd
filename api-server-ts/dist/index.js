/* import fastify from 'fastify'

const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
}) */
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
// const path = require('path')
// const AutoLoad = require('@fastify/autoload')
module.exports = async function (fastify, opts) {
    // Place here your custom code!
    // Do not touch the following lines
    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(autoload_1.default, {
        dir: path_1.default.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    });
    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(autoload_1.default, {
        dir: path_1.default.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    });
};

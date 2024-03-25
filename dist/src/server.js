"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const database_1 = require("./database");
const fastify_1 = __importDefault(require("fastify"));
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const crypto_1 = require("crypto");
const app = (0, fastify_1.default)().withTypeProvider();
app.post('/product', {
    schema: {
        body: type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.String(),
            name: type_provider_typebox_1.Type.String(),
            description: type_provider_typebox_1.Type.String(),
            price: type_provider_typebox_1.Type.Number(),
            isSale: type_provider_typebox_1.Type.Boolean(),
            createdAt: type_provider_typebox_1.Type.Date(),
        }),
    },
}, async (request, reply) => {
    const products = await (0, database_1.knex)('products')
        .insert({
        id: (0, crypto_1.randomUUID)(),
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        isSale: request.body.isSale,
    })
        .returning('*');
    reply.status(200).send(products);
});
app.get('/list', async (request, reply) => {
    const products = await (0, database_1.knex)('sqlite_schema').select('*').returning('*');
    reply.send(products);
});
app.listen({ port: env_1.env.PORT, host: env_1.env.HOST }, () => console.log('server is up!'));

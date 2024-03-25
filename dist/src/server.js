"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const database_1 = require("./database");
const crypto_1 = require("crypto");
const fastify_1 = require("fastify");
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const app = (0, fastify_1.fastify)().withTypeProvider();
app.get('/', (request, response) => {
    const ROUTES = [
        {
            '/': {
                url: env_1.env.HOME_ROUTE,
                route: env_1.env.HOME_ROUTE,
                desc: 'Adicione um novo produto no banco de dados',
            },
            list: {
                url: env_1.env.ENDPOINT_LIST_ALLPRODUCTS,
                route: env_1.env.GET_LIST_ROUTE,
                desc: 'Rota para listar todos os produtos cadastrados',
            },
            create: {
                url: env_1.env.ENDPOINT_POST_PRODUCTS,
                route: env_1.env.NEW_PRODUCT_ROUTE,
                desc: 'Adicione um novo produto no banco de dados',
            },
        },
    ];
    response.send(ROUTES);
});
app.post(env_1.env.NEW_PRODUCT_ROUTE, {
    schema: {
        body: type_provider_typebox_1.Type.Object({
            name: type_provider_typebox_1.Type.String(),
            description: type_provider_typebox_1.Type.String(),
            price: type_provider_typebox_1.Type.Number(),
            isSale: type_provider_typebox_1.Type.Boolean(),
        }),
    },
}, async (request, reply) => {
    // const lastProductRegistered =
    await (0, database_1.knex)('products')
        .insert({
        id: (0, crypto_1.randomUUID)(),
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        isSale: request.body.isSale,
    })
        .returning('*');
    const allProducts = await (0, database_1.knex)('products').select('*').returning('*');
    reply.status(200).send(allProducts);
});
app.get(env_1.env.GET_LIST_ROUTE, async (request, reply) => {
    const allProducts = await (0, database_1.knex)('products').select('*').returning('*');
    reply.send(allProducts);
});
app.listen({ port: env_1.env.PORT, host: env_1.env.HOST }, () => console.log('server is up!'));

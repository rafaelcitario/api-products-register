import { env } from './env'
import { knex } from './database'
import { randomUUID } from 'crypto'
import { fastify } from 'fastify'
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

const app = fastify().withTypeProvider<TypeBoxTypeProvider>()

app.get('/', (request, response) => {
  const ROUTES = [
    {
      '/': {
        url: env.HOME_ROUTE,
        route: env.HOME_ROUTE,
        desc: 'Adicione um novo produto no banco de dados',
      },
      list: {
        url: env.ENDPOINT_LIST_ALLPRODUCTS,
        route: env.GET_LIST_ROUTE,
        desc: 'Rota para listar todos os produtos cadastrados',
      },
      create: {
        url: env.ENDPOINT_POST_PRODUCTS,
        route: env.NEW_PRODUCT_ROUTE,
        desc: 'Adicione um novo produto no banco de dados',
      },
    },
  ]
  response.send(ROUTES)
})

app.post(
  env.NEW_PRODUCT_ROUTE,
  {
    schema: {
      body: Type.Object({
        name: Type.String(),
        description: Type.String(),
        price: Type.Number(),
        isSale: Type.Boolean(),
      }),
    },
  },
  async (request, reply) => {
    // const lastProductRegistered =
    await knex('products')
      .insert({
        id: randomUUID(),
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        isSale: request.body.isSale,
      })
      .returning('*')

    const allProducts = await knex('products').select('*').returning('*')
    reply.status(200).send(allProducts)
  },
)

app.get(env.GET_LIST_ROUTE, async (request, reply) => {
  const allProducts = await knex('products').select('*').returning('*')
  reply.send(allProducts)
})

app.listen({ port: env.PORT, host: env.HOST }, () =>
  console.log('server is up!'),
)

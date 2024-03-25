import { env } from './env'
import { knex } from './database'
import fastify from 'fastify'
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { randomUUID } from 'crypto'

const app = fastify().withTypeProvider<TypeBoxTypeProvider>()

app.post(
  '/product',
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

app.get('/list', async (request, reply) => {
  const allProducts = await knex('products').select('*').returning('*')
  reply.send(allProducts)
})

app.listen({ port: env.PORT, host: env.HOST }, () =>
  console.log('server is up!'),
)

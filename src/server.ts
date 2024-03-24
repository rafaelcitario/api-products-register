import fastify from 'fastify'
import { env } from './env'
import { knex } from './database'
import { randomUUID } from 'crypto'
import { orderProductsByPrice } from '../service/orderedListProducts'
const app = fastify()

app.post('/product', async (request, response) => {
  await knex('products')
    .insert({
      id: randomUUID(),
      name: request.body.name,
      price: request.body.price,
      isSale: request.body.isSale,
    })
    .returning('*')
  return response.send(await orderProductsByPrice())
})

app.get('/list', async (request, response) => {
  return response.send(await orderProductsByPrice())
})

app.listen({ port: env.PORT, host: env.HOST }, () =>
  console.log('server is up!'),
)

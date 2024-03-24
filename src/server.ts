import fastify from 'fastify'
import { env } from './env'
import { knex } from './database'
const app = fastify()

app.post('/product', async (request, response) => {
  const { name, price, isSale } = request.body
  const product = {}

  const products = await knex('products').insert({ product }).returning('*')
  return response.send(products)
})

app.get('/list', async (request, response) => {
  return response.send(await knex('products').select('*'))
})
app.listen({ port: env.PORT, host: env.HOST }, () =>
  console.log('server is up!'),
)

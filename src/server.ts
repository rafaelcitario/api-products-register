import fastify, { RequestBodyDefault } from 'fastify'
import { env } from './env'
import { knex } from './database'
const app = fastify()

app.post('/product', async (request, response) => {
  const { name, price } = request.body

  const products = await knex('products')
    .insert({
      id: crypto.randomUUID(),
      name,
      price,
    })
    .returning('*')
  return response.send(products)
  // ------------------------------------------
  // products.uuid('id').primary().index()
  // products.text('name').notNullable()
  // products.decimal('price', 10, 2).notNullable()
  // products.timestamp('created_at').defaultTo(knex.fn.now())
})

app.get('/list', async () => {
  return await knex('products').select('*')
})

app.listen({ port: env.PORT, host: env.HOST }, () =>
  console.log('server is up!'),
)

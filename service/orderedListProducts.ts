import { knex } from '../src/database'

export async function orderProductsByPrice() {
  const nameAndPrice = await knex('products').select('name', 'price')
  const productsByOrderPrice = nameAndPrice.sort((a, b) => {
    return a.price - b.price
  })
  return productsByOrderPrice
}

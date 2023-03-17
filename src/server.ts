import fastify from 'fastify'

import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  console.log('render')

  const tables = await knex('sqlite_schema').select('*')

  console.log('render 2')

  return tables
})

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server is running!'))

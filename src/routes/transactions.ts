import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { amount, title, type } = createTransactionBodySchema.parse(
      request.body,
    )

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1, // The debit is saved as negative.
    })

    console.log('created')

    return reply.status(201).send()
  })
}

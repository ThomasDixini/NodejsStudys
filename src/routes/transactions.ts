import { type FastifyInstance } from 'fastify'
import { k } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export async function transactionsRoute(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await k('transactions').select()

    return {
      transactions,
    }
  })

  app.get('/:id', async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await k('transactions').where('id', id).first()

    return {
      transaction,
    }
  })

  app.get('/summary', async () => {
    const summary = await k('transactions')
      .sum('amount', {
        as: 'amount',
      })
      .first()

    return {
      summary,
    }
  })

  app.post('/', async (req, res) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1 * 60 * 60 * 24 * 7, // 7days
      })
    }

    await k('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return await res.status(201).send()
  })
}

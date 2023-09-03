import { FastifyInstance } from "fastify"
import { k } from "../database"
import { z } from "zod"
import { randomUUID } from "crypto"

export async function transactionsRoute(app: FastifyInstance) {
    app.post('/', async (req, res) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type } = createTransactionBodySchema.parse(req.body)

        await k('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
        })

        return res.status(201).send()
    })
}
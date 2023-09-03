import { FastifyInstance } from "fastify"
import { k } from "../database"

export async function transactionsRoute(app: FastifyInstance) {
    app.get('/', async () => {
        const test = await k('sqlite_schema').select('*')
    
        return test
    })
}
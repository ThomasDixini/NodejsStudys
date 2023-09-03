import { fastify } from 'fastify'
import { k } from './database'
import { transactionsRoute } from './routes/transactions'

const app = fastify()

app.register(transactionsRoute)

app.listen({
    port: 3333,
}).then(() => {
    return console.log('HTTPs Server Running!')
})
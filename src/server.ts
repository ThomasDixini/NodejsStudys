import { fastify } from 'fastify'
import { transactionsRoute } from './routes/transactions'

const app = fastify()

app.register(transactionsRoute, {
  prefix: 'transactions',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTPs Server Running!')
  })

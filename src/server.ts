import { fastify } from 'fastify'
import { k } from './database'

const app = fastify()

app.get('/', async () => {
    const test = await k('sqlite_schema').select('*')

    return test
})

app.listen({
    port: 3333,
}).then(() => {
    return console.log('HTTPs Server Running!')
})
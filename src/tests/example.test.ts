import { describe, test } from 'vitest'
import supertest from 'supertest'
import { app } from '../server'

const request = supertest

describe('Transações', () => {
  test('Deve ser capaz de criar uma transação', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Teste',
        amount: 2000,
        type: 'credit',
      })
      .expect(201)
  })

  test('Deve ser capaz de listar todas as transações', async () => {
    const transactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Teste',
        amount: 2000,
        type: 'credit',
      })

    const cookies = transactionResponse.get('Set-Cookie')

    await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)
  })
})

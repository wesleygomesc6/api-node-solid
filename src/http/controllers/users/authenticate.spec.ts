import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Snow',
      email: 'john@snow.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'john@snow.com',
      password: '123456',
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should not be able to authenticate whith invalid credentials', async () => {
    await request(app.server).post('/users').send({
      name: 'John Snow',
      email: 'john@snow.com',
      password: '123456',
    })

    const responsePassword = await request(app.server).post('/sessions').send({
      email: 'john@snow.com',
      password: '1234567',
    })
    const responseEmail = await request(app.server).post('/sessions').send({
      email: 'john@snow.com.br',
      password: '123456',
    })

    expect(responsePassword.statusCode).toEqual(400)
    expect(responseEmail.statusCode).toEqual(400)
  })
})

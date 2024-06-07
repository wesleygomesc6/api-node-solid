import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Jonh Snow',
      email: 'john@snow.com',
      password_hash: await hash('johnsnow', 6),
    })

    const { user } = await sut.execute({
      email: 'john@snow.com',
      password: 'johnsnow',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate whit wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'john@snow.com',
        password: 'johnsnow',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate whit wrong password', async () => {
    await usersRepository.create({
      name: 'Jonh Snow',
      email: 'john@snow.com',
      password_hash: await hash('johnsnow', 6),
    })

    expect(() =>
      sut.execute({
        email: 'john@snow.com',
        password: 'johnsno',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

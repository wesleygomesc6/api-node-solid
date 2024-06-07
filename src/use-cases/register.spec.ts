import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository()
  sut = new RegisterUseCase(usersRepository)
})

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Snow',
      email: 'john@snow.com',
      password: 'johnsnow',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Snow',
      email: 'john@snow.com',
      password: 'johnsnow',
    })

    const isPasswordCorrectlyHashed = await compare(
      'johnsnow',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john@snow.com'

    await sut.execute({
      name: 'John Snow',
      email,
      password: 'johnsnow',
    })

    await expect(() =>
      sut.execute({
        name: 'John Snow',
        email,
        password: 'johnsnow',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

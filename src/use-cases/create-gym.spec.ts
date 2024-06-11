import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

beforeEach(() => {
  gymsRepository = new InMemoryGymsRepository()
  sut = new CreateGymUseCase(gymsRepository)
})

describe('Create Gym Use Case', () => {
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Minha Gym',
      description: 'A melhor do mundo',
      phone: '62999707070',
      latitude: -16.6830525,
      longitude: -49.2537338,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

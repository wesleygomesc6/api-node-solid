import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let searchGymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

beforeEach(async () => {
  searchGymsRepository = new InMemoryGymsRepository()
  sut = new SearchGymsUseCase(searchGymsRepository)
})

describe('Search Gyms Use Case', () => {
  it('should be able to search for gyms', async () => {
    await searchGymsRepository.create({
      title: 'JavaScript Gym',
      description: 'A melhor do mundo',
      phone: '62999707070',
      latitude: -16.6830525,
      longitude: -49.2537338,
    })
    await searchGymsRepository.create({
      title: 'TypeSript Gym',
      description: 'A melhor do mundo',
      phone: '62999707070',
      latitude: -16.6830525,
      longitude: -49.2537338,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await searchGymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: 'A melhor do mundo',
        phone: '62999707070',
        latitude: -16.6830525,
        longitude: -49.2537338,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})

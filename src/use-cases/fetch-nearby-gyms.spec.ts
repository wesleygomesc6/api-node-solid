import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let searchGymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

beforeEach(async () => {
  searchGymsRepository = new InMemoryGymsRepository()
  sut = new FetchNearbyGymsUseCase(searchGymsRepository)
})

describe('Fetch Nearby Gyms Use Case', () => {
  it('should be able fetch nearby gyms', async () => {
    await searchGymsRepository.create({
      title: 'Near Gym',
      description: 'A melhor do mundo',
      phone: '62999707070',
      latitude: -16.6830525,
      longitude: -49.2537338,
    })
    await searchGymsRepository.create({
      title: 'Far Gym',
      description: 'A melhor do mundo',
      phone: '62999707070',
      latitude: -16.770477,
      longitude: -49.3098403,
    })

    const { gyms } = await sut.execute({
      userLatitude: -16.6830525,
      userLongitude: -49.2537338,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})

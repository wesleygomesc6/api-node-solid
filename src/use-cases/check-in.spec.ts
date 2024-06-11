import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase
let gymsRepository: InMemoryGymsRepository

beforeEach(async () => {
  checkInRepository = new InMemoryCheckInRepository()
  gymsRepository = new InMemoryGymsRepository()
  sut = new CheckInUseCase(checkInRepository, gymsRepository)
  vi.useFakeTimers()

  await gymsRepository.create({
    id: 'qualquer',
    title: 'Node Gym',
    description: 'Curso de node js',
    phone: '',
    // crea
    latitude: -16.6830525,
    longitude: -49.2537338,
  })
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Check-in Use Case', () => {
  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2024, 5, 10, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'qualquer',
      userId: 'coisa',
      userLatiture: -16.6830525,
      userLongitude: -49.2537338,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 5, 10, 8, 0, 0))

    await sut.execute({
      gymId: 'qualquer',
      userId: 'coisa',
      userLatiture: -16.6830525,
      userLongitude: -49.2537338,
    })

    await expect(() =>
      sut.execute({
        gymId: 'qualquer',
        userId: 'coisa',
        userLatiture: -16.6830525,
        userLongitude: -49.2537338,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 5, 10, 8, 0, 0))

    await sut.execute({
      gymId: 'qualquer',
      userId: 'coisa',
      userLatiture: -16.6830525,
      userLongitude: -49.2537338,
    })

    vi.setSystemTime(new Date(2024, 5, 9, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'qualquer',
      userId: 'coisa',
      userLatiture: -16.6830525,
      userLongitude: -49.2537338,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2024, 5, 10, 8, 0, 0))

    await gymsRepository.create({
      id: 'qualquer',
      title: 'Node Gym',
      description: 'Curso de node js',
      phone: '',
      // casa
      latitude: -16.678274,
      longitude: -49.235677,
    })

    await expect(() =>
      sut.execute({
        gymId: 'home',
        userId: 'coisa',
        userLatiture: -16.6830525,
        userLongitude: -49.2537338,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})

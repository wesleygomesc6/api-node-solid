import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

beforeEach(() => {
  checkInRepository = new InMemoryCheckInRepository()
  sut = new CheckInUseCase(checkInRepository)
})

describe('Check-in Use Case', () => {
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'qualquer',
      userId: 'coisa',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})

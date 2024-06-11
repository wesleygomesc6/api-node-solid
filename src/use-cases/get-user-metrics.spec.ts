import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

beforeEach(async () => {
  checkInRepository = new InMemoryCheckInRepository()
  sut = new GetUserMetricsUseCase(checkInRepository)
})

describe('Get User Metrics Use Case', () => {
  it('should be able to get check-ins count from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'qualquer',
      user_id: 'coisa',
    })
    await checkInRepository.create({
      gym_id: 'qualquer2',
      user_id: 'coisa',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'coisa',
    })

    expect(checkInsCount).toEqual(2)
  })
})

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

beforeEach(async () => {
  checkInRepository = new InMemoryCheckInRepository()
  sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
})

describe('Fetch Check-in History Use Case', () => {
  it('should be able to fetch check in history', async () => {
    await checkInRepository.create({
      gym_id: 'qualquer',
      user_id: 'coisa',
    })
    await checkInRepository.create({
      gym_id: 'qualquer2',
      user_id: 'coisa',
    })

    const { checkIns } = await sut.execute({
      userId: 'coisa',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'qualquer' }),
      expect.objectContaining({ gym_id: 'qualquer2' }),
    ])
  })

  it('should be able to fetch paginated check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `qualquer-${i}`,
        user_id: 'coisa',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'coisa',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'qualquer-21' }),
      expect.objectContaining({ gym_id: 'qualquer-22' }),
    ])
  })
})

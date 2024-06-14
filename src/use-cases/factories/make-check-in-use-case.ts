import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const gynsRepository = new PrismaGymsRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gynsRepository)

  return useCase
}

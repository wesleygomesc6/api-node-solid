import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gynsRepository = new PrismaGymsRepository()

  const useCase = new CreateGymUseCase(gynsRepository)

  return useCase
}

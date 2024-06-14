import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gynsRepository = new PrismaGymsRepository()

  const useCase = new SearchGymsUseCase(gynsRepository)

  return useCase
}

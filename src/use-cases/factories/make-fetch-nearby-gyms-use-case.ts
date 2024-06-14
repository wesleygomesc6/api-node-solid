import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyUseCase() {
  const gynsRepository = new PrismaGymsRepository()

  const useCase = new FetchNearbyGymsUseCase(gynsRepository)

  return useCase
}

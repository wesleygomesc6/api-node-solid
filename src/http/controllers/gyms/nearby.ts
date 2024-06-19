import { makeFetchNearbyUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQueryBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQueryBodySchema.parse(request.query)

  const fetchNeearbyGymsUseCase = makeFetchNearbyUseCase()

  const gyms = await fetchNeearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })
  return reply.status(200).send({ gyms })
}

import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCheckInRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  findByUserIdOndate(userId: string, date: Date): Promise<CheckIn | null> {
    // const checkIn = prisma.checkIn.findUnique({
    //   where: {
    //     user_id: userId,
    //     created_at: date,
    //   },
    // })

    // return checkIn
    throw new Error('Falta implementar o método')
  }

  async findManyByUserId(userId: string): Promise<CheckIn[]> {
    return await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
    })
  }
}

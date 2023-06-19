import {
  FindProblemsRepository,
  AddProblemRepository,
} from '@/data/protocols/db/problems'
import { FindProblemsInterface, AddProblemInterface } from '@/domain/usecases'
import prisma from '@/infra/db/prisma/helpers/client'

export class ProblemPrismaRepository
  implements FindProblemsRepository, AddProblemRepository
{
  async findMany(
    params: FindProblemsInterface.Params
  ): Promise<FindProblemsInterface.Result> {
    if (params.id) {
      const result = await prisma.problem.findUnique({
        where: {
          id: params.id,
        },
      })
      return result
    }

    const result = await prisma.problem.findMany()

    return result
  }

  async add(
    params: AddProblemInterface.Params
  ): Promise<AddProblemInterface.Result> {
    const result = await prisma.problem.create({
      data: {
        code: params.code,
        description: params.description,
      },
    })

    if (!result) throw new Error('Problem not created')

    return {
      id: result.id,
      code: result.code,
      description: result.description,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }
  }
}

import {
  FindProblemsRepository,
  AddProblemRepository,
} from '@/data/protocols/db/problems'
import { FindProblemsInterface, AddProblemInterface } from '@/domain/usecases'
import prisma from '@/infra/db/prisma/helpers/client'

export class ProblemPrismaRepository
  implements FindProblemsRepository, AddProblemRepository
{
  async findMany(): Promise<FindProblemsInterface.Result> {
    const result = await prisma.problem.findMany()

    return {
      statusCode: 200,
      body: result,
    }
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

    if (!result) {
      return {
        statusCode: 400,
        body: [
          {
            message: 'Problem not created',
          },
        ],
      }
    }

    return {
      statusCode: 201,
      body: result,
    }
  }
}

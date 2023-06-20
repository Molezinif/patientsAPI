import { FindProblemsInterface } from '@/domain/usecases'
import { Controller } from '@/presentation/protocols'

export class FindProblemsController implements Controller {
  constructor(private readonly findProblems: FindProblemsInterface) {}

  async handle() {
    const problems = await this.findProblems.findMany()

    if (!problems.body) {
      return {
        statusCode: 400,
        body: [
          {
            message: 'Problem(s) not found',
          },
        ],
      }
    }

    return { statusCode: 200, body: problems }
  }
}

export namespace FindProblemsController {
  export type Request = {}
}

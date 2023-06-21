import { FindProblemsInterface } from '@/domain/usecases'
import { Controller } from '@/presentation/protocols'

export class FindProblemsController implements Controller {
  constructor(private readonly findProblems: FindProblemsInterface) {}

  async handle() {
    const problems = await this.findProblems.findMany()

    return { statusCode: problems.statusCode, body: problems.body }
  }
}

export namespace FindProblemsController {
  export type Request = {}
}

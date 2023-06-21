import { FindProblemsInterface } from '@/domain/usecases'
import { serverError, success } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols'

export class FindProblemsController implements Controller {
  constructor(private readonly findProblems: FindProblemsInterface) {}

  async handle() {
    try {
      const problems = await this.findProblems.findMany()

      return success(problems)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FindProblemsController {
  export type Request = {}
}

import { FindProblemsInterface } from '@/domain/usecases'
import { Controller } from '@/presentation/protocols'

export class FindProblemsController implements Controller {
  constructor(private readonly findProblems: FindProblemsInterface) {}

  async handle(request: FindProblemsController.Request) {
    const { id } = request
    const problems = await this.findProblems.find({
      id: id ? Number(id) : undefined,
    })
    return { statusCode: 200, body: problems }
  }
}

export namespace FindProblemsController {
  export type Request = {
    id?: string
  }
}

import { AddProblemInterface } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class AddProblemsController implements Controller {
  constructor(private readonly findProblems: AddProblemInterface) {}

  async handle(request: AddProblemsController.Request): Promise<HttpResponse> {
    const { code, description } = request.body
    const problems = await this.findProblems.add({
      code,
      description,
    })
    return { statusCode: 200, body: problems }
  }
}

export namespace AddProblemsController {
  export interface Request extends HttpRequest {
    body: {
      code: string
      description: string
    }
  }
}

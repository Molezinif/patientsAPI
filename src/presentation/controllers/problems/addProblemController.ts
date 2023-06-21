import { AddProblemInterface } from '@/domain/usecases'
import {
  serverError,
  success,
  unprocessableEntity,
} from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  InputValidation,
} from '@/presentation/protocols'

export class AddProblemsController implements Controller {
  constructor(
    private readonly validation: InputValidation,
    private readonly findProblems: AddProblemInterface
  ) {}

  async handle(request: AddProblemsController.Request): Promise<HttpResponse> {
    try {
      const { code, description } = request.body

      const error = this.validation.validate(request.body)

      if (error) {
        return unprocessableEntity(error)
      }

      const problem = await this.findProblems.add({
        code,
        description,
      })

      return success(problem)
    } catch (error) {
      return serverError(error)
    }
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

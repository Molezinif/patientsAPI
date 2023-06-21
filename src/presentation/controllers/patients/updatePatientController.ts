import { UpdatePatientInterface } from '@/domain/usecases'
import { NotFoundError } from '@/presentation/errors'
import {
  notFound,
  serverError,
  success,
  unprocessableEntity,
} from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  InputValidation,
} from '@/presentation/protocols'

export class UpdatePatientController implements Controller {
  constructor(
    private readonly validation: InputValidation,
    private readonly UpdatePatient: UpdatePatientInterface
  ) {}

  async handle(request: UpdatePatientController.Request) {
    try {
      const { name, email, patientProblems } = request.body
      const { id } = request.params

      const error = this.validation.validate({
        ...request.params,
        ...request.body,
      })

      if (error) {
        return unprocessableEntity(error)
      }

      const patient = await this.UpdatePatient.update({
        body: {
          name,
          email,
          patientProblems,
        },
        params: {
          id: Number(id),
        },
      })

      if (!patient) {
        return notFound(new NotFoundError('Patient'))
      }

      return success(patient)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdatePatientController {
  export interface Request extends HttpRequest {
    params: {
      id: number
    }
    body: {
      name?: string
      email?: string
      patientProblems?: {
        problemId: number
      }[]
    }
  }
}

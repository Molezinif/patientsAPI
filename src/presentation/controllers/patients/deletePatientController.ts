import { DeletePatientInterface } from '@/domain/usecases'
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

export class DeletePatientController implements Controller {
  constructor(
    private readonly validation: InputValidation,
    private readonly DeletePatient: DeletePatientInterface
  ) {}

  async handle(request: DeletePatientController.Request) {
    try {
      const error = this.validation.validate(request.params)

      if (error) {
        return unprocessableEntity(error)
      }

      const deletePatient = await this.DeletePatient.delete({
        id: request.params.id,
      })

      if (!deletePatient) {
        return notFound(new NotFoundError('Patient'))
      }

      return success(deletePatient)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeletePatientController {
  export interface Request extends HttpRequest {
    params: {
      id: number
    }
  }
}

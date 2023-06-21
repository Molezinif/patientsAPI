import { FindPatientInterface } from '@/domain/usecases'
import { NotFoundError } from '@/presentation/errors'
import {
  notFound,
  serverError,
  success,
  unprocessableEntity,
} from '@/presentation/helpers'
import { Controller, InputValidation } from '@/presentation/protocols'

export class FindUniquePatientController implements Controller {
  constructor(
    private readonly validation: InputValidation,
    private readonly findPatient: FindPatientInterface
  ) {}

  async handle(request: FindUniquePatientController.Request) {
    try {
      const { params } = request
      const { id } = params

      const error = this.validation.validate({ ...params })

      if (error) {
        return unprocessableEntity(error)
      }

      const patient = await this.findPatient.findUnique({
        id: Number(id),
      })

      if (!patient) {
        return notFound(new NotFoundError('Patient not found'))
      }

      return success(patient)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FindUniquePatientController {
  export type Request = {
    params: {
      id: string
    }
  }
}

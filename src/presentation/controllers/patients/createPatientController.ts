import { IPatientProblems } from '@/domain/models'
import { CreatePatientInterface } from '@/domain/usecases'
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

export class CreatePatientController implements Controller {
  constructor(
    private readonly validation: InputValidation,
    private readonly createPatient: CreatePatientInterface
  ) {}

  async handle(request: CreatePatientController.Request) {
    try {
      const { body } = request
      const { name, email, medicalRecord, patientProblems } = body

      const error = this.validation.validate({ ...body })

      if (error) {
        return unprocessableEntity(error)
      }

      const patient = await this.createPatient.create({
        body: {
          name,
          email,
          medicalRecord,
          patientProblems,
        },
      })

      if (!patient) {
        return notFound(new NotFoundError('Patient or problem'))
      }

      return success(patient)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreatePatientController {
  export interface Request extends HttpRequest {
    body: {
      name: string
      email: string
      medicalRecord: string
      patientProblems?: IPatientProblems[]
    }
  }
}

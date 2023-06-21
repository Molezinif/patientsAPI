import { FindPatientsInterface } from '@/domain/usecases'
import { serverError, success } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols'

export class FindPatientsController implements Controller {
  constructor(private readonly findPatients: FindPatientsInterface) {}

  async handle() {
    try {
      const patients = await this.findPatients.findMany()
      return success(patients)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FindPatientsController {
  export type Request = {}
}

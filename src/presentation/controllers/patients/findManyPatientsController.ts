import { FindPatientsInterface } from '@/domain/usecases'
import { Controller } from '@/presentation/protocols'

export class FindPatientsController implements Controller {
  constructor(private readonly findPatients: FindPatientsInterface) {}

  async handle(request: FindPatientsController.Request) {
    const patients = await this.findPatients.findMany({})
    return { statusCode: patients.statusCode, body: patients.body }
  }
}

export namespace FindPatientsController {
  export type Request = {}
}

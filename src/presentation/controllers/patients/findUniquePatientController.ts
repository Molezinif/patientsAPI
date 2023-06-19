import { FindPatientInterface } from '@/domain/usecases'
import { Controller } from '@/presentation/protocols'

export class FindUniquePatientController implements Controller {
  constructor(private readonly findPatient: FindPatientInterface) {}

  async handle(request: FindUniquePatientController.Request) {
    const { id } = request.params
    const patients = await this.findPatient.findUnique({
      id: Number(id),
    })
    return { statusCode: 200, body: patients }
  }
}

export namespace FindUniquePatientController {
  export type Request = {
    params: {
      id: string
    }
  }
}

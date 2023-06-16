import { FindPatientsInterface } from '@/domain/usecases'
import { Controller } from '@/presentation/protocols'

export class FindPatientsController implements Controller {
  constructor(private readonly findPatients: FindPatientsInterface) {}

  async handle(request: FindPatientsController.Request) {
    const { id } = request
    const patients = await this.findPatients.find({
      id: id ? Number(id) : undefined,
    })
    return { statusCode: 200, body: patients }
  }
}

export namespace FindPatientsController {
  export type Request = {
    id?: string
  }
}

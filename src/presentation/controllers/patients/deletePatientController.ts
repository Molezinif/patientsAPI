import { DeletePatientInterface } from '@/domain/usecases'
import { Controller, HttpRequest } from '@/presentation/protocols'

export class DeletePatientController implements Controller {
  constructor(private readonly DeletePatient: DeletePatientInterface) {}

  async handle(request: DeletePatientController.Request) {
    console.log('DeletePatientController.handle', request.params.id)
    console.log('DeletePatientController.handle', request)
    await this.DeletePatient.delete({
      id: request.params.id,
    })
    return { statusCode: 200, body: 'Patient deleted' }
  }
}

export namespace DeletePatientController {
  export interface Request extends HttpRequest {
    params: {
      id: number
    }
  }
}

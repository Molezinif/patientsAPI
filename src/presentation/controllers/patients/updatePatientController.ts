import { IPatientProblems } from '@/domain/models'
import { UpdatePatientInterface } from '@/domain/usecases'
import { Controller, HttpRequest } from '@/presentation/protocols'

export class UpdatePatientController implements Controller {
  constructor(private readonly UpdatePatient: UpdatePatientInterface) {}

  async handle(request: UpdatePatientController.Request) {
    const { name, email } = request.body
    const { id } = request.params

    const patient = await this.UpdatePatient.update({
      body: {
        name,
        email,
      },
      params: {
        id: Number(id),
      },
    })
    return { statusCode: 200, body: patient }
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
    }
  }
}
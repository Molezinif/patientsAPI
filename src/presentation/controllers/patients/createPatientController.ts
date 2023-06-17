import { IPatientProblems } from '@/domain/models'
import { CreatePatientInterface } from '@/domain/usecases'
import { Controller, HttpRequest } from '@/presentation/protocols'

export class CreatePatientController implements Controller {
  constructor(private readonly createPatient: CreatePatientInterface) {}

  async handle(request: CreatePatientController.Request) {
    const { name, email, medicalRecord } = request.body
    const patient = await this.createPatient.create({
      body: {
        name,
        email,
        medicalRecord,
      },
    })
    return { statusCode: 200, body: patient }
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

import { IPatientProblems } from '@/domain/models'
import { CreatePatientInterface } from '@/domain/usecases'
import { Controller } from '@/presentation/protocols'

export class CreatePatientController implements Controller {
  constructor(private readonly createPatient: CreatePatientInterface) {}

  async handle(request: CreatePatientController.Request) {
    const { name, email, medicalRecord } = request
    const patient = await this.createPatient.create({
      body: {
        name,
        email,
        medicalRecord,
      },
    })
    return { statusCode: 201, body: patient }
  }
}

export namespace CreatePatientController {
  export type Request = {
    name: string
    email: string
    medicalRecord: string
    patientProblems?: IPatientProblems[]
  }
}

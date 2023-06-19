import { IPatientProblems } from '@/domain/models'
import { HttpResponse } from '@/presentation/protocols'

export namespace CreatePatientInterface {
  export type Params = {
    body: {
      name: string
      email: string
      medicalRecord: string
      patientProblems?: IPatientProblems[]
    }
  }
  export type Result = HttpResponse
}

export interface CreatePatientInterface {
  create: (
    params: CreatePatientInterface.Params
  ) => Promise<CreatePatientInterface.Result>
}

import { IPatientProblems } from '@/domain/models'
import { HttpResponse } from '@/presentation/protocols'

interface CreatePatient {
  id: number
  name: string
}
export namespace CreatePatientInterface {
  export type Params = {
    body: {
      name: string
      email: string
      medicalRecord: string
      patientProblems?: IPatientProblems[]
    }
  }
  export type Result = CreatePatient | null
}

export interface CreatePatientInterface {
  create: (
    params: CreatePatientInterface.Params
  ) => Promise<CreatePatientInterface.Result>
}

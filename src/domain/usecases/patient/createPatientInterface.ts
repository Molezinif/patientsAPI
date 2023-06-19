import { IPatientProblems } from '@/domain/models'

export namespace CreatePatientInterface {
  export type Params = {
    body: {
      name: string
      email: string
      medicalRecord: string
      patientProblems?: IPatientProblems[]
    }
  }
  export type Result = {
    id: number
    name: string
    email: string
    medicalRecord: string
    createdAt: Date | null
    updatedAt: Date | null
    patientProblems?: IPatientProblems[]
  } | null
}

export interface CreatePatientInterface {
  create: (
    params: CreatePatientInterface.Params
  ) => Promise<CreatePatientInterface.Result>
}

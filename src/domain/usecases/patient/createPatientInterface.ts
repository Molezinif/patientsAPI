import { IPatientProblems } from '@/domain/models'

export namespace CreatePatientInterface {
  export type Request = {
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
    params: CreatePatientInterface.Request
  ) => Promise<CreatePatientInterface.Result>
}

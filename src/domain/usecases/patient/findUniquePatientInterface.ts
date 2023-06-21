import { IProblem } from '@/domain/models'

interface PatientWithProblems {
  id: number
  email: string
  name: string
  medicalRecord: string
  problems: IProblem[]
  createdAt: Date
  updatedAt: Date
}

export namespace FindPatientInterface {
  export type Params = {
    id: number
  }
  export type Result = PatientWithProblems | null
}

export interface FindPatientInterface {
  findUnique: (
    patient: FindPatientInterface.Params
  ) => Promise<FindPatientInterface.Result>
}

import { IProblem } from '@/domain/models'

export namespace FindPatientInterface {
  export type Params = {
    id: number
  }
  export type Result = {
    id: number
    email: string
    name: string
    medicalRecord: string
    createdAt: Date
    updatedAt: Date
    problems: IProblem[]
  } | null
}

export interface FindPatientInterface {
  findUnique: (
    patient: FindPatientInterface.Params
  ) => Promise<FindPatientInterface.Result>
}

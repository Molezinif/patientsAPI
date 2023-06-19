import { IProblem } from '@/domain/models'

export namespace FindPatientsInterface {
  export type Params = {}
  export type Result = {
    id: number
    email: string
    name: string
    medicalRecord: string
    createdAt: Date
    updatedAt: Date
    problems: IProblem[]
  }[]
}

export interface FindPatientsInterface {
  findMany: (
    patient: FindPatientsInterface.Params
  ) => Promise<FindPatientsInterface.Result>
}

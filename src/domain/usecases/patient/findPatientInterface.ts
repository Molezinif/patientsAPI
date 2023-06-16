import { IPatient, IProblem } from '@/domain/models'

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
  find: (
    patient: FindPatientsInterface.Params
  ) => Promise<FindPatientsInterface.Result>
}

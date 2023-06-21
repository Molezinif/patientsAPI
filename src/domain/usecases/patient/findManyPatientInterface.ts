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

export namespace FindPatientsInterface {
  export type Result = PatientWithProblems[] | null
}

export interface FindPatientsInterface {
  findMany: () => Promise<FindPatientsInterface.Result>
}

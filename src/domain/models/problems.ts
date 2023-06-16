import { IPatientProblems } from './patientProblems'

export interface IProblem {
  id: number
  code: string
  description: string
  patientProblems?: IPatientProblems[]
  createdAt: Date
  updatedAt: Date
}

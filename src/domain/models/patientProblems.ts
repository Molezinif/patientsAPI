import { IPatient } from './patient'
import { IProblem } from './problems'

export interface IPatientProblems {
  id: number
  patient: IPatient
  patientId: number
  problem: IProblem
  problemId: number
  createdAt: Date
  updatedAt: Date
}

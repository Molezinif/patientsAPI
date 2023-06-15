import { IPatientProblems } from './patientProblems'
import { IProblem } from './problems'

export interface IPatient {
  id: number
  name: string
  email: string
  medicalRecord: string
  patientProblems: IPatientProblems[]
  createdAt: Date
  updatedAt: Date
}

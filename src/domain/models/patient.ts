import { IPatientProblems } from './patientProblems'

export interface IPatient {
  id: number
  name: string
  email: string
  medicalRecord: string
  patientProblems?: IPatientProblems[]
  createdAt: Date
  updatedAt: Date
}

import { IPatientProblems } from '@/domain/models'

interface UpdatePatient {
  id: number
  name: string
  email: string
  medicalRecord: string
  patientProblems?: IPatientProblems[]
  createdAt: Date
  updatedAt: Date
}
export namespace UpdatePatientInterface {
  export type Params = {
    params: {
      id: number
    }
    body: {
      name?: string
      email?: string
      patientProblems?: {
        problemId: number
      }[]
    }
  }
  export type Result = UpdatePatient | null
}

export interface UpdatePatientInterface {
  update: (
    patient: UpdatePatientInterface.Params
  ) => Promise<UpdatePatientInterface.Result>
}

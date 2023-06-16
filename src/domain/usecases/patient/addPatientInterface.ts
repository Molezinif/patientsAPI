import { IPatientProblems } from '@/domain/models'

export namespace AddPatient {
  export type Params = {
    name: string
    email: string
    medicalRecord: string
    patientProblems: IPatientProblems[]
  }
  export type Result = boolean
}

export interface IAddPatient {
  add: (params: AddPatient.Params) => Promise<AddPatient.Result>
}

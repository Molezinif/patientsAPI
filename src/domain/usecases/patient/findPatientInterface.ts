import { IPatient } from '@/domain/models'

export namespace FindPatient {
  export type Params = {
    id: string
  }
  export type Result = IPatient
}

export interface IFindPatient {
  find: (patient: FindPatient.Params) => Promise<FindPatient.Result>
}

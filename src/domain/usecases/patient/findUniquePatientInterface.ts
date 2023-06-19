import { IProblem } from '@/domain/models'
import { HttpResponse } from '@/presentation/protocols'

export namespace FindPatientInterface {
  export type Params = {
    id: number
  }
  export type Result = HttpResponse
}

export interface FindPatientInterface {
  findUnique: (
    patient: FindPatientInterface.Params
  ) => Promise<FindPatientInterface.Result>
}

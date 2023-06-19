import { IProblem } from '@/domain/models'
import { HttpResponse } from '@/presentation/protocols'

export namespace FindPatientsInterface {
  export type Params = {}
  export type Result = HttpResponse
}

export interface FindPatientsInterface {
  findMany: (
    patient: FindPatientsInterface.Params
  ) => Promise<FindPatientsInterface.Result>
}

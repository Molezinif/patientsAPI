import { IProblem } from '@/domain/models'
import { HttpResponse } from '@/presentation/protocols'

export namespace FindPatientsInterface {
  export type Result = HttpResponse
}

export interface FindPatientsInterface {
  findMany: () => Promise<FindPatientsInterface.Result>
}

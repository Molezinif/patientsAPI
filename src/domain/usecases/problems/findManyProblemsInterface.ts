import { IProblem } from '@/domain/models'
import { HttpResponse } from '@/presentation/protocols'

export namespace FindProblemsInterface {
  export type Params = {
    id?: number
  }
  export type Result = HttpResponse
}

export interface FindProblemsInterface {
  findMany: (
    problem: FindProblemsInterface.Params
  ) => Promise<FindProblemsInterface.Result>
}

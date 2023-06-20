import { IProblem } from '@/domain/models'
import { HttpResponse } from '@/presentation/protocols'

export namespace FindProblemsInterface {
  export type Params = {}
  export type Result = HttpResponse
}

export interface FindProblemsInterface {
  findMany: () => Promise<FindProblemsInterface.Result>
}

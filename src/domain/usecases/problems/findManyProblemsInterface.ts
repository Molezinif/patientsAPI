import { IProblem } from '@/domain/models'

export namespace FindProblemsInterface {
  export type Params = {
    id?: number
  }
  export type Result = IProblem | IProblem[] | null
}

export interface FindProblemsInterface {
  findMany: (
    problem: FindProblemsInterface.Params
  ) => Promise<FindProblemsInterface.Result>
}

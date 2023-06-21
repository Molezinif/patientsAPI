import { IProblem } from '@/domain/models'
import { HttpResponse } from '@/presentation/protocols'

interface FindProblems {
  id: number
  code: string
  description: string
  createdAt: Date
  updatedAt: Date
}
export namespace FindProblemsInterface {
  export type Params = {}
  export type Result = FindProblems[] | null | []
}

export interface FindProblemsInterface {
  findMany: () => Promise<FindProblemsInterface.Result>
}

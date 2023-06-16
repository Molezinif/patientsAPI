import { FindProblemsInterface } from '@/domain/usecases/problems'

export interface FindProblemsRepository extends FindProblemsInterface {}

export namespace FindProblemsRepository {
  export type Params = FindProblemsInterface.Params
  export type Result = FindProblemsInterface.Result
}

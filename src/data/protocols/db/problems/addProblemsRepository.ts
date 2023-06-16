import { AddProblemInterface } from '@/domain/usecases/problems'

export interface AddProblemRepository extends AddProblemInterface {}

export namespace AddProblemRepository {
  export type Params = AddProblemInterface.Params
  export type Result = AddProblemInterface.Result
}

import { FindPatientInterface } from '@/domain/usecases/patient'

export interface FindPatientUniqueRepository extends FindPatientInterface {}

export namespace FindPatientUniqueRepository {
  export type Params = FindPatientInterface.Params
  export type Result = FindPatientInterface.Result
}

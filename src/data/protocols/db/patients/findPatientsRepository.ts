import { FindPatientsInterface } from '@/domain/usecases/patient'

export interface FindPatientsRepository extends FindPatientsInterface {}

export namespace FindPatientsRepository {
  export type Result = FindPatientsInterface.Result
}

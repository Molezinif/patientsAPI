import { UpdatePatientInterface } from '@/domain/usecases/patient'

export interface UpdatePatientRepository extends UpdatePatientInterface {}

export namespace UpdatePatientRepository {
  export type Params = UpdatePatientInterface.Params
  export type Result = UpdatePatientInterface.Result
}

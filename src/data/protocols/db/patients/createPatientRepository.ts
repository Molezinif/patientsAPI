import { CreatePatientInterface } from '@/domain/usecases/patient'

export interface CreatePatientRepository extends CreatePatientInterface {}

export namespace CreatePatientRepository {
  export type Params = CreatePatientInterface.Params
  export type Result = CreatePatientInterface.Result
}

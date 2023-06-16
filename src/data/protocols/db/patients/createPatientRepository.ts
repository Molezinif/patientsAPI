import { CreatePatientInterface } from '@/domain/usecases/patient'

export interface CreatePatientRepository extends CreatePatientInterface {}

export namespace CreatePatientRepository {
  export type Request = CreatePatientInterface.Request
  export type Result = CreatePatientInterface.Result
}

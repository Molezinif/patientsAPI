import { DeletePatientInterface } from '@/domain/usecases/patient'

export interface DeletePatientRepository extends DeletePatientInterface {}

export namespace DeletePatientRepository {
  export type Params = DeletePatientInterface.Params
  export type Result = DeletePatientInterface.Result
}

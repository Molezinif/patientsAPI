import { HttpResponse } from '@/presentation/protocols'

export namespace DeletePatientInterface {
  export type Params = {
    id: number
  }
  export type Result = HttpResponse
}

export interface DeletePatientInterface {
  delete(
    params: DeletePatientInterface.Params
  ): Promise<DeletePatientInterface.Result>
}

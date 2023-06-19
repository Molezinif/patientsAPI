export namespace DeletePatientInterface {
  export type Params = {
    id: number
  }
  export type Result = Boolean
}

export interface DeletePatientInterface {
  delete(
    params: DeletePatientInterface.Params
  ): Promise<DeletePatientInterface.Result>
}

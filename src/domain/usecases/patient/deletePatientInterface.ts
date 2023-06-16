export namespace DeletePatient {
  export type Params = {
    id: string
  }
  export type Result = boolean
}

export interface IDeletePatient {
  delete: (params: DeletePatient.Params) => Promise<DeletePatient.Result>
}

export namespace UpdatePatient {
  export type Params = {
    name?: string
    email?: string
  }
  export type Result = boolean
}

export interface IUpdatePatient {
  update: (patient: UpdatePatient.Params) => Promise<UpdatePatient.Result>
}

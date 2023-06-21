interface AddProblem {
  code: string
  description: string
}

export namespace AddProblemInterface {
  export type Params = {
    code: string
    description: string
  }
  export type Result = AddProblem | null
}

export interface AddProblemInterface {
  add: (
    addProblem: AddProblemInterface.Params
  ) => Promise<AddProblemInterface.Result>
}

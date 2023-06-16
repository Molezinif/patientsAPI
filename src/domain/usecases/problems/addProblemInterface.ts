export namespace AddProblemInterface {
  export type Params = {
    code: string
    description: string
  }
  export type Result = {
    id: number
    code: string
    description: string
    createdAt: Date | null
    updatedAt: Date | null
  }
}

export interface AddProblemInterface {
  add: (
    addProblem: AddProblemInterface.Params
  ) => Promise<AddProblemInterface.Result>
}

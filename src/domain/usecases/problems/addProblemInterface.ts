import { HttpResponse } from "@/presentation/protocols"

export namespace AddProblemInterface {
  export type Params = {
    code: string
    description: string
  }
  export type Result = HttpResponse
}

export interface AddProblemInterface {
  add: (
    addProblem: AddProblemInterface.Params
  ) => Promise<AddProblemInterface.Result>
}

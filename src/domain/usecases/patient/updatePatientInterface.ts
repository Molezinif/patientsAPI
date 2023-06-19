import { IPatientProblems, IProblem } from '@/domain/models'

export namespace UpdatePatientInterface {
  export type Params = {
    params: {
      id: number
    }
    body: {
      name?: string
      email?: string
      patientProblems?: {
        problemId: number
      }[]
    }
  }
  export type Result = boolean
}

export interface UpdatePatientInterface {
  update: (
    patient: UpdatePatientInterface.Params
  ) => Promise<UpdatePatientInterface.Result>
}

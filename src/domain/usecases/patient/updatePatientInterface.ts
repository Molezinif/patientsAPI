import { IPatientProblems, IProblem } from '@/domain/models'
import { HttpResponse } from '@/presentation/protocols'

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
  export type Result = HttpResponse
}

export interface UpdatePatientInterface {
  update: (
    patient: UpdatePatientInterface.Params
  ) => Promise<UpdatePatientInterface.Result>
}

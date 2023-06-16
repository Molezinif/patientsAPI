import { AddProblemInterface } from '@/domain/usecases'

export class DbAddProblems implements AddProblemInterface {
  constructor(private readonly addProblemsRepository: AddProblemInterface) {}

  async add(
    addProblem: AddProblemInterface.Params
  ): Promise<AddProblemInterface.Result> {
    let isValid = null
    isValid = this.addProblemsRepository.add(addProblem)
    return isValid
  }
}

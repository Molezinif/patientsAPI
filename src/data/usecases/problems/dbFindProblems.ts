import { FindProblemsInterface } from '@/domain/usecases'

export class DbFindProblems implements FindProblemsInterface {
  constructor(private readonly findProblemsRepository: FindProblemsInterface) {}
  async find(
    params: FindProblemsInterface.Params
  ): Promise<FindProblemsInterface.Result> {
    const result = await this.findProblemsRepository.find(params)
    return result
  }
}

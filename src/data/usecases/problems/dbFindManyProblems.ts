import { FindProblemsInterface } from '@/domain/usecases'

export class DbFindProblems implements FindProblemsInterface {
  constructor(private readonly findProblemsRepository: FindProblemsInterface) {}
  async findMany(
    params: FindProblemsInterface.Params
  ): Promise<FindProblemsInterface.Result> {
    const result = await this.findProblemsRepository.findMany(params)
    return result
  }
}

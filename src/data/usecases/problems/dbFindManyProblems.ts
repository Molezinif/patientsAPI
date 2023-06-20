import { FindProblemsInterface } from '@/domain/usecases'

export class DbFindProblems implements FindProblemsInterface {
  constructor(private readonly findProblemsRepository: FindProblemsInterface) {}
  async findMany(): Promise<FindProblemsInterface.Result> {
    const result = await this.findProblemsRepository.findMany()
    return result
  }
}

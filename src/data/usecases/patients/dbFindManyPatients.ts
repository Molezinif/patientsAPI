import { FindPatientsInterface } from '@/domain/usecases'

export class DbFindPatients implements FindPatientsInterface {
  constructor(private readonly findPatientsRepository: FindPatientsInterface) {}
  async findMany(): Promise<FindPatientsInterface.Result> {
    const result = await this.findPatientsRepository.findMany()
    return result
  }
}

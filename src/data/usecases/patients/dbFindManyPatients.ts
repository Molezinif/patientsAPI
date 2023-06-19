import { FindPatientsInterface } from '@/domain/usecases'

export class DbFindPatients implements FindPatientsInterface {
  constructor(private readonly findPatientsRepository: FindPatientsInterface) {}
  async findMany(
    params: FindPatientsInterface.Params
  ): Promise<FindPatientsInterface.Result> {
    const result = await this.findPatientsRepository.findMany(params)
    return result
  }
}

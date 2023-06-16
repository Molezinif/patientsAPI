import { FindPatientsInterface } from '@/domain/usecases'

export class DbFindPatients implements FindPatientsInterface {
  constructor(private readonly findPatientsRepository: FindPatientsInterface) {}
  async find(
    params: FindPatientsInterface.Params
  ): Promise<FindPatientsInterface.Result> {
    const result = await this.findPatientsRepository.find(params)
    return result
  }
}

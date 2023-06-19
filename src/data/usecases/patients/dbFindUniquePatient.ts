import { FindPatientInterface } from '@/domain/usecases'

export class DbFindPatient implements FindPatientInterface {
  constructor(private readonly findPatientsRepository: FindPatientInterface) {}
  async findUnique(
    params: FindPatientInterface.Params
  ): Promise<FindPatientInterface.Result> {
    const result = await this.findPatientsRepository.findUnique(params)
    return result
  }
}

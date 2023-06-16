import { CreatePatientInterface } from '@/domain/usecases'

export class DbCreatePatient implements CreatePatientInterface {
  constructor(
    private readonly CreatePatientRepository: CreatePatientInterface
  ) {}
  async create(
    params: CreatePatientInterface.Request
  ): Promise<CreatePatientInterface.Result> {
    const result = await this.CreatePatientRepository.create(params)
    return result
  }
}

import { UpdatePatientRepository } from '@/data/protocols'
import { UpdatePatientInterface } from '@/domain/usecases'

export class DbUpdatePatient implements UpdatePatientInterface {
  constructor(private readonly repository: UpdatePatientRepository) {}
  async update(
    request: UpdatePatientRepository.Params
  ): Promise<UpdatePatientRepository.Result> {
    return await this.repository.update(request)
  }
}

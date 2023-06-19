import { DeletePatientRepository } from '@/data/protocols'
import { DeletePatientInterface } from '@/domain/usecases'

export class DbDeletePatient implements DeletePatientInterface {
  constructor(private readonly repository: DeletePatientRepository) {}
  async delete(
    request: DeletePatientRepository.Params
  ): Promise<DeletePatientRepository.Result> {
    return await this.repository.delete(request)
  }
}

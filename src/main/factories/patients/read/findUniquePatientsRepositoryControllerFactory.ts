import { FindUniquePatientController } from '@/presentation/controllers'
import { makeFindPatientRepository } from './findUniquePatientsUseCaseFactory'
import { Controller } from '@/presentation/protocols'

export const makeFindUniquePatientController = (): Controller => {
  return new FindUniquePatientController(makeFindPatientRepository())
}

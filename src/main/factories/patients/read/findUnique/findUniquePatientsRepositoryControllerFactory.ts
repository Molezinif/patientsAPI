import { FindUniquePatientController } from '@/presentation/controllers'
import { makeFindPatientRepository } from './findUniquePatientsUseCaseFactory'
import { Controller } from '@/presentation/protocols'
import { makeFindUniquePatientValidation } from './findUniquePatientValidator'

export const makeFindUniquePatientController = (): Controller => {
  return new FindUniquePatientController(
    makeFindUniquePatientValidation(),
    makeFindPatientRepository()
  )
}

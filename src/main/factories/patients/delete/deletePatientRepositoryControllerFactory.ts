import { DeletePatientController } from '@/presentation/controllers'
import { makeDeletePatientRepository } from './deletePatientUseCaseFactory'
import { Controller } from '@/presentation/protocols'
import { makeDeletePatientValidation } from './deletePatientValidator'

export const makeDeletePatientController = (): Controller => {
  return new DeletePatientController(
    makeDeletePatientValidation(),
    makeDeletePatientRepository()
  )
}

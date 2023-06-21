import { UpdatePatientController } from '@/presentation/controllers'
import { makeUpdatePatientRepository } from './updatePatientUseCaseFactory'
import { Controller } from '@/presentation/protocols'
import { makeUpdatePatientValidation } from './updatePatientValidator'

export const makeUpdatePatientController = (): Controller => {
  return new UpdatePatientController(
    makeUpdatePatientValidation(),
    makeUpdatePatientRepository()
  )
}

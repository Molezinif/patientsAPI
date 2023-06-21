import { CreatePatientController } from '@/presentation/controllers'
import { makeCreatePatientsRepository } from './createPatientUseCaseFactory'
import { Controller } from '@/presentation/protocols'
import { makeCreatePatientValidation } from './createPatientValidator'

export const makeCreatePatientController = (): Controller => {
  return new CreatePatientController(
    makeCreatePatientValidation(),
    makeCreatePatientsRepository()
  )
}

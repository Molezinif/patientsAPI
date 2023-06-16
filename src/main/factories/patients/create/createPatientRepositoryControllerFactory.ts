import { CreatePatientController } from '@/presentation/controllers'
import { makeCreatePatientsRepository } from './createPatientUseCaseFactory'
import { Controller } from '@/presentation/protocols'

export const makeCreatePatientController = (): Controller => {
  return new CreatePatientController(makeCreatePatientsRepository())
}

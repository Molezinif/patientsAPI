import { DeletePatientController } from '@/presentation/controllers'
import { makeDeletePatientRepository } from './deletePatientUseCaseFactory'
import { Controller } from '@/presentation/protocols'

export const makeDeletePatientController = (): Controller => {
  return new DeletePatientController(makeDeletePatientRepository())
}

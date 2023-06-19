import { UpdatePatientController } from '@/presentation/controllers'
import { makeUpdatePatientRepository } from './updatePatientUseCaseFactory'
import { Controller } from '@/presentation/protocols'

export const makeUpdatePatientController = (): Controller => {
  return new UpdatePatientController(makeUpdatePatientRepository())
}

import { FindPatientsController } from '@/presentation/controllers'
import { makeFindPatientsRepository } from './findPatientsUseCaseFactory'
import { Controller } from '@/presentation/protocols'

export const makeFindPatientsController = (): Controller => {
  return new FindPatientsController(makeFindPatientsRepository())
}

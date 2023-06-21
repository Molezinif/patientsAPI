import { FindPatientsController } from '@/presentation/controllers'
import { makeFindPatientsRepository } from './findManyPatientsUseCaseFactory'
import { Controller } from '@/presentation/protocols'

export const makeFindPatientsController = (): Controller => {
  return new FindPatientsController(makeFindPatientsRepository())
}

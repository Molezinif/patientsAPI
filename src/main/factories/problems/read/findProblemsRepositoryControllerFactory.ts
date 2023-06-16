import { FindProblemsController } from '@/presentation/controllers'
import { makeFindProblemsControllerFactory } from './findProblemsUseCaseFactory'
import { Controller } from '@/presentation/protocols'

export const makeFindProblemsController = (): Controller => {
  return new FindProblemsController(makeFindProblemsControllerFactory())
}

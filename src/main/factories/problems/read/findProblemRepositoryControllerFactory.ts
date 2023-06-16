import { FindProblemsController } from '@/presentation/controllers'
import { makeFindProblemControllerFactory } from './findProblemUseCaseFactory'
import { Controller } from '@/presentation/protocols'

export const makeFindProblemController = (): Controller => {
  return new FindProblemsController(makeFindProblemControllerFactory())
}

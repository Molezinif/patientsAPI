import { AddProblemsController } from '@/presentation/controllers'
import { makeAddProblemControllerFactory } from './addProblemUseCaseFactory'
import { Controller } from '@/presentation/protocols'

export const makeAddProblemController = (): Controller => {
  return new AddProblemsController(makeAddProblemControllerFactory())
}

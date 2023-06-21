import { AddProblemsController } from '@/presentation/controllers'
import { makeAddProblemControllerFactory } from './addProblemUseCaseFactory'
import { Controller } from '@/presentation/protocols'
import { makeAddProblemValidation } from './addProblemValidator'

export const makeAddProblemController = (): Controller => {
  return new AddProblemsController(
    makeAddProblemValidation(),
    makeAddProblemControllerFactory()
  )
}

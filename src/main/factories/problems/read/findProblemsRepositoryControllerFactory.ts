import { FindProblemsController } from '@/presentation/controllers'
import { makeFindProblemsRepository } from './findProblemsUseCaseFactory'
import { Controller } from '@/presentation/protocols'

export const makeFindProblemsController = (): Controller => {
  return new FindProblemsController(makeFindProblemsRepository())
}

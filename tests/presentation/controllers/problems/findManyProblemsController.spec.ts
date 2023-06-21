import { makeCreatePatientsRepository } from '@/main/factories/patients/create/createPatientUseCaseFactory'
import { makeAddProblemControllerFactory } from '@/main/factories/problems/create/addProblemUseCaseFactory'
import { makeFindProblemsRepository } from '@/main/factories/problems/read/findProblemsUseCaseFactory'
import {
  AddProblemsController,
  FindProblemsController,
} from '@/presentation/controllers'

interface SutTypes {
  sut: FindProblemsController
}

const makeSut = (): SutTypes => {
  const sut = new FindProblemsController(makeFindProblemsRepository())

  return {
    sut,
  }
}

describe('AddProblemController', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const result = await sut.handle()

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({
      message: 'Problems not found',
    })
  })
})

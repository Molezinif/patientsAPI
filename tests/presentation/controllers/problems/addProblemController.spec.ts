import { makeCreatePatientsRepository } from '@/main/factories/patients/create/createPatientUseCaseFactory'
import { makeAddProblemControllerFactory } from '@/main/factories/problems/create/addProblemUseCaseFactory'
import {
  AddProblemsController,
  CreatePatientController,
} from '@/presentation/controllers'

interface SutTypes {
  sut: AddProblemsController
}

const makeSut = (): SutTypes => {
  const sut = new AddProblemsController(makeAddProblemControllerFactory())

  return {
    sut,
  }
}

describe('AddProblemController', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const result = await sut.handle({
      body: {
        code: 'any_code',
        description: 'any_description',
      },
    })

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual([
      {
        message: 'Problem not created',
      },
    ])
  })
})

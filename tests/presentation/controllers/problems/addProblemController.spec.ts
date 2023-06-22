import { AddProblemsController } from '@/presentation/controllers'
import { AddProblemSpy } from '@/../tests/mocks'
import { AddProblemValidation } from '@/validation/validators/problems/addProblemValidator'
import { ObjectValidatorAdapter } from '@/infra/validators'
import { unprocessableEntity } from '@/presentation/helpers'

interface SutTypes {
  sut: AddProblemsController
  validation: AddProblemValidation
  addProblemSpy: AddProblemSpy
}

const makeSut = (): SutTypes => {
  const addProblemSpy = new AddProblemSpy()
  const validation = new AddProblemValidation(new ObjectValidatorAdapter())
  const sut = new AddProblemsController(validation, addProblemSpy)

  return {
    sut,
    validation,
    addProblemSpy,
  }
}

describe('AddProblemController', () => {
  test('should return 200 if problem is created', async () => {
    const { sut } = makeSut()

    const result = await sut.handle({
      body: {
        code: 'A00',
        description: 'Cólera',
      },
    })

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      code: 'A00',
      createdAt: expect.any(Date),
      description: 'Cólera',
      id: 2054,
      updatedAt: expect.any(Date),
    })
  })
  test('should return 500 if no name is provided', async () => {
    const { sut, addProblemSpy, validation } = makeSut()

    jest.spyOn(addProblemSpy, 'add').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })

    const result = await sut.handle({
      body: {
        code: 'any_code',
        description: 'any_description',
      },
    })

    expect(result.statusCode).toBe(500)
  })
  test('should return 400 if validation returns an error', async () => {
    const { sut, validation } = makeSut()

    const result = await sut.handle({
      // @ts-expect-error
      body: {
        description: 'any_description',
      },
    })

    expect(result.statusCode).toBe(422)
    expect(result).toEqual(unprocessableEntity(['"code" is required']))
  })
})

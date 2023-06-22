import { FindProblemsController } from '@/presentation/controllers'
import { FindProblemsSpy, mockProblems } from '@/../tests/mocks'

interface SutTypes {
  sut: FindProblemsController
  findProblemSpy: FindProblemsSpy
}

const makeSut = (): SutTypes => {
  const findProblemSpy = new FindProblemsSpy()
  const sut = new FindProblemsController(findProblemSpy)

  return {
    sut,
    findProblemSpy,
  }
}

describe('AddProblemController', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const result = await sut.handle()

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(mockProblems)
  })
  test('should throw serverError', async () => {
    const { sut, findProblemSpy } = makeSut()
    jest.spyOn(findProblemSpy, 'findMany').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })

    const result = await sut.handle()

    expect(result.statusCode).toBe(500)
  })
})

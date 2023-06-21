import { DbFindProblems } from '@/data/usecases'
import { FindProblemsInterface } from '@/domain/usecases'

const makeFindProblemsRepository = (): FindProblemsInterface => {
  class FindProblemsRepositoryStub implements FindProblemsInterface {
    async findMany(): Promise<FindProblemsInterface.Result> {
      return {
        statusCode: 200,
        body: [
          {
            id: 1,
            code: 'A00',
            description: 'Cholera',
            createdAt: '2023-06-14T23:25:18.887Z',
            updatedAt: '2023-06-14T23:25:18.887Z',
          },
          {
            id: 2,
            code: 'A01',
            description: 'Febres tifóide e paratifóide',
            createdAt: '2023-06-15T13:19:12.812Z',
            updatedAt: '2023-06-15T13:18:09.560Z',
          },
        ],
      }
    }
  }
  return new FindProblemsRepositoryStub()
}

interface SutTypes {
  sut: DbFindProblems
  findProblemsRepositoryStub: FindProblemsInterface
}

const makeSut = (): SutTypes => {
  const findProblemsRepositoryStub = makeFindProblemsRepository()
  const sut = new DbFindProblems(findProblemsRepositoryStub)
  return {
    sut,
    findProblemsRepositoryStub,
  }
}

describe('DbFindProblems', () => {
  test('Should call dbFindProblems with correct values', async () => {
    const { sut, findProblemsRepositoryStub } = makeSut()
    const findManySpy = jest.spyOn(findProblemsRepositoryStub, 'findMany')
    await sut.findMany()
    expect(findManySpy).toHaveBeenCalledWith()
  })
})

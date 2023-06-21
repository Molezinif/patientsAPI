import { DbAddProblems } from '@/data/usecases'
import { AddProblemInterface } from '@/domain/usecases'

const makeAddProblemRepository = (): AddProblemInterface => {
  class AddProblemsRepositoryStub implements AddProblemInterface {
    async add(
      params: AddProblemInterface.Params
    ): Promise<AddProblemInterface.Result> {
      return {
        statusCode: 201,
        body: {
          id: 1,
          code: 'A00',
          description: 'Cholera',
          createdAt: '2023-06-14T23:25:18.887Z',
          updatedAt: '2023-06-14T23:25:18.887Z',
        },
      }
    }
  }
  return new AddProblemsRepositoryStub()
}

interface SutTypes {
  sut: DbAddProblems
  addProblemsRepositoryStub: AddProblemInterface
}

const makeSut = (): SutTypes => {
  const addProblemsRepositoryStub = makeAddProblemRepository()
  const sut = new DbAddProblems(addProblemsRepositoryStub)
  return {
    sut,
    addProblemsRepositoryStub,
  }
}

describe('DbAddProblems', () => {
  test('Should call dbAddProblems with correct values', async () => {
    const { sut, addProblemsRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addProblemsRepositoryStub, 'add')
    await sut.add({
      code: 'A00',
      description: 'Cholera',
    })
    expect(addSpy).toHaveBeenCalledWith({
      code: 'A00',
      description: 'Cholera',
    })
  })
})

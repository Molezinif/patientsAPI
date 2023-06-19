import { DbFindPatient } from '@/data/usecases'
import { FindPatientInterface } from '@/domain/usecases'

const makeFindPatientRepository = (): FindPatientInterface => {
  class FindPatientRepositoryStub implements FindPatientInterface {
    async findUnique(
      params: FindPatientInterface.Params
    ): Promise<FindPatientInterface.Result> {
      return {
        statusCode: 200,
        body: {
          id: 1,
          name: 'test_name',
          email: 'test_email',
          medicalRecord: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
          problems: [
            {
              id: 2054,
              code: 'A00',
              description: 'Cólera',
              createdAt: '2023-06-19T17:57:26.927Z',
              updatedAt: '2023-06-19T17:57:26.927Z',
            },
            {
              id: 2133,
              code: 'A92',
              description: 'Outras febres virais transmitidas por mosquitos',
              createdAt: '2023-06-19T17:57:27.206Z',
              updatedAt: '2023-06-19T17:57:27.206Z',
            },
          ],
        },
      }
    }
  }
  return new FindPatientRepositoryStub()
}

interface SutTypes {
  sut: DbFindPatient
  patientRepositoryStub: FindPatientInterface
}

const makeSut = (): SutTypes => {
  const patientRepositoryStub = makeFindPatientRepository()
  const sut = new DbFindPatient(patientRepositoryStub)
  return {
    sut,
    patientRepositoryStub,
  }
}

describe('DbFindPatients', () => {
  test('Should call dbFindUniquePatient with correct values', async () => {
    const { sut, patientRepositoryStub } = makeSut()
    const findManySpy = jest.spyOn(patientRepositoryStub, 'findUnique')
    await sut.findUnique({
      id: 1,
    })
    expect(findManySpy).toHaveBeenCalledWith({
      id: 1,
    })
  })
})

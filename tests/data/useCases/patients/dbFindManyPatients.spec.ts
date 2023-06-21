import { DbFindPatients } from '@/data/usecases'
import { FindPatientsInterface } from '@/domain/usecases'

const makeFindPatientsRepository = (): FindPatientsInterface => {
  class FindPatientRepositoryStub implements FindPatientsInterface {
    async findMany(): Promise<FindPatientsInterface.Result> {
      return {
        statusCode: 200,
        body: [
          {
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
        ],
      }
    }
  }
  return new FindPatientRepositoryStub()
}

interface SutTypes {
  sut: DbFindPatients
  patientRepositoryStub: FindPatientsInterface
}

const makeSut = (): SutTypes => {
  const patientRepositoryStub = makeFindPatientsRepository()
  const sut = new DbFindPatients(patientRepositoryStub)
  return {
    sut,
    patientRepositoryStub,
  }
}

describe('DbFindPatients', () => {
  test('Should call dbFindManyPatients with correct values', async () => {
    const { sut, patientRepositoryStub } = makeSut()
    const findManySpy = jest.spyOn(patientRepositoryStub, 'findMany')
    await sut.findMany()
    expect(findManySpy).toHaveBeenCalledWith()
  })
})

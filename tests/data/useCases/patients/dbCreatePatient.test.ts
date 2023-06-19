import { DbCreatePatient } from '@/data/usecases'
import { CreatePatientInterface } from '@/domain/usecases'

const mockParam: CreatePatientInterface.Params = {
  body: {
    name: 'test_name',
    email: 'test_email',
    medicalRecord: 'test_medicalRecord',
  },
}

const makeCreatePatientsRepository = (): CreatePatientInterface => {
  class CreatePatientRepositoryStub implements CreatePatientInterface {
    async create(
      params: CreatePatientInterface.Params
    ): Promise<CreatePatientInterface.Result> {
      return {
        statusCode: 201,
        body: {
          id: 1,
          name: 'test_name',
          email: 'test_email',
          medicalRecord: '1',
          createdAt: '2023-06-19T22:13:32.481Z',
          updatedAt: '2023-06-19T22:13:32.482Z',
        },
      }
    }
  }
  return new CreatePatientRepositoryStub()
}

interface SutTypes {
  sut: DbCreatePatient
  patientRepositoryStub: CreatePatientInterface
}

const makeSut = (): SutTypes => {
  const patientRepositoryStub = makeCreatePatientsRepository()
  const sut = new DbCreatePatient(patientRepositoryStub)
  return {
    sut,
    patientRepositoryStub,
  }
}

describe('DbFindPatients', () => {
  test('Should call createPatientsRepository with correct values', async () => {
    const { sut, patientRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(patientRepositoryStub, 'create')
    await sut.create(mockParam)
    expect(createSpy).toHaveBeenCalledWith(mockParam)
  })
})

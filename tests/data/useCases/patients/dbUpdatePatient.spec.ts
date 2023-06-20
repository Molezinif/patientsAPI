import { DbUpdatePatient } from '@/data/usecases'
import { UpdatePatientInterface } from '@/domain/usecases'

const makeUpdatePatientRepository = (): UpdatePatientInterface => {
  class UpdatePatientRepositoryStub implements UpdatePatientInterface {
    async update(
      params: UpdatePatientInterface.Params
    ): Promise<UpdatePatientInterface.Result> {
      return {
        statusCode: 200,
        body: {
          id: 26,
          email: 'test_name',
          name: 'test_name',
          medicalRecord: '1',
          createdAt: '2023-06-19T18:09:14.199Z',
          updatedAt: '2023-06-19T18:10:23.784Z',
        },
      }
    }
  }
  return new UpdatePatientRepositoryStub()
}

interface SutTypes {
  sut: DbUpdatePatient
  patientRepositoryStub: UpdatePatientInterface
}

const makeSut = (): SutTypes => {
  const patientRepositoryStub = makeUpdatePatientRepository()
  const sut = new DbUpdatePatient(patientRepositoryStub)
  return {
    sut,
    patientRepositoryStub,
  }
}

describe('DbUpdatePatients', () => {
  test('Should call dbUpdatePatients with correct values', async () => {
    const mockParams = {
      params: {
        id: 1,
      },
      body: {
        name: 'test_name',
        email: 'test_email',
      },
    }
    const { sut, patientRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(patientRepositoryStub, 'update')
    await sut.update(mockParams)
    expect(updateSpy).toHaveBeenCalledWith(mockParams)
  })
})

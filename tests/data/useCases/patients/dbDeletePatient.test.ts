import { DbDeletePatient } from '@/data/usecases'
import { DeletePatientInterface } from '@/domain/usecases'

const makeDeletePatientRepository = (): DeletePatientInterface => {
  class DeletePatientRepositoryStub implements DeletePatientInterface {
    async delete(
      params: DeletePatientInterface.Params
    ): Promise<DeletePatientInterface.Result> {
      return {
        statusCode: 200,
        body: {
          message: 'Patient deleted successfully',
        },
      }
    }
  }
  return new DeletePatientRepositoryStub()
}

interface SutTypes {
  sut: DbDeletePatient
  patientRepositoryStub: DeletePatientInterface
}

const makeSut = (): SutTypes => {
  const patientRepositoryStub = makeDeletePatientRepository()
  const sut = new DbDeletePatient(patientRepositoryStub)
  return {
    sut,
    patientRepositoryStub,
  }
}

describe('DbDeletePatients', () => {
  test('Should call dbDeletePatients with correct values', async () => {
    const { sut, patientRepositoryStub } = makeSut()
    const deleteManySpy = jest.spyOn(patientRepositoryStub, 'delete')
    await sut.delete({
      id: 1,
    })
    expect(deleteManySpy).toHaveBeenCalledWith({
      id: 1,
    })
  })
})

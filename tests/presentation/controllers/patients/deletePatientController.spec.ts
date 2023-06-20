import { makeDeletePatientRepository } from '@/main/factories/patients/delete/deletePatientUseCaseFactory'
import { DeletePatientController } from '@/presentation/controllers'

interface SutTypes {
  sut: DeletePatientController
}

const makeSut = (): SutTypes => {
  const sut = new DeletePatientController(makeDeletePatientRepository())

  return {
    sut,
  }
}

describe('DeletePatientController', () => {
  test('should return 404 if patient no exist', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      params: {
        id: 1,
      },
    }

    await expect(sut.handle(httpRequest)).resolves.toEqual({
      statusCode: 400,
      body: 'Patient does not exist',
    })
  })
})

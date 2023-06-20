import { makeFindPatientRepository } from '@/main/factories/patients/read/findUniquePatientsUseCaseFactory'
import { FindUniquePatientController } from '@/presentation/controllers'

interface SutTypes {
  sut: FindUniquePatientController
}

const makeSut = (): SutTypes => {
  const sut = new FindUniquePatientController(makeFindPatientRepository())

  return {
    sut,
  }
}

describe('CreatePatientController', () => {
  test('should return 404 if patient no exist', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      params: {
        id: '1',
      },
    }

    await expect(sut.handle(httpRequest)).resolves.toEqual({
      statusCode: 404,
      body: 'Patient not found',
    })
  })
})

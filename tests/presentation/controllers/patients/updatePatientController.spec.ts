import { makeUpdatePatientRepository } from '@/main/factories/patients/update/updatePatientUseCaseFactory'
import { UpdatePatientController } from '@/presentation/controllers'

interface SutTypes {
  sut: UpdatePatientController
}

const makeSut = (): SutTypes => {
  const sut = new UpdatePatientController(makeUpdatePatientRepository())

  return {
    sut,
  }
}

describe('CreatePatientController', () => {
  test('should return 404 if patient no exist', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      params: {
        id: 29,
      },
      body: {
        name: 'any_name',
        email: 'any_email',
      },
    }

    await expect(sut.handle(httpRequest)).resolves.toEqual({
      statusCode: 404,
      body: {
        message: 'Patient not found',
      },
    })
  })
})

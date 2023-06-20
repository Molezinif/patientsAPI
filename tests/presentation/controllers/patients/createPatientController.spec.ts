import { makeCreatePatientsRepository } from '@/main/factories/patients/create/createPatientUseCaseFactory'
import { CreatePatientController } from '@/presentation/controllers'

interface SutTypes {
  sut: CreatePatientController
}

const makeSut = (): SutTypes => {
  const sut = new CreatePatientController(makeCreatePatientsRepository())

  return {
    sut,
  }
}

describe('CreatePatientController', () => {
  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: '',
        email: 'example@email.com',
        medicalRecord: '123456',
      },
    }

    await expect(sut.handle(httpRequest)).resolves.toEqual({
      statusCode: 400,
      body: 'Missing param: name, email or medicalRecord',
    })
  })
})

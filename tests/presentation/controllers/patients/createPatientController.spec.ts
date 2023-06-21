import { makeCreatePatientsRepository } from '@/main/factories/patients/create/createPatientUseCaseFactory'
import { makeCreatePatientValidation } from '@/main/factories/patients/create/createPatientValidator'
import { CreatePatientController } from '@/presentation/controllers'

interface SutTypes {
  sut: CreatePatientController
}

const makeSut = (): SutTypes => {
  const sut = new CreatePatientController(
    makeCreatePatientValidation(),
    makeCreatePatientsRepository()
  )

  return {
    sut,
  }
}

describe('CreatePatientController', () => {
  test('should return 400 if no name is provided', async () => {
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

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: '',
        medicalRecord: '123456',
      },
    }

    await expect(sut.handle(httpRequest)).resolves.toEqual({
      statusCode: 400,
      body: 'Missing param: name, email or medicalRecord',
    })
  })

  test('should return 400 if no medicalRecord is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        medicalRecord: '',
      },
    }

    await expect(sut.handle(httpRequest)).resolves.toEqual({
      statusCode: 400,
      body: 'Missing param: name, email or medicalRecord',
    })
  })

  test('should return 201 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        medicalRecord: '123456',
      },
    }

    await expect(sut.handle(httpRequest)).resolves.toEqual({
      statusCode: 201,
      body: undefined,
    })
  })
})

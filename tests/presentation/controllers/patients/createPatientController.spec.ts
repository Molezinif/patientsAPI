import { CreatePatientController } from '@/presentation/controllers'
import { CreatePatientSpy } from '@/../tests/mocks/patient'
import { CreatePatientsValidation } from '@/validation/validators/patients/createPatientsValidator'
import { ObjectValidatorAdapter } from '@/infra/validators'

interface SutTypes {
  createPatientSpy: CreatePatientSpy
  validation: CreatePatientsValidation
  sut: CreatePatientController
}

const makeSut = (): SutTypes => {
  const createPatientSpy = new CreatePatientSpy()
  const validation = new CreatePatientsValidation(new ObjectValidatorAdapter())
  const sut = new CreatePatientController(validation, createPatientSpy)

  return {
    sut,
    validation,
    createPatientSpy,
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

    const result = await sut.handle(httpRequest)

    await expect(result.body).toEqual(['"name" is not allowed to be empty'])
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
    const result = await sut.handle(httpRequest)

    await expect(result.body).toEqual(['"email" is not allowed to be empty'])
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

    const result = await sut.handle(httpRequest)

    await expect(result.body).toEqual([
      '"medicalRecord" is not allowed to be empty',
    ])
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

    const result = await sut.handle(httpRequest)

    expect(result.body).toEqual({
      createdAt: expect.any(Date),
      email: 'examplee12@gmail.com.br',
      id: 29,
      medicalRecord: '1',
      name: 'Gabriel',
      problems: [
        {
          code: 'A00',
          createdAt: expect.any(Date),
          description: 'Cólera',
          id: 2054,
          updatedAt: expect.any(Date),
        },
        {
          code: 'A92',
          createdAt: expect.any(Date),
          description: 'Outras febres virais transmitidas por mosquitos',
          id: 2133,
          updatedAt: expect.any(Date),
        },
      ],
      updatedAt: expect.any(Date),
    })
  })

  test('should return server error', async () => {
    const { sut } = makeSut()

    const httpRequest = null

    //@ts-expect-error
    const result = await sut.handle(httpRequest)

    expect(result.statusCode).toBe(500)
  })

  test('should return  NotFoundError', async () => {
    const { sut, createPatientSpy } = makeSut()

    jest.spyOn(createPatientSpy, 'create').mockResolvedValueOnce(null)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        medicalRecord: '123456',
      },
    }

    const result = await sut.handle(httpRequest)

    expect(result.statusCode).toBe(404)
  })
})

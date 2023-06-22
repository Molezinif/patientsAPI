import { makeUpdatePatientRepository } from '@/main/factories/patients/update/updatePatientUseCaseFactory'
import { UpdatePatientController } from '@/presentation/controllers'
import { UpdatePatientSpy, mockUpdatedPatient } from '@/../tests/mocks'
import { UpdatePatientValidation } from '@/validation/validators/patients/updatePatientValidator'
import { ObjectValidatorAdapter } from '@/infra/validators'
import { NotFoundError } from '@/presentation/errors'

interface SutTypes {
  updatePatientSpy: UpdatePatientSpy
  validation: UpdatePatientValidation
  sut: UpdatePatientController
}

const makeSut = (): SutTypes => {
  const updatePatientSpy = new UpdatePatientSpy()
  const validation = new UpdatePatientValidation(new ObjectValidatorAdapter())
  const sut = new UpdatePatientController(validation, updatePatientSpy)

  return {
    sut,
    validation,
    updatePatientSpy,
  }
}

describe('UpdatePatientController', () => {
  test('should return patient updated', async () => {
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

    const result = await sut.handle(httpRequest)

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(mockUpdatedPatient)
  })
  test('should return 404 if patient no exist', async () => {
    const { sut, updatePatientSpy } = makeSut()

    const httpRequest = {
      params: {
        id: 29,
      },
      body: {
        name: 'any_name',
        email: 'any_email',
      },
    }

    jest.spyOn(updatePatientSpy, 'update').mockResolvedValueOnce(null)

    const result = await sut.handle(httpRequest)

    expect(result.statusCode).toEqual(404)
    expect(result.body).toEqual(new NotFoundError('Patient'))
  })

  test('should throw server error', async () => {
    const { sut, updatePatientSpy } = makeSut()

    const httpRequest = {
      params: {
        id: 29,
      },
      body: {
        name: 'any_name',
        email: 'any_email',
      },
    }

    jest.spyOn(updatePatientSpy, 'update').mockRejectedValueOnce(new Error())

    const result = await sut.handle(httpRequest)

    expect(result.statusCode).toEqual(500)
  })

  test('should throw error if validation fails', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      params: {
        id: 29,
      },
      body: {
        name: '',
        email: '',
      },
    }

    const result = await sut.handle(httpRequest)

    expect(result.statusCode).toEqual(422)
  })
})

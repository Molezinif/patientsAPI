import { makeDeletePatientRepository } from '@/main/factories/patients/delete/deletePatientUseCaseFactory'
import { DeletePatientController } from '@/presentation/controllers'
import { DeletePatientValidation } from '@/validation/validators/patients/deletePatientValidator'
import { DeletePatientSpy, mockPatients } from '@/../tests/mocks'
import { ObjectValidatorAdapter } from '@/infra/validators'
import { NotFoundError } from '@/presentation/errors'

interface SutTypes {
  validation: DeletePatientValidation
  deletePatientSpy: DeletePatientSpy
  sut: DeletePatientController
}

const makeSut = (): SutTypes => {
  const validation = new DeletePatientValidation(new ObjectValidatorAdapter())
  const deletePatientSpy = new DeletePatientSpy()
  const sut = new DeletePatientController(validation, deletePatientSpy)

  return {
    sut,
    validation,
    deletePatientSpy,
  }
}

describe('DeletePatientController', () => {
  test('should return 404 if patient no exist', async () => {
    const { sut, deletePatientSpy } = makeSut()

    const httpRequest = {
      params: {
        id: 1,
      },
    }
    jest.spyOn(deletePatientSpy, 'delete').mockResolvedValueOnce(false)

    const result = await sut.handle(httpRequest)

    expect(result.statusCode).toEqual(404)
    expect(result.body).toEqual(new NotFoundError('Patient'))
  })

  test('should return 200 if patient is deleted', async () => {
    const { sut, deletePatientSpy } = makeSut()

    const httpRequest = {
      params: {
        id: 1,
      },
    }

    const result = await sut.handle(httpRequest)

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(true)
  })

  test('should return 500 if deletePatient throws', async () => {
    const { sut, deletePatientSpy } = makeSut()

    const httpRequest = {
      params: {
        id: 1,
      },
    }

    jest.spyOn(deletePatientSpy, 'delete').mockRejectedValueOnce(new Error())

    const result = await sut.handle(httpRequest)

    expect(result.statusCode).toEqual(500)
  })

  test('should return 422 if validation throws', async () => {
    const { sut, validation } = makeSut()

    const httpRequest = {
      params: {
        id: '',
      },
    }

    // @ts-expect-error
    const result = await sut.handle(httpRequest)

    expect(result.statusCode).toEqual(422)
  })
})

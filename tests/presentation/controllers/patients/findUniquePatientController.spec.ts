import { FindUniquePatientController } from '@/presentation/controllers'
import { FindUniquePatientSpy, mockPatients } from '@/../tests/mocks'
import { FindUniquePatientValidation } from '@/validation/validators/patients/findUniquePatientValidation'
import { ObjectValidatorAdapter } from '@/infra/validators'
import { unprocessableEntity } from '@/presentation/helpers'

interface SutTypes {
  findUniquePatientSpy: FindUniquePatientSpy
  validation: FindUniquePatientValidation
  sut: FindUniquePatientController
}

const makeSut = (): SutTypes => {
  const findUniquePatientSpy = new FindUniquePatientSpy()
  const validation = new FindUniquePatientValidation(
    new ObjectValidatorAdapter()
  )
  const sut = new FindUniquePatientController(validation, findUniquePatientSpy)

  return {
    sut,
    validation,
    findUniquePatientSpy,
  }
}

describe('FindUniquePatientController', () => {
  const fakeHttpRequest = {
    params: {
      id: '1',
    },
  }
  test('should return 404 if patient no exist', async () => {
    const { sut, findUniquePatientSpy } = makeSut()

    jest.spyOn(findUniquePatientSpy, 'findUnique').mockResolvedValueOnce(null)

    const result = await sut.handle(fakeHttpRequest)

    expect(result.statusCode).toEqual(404)
  })

  test('should return 200 and a patient', async () => {
    const { sut } = makeSut()

    const result = await sut.handle(fakeHttpRequest)

    expect(result.body).toEqual(mockPatients[0])
    expect(result.statusCode).toEqual(200)
  })

  test('validate should throw error', async () => {
    const { sut } = makeSut()

    const result = await sut.handle({
      params: {
        id: '',
      },
    })

    expect(result.statusCode).toEqual(422)
  })

  test('should throw server error', async () => {
    const { sut, findUniquePatientSpy } = makeSut()

    jest
      .spyOn(findUniquePatientSpy, 'findUnique')
      .mockRejectedValueOnce(new Error())

    const result = await sut.handle(fakeHttpRequest)

    expect(result.statusCode).toEqual(500)
  })
})

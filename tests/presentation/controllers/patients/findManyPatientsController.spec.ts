import { FindPatientsController } from '@/presentation/controllers'
import { FindPatientsSpy } from '@/../tests/mocks'

interface SutTypes {
  findManyPatientsSpy: FindPatientsSpy
  sut: FindPatientsController
}

const makeSut = (): SutTypes => {
  const findManyPatientsSpy = new FindPatientsSpy()
  const sut = new FindPatientsController(findManyPatientsSpy)

  return {
    sut,
    findManyPatientsSpy,
  }
}

describe('FindManyPatientController', () => {
  test('should return 200 and an empty array if have no patients', async () => {
    const { sut, findManyPatientsSpy } = makeSut()

    jest.spyOn(findManyPatientsSpy, 'findMany').mockResolvedValueOnce([])

    const result = await sut.handle()

    expect(result.body).toEqual([])
  })

  test('should throw server error', async () => {
    const { sut, findManyPatientsSpy } = makeSut()

    jest
      .spyOn(findManyPatientsSpy, 'findMany')
      .mockRejectedValueOnce(new Error())

    const result = await sut.handle()

    expect(result.statusCode).toEqual(500)
  })
})

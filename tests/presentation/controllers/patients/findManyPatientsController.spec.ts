import { makeFindPatientsRepository } from '@/main/factories/patients/read/findManyPatientsUseCaseFactory'
import { FindPatientsController } from '@/presentation/controllers'

interface SutTypes {
  sut: FindPatientsController
}

const makeSut = (): SutTypes => {
  const sut = new FindPatientsController(makeFindPatientsRepository())

  return {
    sut,
  }
}

describe('FindManyPatientController', () => {
  test('should return 200 and an empty array if have no patients', async () => {
    const { sut } = makeSut()

    const result = await sut.handle()

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual([])
  })
})

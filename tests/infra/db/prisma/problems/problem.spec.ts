import { ProblemPrismaRepository } from '@/infra/db/prisma/problemsRepository/problem'
import { prismaMock } from '../singleton'

interface SutTypes {
  sut: ProblemPrismaRepository
}

const makeSut = (): SutTypes => {
  const sut = new ProblemPrismaRepository()
  return { sut }
}

describe('ProblemPrismaRepository: add', () => {
  test('should add a problem', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    prismaMock.problem.create.mockResolvedValue({
      id: 1,
      code: 'code',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const problem = await sut.add({
      code: 'code',
      description: 'description',
    })

    expect(problem).toEqual({
      body: {
        id: 1,
        code: 'code',
        description: 'description',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      statusCode: 201,
    })
  })
  test('should return 400 if problem not created', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    prismaMock.problem.create.mockResolvedValue(null)

    const problem = await sut.add({
      code: 'code',
      description: 'description',
    })

    expect(problem).toEqual({
      body: [
        {
          message: 'Problem not created',
        },
      ],
      statusCode: 400,
    })
  })
})

describe('ProblemPrismaRepository: findMany', () => {
  test('should find many problems', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    prismaMock.problem.findMany.mockResolvedValue([
      {
        id: 1,
        code: 'code',
        description: 'description',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    const problems = await sut.findMany()

    expect(problems).toEqual({
      body: [
        {
          id: 1,
          code: 'code',
          description: 'description',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ],
      statusCode: 200,
    })
  })
})

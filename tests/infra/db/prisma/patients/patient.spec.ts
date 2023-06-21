import { PatientPrismaRepository } from '@/infra/db/prisma/patitentRepository/patient'
import { prismaMock } from '@/../tests/infra/db/prisma/singleton'
import prisma from '@/infra/db/prisma/helpers/client'

interface SutTypes {
  sut: PatientPrismaRepository
}

const makeSut = (): SutTypes => {
  const sut = new PatientPrismaRepository()
  return { sut }
}

describe('PatientPrismaRepository: createPatient', () => {
  test('should add an patient with problems', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    prismaMock.problem.findMany.mockResolvedValue([
      {
        id: 1,
        description: 'Dor de cabeça',
        code: 'A01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    // @ts-expect-error
    prismaMock.patient.create.mockResolvedValue({
      id: 1,
      email: 'example@email.com',
      name: 'Gabriel',
      medicalRecord: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      patientProblems: [
        {
          id: 1,
          patientId: 1,
          problemId: 2054,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })

    // @ts-expect-error
    prismaMock.patientProblem.create.mockResolvedValue({
      id: 1,
      patientId: 1,
      problemId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await sut.create({
      body: {
        email: 'example@email.com',
        name: 'gabriel',
        medicalRecord: '1',
        patientProblems: [
          {
            problemId: 2054,
            patientId: 1,
          },
        ],
      },
    })

    expect(result).toEqual({
      body: {
        email: 'example@email.com',
        id: 1,
        medicalRecord: '1',
        name: 'Gabriel',
        patientProblems: [
          {
            createdAt: expect.any(Date),
            id: 1,
            patientId: 1,
            problemId: 2054,
            updatedAt: expect.any(Date),
          },
        ],
        updatedAt: expect.any(Date),
        createdAt: expect.any(Date),
      },
      statusCode: 201,
    })
  })

  test('should throw: problem does not exist', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    prismaMock.problem.findMany.mockResolvedValue([])

    // @ts-expect-error
    prismaMock.patient.create.mockResolvedValue({
      id: 1,
      email: 'example@email.com',
      name: 'Gabriel',
      medicalRecord: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      patientProblems: [
        {
          id: 1,
          patientId: 1,
          problemId: 2054,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })

    // @ts-expect-error
    prismaMock.patientProblem.create.mockResolvedValue({
      id: 1,
      patientId: 1,
      problemId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await sut.create({
      body: {
        email: 'example@email.com',
        name: 'gabriel',
        medicalRecord: '1',
        patientProblems: [
          {
            problemId: 2054,
            patientId: 1,
          },
        ],
      },
    })

    expect(result).toEqual({
      body: 'Problem does not exist',
      statusCode: 400,
    })
  })

  test('should throw message: email already exists', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    prismaMock.patient.findUnique.mockResolvedValue({
      id: 1,
      name: 'Random name',
      email: 'example@email.com',
      medicalRecord: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // @ts-expect-error
    prismaMock.patient.create.mockResolvedValue({
      error: 'Email already exists',
    })

    const result = await sut.create({
      body: {
        name: 'Gabriel',
        email: 'example@email.com',
        medicalRecord: '1',
      },
    })

    expect(result).toEqual({
      body: 'Email already exists',
      statusCode: 400,
    })
  })

  test('should throw message: Missing param: name, email or medicalRecord', async () => {
    const { sut } = makeSut()

    const result = await sut.create({
      body: {
        name: 'Gabriel',
        email: '',
        medicalRecord: '1',
      },
    })

    expect(result).toEqual({
      body: 'Missing param: name, email or medicalRecord',
      statusCode: 400,
    })
  })
})

describe('PatientPrismaRepository: findMany', () => {
  test('should find all patients ', async () => {
    const { sut } = makeSut()
    // @ts-expect-error
    prismaMock.patient.findMany.mockResolvedValue([
      {
        id: 1,
        name: 'Gabriel',
        email: 'example1@email.com',
        medicalRecord: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        patientProblems: [],
      },
      {
        id: 1,
        name: 'Shrek',
        email: 'example2@email.com',
        medicalRecord: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        patientProblems: [
          {
            id: 1,
            patientId: 1,
            problemId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ])

    // @ts-expect-error
    prismaMock.problem.findMany.mockResolvedValue([
      {
        id: 1,
        description: 'Dor de cabeça',
        code: 'A01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    const result = await sut.findMany()

    expect(result).toEqual({
      body: [
        {
          createdAt: expect.any(Date),
          email: 'example1@email.com',
          id: 1,
          medicalRecord: '1',
          name: 'Gabriel',
          patientProblems: [],
          problems: [],
          updatedAt: expect.any(Date),
        },
        {
          createdAt: expect.any(Date),
          email: 'example2@email.com',
          id: 1,
          medicalRecord: '2',
          name: 'Shrek',
          patientProblems: [
            {
              createdAt: expect.any(Date),
              id: 1,
              patientId: 1,
              problemId: 1,
              updatedAt: expect.any(Date),
            },
          ],
          problems: [
            {
              code: 'A01',
              createdAt: expect.any(Date),
              description: 'Dor de cabeça',
              id: 1,
              updatedAt: expect.any(Date),
            },
          ],
          updatedAt: expect.any(Date),
        },
      ],
      statusCode: 200,
    })
  })
  test('should return an empty array if has no patients ', async () => {
    const { sut } = makeSut()
    // @ts-expect-error
    prismaMock.problem.findMany.mockResolvedValue([
      {
        id: 1,
        description: 'Dor de cabeça',
        code: 'A01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    // @ts-expect-error
    prismaMock.patient.findMany.mockResolvedValue([])

    const result = await sut.findMany()

    expect(result).toEqual({
      body: [],
      statusCode: 200,
    })
  })
})

describe('PatientPrismaRepository: findUnique', () => {
  test('should find an patient ', async () => {
    const { sut } = makeSut()
    // @ts-expect-error
    prismaMock.patient.findUnique.mockResolvedValue({
      id: 1,
      email: 'example@email.com',
      name: 'Gabriel',
      medicalRecord: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      patientProblems: [
        {
          id: 1,
          patientId: 1,
          problemId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })

    const result = await sut.findUnique({
      id: 1,
    })

    expect(result).toEqual({
      body: {
        id: 1,
        email: 'example@email.com',
        name: 'Gabriel',
        medicalRecord: '1',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        patientProblems: [
          {
            id: 1,
            patientId: 1,
            problemId: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          },
        ],
      },
      statusCode: 200,
    })
  })

  test('should throw patient not found', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    prismaMock.patient.findUnique.mockResolvedValue(null)

    const result = await sut.findUnique({
      id: 1,
    })

    expect(result).toEqual({
      body: 'Patient not found',
      statusCode: 404,
    })
  })
})

describe('PatientPrismaRepository: update', () => {
  test('should update an patient ', async () => {
    const { sut } = makeSut()
    // @ts-expect-error
    prisma.patient.findUnique.mockResolvedValue({
      id: 1,
      email: 'example@email.com',
      name: 'Gabriel',
      medicalRecord: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      patientProblems: [
        {
          id: 1,
          patientId: 1,
          problemId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })

    // @ts-expect-error
    prismaMock.patientProblem.findMany.mockResolvedValue([
      {
        id: 1,
        patientId: 1,
        problemId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    // @ts-expect-error
    prismaMock.patient.update.mockResolvedValue({
      id: 1,
      name: 'Gabriel',
      email: 'emailchanged@email.com',
      medicalRecord: '1',
      patientProblems: [
        {
          id: 1,
          patientId: 1,
          problemId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await sut.update({
      params: {
        id: 1,
      },
      body: {
        name: 'Gabriel',
        email: 'emailchanged@email.com',
        patientProblems: [
          {
            problemId: 2,
          },
        ],
      },
    })

    expect(result).toEqual({
      body: {
        id: 1,
        name: 'Gabriel',
        medicalRecord: '1',
        email: 'emailchanged@email.com',
        patientProblems: [
          {
            id: 1,
            patientId: 1,
            problemId: 2,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          },
        ],
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      statusCode: 200,
    })
  })
  test('should throw message: Patient not found', async () => {
    const { sut } = makeSut()
    // @ts-expect-error
    prismaMock.patient.findUnique.mockResolvedValue(null)

    const result = await sut.update({
      params: {
        id: 1,
      },
      body: {
        name: 'Gabriel',
        email: 'emailchanged',
        patientProblems: [
          {
            problemId: 2,
          },
        ],
      },
    })

    expect(result).toEqual({
      body: {
        message: 'Patient not found',
      },
      statusCode: 404,
    })
  })
})

describe('PatientPrismaRepository: deletePatient', () => {
  test('should delete an patient ', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    prisma.patient.findUnique.mockResolvedValue({
      id: 1,
      email: 'example@email.com',
      name: 'Gabriel',
      medicalRecord: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      patientProblems: [],
    })

    // @ts-expect-error
    prismaMock.patient.delete.mockResolvedValue({
      message: 'Patient deleted successfully',
    })

    const result = await sut.delete({
      id: 1,
    })

    expect(result).toEqual({
      body: {
        message: 'Patient deleted successfully',
      },
      statusCode: 200,
    })
  })

  test('should throw message: Patient not found', async () => {
    const { sut } = makeSut()
    // @ts-expect-error
    prismaMock.patient.findUnique.mockResolvedValue(null)

    const result = await sut.delete({
      id: 1,
    })

    expect(result).toEqual({
      body: 'Patient does not exist',
      statusCode: 400,
    })
  })
})

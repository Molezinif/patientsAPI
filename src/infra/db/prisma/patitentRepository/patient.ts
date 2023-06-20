import {
  FindPatientsRepository,
  CreatePatientRepository,
  DeletePatientRepository,
  UpdatePatientRepository,
  FindPatientUniqueRepository,
} from '@/data'
import prisma from '@/infra/db/prisma/helpers/client'

export class PatientPrismaRepository
  implements
    FindPatientsRepository,
    FindPatientUniqueRepository,
    CreatePatientRepository,
    DeletePatientRepository,
    UpdatePatientRepository
{
  async findMany(): Promise<FindPatientsRepository.Result> {
    const patientProblemTable = await prisma.patient.findMany({
      include: {
        patientProblems: true,
      },
    })

    const patient = await prisma.patient.findMany()

    const problems = await prisma.problem.findMany()

    const patientProblems = patientProblemTable?.map((patient) => {
      const patientProblemId = patient.patientProblems.map(
        (patientProblemTable) => patientProblemTable.problemId
      )

      const problem = problems.filter((problem) => {
        return patientProblemId.includes(problem.id)
      })

      return {
        problem,
      }
    })

    const patientWithProblem = patient?.map((patient, index) => {
      return {
        ...patient,
        problems: patientProblems[index].problem,
      }
    })

    if (!patientWithProblem || patientWithProblem.length === 0) {
      return {
        statusCode: 200,
        body: [],
      }
    }

    return {
      statusCode: 200,
      body: patientWithProblem,
    }
  }

  async findUnique(
    request: FindPatientUniqueRepository.Params
  ): Promise<FindPatientUniqueRepository.Result> {
    const { id } = request

    const patientProblemTable = await prisma.patient.findUnique({
      where: { id: Number(id) },
      include: {
        patientProblems: true,
      },
    })

    const patientProblemId = patientProblemTable?.patientProblems.map(
      (patientProblemTable) => patientProblemTable.problemId
    )

    const problems = await prisma.problem.findMany({
      where: {
        id: {
          in: patientProblemId,
        },
      },
    })

    const patient = await prisma.patient.findUnique({
      where: { id: Number(id) },
    })

    const patientWithProblem = {
      ...patient,
      problems: problems,
    } as FindPatientUniqueRepository.Params

    if (!patient) {
      return {
        statusCode: 404,
        body: 'Patient not found',
      }
    }

    return {
      statusCode: 200,
      body: patientWithProblem,
    }
  }

  async create(
    request: CreatePatientRepository.Params
  ): Promise<CreatePatientRepository.Result> {
    const { name, email, medicalRecord, patientProblems } = request.body

    const emailExists = await prisma.patient.findUnique({
      where: { email },
    })

    if (emailExists) {
      return {
        statusCode: 400,
        body: 'Email already exists',
      }
    }

    if (!name || !email || !medicalRecord) {
      return {
        statusCode: 400,
        body: 'Missing param: name, email or medicalRecord',
      }
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        email,
        medicalRecord,
        createdAt: new Date(),
      },
    })

    if (patientProblems) {
      for (const problem of patientProblems) {
        await prisma.patientProblem.create({
          data: {
            patientId: patient.id,
            problemId: problem.problemId,
          },
        })
      }
    }

    return {
      statusCode: 201,
      body: patient,
    }
  }

  async delete(
    params: DeletePatientRepository.Params
  ): Promise<DeletePatientRepository.Result> {
    const patientExists = await prisma.patient.findUnique({
      where: { id: Number(params.id) },
    })

    if (!patientExists) {
      return {
        statusCode: 400,
        body: 'Patient does not exist',
      }
    }

    await prisma.patientProblem.deleteMany({
      where: { patientId: Number(params.id) },
    })

    await prisma.patient.delete({
      where: { id: Number(params.id) },
    })

    return {
      statusCode: 200,
      body: {
        message: 'Patient deleted successfully',
      },
    }
  }

  async update(
    request: UpdatePatientRepository.Params
  ): Promise<UpdatePatientRepository.Result> {
    const { id } = request.params
    const { name, email, patientProblems } = request.body

    const patientExists = await prisma.patient.findUnique({
      where: { id: Number(id) },
    })

    const patientProblemDoesNotExist = await prisma.patientProblem.findMany({
      where: {
        patientId: Number(id),
      },
    })

    if (patientProblemDoesNotExist && patientProblems) {
      for (const problem of patientProblems) {
        await prisma.patientProblem.create({
          data: {
            patientId: Number(id),
            problemId: problem.problemId,
          },
        })
      }
    }

    if (!patientExists) {
      console.log('Patient not found')
      return {
        statusCode: 404,
        body: {
          message: 'Patient not found',
        },
      }
    }

    const patient = await prisma.patient.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
      },
    })
    return {
      statusCode: 200,
      body: patient,
    }
  }
}

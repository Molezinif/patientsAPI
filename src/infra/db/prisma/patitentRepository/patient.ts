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

    const result = patient?.map((patient, index) => {
      return {
        ...patient,
        problems: patientProblems[index].problem,
      }
    })

    return result
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
    } as FindPatientUniqueRepository.Result

    return patient ? patientWithProblem : null
  }

  async create(
    request: CreatePatientRepository.Params
  ): Promise<CreatePatientRepository.Result> {
    const { name, email, medicalRecord, patientProblems } = request.body

    if (patientProblems && patientProblems.length > 0) {
      for (const problem of patientProblems) {
        const hasProblem = await prisma.problem.findMany({
          where: {
            id: problem.problemId,
          },
        })

        if (hasProblem.length === 0) {
          return null
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

      if (patientProblems && patientProblems.length > 0) {
        for (const problem of patientProblems) {
          await prisma.patientProblem.create({
            data: {
              patientId: patient.id,
              problemId: problem.problemId,
            },
          })
        }
      }

      return patient
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        email,
        medicalRecord,
        createdAt: new Date(),
      },
    })

    return patient ? patient : null
  }

  async delete(
    params: DeletePatientRepository.Params
  ): Promise<DeletePatientRepository.Result> {
    const patientExists = await prisma.patient.findUnique({
      where: { id: Number(params.id) },
    })

    if (!patientExists) {
      return false
    }

    await prisma.patientProblem.deleteMany({
      where: { patientId: Number(params.id) },
    })

    await prisma.patient.delete({
      where: { id: Number(params.id) },
    })

    return true
  }

  async update(
    request: UpdatePatientRepository.Params
  ): Promise<UpdatePatientRepository.Result> {
    const { id } = request.params
    const { name, email, patientProblems } = request.body

    const patientExists = await prisma.patient.findUnique({
      where: { id: Number(id) },
    })

    const hasPatientProblem = await prisma.patientProblem.findMany({
      where: {
        patientId: Number(id),
      },
    })

    if (
      hasPatientProblem &&
      hasPatientProblem.length > 0 &&
      patientProblems &&
      patientProblems.length > 0
    ) {
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
      return null
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
    return patient
  }
}

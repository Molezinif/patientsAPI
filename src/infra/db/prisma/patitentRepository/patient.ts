import { FindPatientsRepository, CreatePatientRepository } from '@/data'
import prisma from '@/infra/db/prisma/helpers/client'

export class PatientPrismaRepository
  implements FindPatientsRepository, CreatePatientRepository
{
  async find(): Promise<FindPatientsRepository.Result> {
    const patientProblemTable = await prisma.patient.findMany({
      include: {
        patientProblems: true,
      },
    })

    const patient = await prisma.patient.findMany()

    const problems = await prisma.problem.findMany()

    const patientProblems = patientProblemTable.map((patient) => {
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

    const patientWithProblem = patient.map((patient, index) => {
      return {
        ...patient,
        problems: patientProblems[index].problem,
      }
    })

    return patientWithProblem
  }

  async create(
    request: CreatePatientRepository.Request
  ): Promise<CreatePatientRepository.Result> {
    const { name, email, medicalRecord, patientProblems } = request.body

    const emailExists = await prisma.patient.findUnique({
      where: { email },
    })

    if (emailExists) {
      return null
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        email,
        medicalRecord,
        createdAt: new Date(),
        patientProblems: {
          create: patientProblems?.map((problem: { problemId: any }) => ({
            problemId: problem.problemId,
          })),
        },
      },
    })

    if (!patient) {
      return null
    }

    if (!patientProblems) return patient

    for (const problem of patientProblems) {
      await prisma.patientProblem.create({
        data: {
          patientId: patient.id,
          problemId: problem.problemId,
        },
      })
    }

    return patient
  }
}

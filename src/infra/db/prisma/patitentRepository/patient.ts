import { FindPatientsRepository } from '@/data'
import prisma from '@/infra/db/prisma/helpers/client'

export class PatientPrismaRepository implements FindPatientsRepository {
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
}

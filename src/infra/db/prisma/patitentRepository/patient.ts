import {
  FindPatientsRepository,
  CreatePatientRepository,
  DeletePatientRepository,
} from '@/data'
import prisma from '@/infra/db/prisma/helpers/client'

export class PatientPrismaRepository
  implements
    FindPatientsRepository,
    CreatePatientRepository,
    DeletePatientRepository
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
    const { name, email, medicalRecord } = request.body

    if (!name || !email || !medicalRecord) {
      throw new Error('Missing required fields')
    }

    try {
      const createdPatient = await prisma.patient.create({
        data: {
          name: name,
          email: email,
          medicalRecord: medicalRecord,
        },
      })

      return createdPatient
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create patient')
    }
  }

  async delete(
    params: DeletePatientRepository.Params
  ): Promise<DeletePatientRepository.Result> {
    console.log('DeletePatientRepository', params)
    await prisma.patientProblem.deleteMany({
      where: { id: Number(params.id) },
    })

    await prisma.patient.delete({
      where: { id: Number(params.id) },
    })

    return true
  }
}

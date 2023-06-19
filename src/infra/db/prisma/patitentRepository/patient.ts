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

    if (!patient) {
      return null
    }

    return patientWithProblem
  }

  async create(
    request: CreatePatientRepository.Params
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
    await prisma.patientProblem.deleteMany({
      where: { id: Number(params.id) },
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
    const { name, email } = request.body

    const patientExists = await prisma.patient.findUnique({
      where: { id: Number(id) },
    })

    if (!patientExists) {
      console.log('Patient not found')
      return false
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
    return true
  }
}

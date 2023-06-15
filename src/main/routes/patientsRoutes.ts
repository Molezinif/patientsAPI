import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()

export default (router: Router): void => {
  router.get('/patients', async (req, res) => {
    const patientsProblems = await prisma.patient.findMany({
      include: {
        patientProblems: true,
      },
    })

    if (!patientsProblems) {
      return res.status(404).send()
    }

    const problems = await prisma.problem.findMany()
    const patients = await prisma.patient.findMany()

    const patientsProblemsId = patientsProblems.map((patientProblem) =>
      patientProblem.patientProblems.map(
        (patientProblem) => patientProblem.problemId
      )
    )

    const patientsWithProblems = patients.map((patient) => {
      const patientProblemId = patientsProblemsId.find(
        (patientProblemId) => patientProblemId[0] === patient.id
      )

      const problem = problems.filter((problem) =>
        patientProblemId?.includes(problem.id)
      )

      const patientWithProblem = {
        ...patient,
        problem,
      }

      return patientWithProblem
    })

    return res.send(patientsWithProblems)
  })

  router.get(`/patients/:id`, async (req, res) => {
    const { id } = req.params

    const patientProblemTable = await prisma.patient.findUnique({
      where: { id: Number(id) },
      include: {
        patientProblems: true,
      },
    })

    const patientProblemId = patientProblemTable?.patientProblems.map(
      (patientProblemTable) => patientProblemTable.problemId
    )

    const problem = await prisma.problem.findMany({
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
      problem,
    }

    if (!patient) {
      return res.status(404).send()
    }

    return res.send(patientWithProblem)
  })

  router.post('/patients', async (req, res) => {
    const { name, email, medicalRecord } = req.body

    const patientExists = await prisma.patient.findUnique({
      where: { email },
    })

    if (patientExists) {
      return res.status(409).send({ message: 'Email already in use' })
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        email,
        medicalRecord,
        createdAt: new Date(),
      },
    })
    return res.status(201).send(patient)
  })

  router.delete('/patients/:id', async (req, res) => {
    const { id } = req.params

    const patientExists = await prisma.patient.findUnique({
      where: { id: Number(id) },
    })

    if (!patientExists) {
      return res.status(404).send()
    }

    await prisma.patientProblem.deleteMany({
      where: { patientId: Number(id) },
    })

    await prisma.patient.delete({
      where: {
        id: Number(id),
      },
    })

    return res.status(204).send()
  })

  router.put('/patients/:id', async (req, res) => {
    const { id } = req.params
    const { name, email } = req.body

    const patientExists = await prisma.patient.findUnique({
      where: { id: Number(id) },
    })

    if (!patientExists) {
      return res.status(404).send()
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
    return res.status(200).send(patient)
  })
}

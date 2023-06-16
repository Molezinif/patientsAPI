import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import {
  makeFindPatientsController,
  makeCreatePatientController,
} from '@/main/factories'

const prisma = new PrismaClient()

export default (router: Router): void => {
  router.get('/patients', adaptRoute(makeFindPatientsController()))

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

  router.post('/patients', adaptRoute(makeCreatePatientController()))

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

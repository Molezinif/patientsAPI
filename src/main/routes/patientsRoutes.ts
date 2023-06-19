import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import {
  makeFindPatientsController,
  makeCreatePatientController,
  makeDeletePatientController,
  makeUpdatePatientController,
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

  router.delete('/patients/:id', adaptRoute(makeDeletePatientController()))

  router.put('/patients/:id', adaptRoute(makeUpdatePatientController()))
}

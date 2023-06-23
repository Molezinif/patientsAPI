import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import {
  makeFindPatientsController,
  makeCreatePatientController,
  makeDeletePatientController,
  makeUpdatePatientController,
  makeFindUniquePatientController,
} from '@/main/factories'

export default (router: Router): void => {
  router.get('/patients', adaptRoute(makeFindPatientsController()))

  router.get(`/patients/:id`, adaptRoute(makeFindUniquePatientController()))

  router.post('/patients', adaptRoute(makeCreatePatientController()))

  router.delete('/patients/:id', adaptRoute(makeDeletePatientController()))

  router.put('/patients/:id', adaptRoute(makeUpdatePatientController()))
}

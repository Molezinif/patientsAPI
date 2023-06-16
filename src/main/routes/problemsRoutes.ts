import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import {
  makeFindProblemsController,
  makeAddProblemController,
} from '@/main/factories'

export default (router: Router): void => {
  router.get('/problems', adaptRoute(makeFindProblemsController()))

  router.post('/problems', adaptRoute(makeAddProblemController()))
}

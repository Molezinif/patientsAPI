import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import {
  makeFindProblemController,
  makeAddProblemController,
} from '@/main/factories'

export default (router: Router): void => {
  router.get('/problems', adaptRoute(makeFindProblemController()))

  router.post('/problems', adaptRoute(makeAddProblemController()))
}

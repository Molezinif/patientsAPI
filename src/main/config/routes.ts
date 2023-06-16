import { patientsRoutes, problemsRoutes } from '../routes'
import express, { Express } from 'express'

export default (app: Express): void => {
  const router = express.Router()
  patientsRoutes(router)
  problemsRoutes(router)
  app.use(router)
}

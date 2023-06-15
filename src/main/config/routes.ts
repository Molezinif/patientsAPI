import { patientsRoutes } from '../routes'
import express, { Express } from 'express'

export default (app: Express): void => {
  const router = express.Router()
  patientsRoutes(router)
  app.use(router)
}

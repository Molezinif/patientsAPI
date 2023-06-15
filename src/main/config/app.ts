import express from 'express'
import { bodyParser } from '../middlewares/bodyParser'
import setupRoutes from './routes'

const app = express()
app.use(bodyParser)
setupRoutes(app)

export default app

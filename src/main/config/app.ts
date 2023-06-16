import express from 'express'
import { bodyParser } from '@/main/middlewares'
import setupRoutes from './routes'

const app = express()
app.use(bodyParser)
setupRoutes(app)

export default app

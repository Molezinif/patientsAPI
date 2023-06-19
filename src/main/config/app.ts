import express from 'express'
import { bodyParser } from '@/main/middlewares'
import setupRoutes from './routes'
import { contentType } from '../middlewares/contentType'

const app = express()
app.use(bodyParser) 
app.use(contentType)
setupRoutes(app)

export default app

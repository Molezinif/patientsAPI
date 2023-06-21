import { parseError } from '../helpers/errorHelper'

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ServerError extends Error {
  constructor(error?: any) {
    super('Internal Server Error')
    this.message = 'Internal Server Error'
    this.statusCode = 500
    if (typeof error === 'string') this.body = error
    if (typeof error === 'object') {
      const errorParsed = parseError(error)
      this.statusCode = errorParsed.statusCode
      this.body = errorParsed.body
    }
    if (error instanceof Error) {
      this.errorInfo = JSON.stringify({
        message: error?.message,
        stack: error?.stack,
      })
    }
  }

  name!: string
  message!: string
  stack?: string
  errorInfo?: any
  statusCode: number
  body: any
}

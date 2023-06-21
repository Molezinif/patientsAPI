import { parseError } from '../helpers/errorHelper'

/* eslint-disable @typescript-eslint/no-explicit-any */
export class BadRequestError extends Error {
  constructor(error?: any) {
    const messageError = 'Could not process'
    super(messageError)
    this.message = messageError
    this.statusCode = 400
    if (typeof error === 'string') this.body = error
    if (typeof error === 'object') {
      const errorParsed = parseError(error)
      this.statusCode = errorParsed.statusCode
      this.body = errorParsed.body
    }
  }

  statusCode: number
  body: any
}

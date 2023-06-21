import { HttpResponse } from '../protocols/http'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseError = (error: any): HttpResponse => {
  const statusCode = error.statusCode
  let body
  if (error.body) {
    if (typeof error.body === 'string') {
      body = error.body
    }

    if (error.body.errors) {
      if (typeof error.body.errors === 'object') {
        body = JSON.stringify(error.body.errors)
      }
    } else {
      body = JSON.stringify(error.body)
    }
  }
  return {
    statusCode,
    body,
  }
}

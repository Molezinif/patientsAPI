/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from '../protocols/http'

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})

export const successfullyCreated = (
  data: Record<string, unknown>
): HttpResponse => ({
  statusCode: 201,
  body: data,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const multiStatus = (data: any): HttpResponse => ({
  statusCode: 207,
  body: data,
})

export const badRequest = (error: Error | string[] | null): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const unauthorized = (error: Error | string[] | null): HttpResponse => ({
  statusCode: 401,
  body: error,
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error,
})

export const unprocessableEntity = (
  error: Error | string[] | null
): HttpResponse => ({
  statusCode: 422,
  body: error,
})
export const failedDependency = (
  error: Error | string[] | null
): HttpResponse => ({
  statusCode: 424,
  body: error,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serverError = (error: any): HttpResponse => {
  // eslint-disable-next-line no-console
  console.log(error)

  if (error?.code === 'P2003') {
    const field: string = error.meta?.field_name
    return unprocessableEntity([
      `Foreign key constraint failed on the field:  ${field}`,
    ])
  }

  if (error?.code === 'P2002') {
    const target: string = error.meta?.target
    return unprocessableEntity([
      `Unique key constraint failed on the key:  ${target}`,
    ])
  }

  let errorDescription = error?.body?.error || error?.body || error?.meta
  if (!errorDescription) errorDescription = error

  return {
    statusCode: error?.statusCode || 500,
    body: errorDescription,
    errorInfo: error?.errorInfo || undefined,
  }
}

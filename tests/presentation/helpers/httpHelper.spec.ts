import {
  badRequest,
  forbidden,
  notFound,
  serverError,
  success,
  successfullyCreated,
  unauthorized,
  multiStatus,
  unprocessableEntity,
  parseError,
  failedDependency,
} from '@/presentation/helpers'
import {
  AccessDeniedError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from '@/presentation/errors'

describe('Http helpers', () => {
  test('Should status code 200 and correct body on success', () => {
    const successResult = success('name')
    expect(successResult.statusCode).toBe(200)
    expect(successResult.body).toBe('name')
  })

  test('Should status code 201 and correct body on successfully created', () => {
    const successResult = successfullyCreated({ status: true, message: 'ok' })
    expect(successResult.statusCode).toBe(201)
    expect(successResult.body.message).toBe('ok')
    expect(successResult.body.status).toBe(true)
  })

  test('Should status code 400 and correct body on bad request', () => {
    const successResult = badRequest(new ServerError())
    expect(successResult.statusCode).toBe(400)
  })

  test('Should status code 403 and correct body on forbidden', () => {
    const forbiddenResult = forbidden(new AccessDeniedError())
    expect(forbiddenResult.statusCode).toBe(403)
    expect(forbiddenResult.body.message).toBe('Access Denied')
  })

  test('Should status code 401 and correct body on unauthorized', () => {
    const forbiddenResult = unauthorized(new UnauthorizedError())
    expect(forbiddenResult.statusCode).toBe(401)
    expect(forbiddenResult.body.message).toBe('Unauthorized')
  })
  test('Should status code 207 and correct body on multiStatus', () => {
    const multiStatusResult = multiStatus({ status: true, message: 'ok' })
    expect(multiStatusResult.statusCode).toBe(207)
    expect(multiStatusResult.body.status).toBe(true)
  })

  test('Should status code 404 and correct body on not found', () => {
    const notFoundResult = notFound(new NotFoundError('Patient'))
    expect(notFoundResult.statusCode).toBe(404)
    expect(notFoundResult.body.message).toBe('Patient not found')
  })

  test('Should status code 422 and correct body on unprocessable entity', () => {
    const unprocessableResult = unprocessableEntity(['"Patient" is required'])
    expect(unprocessableResult.statusCode).toBe(422)
    expect(unprocessableResult.body).toEqual(['"Patient" is required'])
  })

  test('Should status code 500 and correct body on server error', () => {
    const serverErrorResult = serverError('Error')
    expect(serverErrorResult.statusCode).toBe(500)
  })

  test('Should status code 500 and correct body on server error', () => {
    const serverErrorResult = serverError(null)
    expect(serverErrorResult.statusCode).toBe(500)
  })

  test('Should status code 500 and correct body on server error', () => {
    const serverErrorResult = serverError({
      statusCode: 500,
      body: { error: 'Error' },
    })
    expect(serverErrorResult.statusCode).toBe(500)
  })

  test('Should status code 422 if foreign key constraint failed', () => {
    const errorPrisma = { code: 'P2003', meta: { field_name: 'patientId' } }
    let successResult = serverError(errorPrisma)
    expect(successResult.statusCode).toBe(422)

    successResult = serverError({ code: 'P2003' })
    expect(successResult.statusCode).toBe(422)
  })

  test('Should status code 422 if foreign key constraint failed with errorCode equal P2002', () => {
    const errorPrisma = { code: 'P2002', meta: { field_name: 'patientId' } }
    let successResult = serverError(errorPrisma)
    expect(successResult.statusCode).toBe(422)

    successResult = serverError({ code: 'P2002' })
    expect(successResult.statusCode).toBe(422)
  })

  test('Should parseError be able to convert to a string', () => {
    const errorParse = parseError({
      body: { errors: { message: 'error' }, statusCode: 500 },
    })
    expect(errorParse.body).toBe('{"message":"error"}')
  })
  test('Should status code 424 if failedDependency', () => {
    let successResult = failedDependency(['error'])
    expect(successResult.statusCode).toBe(424)
  })
})

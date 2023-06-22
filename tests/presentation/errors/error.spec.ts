import {
  InvalidParamError,
  NotFoundError,
  ServerError,
  AccessDeniedError,
  BadRequestError,
  UnauthorizedError,
  MissingParamError,
} from '@/presentation/errors'

describe('Check errors', () => {
  test('Should return correct Invalid param error', () => {
    const error = new InvalidParamError('Patient')
    expect(error.message).toBe('Invalid param: Patient')
  })
  test('Should return correct Not Found error', () => {
    const error = new NotFoundError('Patient')
    expect(error.message).toBe('Patient not found')
  })
  test('Should return correct Access denied error', () => {
    const error = new AccessDeniedError()
    expect(error.message).toBe('Access Denied')
  })
  test('Should return correct server error', () => {
    const error = new ServerError()
    expect(error.message).toBe('Internal Server Error')
  })
  test('Should return correct server error with body', () => {
    const error = new ServerError('Server Error')
    expect(error.body).toBe('Server Error')
  })
  test('Should return correct server error with throw in body', () => {
    const error = new ServerError(new Error('Server Error'))
    expect(error.message).toBe('Internal Server Error')
  })
  test('Should return correct bad request error', () => {
    const error = new BadRequestError('Could not process')
    expect(error.message).toBe('Could not process')
  })
  test('Should return correct bad request error', () => {
    const error = new BadRequestError({ message: 'Could not process' })
    expect(error.message).toBe('Could not process')
  })
  test('Should return correct unauthorized error', () => {
    const error = new UnauthorizedError()
    expect(error.message).toBe('Unauthorized')
  })
  test('Should return correct unauthorized error', () => {
    const error = new MissingParamError('any_param')
    expect(error.message).toBe('Missing param: any_param')
  })
})

import { parseError } from '@/presentation/helpers'

describe('parseError', () => {
  test('should return status code and body', () => {
    const error = {
      statusCode: 400,
      body: 'error',
    }
    const result = parseError(error)
    expect(result.statusCode).toBe(400)
    expect(result.body).toBe(JSON.stringify('error'))
  })
})

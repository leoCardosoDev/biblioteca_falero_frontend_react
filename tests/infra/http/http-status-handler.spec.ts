import { handleStatusCode } from '@/infra/http/http-status-handler'
import { NotFoundError, UnexpectedError } from '@/domain/errors'
import { describe, test, expect } from 'vitest'

describe('handleStatusCode', () => {
  test('Should return void for 200', () => {
    expect(() => handleStatusCode({ statusCode: 200, body: {} })).not.toThrow()
  })

  test('Should return void for 201', () => {
    expect(() => handleStatusCode({ statusCode: 201, body: {} })).not.toThrow()
  })

  test('Should return void for 204', () => {
    expect(() => handleStatusCode({ statusCode: 204, body: {} })).not.toThrow()
  })

  test('Should throw NotFoundError for 404', () => {
    expect(() => handleStatusCode({ statusCode: 404, body: {} })).toThrow(
      NotFoundError
    )
  })

  test('Should throw UnexpectedError for default', () => {
    expect(() => handleStatusCode({ statusCode: 500, body: {} })).toThrow(
      UnexpectedError
    )
    expect(() => handleStatusCode({ statusCode: 400, body: {} })).toThrow(
      UnexpectedError
    )
  })
})

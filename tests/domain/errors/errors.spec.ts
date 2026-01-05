import { describe, test, expect } from 'vitest'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'

describe('Domain Errors', () => {
  test('UnexpectedError should have correct name and message', () => {
    const sut = new UnexpectedError()
    expect(sut.name).toBe('UnexpectedError')
    expect(sut.message).toBe('Erro inesperado. Tente novamente mais tarde.')
  })

  test('InvalidCredentialsError should have correct name and message', () => {
    const sut = new InvalidCredentialsError()
    expect(sut.name).toBe('InvalidCredentialsError')
    expect(sut.message).toBe('Credenciais inválidas')
  })
})

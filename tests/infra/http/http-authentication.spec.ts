import { describe, test, expect, vi } from 'vitest'
import { HttpAuthenticationRepository } from '../../../src/infra/http/http-authentication-repository'
import axios, { type AxiosInstance } from 'axios'
import { type AuthenticationParams } from '../../../src/domain/usecases/authentication'
import { InvalidCredentialsError } from '../../../src/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '../../../src/domain/errors/unexpected-error'

vi.mock('axios')

describe('HttpAuthentication', () => {
  test('Should call axios with correct values', async () => {
    const sut = new HttpAuthenticationRepository(axios as unknown as AxiosInstance)
    const params: AuthenticationParams = { email: 'any_email', password: 'any_password' }

    vi.mocked(axios.post).mockResolvedValue({
      data: {
        accessToken: 'any_token',
        name: 'any_name',
        role: 'any_role',
        refreshToken: 'any_refresh_token'
      }
    })

    await sut.auth(params)
    expect(axios.post).toHaveBeenCalledWith('/login', params)
  })

  test('Should return an AccountModel on success', async () => {
    const sut = new HttpAuthenticationRepository(axios as unknown as AxiosInstance)
    const params: AuthenticationParams = { email: 'any_email', password: 'any_password' }
    const mockAccount = {
      accessToken: 'any_token',
      name: 'any_name',
      role: 'any_role',
      refreshToken: 'any_refresh_token'
    }

    vi.mocked(axios.post).mockResolvedValue({
      data: mockAccount
    })

    const account = await sut.auth(params)

    expect(account).toEqual(mockAccount)
  })

  test('Should throw InvalidCredentialsError on 401', async () => {
    const sut = new HttpAuthenticationRepository(axios as unknown as AxiosInstance)
    const params: AuthenticationParams = { email: 'any_email', password: 'any_password' }

    vi.mocked(axios.isAxiosError).mockReturnValue(true)
    vi.mocked(axios.post).mockRejectedValue({
      response: { status: 401 }
    })

    const promise = sut.auth(params)

    await expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  test('Should throw InvalidCredentialsError on 403', async () => {
    const sut = new HttpAuthenticationRepository(axios as unknown as AxiosInstance)
    const params: AuthenticationParams = { email: 'any_email', password: 'any_password' }

    vi.mocked(axios.isAxiosError).mockReturnValue(true)
    vi.mocked(axios.post).mockRejectedValue({
      response: { status: 403 }
    })

    const promise = sut.auth(params)

    await expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  test('Should throw UnexpectedError on 400', async () => {
    const sut = new HttpAuthenticationRepository(axios as unknown as AxiosInstance)
    const params: AuthenticationParams = { email: 'any_email', password: 'any_password' }

    vi.mocked(axios.isAxiosError).mockReturnValue(true)
    vi.mocked(axios.post).mockRejectedValue({
      response: { status: 400 }
    })

    const promise = sut.auth(params)

    await expect(promise).rejects.toThrow(UnexpectedError)
  })

  test('Should throw UnexpectedError on 500', async () => {
    const sut = new HttpAuthenticationRepository(axios as unknown as AxiosInstance)
    const params: AuthenticationParams = { email: 'any_email', password: 'any_password' }

    vi.mocked(axios.isAxiosError).mockReturnValue(true)
    vi.mocked(axios.post).mockRejectedValue({
      response: { status: 500 }
    })

    const promise = sut.auth(params)

    await expect(promise).rejects.toThrow(UnexpectedError)
  })

  test('Should throw UnexpectedError if axios throws generic Error', async () => {
    const sut = new HttpAuthenticationRepository(axios as unknown as AxiosInstance)
    const params: AuthenticationParams = { email: 'any_email', password: 'any_password' }

    vi.mocked(axios.isAxiosError).mockReturnValue(false)
    vi.mocked(axios.post).mockRejectedValue(new Error())

    const promise = sut.auth(params)

    await expect(promise).rejects.toThrow(UnexpectedError)
  })

  test('Should throw UnexpectedError if error.response is undefined', async () => {
    const sut = new HttpAuthenticationRepository(axios as unknown as AxiosInstance)
    const params: AuthenticationParams = { email: 'any_email', password: 'any_password' }

    vi.mocked(axios.isAxiosError).mockReturnValue(true)
    vi.mocked(axios.post).mockRejectedValue({
      response: undefined
    })

    const promise = sut.auth(params)

    await expect(promise).rejects.toThrow(UnexpectedError)
  })
})

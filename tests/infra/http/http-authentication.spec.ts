import { describe, test, expect, vi, beforeEach } from 'vitest'
import { HttpAuthenticationRepository } from '../../../src/infra/http/http-authentication-repository'
import { type AuthenticationParams } from '../../../src/domain/usecases/authentication'
import { InvalidCredentialsError } from '../../../src/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '../../../src/domain/errors/unexpected-error'
import type { HttpClient } from '../../../src/application/protocols/http/http-client'
import type { AccountModel } from '../../../src/domain/models'

const makeHttpClient = (): HttpClient<AccountModel> => ({
  request: vi.fn()
})

describe('HttpAuthentication', () => {
  let httpClient: HttpClient<AccountModel>
  let sut: HttpAuthenticationRepository

  beforeEach(() => {
    httpClient = makeHttpClient()
    sut = new HttpAuthenticationRepository(httpClient)
  })

  test('Should call HttpClient with correct values', async () => {
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    vi.mocked(httpClient.request).mockResolvedValueOnce({
      statusCode: 200,
      body: {
        accessToken: 'any_token',
        name: 'any_name',
        role: 'any_role',
        refreshToken: 'any_refresh_token'
      }
    })

    await sut.auth(params)
    expect(httpClient.request).toHaveBeenCalledWith({
      url: '/login',
      method: 'post',
      body: params
    })
  })

  test('Should return an AccountModel on success', async () => {
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    const mockAccount: AccountModel = {
      accessToken: 'any_token',
      name: 'any_name',
      role: 'STUDENT',
      refreshToken: 'any_refresh_token'
    }

    vi.mocked(httpClient.request).mockResolvedValueOnce({
      statusCode: 200,
      body: mockAccount
    })

    const account = await sut.auth(params)
    expect(account).toEqual(mockAccount)
  })

  test('Should throw InvalidCredentialsError on 401', async () => {
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    vi.mocked(httpClient.request).mockResolvedValueOnce({
      statusCode: 401,
      body: null as unknown as AccountModel
    })

    const promise = sut.auth(params)
    await expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  test('Should throw InvalidCredentialsError on 403', async () => {
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    vi.mocked(httpClient.request).mockResolvedValueOnce({
      statusCode: 403,
      body: null as unknown as AccountModel
    })

    const promise = sut.auth(params)
    await expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  test('Should throw UnexpectedError on 400', async () => {
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    vi.mocked(httpClient.request).mockResolvedValueOnce({
      statusCode: 400,
      body: null as unknown as AccountModel
    })

    const promise = sut.auth(params)
    await expect(promise).rejects.toThrow(UnexpectedError)
  })

  test('Should throw UnexpectedError on 500', async () => {
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    vi.mocked(httpClient.request).mockResolvedValueOnce({
      statusCode: 500,
      body: null as unknown as AccountModel
    })

    const promise = sut.auth(params)
    await expect(promise).rejects.toThrow(UnexpectedError)
  })

  test('Should throw UnexpectedError if HttpClient throws', async () => {
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    vi.mocked(httpClient.request).mockRejectedValueOnce(new Error())

    const promise = sut.auth(params)
    await expect(promise).rejects.toThrow(UnexpectedError)
  })
})

import { describe, test, expect, vi } from 'vitest'
import { HttpAuthenticationRepository } from '@/infra/http/http-authentication-repository'
import type {
  HttpRequest,
  HttpResponse,
  HttpClient
} from '@/application/protocols/http/http-client'
import type { AuthenticationParams } from '@/domain/usecases/authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import type { AccountModel } from '@/domain/models/account-model'

type HttpClientSpyType = HttpClient<AccountModel> & {
  url?: string
  method?: string
  body?: unknown
  response: HttpResponse<AccountModel>
}

const makeHttpClientSpy = (): HttpClientSpyType => {
  class HttpClientSpy implements HttpClient<AccountModel> {
    url?: string
    method?: string
    body?: unknown
    headers?: unknown
    response: HttpResponse<AccountModel> = {
      statusCode: 200,
      body: {
        accessToken: 'any_token',
        name: 'any_name',
        role: 'any_role',
        refreshToken: 'any_refresh_token'
      }
    }

    async request(data: HttpRequest): Promise<HttpResponse<AccountModel>> {
      this.url = data.url
      this.method = data.method
      this.body = data.body
      this.headers = data.headers
      return this.response
    }
  }
  return new HttpClientSpy()
}

type SutTypes = {
  sut: HttpAuthenticationRepository
  httpClientSpy: HttpClientSpyType
}

const makeSut = (): SutTypes => {
  const httpClientSpy = makeHttpClientSpy()
  const sut = new HttpAuthenticationRepository(httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('HttpAuthentication', () => {
  test('Should call HttpClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }

    await sut.auth(params)

    expect(httpClientSpy.url).toBe('/login')
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(params)
  })

  test('Should return an AccountModel on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    const mockAccount = {
      accessToken: 'any_token',
      name: 'any_name',
      role: 'any_role',
      refreshToken: 'any_refresh_token'
    }
    httpClientSpy.response = {
      statusCode: 200,
      body: mockAccount
    }

    const account = await sut.auth(params)

    expect(account).toEqual(mockAccount)
  })

  test('Should throw InvalidCredentialsError on 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    httpClientSpy.response = {
      statusCode: 401,
      body: {} as AccountModel
    }

    const promise = sut.auth(params)

    await expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  test('Should throw InvalidCredentialsError on 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    httpClientSpy.response = {
      statusCode: 403,
      body: {} as AccountModel
    }

    const promise = sut.auth(params)

    await expect(promise).rejects.toThrow(InvalidCredentialsError)
  })

  test('Should throw UnexpectedError on 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    httpClientSpy.response = {
      statusCode: 400,
      body: {} as AccountModel
    }

    const promise = sut.auth(params)

    await expect(promise).rejects.toThrow(UnexpectedError)
  })

  test('Should throw UnexpectedError on 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    httpClientSpy.response = {
      statusCode: 500,
      body: {} as AccountModel
    }

    const promise = sut.auth(params)

    await expect(promise).rejects.toThrow(UnexpectedError)
  })

  test('Should throw UnexpectedError if HttpClient throws', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params: AuthenticationParams = {
      email: 'any_email',
      password: 'any_password'
    }
    vi.spyOn(httpClientSpy, 'request').mockRejectedValueOnce(new Error())

    const promise = sut.auth(params)

    await expect(promise).rejects.toThrow()
  })
})

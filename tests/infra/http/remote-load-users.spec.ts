import { describe, test, expect, vi } from 'vitest'
import { RemoteLoadUsers } from '@/infra/http/remote-load-users'
import type {
  HttpClient,
  HttpRequest,
  HttpResponse
} from '@/application/protocols/http/http-client'
import { faker } from '@faker-js/faker'

type HttpClientSpyType = HttpClient<unknown> & {
  url?: string
  method?: string
  body?: unknown
  response: HttpResponse<unknown>
}

const makeHttpClientSpy = (): HttpClientSpyType => {
  class HttpClientSpy implements HttpClient<unknown> {
    url?: string
    method?: string
    body?: unknown
    headers?: unknown
    response: HttpResponse<unknown> = {
      statusCode: 200,
      body: []
    }

    async request(data: HttpRequest): Promise<HttpResponse<unknown>> {
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
  sut: RemoteLoadUsers
  httpClientSpy: HttpClientSpyType
}

const makeSut = (): SutTypes => {
  const httpClientSpy = makeHttpClientSpy()
  const sut = new RemoteLoadUsers(httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadUsers', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const { sut, httpClientSpy } = makeSut()

    await sut.perform()

    expect(httpClientSpy.url).toBe('/users')
    expect(httpClientSpy.method).toBe('get')
  })

  test('Should return a list of Users on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    const mockUsers = [
      {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        status: 'ACTIVE',
        login: {
          role: 'ADMIN',
          status: 'ACTIVE'
        }
      }
    ]
    httpClientSpy.response.body = mockUsers

    const users = await sut.perform()

    expect(users[0]).toMatchObject({
      id: mockUsers[0].id,
      role: 'ADMIN',
      status: 'ACTIVE'
    })
  })

  test('Should apply fallbacks if login or status is missing', async () => {
    const { sut, httpClientSpy } = makeSut()
    const mockUsers = [
      {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        login: null
      }
    ]
    httpClientSpy.response.body = mockUsers

    const users = await sut.perform()

    expect(users[0]).toMatchObject({
      role: 'STUDENT',
      status: 'INACTIVE'
    })
  })

  test('Should throw if HttpClient throws', async () => {
    const { sut, httpClientSpy } = makeSut()
    vi.spyOn(httpClientSpy, 'request').mockRejectedValueOnce(new Error())

    const promise = sut.perform()

    await expect(promise).rejects.toThrow()
  })
})

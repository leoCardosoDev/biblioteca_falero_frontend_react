import { describe, test, expect, vi } from 'vitest'
import { RemoteLoadUserById } from '@/infra/http/remote-load-user-by-id'
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
      body: {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        login: { role: 'STUDENT' },
        status: 'INACTIVE'
      }
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
  sut: RemoteLoadUserById
  httpClientSpy: HttpClientSpyType
}

const makeSut = (): SutTypes => {
  const httpClientSpy = makeHttpClientSpy()
  const sut = new RemoteLoadUserById(httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadUserById', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const { sut, httpClientSpy } = makeSut()
    const id = faker.string.uuid()

    await sut.perform(id)

    expect(httpClientSpy.url).toBe(`/users/${id}`)
    expect(httpClientSpy.method).toBe('get')
  })

  test('Should return a User on success', async () => {
    const { sut, httpClientSpy } = makeSut()
    const id = faker.string.uuid()
    const mockUser = {
      id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      status: 'ACTIVE',
      login: {
        role: 'ADMIN',
        status: 'ACTIVE'
      }
    }
    httpClientSpy.response.body = mockUser

    const user = await sut.perform(id)

    expect(user).toMatchObject({
      id: mockUser.id,
      role: 'ADMIN',
      status: 'ACTIVE'
    })
  })

  test('Should apply fallbacks if login or status is missing', async () => {
    const { sut, httpClientSpy } = makeSut()
    const id = faker.string.uuid()
    const mockUser = {
      id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      login: null
    }
    httpClientSpy.response.body = mockUser as unknown

    const user = await sut.perform(id)

    expect(user).toMatchObject({
      role: 'STUDENT',
      status: 'INACTIVE'
    })
  })

  test('Should throw if HttpClient throws', async () => {
    const { sut, httpClientSpy } = makeSut()
    vi.spyOn(httpClientSpy, 'request').mockRejectedValueOnce(new Error())

    const promise = sut.perform('any_id')

    await expect(promise).rejects.toThrow()
  })
})

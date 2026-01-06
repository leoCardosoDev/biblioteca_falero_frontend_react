import { describe, test, expect, vi } from 'vitest'
import { HttpUserRepository } from '@/infra/http/http-user-repository'
import type { AddUserParams } from '@/domain/usecases/add-user'
import type { UpdateUserParams } from '@/domain/usecases/update-user'
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
      body: {}
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
  sut: HttpUserRepository
  httpClientSpy: HttpClientSpyType
}

const makeSut = (): SutTypes => {
  const httpClientSpy = makeHttpClientSpy()
  const sut = new HttpUserRepository(httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('HttpUserRepository', () => {
  describe('loadAll', () => {
    test('Should call HttpClient with correct URL and method', async () => {
      const { sut, httpClientSpy } = makeSut()
      httpClientSpy.response.body = []

      await sut.loadAll()

      expect(httpClientSpy.url).toBe('/users')
      expect(httpClientSpy.method).toBe('get')
    })

    test('Should return user list on success', async () => {
      const { sut, httpClientSpy } = makeSut()
      const users = [{ id: 'any_id' }]
      httpClientSpy.response.body = users

      const result = await sut.loadAll()
      expect(result).toEqual(users)
    })
  })

  describe('loadById', () => {
    test('Should call HttpClient with correct URL and method', async () => {
      const { sut, httpClientSpy } = makeSut()
      const userId = faker.string.uuid()
      httpClientSpy.response.body = {}

      await sut.loadById(userId)

      expect(httpClientSpy.url).toBe(`/users/${userId}`)
      expect(httpClientSpy.method).toBe('get')
    })

    test('Should return user data on success', async () => {
      const { sut, httpClientSpy } = makeSut()
      const userId = faker.string.uuid()
      const userData = { id: userId, name: faker.person.fullName() }
      httpClientSpy.response.body = userData

      const result = await sut.loadById(userId)
      expect(result).toEqual(userData)
    })

    test('Should throw if HttpClient throws', async () => {
      const { sut, httpClientSpy } = makeSut()
      vi.spyOn(httpClientSpy, 'request').mockRejectedValueOnce(new Error())

      const promise = sut.loadById('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  test('Should call HttpClient with correct values on add', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = {
      name: 'any_name',
      email: 'any_email',
      gender: 'MALE'
    } as unknown as AddUserParams
    httpClientSpy.response.body = { login: { role: 'ADMIN' } }

    await sut.add(params)

    expect(httpClientSpy.url).toBe('/users')
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(params)
  })

  test('Should return user on success with correct mapping (add)', async () => {
    const { sut, httpClientSpy } = makeSut()
    const remoteData = {
      id: 'any_id',
      status: 'ACTIVE',
      login: { role: 'LIBRARIAN' }
    }
    httpClientSpy.response.body = remoteData

    const result = await sut.add({} as unknown as AddUserParams)
    expect(result).toEqual({
      id: 'any_id',
      status: 'ACTIVE',
      login: { role: 'LIBRARIAN' },
      role: 'LIBRARIAN'
    })
  })

  test('Should fallback to default role and status if missing in response (add)', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.body = { id: 'any_id' }

    const result = await sut.add({} as unknown as AddUserParams)
    expect(result).toEqual({
      id: 'any_id',
      role: 'STUDENT',
      status: 'INACTIVE'
    })
  })

  describe('update', () => {
    test('Should call HttpClient with correct URL and body', async () => {
      const { sut, httpClientSpy } = makeSut()
      const id = 'any_id'
      const data = { name: 'updated_name' }
      const params = { id, ...data } as unknown as UpdateUserParams
      httpClientSpy.response.body = {}

      await sut.update(params)

      expect(httpClientSpy.url).toBe(`/users/${id}`)
      expect(httpClientSpy.method).toBe('put')
      expect(httpClientSpy.body).toEqual(data)
    })
  })

  describe('delete', () => {
    test('Should call HttpClient with correct URL', async () => {
      const { sut, httpClientSpy } = makeSut()
      const id = 'any_id'
      httpClientSpy.response.body = {}

      await sut.delete(id)

      expect(httpClientSpy.url).toBe(`/users/${id}`)
      expect(httpClientSpy.method).toBe('delete')
    })
  })
})

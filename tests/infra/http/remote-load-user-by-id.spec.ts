import { describe, test, expect, vi } from 'vitest'
import { RemoteLoadUserById } from '@/infra/http/remote-load-user-by-id'
import { faker } from '@faker-js/faker'
import type { HttpClient } from '@/application/protocols/http/http-client'

interface SutTypes {
  sut: RemoteLoadUserById
  httpClientStub: HttpClient
}

const makeSut = (): SutTypes => {
  const httpClientStub: HttpClient = {
    request: vi.fn()
  }
  const sut = new RemoteLoadUserById(httpClientStub)
  return {
    sut,
    httpClientStub
  }
}

describe('RemoteLoadUserById', () => {
  test('Should call HttpClient.request with correct URL and method', async () => {
    const { sut, httpClientStub } = makeSut()
    vi.mocked(httpClientStub.request).mockResolvedValueOnce({
      statusCode: 200,
      body: { login: { role: 'STUDENT' } }
    })
    const id = faker.string.uuid()

    await sut.perform(id)

    expect(httpClientStub.request).toHaveBeenCalledWith({
      url: `/users/${id}`,
      method: 'get'
    })
  })

  test('Should return a User on success', async () => {
    const { sut, httpClientStub } = makeSut()
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

    vi.mocked(httpClientStub.request).mockResolvedValueOnce({
      statusCode: 200,
      body: mockUser
    })

    const user = await sut.perform(id)

    expect(user).toMatchObject({
      id: mockUser.id,
      role: 'ADMIN',
      status: 'ACTIVE'
    })
  })

  test('Should apply fallbacks if login or status is missing', async () => {
    const { sut, httpClientStub } = makeSut()
    const id = faker.string.uuid()
    const mockUser = {
      id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      login: null
    }

    vi.mocked(httpClientStub.request).mockResolvedValueOnce({
      statusCode: 200,
      body: mockUser
    })

    const user = await sut.perform(id)

    expect(user).toMatchObject({
      role: 'STUDENT',
      status: 'INACTIVE'
    })
  })

  test('Should throw if HttpClient throws', async () => {
    const { sut, httpClientStub } = makeSut()
    vi.mocked(httpClientStub.request).mockRejectedValueOnce(new Error())

    const promise = sut.perform('any_id')

    await expect(promise).rejects.toThrow()
  })
})

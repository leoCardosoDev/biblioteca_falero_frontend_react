import { describe, test, expect, vi, beforeEach } from 'vitest'
import { HttpUserLoginRepository } from '@/infra/http/http-user-login-repository'
import { faker } from '@faker-js/faker'
import type { HttpClient } from '@/application/protocols/http/http-client'

describe('HttpUserLoginRepository', () => {
  let sut: HttpUserLoginRepository
  let httpClientStub: HttpClient

  beforeEach(() => {
    httpClientStub = {
      request: vi.fn()
    }
    sut = new HttpUserLoginRepository(httpClientStub)
  })

  test('Should call HttpClient.request with correct URL, method and body', async () => {
    const userId = faker.string.uuid()
    const loginData = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    const params = { userId, ...loginData }
    vi.mocked(httpClientStub.request).mockResolvedValueOnce({
      statusCode: 204,
      body: null
    })

    await sut.addLogin(params)

    expect(httpClientStub.request).toHaveBeenCalledWith({
      url: `/users/${userId}/login`,
      method: 'post',
      body: loginData
    })
  })

  test('Should throw if HttpClient fails', async () => {
    const params = {
      userId: faker.string.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    vi.mocked(httpClientStub.request).mockRejectedValueOnce(new Error())

    const promise = sut.addLogin(params)

    await expect(promise).rejects.toThrow()
  })
})

import { describe, test, expect, vi, beforeEach } from 'vitest'
import { RemoteAddUser } from '@/infra/http/remote-add-user'
import type { AddUserParams } from '@/domain/usecases/add-user'
import type { HttpClient } from '@/application/protocols/http/http-client'
import { faker } from '@faker-js/faker'

describe('RemoteAddUser', () => {
  let sut: RemoteAddUser
  let httpClientStub: HttpClient

  beforeEach(() => {
    httpClientStub = {
      request: vi.fn()
    }
    sut = new RemoteAddUser(httpClientStub)
  })

  test('Should call HttpClient with correct URL and method', async () => {
    const params: AddUserParams = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cpf: '111.111.111-11',
      rg: '1234567',
      gender: 'MALE',
      role: 'STUDENT',
      status: 'ACTIVE',
      address: {
        street: 'any_street',
        number: '123',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'SP',
        zipCode: '01001-000',
        stateId: faker.string.uuid()
      }
    }
    vi.mocked(httpClientStub.request).mockResolvedValueOnce({
      statusCode: 200,
      body: {}
    })
    await sut.perform(params)
    expect(httpClientStub.request).toHaveBeenCalledWith({
      url: '/users',
      method: 'post',
      body: params
    })
  })

  test('Should return user on success', async () => {
    const responseData = {
      id: faker.string.uuid(),
      name: 'any_name',
      role: 'STUDENT',
      status: 'ACTIVE'
    }
    vi.mocked(httpClientStub.request).mockResolvedValueOnce({
      statusCode: 200,
      body: responseData
    })
    const result = await sut.perform({} as unknown as AddUserParams)
    expect(result).toEqual(responseData)
  })

  test('Should map default role and status if missing in response', async () => {
    const responseData = {
      id: faker.string.uuid(),
      name: 'any_name'
    }
    vi.mocked(httpClientStub.request).mockResolvedValueOnce({
      statusCode: 200,
      body: responseData
    })
    const result = await sut.perform({} as unknown as AddUserParams)
    expect(result.role).toBe('STUDENT')
    expect(result.status).toBe('INACTIVE')
  })
})

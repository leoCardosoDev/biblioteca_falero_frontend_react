import { RemoteAddUser } from '@/infra/http/remote-add-user'
import type { AddUserParams } from '@/domain/usecases/add-user'
import type {
  HttpClient,
  HttpRequest,
  HttpResponse
} from '@/application/protocols/http/http-client'
import { describe, it, expect, vi } from 'vitest'

const makeSut = () => {
  const httpClientSpy: HttpClient = {
    request: vi.fn(
      async (_data: HttpRequest): Promise<HttpResponse> => ({
        statusCode: 200,
        body: {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email',
          login: { role: 'STUDENT' },
          status: 'INACTIVE'
        }
      })
    )
  }
  const sut = new RemoteAddUser(httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteAddUser', () => {
  it('Should call HttpClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params: AddUserParams = {
      name: 'any_name',
      email: 'any_email@mail.com',
      cpf: '12345678901',
      rg: '1234567',
      gender: 'MALE',
      address: {
        zipCode: '12345678',
        street: 'any_street',
        number: '123',
        neighborhoodId: 'any_neighborhood_id',
        cityId: 'any_city_id',
        state: 'any_state'
      },
      role: 'STUDENT',
      status: 'INACTIVE'
    }
    await sut.perform(params)
    expect(httpClientSpy.request).toHaveBeenCalledWith({
      url: '/users',
      method: 'post',
      body: params
    })
  })

  it('Should return user on success with correct mapping', async () => {
    const { sut } = makeSut()
    const params: AddUserParams = {
      name: 'any_name',
      email: 'any_email@mail.com',
      cpf: '12345678901',
      rg: '1234567',
      gender: 'MALE',
      address: {
        zipCode: '12345678',
        street: 'any_street',
        number: '123',
        neighborhoodId: 'any_neighborhood_id',
        cityId: 'any_city_id',
        state: 'any_state'
      },
      role: 'STUDENT',
      status: 'INACTIVE'
    }
    const user = await sut.perform(params)
    expect(user).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      login: { role: 'STUDENT' },
      status: 'INACTIVE',
      role: 'STUDENT'
    })
  })

  it('Should fallback to default role and status if missing in response', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpClientRequestSpy = vi.spyOn(httpClientSpy, 'request')
    httpClientRequestSpy.mockResolvedValueOnce({
      statusCode: 200,
      body: {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email'
        // login.role and status missing
      }
    })

    const params: AddUserParams = {
      name: 'any_name',
      email: 'any_email@mail.com',
      rg: '1234567',
      gender: 'MALE',
      role: 'STUDENT',
      status: 'INACTIVE',
      cpf: '12345678901',
      address: {
        zipCode: '12345678',
        street: 'any_street',
        number: '123',
        neighborhoodId: 'any_neighborhood_id',
        cityId: 'any_city_id',
        state: 'any_state'
      }
    }

    const user = await sut.perform(params)

    expect(user).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      role: 'STUDENT', // Fallback
      status: 'INACTIVE' // Fallback
    })
  })
})

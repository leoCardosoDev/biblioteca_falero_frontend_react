import { describe, test, expect, vi } from 'vitest'
import { RemoteLoadUserById } from '@/infra/http/remote-load-user-by-id'
import { type AxiosInstance } from 'axios'
import type { User } from '@/domain/models/user'
import { faker } from '@faker-js/faker'

const makeAxios = (): AxiosInstance => {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
    defaults: { headers: { common: {} } },
    interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
    request: vi.fn()
  } as unknown as AxiosInstance
}

interface SutTypes {
  sut: RemoteLoadUserById
  axiosStub: AxiosInstance
}

const makeSut = (): SutTypes => {
  const axiosStub = makeAxios()
  const sut = new RemoteLoadUserById(axiosStub)
  return {
    sut,
    axiosStub
  }
}

describe('RemoteLoadUserById', () => {
  test('Should call axios.get with correct URL', async () => {
    const { sut, axiosStub } = makeSut()
    const getSpy = vi.spyOn(axiosStub, 'get').mockResolvedValueOnce({ data: {} })
    const id = faker.string.uuid()

    await sut.perform(id)

    expect(getSpy).toHaveBeenCalledWith(`/users/${id}`)
  })

  test('Should return a User on success', async () => {
    const { sut, axiosStub } = makeSut()
    const id = faker.string.uuid()
    const mockUser: User = {
      id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      rg: faker.string.numeric(9),
      cpf: faker.string.numeric(11),
      birthDate: '2000-01-01',
      status: 'ACTIVE',

      login: {
        role: 'ADMIN',
        status: 'ACTIVE'
      },
      address: {
        street: faker.location.street(),
        number: faker.location.buildingNumber(),
        neighborhood: faker.location.secondaryAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode()
      }
    } as unknown as User

    vi.spyOn(axiosStub, 'get').mockResolvedValueOnce({ data: mockUser })

    const user = await sut.perform(id)

    expect(user).toMatchObject({
      id: mockUser.id,
      role: 'ADMIN'
    })
  })

  test('Should throw if axios throws', async () => {
    const { sut, axiosStub } = makeSut()
    vi.spyOn(axiosStub, 'get').mockRejectedValueOnce(new Error())

    const promise = sut.perform('any_id')

    await expect(promise).rejects.toThrow()
  })
})

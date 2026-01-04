import { describe, test, expect, vi } from 'vitest'
import { RemoteLoadUsers } from '@/infra/http/remote-load-users'
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
  sut: RemoteLoadUsers
  axiosStub: AxiosInstance
}

const makeSut = (): SutTypes => {
  const axiosStub = makeAxios()
  const sut = new RemoteLoadUsers(axiosStub)
  return {
    sut,
    axiosStub
  }
}

describe('RemoteLoadUsers', () => {
  test('Should call axios.get with correct URL', async () => {
    const { sut, axiosStub } = makeSut()
    const getSpy = vi.spyOn(axiosStub, 'get').mockResolvedValueOnce({ data: [] })

    await sut.perform()

    expect(getSpy).toHaveBeenCalledWith('/users')
  })

  test('Should return a list of Users on success', async () => {
    const { sut, axiosStub } = makeSut()
    const mockUsers: User[] = [{
      id: faker.string.uuid(),
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
    } as unknown as User]

    vi.spyOn(axiosStub, 'get').mockResolvedValueOnce({ data: mockUsers })

    const users = await sut.perform()



    expect(users[0]).toMatchObject({
      id: mockUsers[0].id,
      role: 'ADMIN'
    })
  })

  test('Should throw if axios throws', async () => {
    const { sut, axiosStub } = makeSut()
    vi.spyOn(axiosStub, 'get').mockRejectedValueOnce(new Error())

    const promise = sut.perform()

    await expect(promise).rejects.toThrow()
  })
})

import { describe, test, expect, vi } from 'vitest'
import { RemoteLoadUserById } from '@/infra/http/remote-load-user-by-id'
import type { AxiosInstance } from 'axios'
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
    const getSpy = vi.spyOn(axiosStub, 'get').mockResolvedValueOnce({ data: { login: { role: 'STUDENT' } } })
    const id = faker.string.uuid()

    await sut.perform(id)

    expect(getSpy).toHaveBeenCalledWith(`/users/${id}`)
  })

  test('Should return a User on success', async () => {
    const { sut, axiosStub } = makeSut()
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

    vi.spyOn(axiosStub, 'get').mockResolvedValueOnce({ data: mockUser })

    const user = await sut.perform(id)

    expect(user).toMatchObject({
      id: mockUser.id,
      role: 'ADMIN',
      status: 'ACTIVE'
    })
  })

  test('Should apply fallbacks if login or status is missing', async () => {
    const { sut, axiosStub } = makeSut()
    const id = faker.string.uuid()
    const mockUser = {
      id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      login: null
    }

    vi.spyOn(axiosStub, 'get').mockResolvedValueOnce({ data: mockUser })

    const user = await sut.perform(id)

    expect(user).toMatchObject({
      role: 'STUDENT',
      status: 'INACTIVE'
    })
  })

  test('Should throw if axios throws', async () => {
    const { sut, axiosStub } = makeSut()
    vi.spyOn(axiosStub, 'get').mockRejectedValueOnce(new Error())

    const promise = sut.perform('any_id')

    await expect(promise).rejects.toThrow()
  })
})

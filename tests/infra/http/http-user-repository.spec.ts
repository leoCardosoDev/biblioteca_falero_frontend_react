import { describe, test, expect, vi, beforeEach } from 'vitest'
import { HttpUserRepository } from '@/infra/http/http-user-repository'
import { AxiosInstance } from 'axios'
import { faker } from '@faker-js/faker'

const makeAxiosMock = (): AxiosInstance => {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  } as unknown as AxiosInstance
}

describe('HttpUserRepository', () => {
  let sut: HttpUserRepository
  let axiosMock: AxiosInstance

  beforeEach(() => {
    axiosMock = makeAxiosMock()
    sut = new HttpUserRepository(axiosMock)
  })

  test('Should call axios.get with correct URL on loadById', async () => {
    const userId = faker.string.uuid()
    vi.spyOn(axiosMock, 'get').mockResolvedValueOnce({ data: {} })

    await sut.loadById(userId)

    expect(axiosMock.get).toHaveBeenCalledWith(`/users/${userId}`)
  })

  test('Should return user data on loadById success', async () => {
    const userId = faker.string.uuid()
    const userData = { id: userId, name: faker.person.fullName() }
    vi.spyOn(axiosMock, 'get').mockResolvedValueOnce({ data: userData })

    const result = await sut.loadById(userId)

    expect(result).toEqual(userData)
  })

  test('Should throw if axios.get fails on loadById', async () => {
    const userId = faker.string.uuid()
    vi.spyOn(axiosMock, 'get').mockRejectedValueOnce(new Error())

    const promise = sut.loadById(userId)

    await expect(promise).rejects.toThrow()
  })
})

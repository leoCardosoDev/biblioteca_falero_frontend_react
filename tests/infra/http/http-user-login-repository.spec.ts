import { describe, test, expect, vi, beforeEach } from 'vitest'
import { HttpUserLoginRepository } from '@/infra/http/http-user-login-repository'
import type { AxiosInstance } from 'axios'
import { faker } from '@faker-js/faker'

const makeAxiosMock = (): AxiosInstance => {
  return {
    post: vi.fn()
  } as unknown as AxiosInstance
}

describe('HttpUserLoginRepository', () => {
  let sut: HttpUserLoginRepository
  let axiosMock: AxiosInstance

  beforeEach(() => {
    axiosMock = makeAxiosMock()
    sut = new HttpUserLoginRepository(axiosMock)
  })

  test('Should call axios.post with correct URL and body', async () => {
    const userId = faker.string.uuid()
    const loginData = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    const params = { userId, ...loginData }

    await sut.addLogin(params)

    expect(axiosMock.post).toHaveBeenCalledWith(`/users/${userId}/login`, loginData)
  })

  test('Should throw if axios.post fails', async () => {
    const params = {
      userId: faker.string.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    vi.spyOn(axiosMock, 'post').mockRejectedValueOnce(new Error())

    const promise = sut.addLogin(params)

    await expect(promise).rejects.toThrow()
  })
})

import { describe, test, expect, vi, beforeEach } from 'vitest'
import { HttpUserRepository } from '@/infra/http/http-user-repository'
import type { AxiosInstance } from 'axios'
import { faker } from '@faker-js/faker'
import type { AddUserParams } from '@/domain/usecases/add-user'
import type { UpdateUserParams } from '@/domain/usecases/update-user'

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

  describe('loadAll', () => {
    test('Should call axios.get with correct URL', async () => {
      vi.spyOn(axiosMock, 'get').mockResolvedValueOnce({ data: [] })
      await sut.loadAll()
      expect(axiosMock.get).toHaveBeenCalledWith('/users')
    })

    test('Should return user list on success', async () => {
      const users = [{ id: 'any_id' }]
      vi.spyOn(axiosMock, 'get').mockResolvedValueOnce({ data: users })
      const result = await sut.loadAll()
      expect(result).toEqual(users)
    })
  })

  describe('loadById', () => {
    test('Should call axios.get with correct URL', async () => {
      const userId = faker.string.uuid()
      vi.spyOn(axiosMock, 'get').mockResolvedValueOnce({ data: {} })
      await sut.loadById(userId)
      expect(axiosMock.get).toHaveBeenCalledWith(`/users/${userId}`)
    })

    test('Should return user data on success', async () => {
      const userId = faker.string.uuid()
      const userData = { id: userId, name: faker.person.fullName() }
      vi.spyOn(axiosMock, 'get').mockResolvedValueOnce({ data: userData })
      const result = await sut.loadById(userId)
      expect(result).toEqual(userData)
    })

    test('Should throw if axios.get fails', async () => {
      vi.spyOn(axiosMock, 'get').mockRejectedValueOnce(new Error())
      const promise = sut.loadById('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('add', () => {
    test('Should call axios.post with correct values', async () => {
      const params = { name: 'any_name', email: 'any_email' } as unknown as AddUserParams
      vi.spyOn(axiosMock, 'post').mockResolvedValueOnce({ data: {} })
      await sut.add(params)
      expect(axiosMock.post).toHaveBeenCalledWith('/users', params)
    })

    test('Should return user on success', async () => {
      const userData = { id: 'any_id' }
      vi.spyOn(axiosMock, 'post').mockResolvedValueOnce({ data: userData })
      const result = await sut.add({} as unknown as AddUserParams)
      expect(result).toEqual(userData)
    })
  })

  describe('update', () => {
    test('Should call axios.put with correct URL and body', async () => {
      const id = 'any_id'
      const data = { name: 'updated_name' }
      const params = { id, ...data } as unknown as UpdateUserParams
      vi.spyOn(axiosMock, 'put').mockResolvedValueOnce({ data: {} })
      await sut.update(params)
      expect(axiosMock.put).toHaveBeenCalledWith(`/users/${id}`, data)
    })
  })

  describe('delete', () => {
    test('Should call axios.delete with correct URL', async () => {
      const id = 'any_id'
      vi.spyOn(axiosMock, 'delete').mockResolvedValueOnce({})
      await sut.delete(id)
      expect(axiosMock.delete).toHaveBeenCalledWith(`/users/${id}`)
    })
  })
})

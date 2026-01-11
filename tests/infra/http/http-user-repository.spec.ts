import { describe, test, expect, vi, beforeEach } from 'vitest'
import { HttpUserRepository } from '@/infra/http/http-user-repository'
import { faker } from '@faker-js/faker'
import type { AddUserParams } from '@/domain/usecases/add-user'
import type { UpdateUserParams } from '@/domain/usecases/update-user'
import type { HttpClient } from '@/application/protocols/http/http-client'

describe('HttpUserRepository', () => {
  let sut: HttpUserRepository
  let httpClientStub: HttpClient

  beforeEach(() => {
    httpClientStub = {
      request: vi.fn()
    }
    sut = new HttpUserRepository(httpClientStub)
  })

  describe('loadAll', () => {
    test('Should call HttpClient with correct URL and method', async () => {
      vi.mocked(httpClientStub.request).mockResolvedValueOnce({
        statusCode: 200,
        body: []
      })
      await sut.loadAll()
      expect(httpClientStub.request).toHaveBeenCalledWith({
        url: '/users',
        method: 'get'
      })
    })

    test('Should return user list on success', async () => {
      const users = [{ id: 'any_id', role: 'STUDENT', status: 'ACTIVE' }]
      vi.mocked(httpClientStub.request).mockResolvedValueOnce({
        statusCode: 200,
        body: [{ id: 'any_id' }]
      })
      const result = await sut.loadAll()
      expect(result).toEqual(users)
    })

    test('Should return empty list if response body is null or undefined', async () => {
      vi.mocked(httpClientStub.request).mockResolvedValueOnce({
        statusCode: 200,
        body: null as unknown as []
      })
      const result = await sut.loadAll()
      expect(result).toEqual([])
    })
  })

  describe('loadById', () => {
    test('Should call HttpClient with correct URL and method', async () => {
      const userId = faker.string.uuid()
      vi.mocked(httpClientStub.request).mockResolvedValueOnce({
        statusCode: 200,
        body: {}
      })
      await sut.loadById(userId)
      expect(httpClientStub.request).toHaveBeenCalledWith({
        url: `/users/${userId}`,
        method: 'get'
      })
    })

    test('Should return user data on success', async () => {
      const userId = faker.string.uuid()
      const userData = {
        id: userId,
        name: faker.person.fullName(),
        role: 'STUDENT',
        status: 'ACTIVE'
      }
      vi.mocked(httpClientStub.request).mockResolvedValueOnce({
        statusCode: 200,
        body: { id: userId, name: userData.name }
      })
      const result = await sut.loadById(userId)
      expect(result).toEqual(userData)
    })

    test('Should throw if HttpClient fails', async () => {
      vi.mocked(httpClientStub.request).mockRejectedValueOnce(new Error())
      const promise = sut.loadById('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('add', () => {
    test('Should call HttpClient with correct values', async () => {
      const params = {
        name: 'any_name',
        email: 'any_email'
      } as unknown as AddUserParams
      vi.mocked(httpClientStub.request).mockResolvedValueOnce({
        statusCode: 200,
        body: {}
      })
      await sut.add(params)
      expect(httpClientStub.request).toHaveBeenCalledWith({
        url: '/users',
        method: 'post',
        body: params
      })
    })

    test('Should return user on success', async () => {
      const userData = { id: 'any_id', role: 'STUDENT', status: 'ACTIVE' }
      vi.mocked(httpClientStub.request).mockResolvedValueOnce({
        statusCode: 200,
        body: { id: 'any_id' }
      })
      const result = await sut.add({} as unknown as AddUserParams)
      expect(result).toEqual(userData)
    })
  })

  describe('update', () => {
    test('Should call HttpClient with correct URL, method and body', async () => {
      const id = 'any_id'
      const data = { name: 'updated_name' }
      const params = { id, ...data } as unknown as UpdateUserParams
      vi.mocked(httpClientStub.request).mockResolvedValueOnce({
        statusCode: 200,
        body: {}
      })
      await sut.update(params)
      expect(httpClientStub.request).toHaveBeenCalledWith({
        url: `/users/${id}`,
        method: 'put',
        body: data
      })
    })
  })

  describe('delete', () => {
    test('Should call HttpClient with correct URL and method', async () => {
      const id = 'any_id'
      vi.mocked(httpClientStub.request).mockResolvedValueOnce({
        statusCode: 204,
        body: null
      })
      await sut.delete(id)
      expect(httpClientStub.request).toHaveBeenCalledWith({
        url: `/users/${id}`,
        method: 'delete'
      })
    })
  })
})

import { describe, test, expect, vi, beforeEach } from 'vitest'
import { HttpLogoutRepository } from '@/infra/http/http-logout-repository'
import { UnexpectedError } from '@/domain/errors'
import { HttpClient } from '@/application/protocols/http/http-client'

const makeHttpClient = (): HttpClient<void> => ({
  request: vi.fn()
})

describe('HttpLogoutRepository', () => {
  let httpClient: HttpClient<void>
  let sut: HttpLogoutRepository

  beforeEach(() => {
    httpClient = makeHttpClient()
    sut = new HttpLogoutRepository(httpClient)
  })

  test('Should call HttpClient with correct values', async () => {
    const params = { refreshToken: 'any_refresh_token' }
    vi.mocked(httpClient.request).mockResolvedValueOnce({
      statusCode: 204
    })

    await sut.logout(params)
    expect(httpClient.request).toHaveBeenCalledWith({
      url: '/logout',
      method: 'post',
      body: params
    })
  })

  test('Should throw UnexpectedError on 400', async () => {
    const params = { refreshToken: 'any_refresh_token' }
    vi.mocked(httpClient.request).mockResolvedValueOnce({
      statusCode: 400
    })

    const promise = sut.logout(params)
    await expect(promise).rejects.toThrow(UnexpectedError)
  })

  test('Should throw UnexpectedError on 500', async () => {
    const params = { refreshToken: 'any_refresh_token' }
    vi.mocked(httpClient.request).mockResolvedValueOnce({
      statusCode: 500
    })

    const promise = sut.logout(params)
    await expect(promise).rejects.toThrow(UnexpectedError)
  })

  test('Should throw UnexpectedError if HttpClient throws', async () => {
    const params = { refreshToken: 'any_refresh_token' }
    vi.mocked(httpClient.request).mockRejectedValueOnce(new Error())

    const promise = sut.logout(params)
    await expect(promise).rejects.toThrow(UnexpectedError)
  })
})

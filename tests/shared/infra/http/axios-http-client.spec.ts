/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

import { AxiosHttpClient } from '@/shared/infra/http/axios-http-client'
import type { HttpRequest } from '@/shared/application/protocols/http/http-client'

const makeAxiosInstanceMock = (): AxiosInstance =>
  ({
    request: vi.fn(),
    defaults: {},
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn(), clear: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn(), clear: vi.fn() }
    }
  }) as unknown as AxiosInstance

const makeHttpRequest = (): HttpRequest => ({
  url: '/test-endpoint',
  method: 'post',
  body: { key: 'value' },
  headers: { 'Content-Type': 'application/json' }
})

const makeAxiosResponse = (
  data: unknown = { id: 1 },
  status = 200
): AxiosResponse => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config: {} as AxiosResponse['config']
})

describe('AxiosHttpClient', () => {
  let axiosInstanceMock: AxiosInstance
  let sut: AxiosHttpClient

  beforeEach(() => {
    axiosInstanceMock = makeAxiosInstanceMock()
    sut = new AxiosHttpClient(axiosInstanceMock)
  })

  describe('request()', () => {
    it('should call axios.request with correct parameters', async () => {
      const httpRequest = makeHttpRequest()
      vi.mocked(axiosInstanceMock.request).mockResolvedValueOnce(
        makeAxiosResponse()
      )

      await sut.request(httpRequest)

      expect(axiosInstanceMock.request).toHaveBeenCalledWith({
        url: httpRequest.url,
        method: httpRequest.method,
        data: httpRequest.body,
        headers: httpRequest.headers
      })
    })

    it('should return correct HttpResponse on success', async () => {
      const responseData = { id: 1, name: 'Test' }
      vi.mocked(axiosInstanceMock.request).mockResolvedValueOnce(
        makeAxiosResponse(responseData, 200)
      )

      const httpResponse = await sut.request(makeHttpRequest())

      expect(httpResponse).toEqual({
        statusCode: 200,
        body: responseData
      })
    })

    it('should return correct HttpResponse on 201 created', async () => {
      const responseData = { id: 2 }
      vi.mocked(axiosInstanceMock.request).mockResolvedValueOnce(
        makeAxiosResponse(responseData, 201)
      )

      const httpResponse = await sut.request(makeHttpRequest())

      expect(httpResponse.statusCode).toBe(201)
      expect(httpResponse.body).toEqual(responseData)
    })

    it('should return correct HttpResponse on axios error with response', async () => {
      const errorResponse: AxiosError = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
          statusText: 'Unauthorized',
          headers: {},
          config: {} as AxiosResponse['config']
        } as AxiosResponse,
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Request failed',
        toJSON: vi.fn()
      }
      vi.mocked(axiosInstanceMock.request).mockRejectedValueOnce(errorResponse)

      const httpResponse = await sut.request(makeHttpRequest())

      expect(httpResponse).toEqual({
        statusCode: 401,
        body: { message: 'Unauthorized' }
      })
    })

    it('should return 500 with network error message when no response exists', async () => {
      const networkError: AxiosError = {
        response: undefined,
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Network Error',
        toJSON: vi.fn()
      }
      vi.mocked(axiosInstanceMock.request).mockRejectedValueOnce(networkError)

      const httpResponse = await sut.request(makeHttpRequest())

      expect(httpResponse).toEqual({
        statusCode: 500,
        body: { error: 'Network Error' }
      })
    })

    it('should handle 403 forbidden response', async () => {
      const errorResponse: AxiosError = {
        response: {
          status: 403,
          data: { message: 'Forbidden' },
          statusText: 'Forbidden',
          headers: {},
          config: {} as AxiosResponse['config']
        } as AxiosResponse,
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Request failed',
        toJSON: vi.fn()
      }
      vi.mocked(axiosInstanceMock.request).mockRejectedValueOnce(errorResponse)

      const httpResponse = await sut.request(makeHttpRequest())

      expect(httpResponse.statusCode).toBe(403)
    })

    it('should handle 500 server error response', async () => {
      const errorResponse: AxiosError = {
        response: {
          status: 500,
          data: { message: 'Internal Server Error' },
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as AxiosResponse['config']
        } as AxiosResponse,
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Request failed',
        toJSON: vi.fn()
      }
      vi.mocked(axiosInstanceMock.request).mockRejectedValueOnce(errorResponse)

      const httpResponse = await sut.request(makeHttpRequest())

      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body).toEqual({ message: 'Internal Server Error' })
    })
  })
})

import { RemoteLoadAddressByZipCode } from '@/infra/http/remote-load-address-by-zip-code'
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
          street: 'any_street',
          neighborhood: 'any_neighborhood',
          city: 'any_city',
          state: 'any_state',
          zipCode: '12345678'
        }
      })
    )
  }
  const sut = new RemoteLoadAddressByZipCode(httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteLoadAddressByZipCode', () => {
  it('Should call HttpClient with correct URL', async () => {
    const { sut, httpClientSpy } = makeSut()
    await sut.perform('12345678')
    expect(httpClientSpy.request).toHaveBeenCalledWith({
      url: '/addresses/cep/12345678',
      method: 'get'
    })
  })

  it('Should return address on success', async () => {
    const { sut } = makeSut()
    const address = await sut.perform('12345678')
    expect(address).toEqual({
      street: 'any_street',
      neighborhood: 'any_neighborhood',
      city: 'any_city',
      state: 'any_state',
      zipCode: '12345678'
    })
  })

  it('Should throw if HttpClient throws', async () => {
    const { sut, httpClientSpy } = makeSut()
    // Type assertion to allow mocking reject
    vi.mocked(httpClientSpy.request).mockRejectedValueOnce(new Error())
    const promise = sut.perform('12345678')
    await expect(promise).rejects.toThrow()
  })
})

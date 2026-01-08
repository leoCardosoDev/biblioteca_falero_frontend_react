import { describe, test, expect, vi, beforeEach } from 'vitest'
import { RemoteLoadAddressByZipCode } from '@/infra/http/remote-load-address-by-zip-code'
import { HttpClient } from '@/application/protocols/http/http-client'
import { faker } from '@faker-js/faker'

describe('RemoteLoadAddressByZipCode', () => {
  let sut: RemoteLoadAddressByZipCode
  let httpClientStub: HttpClient

  beforeEach(() => {
    httpClientStub = {
      request: vi.fn()
    }
    sut = new RemoteLoadAddressByZipCode(httpClientStub)
  })

  test('Should call HttpClient with correct URL and method', async () => {
    const zipCode = faker.location.zipCode()
    vi.mocked(httpClientStub.request).mockResolvedValueOnce({
      statusCode: 200,
      body: {}
    })
    await sut.perform(zipCode)
    expect(httpClientStub.request).toHaveBeenCalledWith({
      url: `/addresses/cep/${zipCode}`,
      method: 'get'
    })
  })

  test('Should return address on success', async () => {
    const addressData = {
      zipCode: 'any_zip',
      street: 'any_street',
      neighborhood: 'any_neighborhood',
      city: 'any_city',
      state: 'any_state',
      neighborhoodId: faker.string.uuid(),
      cityId: faker.string.uuid(),
      stateId: faker.string.uuid()
    }
    vi.mocked(httpClientStub.request).mockResolvedValueOnce({
      statusCode: 200,
      body: addressData
    })
    const result = await sut.perform('any_zip')
    expect(result).toEqual(addressData)
  })

  test('Should throw if HttpClient fails', async () => {
    vi.mocked(httpClientStub.request).mockRejectedValueOnce(new Error())
    const promise = sut.perform('any_zip')
    await expect(promise).rejects.toThrow()
  })
})

import type { HttpClient } from '@/shared/application/protocols/http/http-client'
import type { LoadAddressByZipCode } from '@/shared/domain/usecases/load-address-by-zip-code'
import type { Address } from '@/shared/domain/models/user'
import { handleStatusCode } from './http-status-handler'

export class RemoteLoadAddressByZipCode implements LoadAddressByZipCode {
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async perform(zipCode: string): Promise<Address> {
    const response = await this.httpClient.request({
      url: `/addresses/cep/${zipCode}`,
      method: 'get'
    })

    handleStatusCode(response)

    return response.body as Address
  }
}

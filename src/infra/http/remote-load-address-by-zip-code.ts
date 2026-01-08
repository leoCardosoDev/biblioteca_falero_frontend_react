import { HttpClient } from '@/application/protocols/http/http-client'
import { LoadAddressByZipCode } from '@/domain/usecases/load-address-by-zip-code'
import { Address } from '@/domain/models/user'

export class RemoteLoadAddressByZipCode implements LoadAddressByZipCode {
  constructor(private readonly httpClient: HttpClient) {}

  async perform(zipCode: string): Promise<Address> {
    const response = await this.httpClient.request({
      url: `/addresses/cep/${zipCode}`,
      method: 'get'
    })
    return response.body as Address
  }
}

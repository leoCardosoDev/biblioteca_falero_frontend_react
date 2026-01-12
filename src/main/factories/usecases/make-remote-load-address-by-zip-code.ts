import { RemoteLoadAddressByZipCode } from '@/infra/http/remote-load-address-by-zip-code'
import { makeHttpClient } from '@/main/factories/http/api-client-factory'

export const makeRemoteLoadAddressByZipCode =
  (): RemoteLoadAddressByZipCode => {
    return new RemoteLoadAddressByZipCode(makeHttpClient())
  }

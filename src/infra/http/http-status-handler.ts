import { HttpResponse } from '@/application/protocols/http/http-client'
import { NotFoundError, UnexpectedError } from '@/domain/errors'

export const handleStatusCode = (response: HttpResponse): void => {
  switch (response.statusCode) {
    case 200:
    case 201:
    case 204:
      return
    case 404:
      throw new NotFoundError()
    default:
      throw new UnexpectedError()
  }
}

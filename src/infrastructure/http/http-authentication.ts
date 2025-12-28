import axios from 'axios'
import type { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import type { AccountModel } from '@/domain/models/account-model'

export class HttpAuthentication implements Authentication {
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const response = await axios.post<AccountModel>('http://localhost:5050/api/login', params)
    return response.data
  }
}

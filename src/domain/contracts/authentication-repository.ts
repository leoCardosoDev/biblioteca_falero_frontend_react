import type { Authentication } from '../usecases/authentication'

// The Repository interface matches the UseCase interface in this simple scenario,
// but semantically they are different (Data vs Domain).
export type AuthenticationRepository = Authentication

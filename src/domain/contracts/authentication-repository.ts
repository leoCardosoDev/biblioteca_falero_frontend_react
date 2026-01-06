import type { Authentication } from '@/domain/usecases/authentication'

// The Repository interface matches the UseCase interface in this simple scenario,
// but semantically they are different (Data vs Domain).
export type AuthenticationRepository = Authentication

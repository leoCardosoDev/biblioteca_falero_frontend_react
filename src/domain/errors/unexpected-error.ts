import { DomainErrorMessages } from '@/domain/constants/messages'

export class UnexpectedError extends Error {
  constructor() {
    super(DomainErrorMessages.UnexpectedTryAgain)
    this.name = 'UnexpectedError'
  }
}

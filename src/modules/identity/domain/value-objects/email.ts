import { left, right } from '@/shared/application/common/either'
import type { Either } from '@/shared/application/common/either'

import { InvalidEmailError } from '../errors'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Either<InvalidEmailError, Email> {
    if (!value || !EMAIL_REGEX.test(value)) {
      return left(new InvalidEmailError(value))
    }
    return right(new Email(value))
  }

  getValue(): string {
    return this.value
  }

  equals(other: Email): boolean {
    return this.value === other.value
  }
}

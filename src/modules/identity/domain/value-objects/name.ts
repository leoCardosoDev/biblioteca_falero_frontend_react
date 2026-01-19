import { left, right } from '@/shared/lib/either'
import type { Either } from '@/shared/lib/either'

import { InvalidNameError } from '../errors'

const MIN_NAME_LENGTH = 2
const MAX_NAME_LENGTH = 100

export class Name {
  private constructor(private readonly value: string) {}

  static create(value: string): Either<InvalidNameError, Name> {
    const trimmed = value?.trim()
    if (
      !trimmed ||
      trimmed.length < MIN_NAME_LENGTH ||
      trimmed.length > MAX_NAME_LENGTH
    ) {
      return left(new InvalidNameError(value))
    }
    return right(new Name(trimmed))
  }

  getValue(): string {
    return this.value
  }

  equals(other: Name): boolean {
    return this.value === other.value
  }
}

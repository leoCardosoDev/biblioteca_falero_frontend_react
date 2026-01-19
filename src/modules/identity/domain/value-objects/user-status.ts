export type UserStatusType = 'ACTIVE' | 'INACTIVE' | 'BLOCKED'

const VALID_STATUSES: UserStatusType[] = ['ACTIVE', 'INACTIVE', 'BLOCKED']

export class UserStatus {
  private constructor(private readonly value: UserStatusType) {}

  static create(value: string): UserStatus | undefined {
    if (VALID_STATUSES.includes(value as UserStatusType)) {
      return new UserStatus(value as UserStatusType)
    }
    return undefined
  }

  static active(): UserStatus {
    return new UserStatus('ACTIVE')
  }

  static inactive(): UserStatus {
    return new UserStatus('INACTIVE')
  }

  static blocked(): UserStatus {
    return new UserStatus('BLOCKED')
  }

  getValue(): UserStatusType {
    return this.value
  }

  isActive(): boolean {
    return this.value === 'ACTIVE'
  }

  isBlocked(): boolean {
    return this.value === 'BLOCKED'
  }

  equals(other: UserStatus): boolean {
    return this.value === other.value
  }
}

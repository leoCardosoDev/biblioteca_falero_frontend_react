export type UserRoleType = 'ADMIN' | 'LIBRARIAN' | 'PROFESSOR' | 'STUDENT'

const VALID_ROLES: UserRoleType[] = [
  'ADMIN',
  'LIBRARIAN',
  'PROFESSOR',
  'STUDENT'
]

export class UserRole {
  private constructor(private readonly value: UserRoleType) {}

  static create(value: string): UserRole | undefined {
    if (VALID_ROLES.includes(value as UserRoleType)) {
      return new UserRole(value as UserRoleType)
    }
    return undefined
  }

  static admin(): UserRole {
    return new UserRole('ADMIN')
  }

  static librarian(): UserRole {
    return new UserRole('LIBRARIAN')
  }

  static professor(): UserRole {
    return new UserRole('PROFESSOR')
  }

  static student(): UserRole {
    return new UserRole('STUDENT')
  }

  getValue(): UserRoleType {
    return this.value
  }

  isAdmin(): boolean {
    return this.value === 'ADMIN'
  }

  isLibrarian(): boolean {
    return this.value === 'LIBRARIAN'
  }

  equals(other: UserRole): boolean {
    return this.value === other.value
  }
}

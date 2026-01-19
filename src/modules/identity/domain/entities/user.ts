import { UserStatus } from '../value-objects'
import type { Email, Cpf, Name, UserRole, Address } from '../value-objects'

export type GenderType = 'MALE' | 'FEMALE' | 'OTHER'

export interface UserProps {
  id: string
  name: Name
  email: Email
  rg: string
  cpf: Cpf
  role: UserRole
  status: UserStatus
  gender: GenderType
  enrollmentId?: string
  avatarUrl?: string
  address?: Address
  createdAt: Date
  deletedAt?: Date
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(props: UserProps): User {
    if (!props.id) {
      throw new Error('User ID is required')
    }
    return new User(props)
  }

  static restore(props: UserProps): User {
    return new User(props)
  }

  get id(): string {
    return this.props.id
  }

  get name(): Name {
    return this.props.name
  }

  get email(): Email {
    return this.props.email
  }

  get rg(): string {
    return this.props.rg
  }

  get cpf(): Cpf {
    return this.props.cpf
  }

  get role(): UserRole {
    return this.props.role
  }

  get status(): UserStatus {
    return this.props.status
  }

  get gender(): GenderType {
    return this.props.gender
  }

  get enrollmentId(): string | undefined {
    return this.props.enrollmentId
  }

  get avatarUrl(): string | undefined {
    return this.props.avatarUrl
  }

  get address(): Address | undefined {
    return this.props.address
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt
  }

  isAdmin(): boolean {
    return this.props.role.isAdmin()
  }

  isActive(): boolean {
    return this.props.status.isActive()
  }

  isBlocked(): boolean {
    return this.props.status.isBlocked()
  }

  canEdit(): boolean {
    return this.isActive() && !this.isBlocked()
  }

  changeName(newName: Name): User {
    return new User({ ...this.props, name: newName })
  }

  changeAddress(newAddress: Address): User {
    return new User({ ...this.props, address: newAddress })
  }

  block(): User {
    return new User({ ...this.props, status: UserStatus.blocked()! })
  }

  activate(): User {
    return new User({ ...this.props, status: UserStatus.active()! })
  }
}

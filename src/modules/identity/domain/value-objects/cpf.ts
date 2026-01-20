import { left, right } from '@/shared/application/common/either'
import type { Either } from '@/shared/application/common/either'

import { InvalidCpfError } from '../errors'

export class Cpf {
  private constructor(private readonly value: string) {}

  static create(value: string): Either<InvalidCpfError, Cpf> {
    const cleanCpf = value.replace(/\D/g, '')
    if (!Cpf.isValidCpf(cleanCpf)) {
      return left(new InvalidCpfError(value))
    }
    return right(new Cpf(cleanCpf))
  }

  private static isValidCpf(cpf: string): boolean {
    if (cpf.length !== 11) return false
    if (/^(\d)\1+$/.test(cpf)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.charAt(9))) return false

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.charAt(10))) return false

    return true
  }

  getValue(): string {
    return this.value
  }

  getFormatted(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  equals(other: Cpf): boolean {
    return this.value === other.value
  }
}

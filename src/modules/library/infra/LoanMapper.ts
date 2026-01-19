import { Loan, type LoanStatus } from '../domain/Loan'
import { BookMapper } from './BookMapper'
import type { LoanDTO } from './dtos'

export class LoanMapper {
  static toDomain(raw: LoanDTO): Loan {
    return new Loan({
      id: raw.id,
      book: BookMapper.toDomain(raw.book),
      userId: raw.user.id,
      userName: raw.user.name,
      userAvatarUrl: raw.user.avatarUrl,
      loanDate: raw.loanDate,
      dueDate: raw.dueDate,
      returnDate: raw.returnDate,
      status: raw.status as LoanStatus
    })
  }
}

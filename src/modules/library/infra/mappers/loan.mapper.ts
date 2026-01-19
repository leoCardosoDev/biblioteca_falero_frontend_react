import { Loan, type LoanStatus } from '@/modules/library/domain'
import type { LoanApiModel } from '@/modules/library/infra/models'

export class LoanMapper {
  static toDomain(apiModel: LoanApiModel): Loan {
    const statusMap: Record<string, LoanStatus> = {
      'Em Dia': 'onTime',
      onTime: 'onTime',
      Atrasado: 'overdue',
      overdue: 'overdue',
      Devolvido: 'returned',
      returned: 'returned'
    }
    return new Loan({
      id: apiModel.id,
      bookId: apiModel.bookId,
      bookTitle: apiModel.bookTitle,
      userId: apiModel.userId,
      userName: apiModel.userName,
      loanDate: new Date(apiModel.loanDate),
      dueDate: new Date(apiModel.dueDate),
      returnDate: apiModel.returnDate
        ? new Date(apiModel.returnDate)
        : undefined,
      status: statusMap[apiModel.status] ?? 'onTime'
    })
  }

  static toDomainList(apiModels: LoanApiModel[]): Loan[] {
    return apiModels.map(LoanMapper.toDomain)
  }
}

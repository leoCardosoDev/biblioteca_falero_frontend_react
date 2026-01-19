export type LoanStatus = 'onTime' | 'overdue' | 'returned'

export interface LoanProps {
  id: string
  bookId: string
  bookTitle: string
  userId: string
  userName: string
  loanDate: Date
  dueDate: Date
  returnDate?: Date
  status: LoanStatus
}

export class Loan {
  private readonly props: LoanProps

  constructor(props: LoanProps) {
    this.props = props
  }

  get id(): string {
    return this.props.id
  }

  get bookId(): string {
    return this.props.bookId
  }

  get bookTitle(): string {
    return this.props.bookTitle
  }

  get userId(): string {
    return this.props.userId
  }

  get userName(): string {
    return this.props.userName
  }

  get loanDate(): Date {
    return this.props.loanDate
  }

  get dueDate(): Date {
    return this.props.dueDate
  }

  get returnDate(): Date | undefined {
    return this.props.returnDate
  }

  get status(): LoanStatus {
    return this.props.status
  }

  get isOverdue(): boolean {
    if (this.props.status === 'returned') return false
    return new Date() > this.props.dueDate
  }

  get isActive(): boolean {
    return this.props.status !== 'returned'
  }
}

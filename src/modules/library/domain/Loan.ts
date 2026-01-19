import type { Book } from './Book'

export type LoanStatus = 'Em Dia' | 'Atrasado' | 'Devolvido'

export interface LoanProps {
  id: string
  book: Book
  userId: string // Keeping referenced by ID to keep modules decoupled
  userName: string // Denormalized for display
  userAvatarUrl?: string // Denormalized for display
  loanDate: string // ISO Date
  dueDate: string // ISO Date
  returnDate?: string
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

  get book(): Book {
    return this.props.book
  }

  get user() {
    return {
      id: this.props.userId,
      name: this.props.userName,
      avatarUrl: this.props.userAvatarUrl
    }
  }

  get loanDate(): string {
    return this.props.loanDate
  }

  get dueDate(): string {
    return this.props.dueDate
  }

  get status(): LoanStatus {
    return this.props.status
  }

  // Domain Logic
  isOverdue(): boolean {
    if (this.props.status === 'Devolvido') return false
    const now = new Date()
    const due = new Date(this.props.dueDate)
    return now > due
  }

  isActive(): boolean {
    return this.props.status !== 'Devolvido'
  }
}

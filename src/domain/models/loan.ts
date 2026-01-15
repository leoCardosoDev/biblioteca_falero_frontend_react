import type { Book } from '@/domain/models/book'
import type { User } from '@/domain/models/user'

export interface Loan {
  id: string
  book: Book
  user: User
  loanDate: string
  dueDate: string
  status: 'Em Dia' | 'Atrasado' | 'Devolvido'
}

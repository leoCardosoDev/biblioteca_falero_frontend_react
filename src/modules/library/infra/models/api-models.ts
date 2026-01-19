import type { BookStatus } from '@/modules/library/domain'

export interface BookApiModel {
  id: string
  title: string
  author: string
  coverUrl: string
  isbn: string
  category: string
  status: string
  location?: string
  pages?: number
  year?: number
  publisher?: string
}

export interface LoanApiModel {
  id: string
  bookId: string
  bookTitle: string
  userId: string
  userName: string
  loanDate: string
  dueDate: string
  returnDate?: string
  status: string
}

function mapApiStatusToBookStatus(status: string): BookStatus {
  const statusMap: Record<string, BookStatus> = {
    Disponível: 'available',
    available: 'available',
    Emprestado: 'borrowed',
    borrowed: 'borrowed',
    Manutenção: 'maintenance',
    maintenance: 'maintenance'
  }
  return statusMap[status] ?? 'available'
}

export { mapApiStatusToBookStatus }

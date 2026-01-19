export interface BookDTO {
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

export interface UserDTO {
  id: string
  name: string
  avatarUrl?: string
}

export interface LoanDTO {
  id: string
  book: BookDTO
  user: UserDTO
  loanDate: string
  dueDate: string
  returnDate?: string
  status: string
}

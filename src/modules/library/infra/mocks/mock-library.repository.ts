import type { LibraryRepository } from '@/modules/library/application'
import { Book, Loan } from '@/modules/library/domain'

const MOCK_BOOKS_DATA = [
  {
    id: '101',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    isbn: '978-85-359-1484-9',
    category: 'Romance',
    status: 'available' as const,
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Q1BlOJfIWCtlLv793lb-cqtby23P5sS5EZZc-t6w4o2qJ1WA_HTmQqey9HNGHZdLLj2LdFmR5Cisa6lK-cOy-I2A_rBfgIgtgxgtWmcJpVpYL_5-R60HGfh2weK0BROu-ANA_jz6Fv4dPaTc8txiCWn-DEmqxf8HiXmzVhYDi3UbeVr56SCBRPkaREmTa7Gy53qq2ZB_mC4YGrmKmTMMOgkXbmX_I5V_QWLaMpqW2FH8QGd_sUj7lfKXKWr2-EmLDRAXu3vx2Qzk',
    location: 'Estante A1',
    year: 2008,
    publisher: 'Editora Globo',
    pages: 256
  },
  {
    id: '102',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    category: 'Ficção Científica',
    status: 'borrowed' as const,
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATlhghusRI_bYejoqe3pfd6bwGdj3YHz2GTYCddLeGxNACkwzvcWjpLv-d4vroRwvxYX12842dHOGLb1VQ_HXDre5UzQLJgMJQyTtm_9cp1aGEfSg7fWU5b2kDfP9J_YF4nEHnthckipHjC2iPIzPb-yuV2wKuUR8R9ZxsO1z3NsxVHX4MG6HDSOg-Xu_r49eVELRRjh9qjP3GQFDD9SNARy6ABuUtyMQH_NbDjxTUzQQDe-zkL_0POTWnsjpKB7C2lhBILUZqdD3R',
    location: 'Estante B3'
  },
  {
    id: '103',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-01-323-5088-4',
    category: 'Tecnologia',
    status: 'available' as const,
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASu5twKLEMORu6vri5cY-2xFHrC1OKbbMqOIuJCGIp3gp-htrl3wO0g44zZFu2Jt73dsgO6kVfWJpA91g0i3R4NdVQg0eLqlz9QdmkmE6J10d-cASYaitfHyRnnV8xuai2yoXdI1OeHluS88GqZ436mnaZHWVF1ODwMpYFJAsAdFJ8T61Da83mjULVowmmKzixkXxhJGbLaPqOn55tbHKNU-4JRNDnsuZkJgVqhwxDXVy5Nzfm9jxQFGRWmRhScggAsTvS1oLP4cwS',
    location: 'Estante C5'
  }
]

const MOCK_LOANS_DATA = [
  {
    id: 'L001',
    bookId: '102',
    bookTitle: '1984',
    userId: '1',
    userName: 'Ana Silva',
    loanDate: new Date('2023-10-10'),
    dueDate: new Date('2023-10-24'),
    status: 'overdue' as const
  },
  {
    id: 'L002',
    bookId: '103',
    bookTitle: 'Clean Code',
    userId: '2',
    userName: 'Carlos Mendes',
    loanDate: new Date('2023-10-20'),
    dueDate: new Date('2023-11-03'),
    status: 'onTime' as const
  }
]

export class MockLibraryRepository implements LibraryRepository {
  async loadBooks(): Promise<Book[]> {
    return Promise.resolve(MOCK_BOOKS_DATA.map((data) => new Book(data)))
  }

  async loadBookById(id: string): Promise<Book | undefined> {
    const bookData = MOCK_BOOKS_DATA.find((b) => b.id === id)
    return Promise.resolve(bookData ? new Book(bookData) : undefined)
  }

  async loadLoans(): Promise<Loan[]> {
    return Promise.resolve(MOCK_LOANS_DATA.map((data) => new Loan(data)))
  }

  async loadLoansByUser(userId: string): Promise<Loan[]> {
    const filteredLoans = MOCK_LOANS_DATA.filter((l) => l.userId === userId)
    return Promise.resolve(filteredLoans.map((data) => new Loan(data)))
  }
}

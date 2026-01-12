import { RemoteLoadBooks } from '@/application/usecases'
import { MockBookRepository } from '@/presentation/mocks/mock-book-repository'
import { Books } from '@/presentation/react/pages/books'

export const MakeBooksCallback = () => {
  const bookRepository = new MockBookRepository()
  const loadBooks = new RemoteLoadBooks(bookRepository)

  return <Books loadBooks={loadBooks} />
}

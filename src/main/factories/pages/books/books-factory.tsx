import { RemoteLoadBooks } from '@/shared/application/usecases'
import { MockBookRepository } from '@/shared/presentation/mocks/mock-book-repository'
import { Books } from '@/shared/presentation/react/pages/books'

export const MakeBooksCallback = () => {
  const bookRepository = new MockBookRepository()
  const loadBooks = new RemoteLoadBooks(bookRepository)

  return <Books loadBooks={loadBooks} />
}

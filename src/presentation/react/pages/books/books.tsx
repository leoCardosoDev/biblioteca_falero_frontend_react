import { LoadBooks } from '@/domain/usecases/load-books'
import { BooksController } from './books-controller'

type Props = {
  loadBooks: LoadBooks
}

export function Books(props: Props) {
  return <BooksController {...props} />
}

import { useState, useEffect } from 'react'
import { LoadBooks } from '@/domain/usecases/load-books'
import { Book } from '@/domain/models/book'
import { BooksView } from './books-view'

type Props = {
  loadBooks: LoadBooks
}

export function BooksController({ loadBooks }: Props) {
  const [books, setBooks] = useState<Book[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadBooks.load().then(setBooks).catch(console.error)
  }, [loadBooks])

  return (
    <BooksView
      books={books}
      isModalOpen={isModalOpen}
      onOpenModal={() => setIsModalOpen(true)}
      onCloseModal={() => setIsModalOpen(false)}
      onSaveBook={() => setIsModalOpen(false)}
    />
  )
}

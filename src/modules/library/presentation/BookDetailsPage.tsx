import { useParams } from '@tanstack/react-router'
import { useBookDetails } from '@/modules/library/application/useBookDetails'

export function BookDetailsPage() {
  const { bookId } = useParams({ from: '/_library/library/books/$bookId' })
  const { data: book, isLoading } = useBookDetails(bookId)

  if (isLoading) return <div>Loading...</div>
  if (!book) return <div>Book not found</div>

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-400">{book.author}</p>
      {/* Detailed view implementation */}
    </div>
  )
}

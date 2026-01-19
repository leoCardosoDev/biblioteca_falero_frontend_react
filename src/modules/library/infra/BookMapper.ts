import { Book, type BookProps, type BookStatus } from '../domain/Book'
import type { BookDTO } from './dtos'

export class BookMapper {
  static toDomain(raw: BookDTO): Book {
    return new Book({
      id: raw.id,
      title: raw.title,
      author: raw.author,
      coverUrl: raw.coverUrl,
      isbn: raw.isbn,
      category: raw.category,
      status: raw.status as BookStatus,
      location: raw.location,
      pages: raw.pages,
      year: raw.year,
      publisher: raw.publisher
    })
  }

  static toDTO(book: Book): BookProps {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      isbn: book.isbn,
      category: book.category,
      status: book.status,
      location: book.location,
      pages: book.pages,
      year: book.year,
      publisher: book.publisher
    }
  }
}

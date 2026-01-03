import React from 'react';
import { Books } from '@/presentation/react/pages/books/books';
import { DbLoadBooks } from '@/application/usecases/db-load-books';
import { MockBookRepository } from '@/infra/mocks/mock-book-repository';

export const MakeBooks: React.FC = () => {
  // In future, swap with HttpBookRepository
  const bookRepository = new MockBookRepository();
  const loadBooks = new DbLoadBooks(bookRepository);

  return <Books loadBooks={loadBooks} />;
};

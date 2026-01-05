import { describe, test, expect, vi } from 'vitest'
import { DbLoadBooks } from '@/application/usecases/db-load-books'
import type { BookRepository } from '@/domain/contracts/book-repository'
import type { Book } from '@/domain/models/book'

const makeBookRepository = (): BookRepository => {
  class BookRepositoryStub implements BookRepository {
    async loadAll(): Promise<Book[]> {
      return Promise.resolve([
        {
          id: 'any_id',
          title: 'any_title',
          author: 'any_author',
          coverUrl: 'any_url',
          isbn: 'any_isbn',
          category: 'any_category',
          status: 'Disponível'
        }
      ])
    }
  }
  return new BookRepositoryStub()
}

interface SutTypes {
  sut: DbLoadBooks
  bookRepositoryStub: BookRepository
}

const makeSut = (): SutTypes => {
  const bookRepositoryStub = makeBookRepository()
  const sut = new DbLoadBooks(bookRepositoryStub)
  return {
    sut,
    bookRepositoryStub
  }
}

describe('DbLoadBooks', () => {
  test('Should call BookRepository', async () => {
    const { sut, bookRepositoryStub } = makeSut()
    const loadAllSpy = vi.spyOn(bookRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of books on success', async () => {
    const { sut } = makeSut()
    const books = await sut.load()
    expect(books).toEqual([
      {
        id: 'any_id',
        title: 'any_title',
        author: 'any_author',
        coverUrl: 'any_url',
        isbn: 'any_isbn',
        category: 'any_category',
        status: 'Disponível'
      }
    ])
  })

  test('Should throw if BookRepository throws', async () => {
    const { sut, bookRepositoryStub } = makeSut()
    vi.spyOn(bookRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})

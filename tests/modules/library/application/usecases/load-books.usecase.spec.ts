import { describe, test, expect, vi } from 'vitest'
import { LoadBooksUseCase } from '@/modules/library/application'
import type { LibraryRepository } from '@/modules/library/application'
import { Book } from '@/modules/library/domain'

function makeLibraryRepository(): LibraryRepository {
  return {
    getBooks: vi.fn().mockResolvedValue([
      new Book({
        id: 'any_id',
        title: 'any_title',
        author: 'any_author',
        coverUrl: 'any_url',
        isbn: 'any_isbn',
        category: 'any_category',
        status: 'available'
      })
    ]),
    getBookById: vi.fn(),
    getLoans: vi.fn(),
    createLoan: vi.fn()
  }
}

interface SutTypes {
  sut: LoadBooksUseCase
  repositoryStub: LibraryRepository
}

function makeSut(): SutTypes {
  const repositoryStub = makeLibraryRepository()
  const sut = new LoadBooksUseCase(repositoryStub)
  return { sut, repositoryStub }
}

describe('LoadBooksUseCase', () => {
  test('Should call LibraryRepository.getBooks', async () => {
    const { sut, repositoryStub } = makeSut()
    await sut.execute()
    expect(repositoryStub.getBooks).toHaveBeenCalled()
  })

  test('Should return a list of books on success', async () => {
    const { sut } = makeSut()
    const books = await sut.execute()
    expect(books).toHaveLength(1)
    expect(books[0]).toBeInstanceOf(Book)
    expect(books[0].title).toBe('any_title')
  })

  test('Should throw if LibraryRepository throws', async () => {
    const { sut, repositoryStub } = makeSut()
    vi.mocked(repositoryStub.getBooks).mockRejectedValueOnce(
      new Error('repo_error')
    )
    await expect(sut.execute()).rejects.toThrow('repo_error')
  })
})

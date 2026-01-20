import { describe, test, expect, vi } from 'vitest'
import { LoadLoansUseCase } from '@/modules/library/application'
import type { LibraryRepository } from '@/modules/library/application'
import { Loan, Book } from '@/modules/library/domain'

const mockBook = new Book({
  id: 'any_book_id',
  title: 'any_title',
  author: 'any_author',
  coverUrl: 'any_url',
  isbn: 'any_isbn',
  category: 'any_category',
  status: 'Emprestado'
})

function makeLibraryRepository(): LibraryRepository {
  return {
    getBooks: vi.fn(),
    getBookById: vi.fn(),
    getLoans: vi.fn().mockResolvedValue([
      new Loan({
        id: 'any_id',
        book: mockBook,
        userId: 'any_user_id',
        userName: 'any_user',
        loanDate: '2023-10-10',
        dueDate: '2023-10-24',
        status: 'Em Dia'
      })
    ]),
    createLoan: vi.fn()
  }
}

interface SutTypes {
  sut: LoadLoansUseCase
  repositoryStub: LibraryRepository
}

function makeSut(): SutTypes {
  const repositoryStub = makeLibraryRepository()
  const sut = new LoadLoansUseCase(repositoryStub)
  return { sut, repositoryStub }
}

describe('LoadLoansUseCase', () => {
  test('Should call LibraryRepository.getLoans', async () => {
    const { sut, repositoryStub } = makeSut()
    await sut.execute()
    expect(repositoryStub.getLoans).toHaveBeenCalled()
  })

  test('Should return a list of loans on success', async () => {
    const { sut } = makeSut()
    const loans = await sut.execute()
    expect(loans).toHaveLength(1)
    expect(loans[0]).toBeInstanceOf(Loan)
    expect(loans[0].book.title).toBe('any_title')
  })

  test('Should throw if LibraryRepository throws', async () => {
    const { sut, repositoryStub } = makeSut()
    vi.mocked(repositoryStub.getLoans).mockRejectedValueOnce(
      new Error('repo_error')
    )
    await expect(sut.execute()).rejects.toThrow('repo_error')
  })
})

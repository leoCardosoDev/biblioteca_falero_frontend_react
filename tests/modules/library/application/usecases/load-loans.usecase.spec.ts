import { describe, test, expect, vi } from 'vitest'
import { LoadLoansUseCase } from '@/modules/library/application'
import type { LibraryRepository } from '@/modules/library/application'
import { Loan } from '@/modules/library/domain'

function makeLibraryRepository(): LibraryRepository {
  return {
    loadBooks: vi.fn(),
    loadBookById: vi.fn(),
    loadLoans: vi.fn().mockResolvedValue([
      new Loan({
        id: 'any_id',
        bookId: 'any_book_id',
        bookTitle: 'any_title',
        userId: 'any_user_id',
        userName: 'any_user',
        loanDate: new Date('2023-10-10'),
        dueDate: new Date('2023-10-24'),
        status: 'onTime'
      })
    ]),
    loadLoansByUser: vi.fn()
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
  test('Should call LibraryRepository.loadLoans', async () => {
    const { sut, repositoryStub } = makeSut()
    await sut.execute()
    expect(repositoryStub.loadLoans).toHaveBeenCalled()
  })

  test('Should return a list of loans on success', async () => {
    const { sut } = makeSut()
    const loans = await sut.execute()
    expect(loans).toHaveLength(1)
    expect(loans[0]).toBeInstanceOf(Loan)
    expect(loans[0].bookTitle).toBe('any_title')
  })

  test('Should throw if LibraryRepository throws', async () => {
    const { sut, repositoryStub } = makeSut()
    vi.mocked(repositoryStub.loadLoans).mockRejectedValueOnce(
      new Error('repo_error')
    )
    await expect(sut.execute()).rejects.toThrow('repo_error')
  })
})

import { describe, test, expect, vi } from 'vitest'
import { DbLoadLoans } from '@/application/usecases/db-load-loans'
import type { LoanRepository } from '@/domain/contracts/loan-repository'
import type { Loan } from '@/domain/models/loan'

const makeLoanRepository = (): LoanRepository => {
  class LoanRepositoryStub implements LoanRepository {
    async loadAll(): Promise<Loan[]> {
      return Promise.resolve([
        {
          id: 'any_id',
          book: {
            id: 'any_book_id',
            title: 'any_title',
            author: 'any_author',
            coverUrl: 'any_url',
            isbn: 'any_isbn',
            category: 'any_category',
            status: 'Disponível'
          },
          user: {
            id: 'any_user_id',
            name: 'any_name',
            email: 'any_email',
            rg: 'any_rg',
            cpf: 'any_cpf',
            role: 'STUDENT',
            status: 'ACTIVE'
          },
          loanDate: 'any_date',
          dueDate: 'any_date',
          status: 'Em Dia'
        }
      ])
    }
  }
  return new LoanRepositoryStub()
}

interface SutTypes {
  sut: DbLoadLoans
  loanRepositoryStub: LoanRepository
}

const makeSut = (): SutTypes => {
  const loanRepositoryStub = makeLoanRepository()
  const sut = new DbLoadLoans(loanRepositoryStub)
  return {
    sut,
    loanRepositoryStub
  }
}

describe('DbLoadLoans', () => {
  test('Should call LoanRepository', async () => {
    const { sut, loanRepositoryStub } = makeSut()
    const loadAllSpy = vi.spyOn(loanRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of loans on success', async () => {
    const { sut } = makeSut()
    const loans = await sut.load()
    expect(loans).toEqual([
      {
        id: 'any_id',
        book: expect.objectContaining({ id: 'any_book_id' }),
        user: expect.objectContaining({ id: 'any_user_id' }),
        loanDate: 'any_date',
        dueDate: 'any_date',
        status: 'Em Dia'
      }
    ])
  })

  test('Should throw if LoanRepository throws', async () => {
    const { sut, loanRepositoryStub } = makeSut()
    vi.spyOn(loanRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})

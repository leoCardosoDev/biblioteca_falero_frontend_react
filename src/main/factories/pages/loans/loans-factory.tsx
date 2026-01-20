import { RemoteLoadLoans } from '@/shared/application/usecases'
import { MockLoanRepository } from '@/shared/presentation/mocks/mock-loan-repository'
import { Loans } from '@/shared/presentation/react/pages/loans'

export const MakeLoansCallback = () => {
  const loanRepository = new MockLoanRepository()
  const loadLoans = new RemoteLoadLoans(loanRepository)

  return <Loans loadLoans={loadLoans} />
}

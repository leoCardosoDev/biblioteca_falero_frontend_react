import { RemoteLoadLoans } from '@/application/usecases'
import { MockLoanRepository } from '@/infra/mocks/mock-loan-repository'
import { Loans } from '@/presentation/react/pages/loans'

export const MakeLoansCallback = () => {
  const loanRepository = new MockLoanRepository()
  const loadLoans = new RemoteLoadLoans(loanRepository)

  return <Loans loadLoans={loadLoans} />
}

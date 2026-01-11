import { LoadLoans } from '@/domain/usecases/load-loans'
import { LoansController } from './loans-controller'

type Props = {
  loadLoans: LoadLoans
}

export function Loans(props: Props) {
  return <LoansController {...props} />
}

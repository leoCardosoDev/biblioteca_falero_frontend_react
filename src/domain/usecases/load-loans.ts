import { Loan } from '@/domain/models/loan'

export interface LoadLoans {
  load: () => Promise<Loan[]>
}

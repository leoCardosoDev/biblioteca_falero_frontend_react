import { useState, useEffect } from 'react'
import { LoadLoans } from '@/domain/usecases/load-loans'
import { Loan } from '@/domain/models/loan'
import { LoansView } from './loans-view'

type Props = {
  loadLoans: LoadLoans
}

export function LoansController({ loadLoans }: Props) {
  const [loans, setLoans] = useState<Loan[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadLoans.load().then(setLoans).catch(console.error)
  }, [loadLoans])

  return (
    <LoansView
      loans={loans}
      isModalOpen={isModalOpen}
      onOpenModal={() => setIsModalOpen(true)}
      onCloseModal={() => setIsModalOpen(false)}
      onSaveLoan={() => setIsModalOpen(false)}
    />
  )
}

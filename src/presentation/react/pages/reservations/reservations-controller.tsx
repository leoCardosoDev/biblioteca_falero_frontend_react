import { useState } from 'react'
// TODO: Replace with HttpRepository when Backend Task (Circulation/Reservations) is complete
import { MOCK_RESERVATIONS } from '@/infra'
import { ReservationsView } from './reservations-view'

export function ReservationsController() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <ReservationsView
      isModalOpen={isModalOpen}
      onOpenModal={() => setIsModalOpen(true)}
      onCloseModal={() => setIsModalOpen(false)}
      reservations={MOCK_RESERVATIONS}
    />
  )
}

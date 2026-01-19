import type { Book } from './Book'

export type ReservationStatus = 'Aguardando' | 'Disponível' | 'Cancelado'

export interface ReservationProps {
  id: string
  book: Book
  userId: string
  userName: string
  requestDate: string
  expiryDate?: string
  status: ReservationStatus
  queuePosition: number
}

export class Reservation {
  private readonly props: ReservationProps

  constructor(props: ReservationProps) {
    this.props = props
  }

  get id(): string {
    return this.props.id
  }

  get book(): Book {
    return this.props.book
  }

  get status(): ReservationStatus {
    return this.props.status
  }

  isReadyForPickup(): boolean {
    return this.props.status === 'Disponível'
  }
}

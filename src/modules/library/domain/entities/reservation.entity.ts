export type ReservationStatus = 'pending' | 'available' | 'cancelled'

export interface ReservationProps {
  id: string
  bookId: string
  bookTitle: string
  userId: string
  userName: string
  requestDate: Date
  expiryDate?: Date
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

  get bookId(): string {
    return this.props.bookId
  }

  get bookTitle(): string {
    return this.props.bookTitle
  }

  get userId(): string {
    return this.props.userId
  }

  get userName(): string {
    return this.props.userName
  }

  get requestDate(): Date {
    return this.props.requestDate
  }

  get expiryDate(): Date | undefined {
    return this.props.expiryDate
  }

  get status(): ReservationStatus {
    return this.props.status
  }

  get queuePosition(): number {
    return this.props.queuePosition
  }

  get isPending(): boolean {
    return this.props.status === 'pending'
  }

  get isAvailable(): boolean {
    return this.props.status === 'available'
  }
}

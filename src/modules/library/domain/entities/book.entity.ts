export type BookStatus = 'available' | 'borrowed' | 'maintenance'

export interface BookProps {
  id: string
  title: string
  author: string
  coverUrl: string
  isbn: string
  category: string
  status: BookStatus
  location?: string
  pages?: number
  year?: number
  publisher?: string
}

export class Book {
  private readonly props: BookProps

  constructor(props: BookProps) {
    this.props = props
  }

  get id(): string {
    return this.props.id
  }

  get title(): string {
    return this.props.title
  }

  get author(): string {
    return this.props.author
  }

  get coverUrl(): string {
    return this.props.coverUrl
  }

  get isbn(): string {
    return this.props.isbn
  }

  get category(): string {
    return this.props.category
  }

  get status(): BookStatus {
    return this.props.status
  }

  get location(): string | undefined {
    return this.props.location
  }

  get pages(): number | undefined {
    return this.props.pages
  }

  get year(): number | undefined {
    return this.props.year
  }

  get publisher(): string | undefined {
    return this.props.publisher
  }

  get isAvailable(): boolean {
    return this.props.status === 'available'
  }

  get isBorrowed(): boolean {
    return this.props.status === 'borrowed'
  }
}

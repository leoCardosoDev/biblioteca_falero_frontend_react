export interface AddressProps {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  stateId?: string
  cityId?: string
  neighborhoodId?: string
}

export class Address {
  private constructor(private readonly props: AddressProps) {}

  static create(props: AddressProps): Address | undefined {
    if (
      !props.street ||
      !props.number ||
      !props.neighborhood ||
      !props.city ||
      !props.state ||
      !props.zipCode
    ) {
      return undefined
    }
    return new Address(props)
  }

  get street(): string {
    return this.props.street
  }

  get number(): string {
    return this.props.number
  }

  get complement(): string | undefined {
    return this.props.complement
  }

  get neighborhood(): string {
    return this.props.neighborhood
  }

  get city(): string {
    return this.props.city
  }

  get state(): string {
    return this.props.state
  }

  get zipCode(): string {
    return this.props.zipCode
  }

  get stateId(): string | undefined {
    return this.props.stateId
  }

  get cityId(): string | undefined {
    return this.props.cityId
  }

  get neighborhoodId(): string | undefined {
    return this.props.neighborhoodId
  }

  toPlainObject(): AddressProps {
    return { ...this.props }
  }

  equals(other: Address): boolean {
    return (
      this.props.street === other.props.street &&
      this.props.number === other.props.number &&
      this.props.neighborhood === other.props.neighborhood &&
      this.props.city === other.props.city &&
      this.props.state === other.props.state &&
      this.props.zipCode === other.props.zipCode
    )
  }
}

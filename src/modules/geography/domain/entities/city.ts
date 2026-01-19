export interface CityProps {
  id: string
  name: string
  stateId: string
}

export class City {
  private constructor(private readonly props: CityProps) { }

  static create(props: CityProps): City {
    if (!props.id || !props.name || !props.stateId) {
      throw new Error('City: missing required properties')
    }
    return new City(props)
  }

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get stateId(): string {
    return this.props.stateId
  }

  toPlainObject(): CityProps {
    return { ...this.props }
  }

  equals(other: City): boolean {
    return this.props.id === other.props.id
  }
}

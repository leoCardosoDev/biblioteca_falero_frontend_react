export interface NeighborhoodProps {
  id: string
  name: string
  cityId: string
}

export class Neighborhood {
  private constructor(private readonly props: NeighborhoodProps) { }

  static create(props: NeighborhoodProps): Neighborhood {
    if (!props.id || !props.name || !props.cityId) {
      throw new Error('Neighborhood: missing required properties')
    }
    return new Neighborhood(props)
  }

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get cityId(): string {
    return this.props.cityId
  }

  toPlainObject(): NeighborhoodProps {
    return { ...this.props }
  }

  equals(other: Neighborhood): boolean {
    return this.props.id === other.props.id
  }
}

export interface StateProps {
  id: string
  name: string
  abbreviation: string
}

export class State {
  private constructor(private readonly props: StateProps) { }

  static create(props: StateProps): State {
    if (!props.id || !props.name || !props.abbreviation) {
      throw new Error('State: missing required properties')
    }
    return new State(props)
  }

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get abbreviation(): string {
    return this.props.abbreviation
  }

  toPlainObject(): StateProps {
    return { ...this.props }
  }

  equals(other: State): boolean {
    return this.props.id === other.props.id
  }
}

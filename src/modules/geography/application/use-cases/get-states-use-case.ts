import type { GeographyRepository } from '../protocols/geography-repository'
import type { StateProps } from '../../domain/entities/state'

export class GetStatesUseCase {
  constructor(private readonly repository: GeographyRepository) {}

  async execute(): Promise<StateProps[]> {
    return this.repository.getStates()
  }
}

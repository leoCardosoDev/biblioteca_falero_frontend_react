import type { GeographyRepository } from '../protocols/geography-repository'
import type { CityProps } from '../../domain/entities/city'

export class GetCitiesUseCase {
  constructor(private readonly repository: GeographyRepository) {}

  async execute(stateId: string): Promise<CityProps[]> {
    return this.repository.getCities(stateId)
  }
}

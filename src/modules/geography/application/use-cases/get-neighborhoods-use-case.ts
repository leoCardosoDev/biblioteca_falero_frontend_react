import type { GeographyRepository } from '../protocols/geography-repository'
import type { NeighborhoodProps } from '../../domain/entities/neighborhood'

export class GetNeighborhoodsUseCase {
  constructor(private readonly repository: GeographyRepository) {}

  async execute(cityId: string): Promise<NeighborhoodProps[]> {
    return this.repository.getNeighborhoods(cityId)
  }
}

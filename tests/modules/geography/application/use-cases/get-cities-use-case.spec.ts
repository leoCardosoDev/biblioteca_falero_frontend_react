import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GetCitiesUseCase } from '@/modules/geography/application/use-cases/get-cities-use-case'
import type { GeographyRepository } from '@/modules/geography/application/protocols/geography-repository'
import type { CityProps } from '@/modules/geography/domain/entities/city'

const makeMockRepository = (): GeographyRepository => ({
  getStates: vi.fn(),
  getStateById: vi.fn(),
  getCities: vi.fn(),
  getCityById: vi.fn(),
  getNeighborhoods: vi.fn(),
  getNeighborhoodById: vi.fn(),
  loadAddressByZipCode: vi.fn()
})

describe('GetCitiesUseCase', () => {
  let sut: GetCitiesUseCase
  let mockRepository: GeographyRepository

  beforeEach(() => {
    mockRepository = makeMockRepository()
    sut = new GetCitiesUseCase(mockRepository)
  })

  it('should call repository.getCities() with correct stateId', async () => {
    vi.mocked(mockRepository.getCities).mockResolvedValue([])

    await sut.execute('state-123')

    expect(mockRepository.getCities).toHaveBeenCalledWith('state-123')
    expect(mockRepository.getCities).toHaveBeenCalledTimes(1)
  })

  it('should return cities from repository', async () => {
    const cities: CityProps[] = [
      { id: 'city-1', name: 'São Paulo', stateId: 'state-123' },
      { id: 'city-2', name: 'Campinas', stateId: 'state-123' }
    ]
    vi.mocked(mockRepository.getCities).mockResolvedValue(cities)

    const result = await sut.execute('state-123')

    expect(result).toEqual(cities)
  })

  it('should return empty array when repository returns empty', async () => {
    vi.mocked(mockRepository.getCities).mockResolvedValue([])

    const result = await sut.execute('state-123')

    expect(result).toEqual([])
  })
})

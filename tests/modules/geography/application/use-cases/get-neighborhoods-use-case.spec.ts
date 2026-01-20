import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GetNeighborhoodsUseCase } from '@/modules/geography/application/use-cases/get-neighborhoods-use-case'
import type { GeographyRepository } from '@/modules/geography/application/protocols/geography-repository'
import type { NeighborhoodProps } from '@/modules/geography/domain/entities/neighborhood'

const makeMockRepository = (): GeographyRepository => ({
  getStates: vi.fn(),
  getStateById: vi.fn(),
  getCities: vi.fn(),
  getCityById: vi.fn(),
  getNeighborhoods: vi.fn(),
  getNeighborhoodById: vi.fn(),
  loadAddressByZipCode: vi.fn()
})

describe('GetNeighborhoodsUseCase', () => {
  let sut: GetNeighborhoodsUseCase
  let mockRepository: GeographyRepository

  beforeEach(() => {
    mockRepository = makeMockRepository()
    sut = new GetNeighborhoodsUseCase(mockRepository)
  })

  it('should call repository.getNeighborhoods() with correct cityId', async () => {
    vi.mocked(mockRepository.getNeighborhoods).mockResolvedValue([])

    await sut.execute('city-456')

    expect(mockRepository.getNeighborhoods).toHaveBeenCalledWith('city-456')
    expect(mockRepository.getNeighborhoods).toHaveBeenCalledTimes(1)
  })

  it('should return neighborhoods from repository', async () => {
    const neighborhoods: NeighborhoodProps[] = [
      { id: 'n-1', name: 'Centro', cityId: 'city-456' },
      { id: 'n-2', name: 'Jardins', cityId: 'city-456' }
    ]
    vi.mocked(mockRepository.getNeighborhoods).mockResolvedValue(neighborhoods)

    const result = await sut.execute('city-456')

    expect(result).toEqual(neighborhoods)
  })

  it('should return empty array when no neighborhoods found', async () => {
    vi.mocked(mockRepository.getNeighborhoods).mockResolvedValue([])

    const result = await sut.execute('city-456')

    expect(result).toEqual([])
  })
})

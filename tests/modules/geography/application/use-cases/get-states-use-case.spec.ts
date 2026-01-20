import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GetStatesUseCase } from '@/modules/geography/application/use-cases/get-states-use-case'
import type { GeographyRepository } from '@/modules/geography/application/protocols/geography-repository'
import type { StateProps } from '@/modules/geography/domain/entities/state'

const makeMockRepository = (): GeographyRepository => ({
  getStates: vi.fn(),
  getStateById: vi.fn(),
  getCities: vi.fn(),
  getCityById: vi.fn(),
  getNeighborhoods: vi.fn(),
  getNeighborhoodById: vi.fn(),
  loadAddressByZipCode: vi.fn()
})

describe('GetStatesUseCase', () => {
  let sut: GetStatesUseCase
  let mockRepository: GeographyRepository

  beforeEach(() => {
    mockRepository = makeMockRepository()
    sut = new GetStatesUseCase(mockRepository)
  })

  it('should call repository.getStates()', async () => {
    vi.mocked(mockRepository.getStates).mockResolvedValue([])

    await sut.execute()

    expect(mockRepository.getStates).toHaveBeenCalledTimes(1)
  })

  it('should return result from repository', async () => {
    const states: StateProps[] = [
      { id: 'state-1', name: 'São Paulo', abbreviation: 'SP' },
      { id: 'state-2', name: 'Rio de Janeiro', abbreviation: 'RJ' }
    ]
    vi.mocked(mockRepository.getStates).mockResolvedValue(states)

    const result = await sut.execute()

    expect(result).toEqual(states)
  })

  it('should return empty array when repository returns empty', async () => {
    vi.mocked(mockRepository.getStates).mockResolvedValue([])

    const result = await sut.execute()

    expect(result).toEqual([])
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GetAddressByZipCodeUseCase } from '@/modules/geography/application/use-cases/get-address-by-zipcode-use-case'
import type { GeographyRepository } from '@/modules/geography/application/protocols/geography-repository'
import type { AddressProps } from '@/modules/geography/domain/value-objects/address'

const makeMockRepository = (): GeographyRepository => ({
  getStates: vi.fn(),
  getStateById: vi.fn(),
  getCities: vi.fn(),
  getCityById: vi.fn(),
  getNeighborhoods: vi.fn(),
  getNeighborhoodById: vi.fn(),
  loadAddressByZipCode: vi.fn()
})

describe('GetAddressByZipCodeUseCase', () => {
  let sut: GetAddressByZipCodeUseCase
  let mockRepository: GeographyRepository

  beforeEach(() => {
    mockRepository = makeMockRepository()
    sut = new GetAddressByZipCodeUseCase(mockRepository)
  })

  it('should call repository.loadAddressByZipCode() with correct zipCode', async () => {
    const mockAddress: AddressProps = {
      street: 'Rua das Flores',
      number: '',
      neighborhood: 'Centro',
      city: 'Campinas',
      state: 'SP',
      zipCode: '13000-000'
    }
    vi.mocked(mockRepository.loadAddressByZipCode).mockResolvedValue(
      mockAddress
    )

    await sut.execute('13000-000')

    expect(mockRepository.loadAddressByZipCode).toHaveBeenCalledWith(
      '13000-000'
    )
    expect(mockRepository.loadAddressByZipCode).toHaveBeenCalledTimes(1)
  })

  it('should return address from repository', async () => {
    const mockAddress: AddressProps = {
      street: 'Rua Test',
      number: '100',
      neighborhood: 'Bairro',
      city: 'City',
      state: 'ST',
      zipCode: '12345-678'
    }
    vi.mocked(mockRepository.loadAddressByZipCode).mockResolvedValue(
      mockAddress
    )

    const result = await sut.execute('12345-678')

    expect(result).toEqual(mockAddress)
  })

  it('should propagate repository errors', async () => {
    const error = new Error('Zip code not found')
    vi.mocked(mockRepository.loadAddressByZipCode).mockRejectedValue(error)

    await expect(sut.execute('00000-000')).rejects.toThrow('Zip code not found')
  })
})

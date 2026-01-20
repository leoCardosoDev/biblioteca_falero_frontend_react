import type {
  IdentityRepository,
  LoginRequestDto,
  LoginResponseDto
} from '../protocols'

export class LoginUseCase {
  constructor(private readonly repository: IdentityRepository) {}

  async execute(dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.repository.login(dto)
  }
}

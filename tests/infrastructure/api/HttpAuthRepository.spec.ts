import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HttpAuthRepository } from '../../../src/infrastructure/api/HttpAuthRepository';
import { apiClient } from '../../../src/infrastructure/http/api-client';

vi.mock('../../../src/infrastructure/http/api-client', () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

describe('HttpAuthRepository', () => {
  let sut: HttpAuthRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    sut = new HttpAuthRepository();
    localStorage.clear();
  });

  it('should call API with correct params', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      data: {
        accessToken: 'any_token',
        name: 'any_name',
        role: 'any_role',
      },
    });

    await sut.login('any_email@mail.com', 'any_password');

    expect(apiClient.post).toHaveBeenCalledWith('/login', {
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  it('should return AuthSession on success and store it in localStorage', async () => {
    const apiResponse = {
      accessToken: 'valid_token',
      name: 'John Doe',
      role: 'admin',
    };
    vi.mocked(apiClient.post).mockResolvedValue({ data: apiResponse });

    const session = await sut.login('john@mail.com', 'password123');

    expect(session).toEqual({
      user: {
        id: expect.any(String), // This will likely be '1' for now, but we want to fail this eventually
        email: 'john@mail.com',
        name: 'John Doe',
        role: 'admin',
      },
      token: {
        accessToken: 'valid_token',
        expiresIn: 3600,
      },
    });

    const stored = JSON.parse(localStorage.getItem('auth_session') || '{}');
    expect(stored).toEqual(session);
  });

  it('should fail if API returns 401', async () => {
    vi.mocked(apiClient.post).mockRejectedValue({
      response: {
        status: 401,
        data: { error: 'Unauthorized' },
      },
    });

    await expect(sut.login('wrong@mail.com', 'wrong')).rejects.toThrow();
  });
});

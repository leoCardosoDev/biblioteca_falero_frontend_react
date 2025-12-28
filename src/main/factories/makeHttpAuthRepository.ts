import { HttpAuthRepository } from '../../infrastructure/api/HttpAuthRepository';

export const makeHttpAuthRepository = (): HttpAuthRepository => {
  return new HttpAuthRepository();
};

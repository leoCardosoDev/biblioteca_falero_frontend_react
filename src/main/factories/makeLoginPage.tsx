import React from 'react';
import { Login as LoginPage } from '../../presentation/pages/login';
import { HttpAuthentication } from '../../infrastructure/http/http-authentication';

export const makeLoginPage = (): React.ReactElement => {
  const authentication = new HttpAuthentication();
  return <LoginPage authentication={authentication} />;
};

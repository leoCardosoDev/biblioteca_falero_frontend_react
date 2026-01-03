import React from 'react';
import { Loans } from '@/presentation/react/pages/loans/loans';
import { DbLoadLoans } from '@/application/usecases/db-load-loans';
import { MockLoanRepository } from '@/infra/mocks/mock-loan-repository';

export const MakeLoans: React.FC = () => {
  // In future, swap with HttpLoanRepository
  const loanRepository = new MockLoanRepository();
  const loadLoans = new DbLoadLoans(loanRepository);

  return <Loans loadLoans={loadLoans} />;
};

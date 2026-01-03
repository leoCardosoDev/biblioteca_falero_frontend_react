import { Book } from './book';
import { User } from './user';

export interface Loan {
  id: string;
  book: Book;
  user: User;
  loanDate: string;
  dueDate: string;
  status: 'Em Dia' | 'Atrasado' | 'Devolvido';
}

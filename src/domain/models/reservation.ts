import { Book } from './book';
import { User } from './user';

export interface Reservation {
  id: string;
  book: Book;
  user: User;
  requestDate: string;
  expiryDate?: string;
  status: 'Aguardando' | 'Disponível' | 'Cancelado';
  queuePosition: number;
}

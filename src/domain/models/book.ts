export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  isbn: string;
  category: string;
  status: 'Disponível' | 'Emprestado' | 'Manutenção';
  location?: string;
  pages?: number;
  year?: number;
  publisher?: string;
}

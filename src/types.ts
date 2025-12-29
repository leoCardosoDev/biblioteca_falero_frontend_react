export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    role: 'Administrador' | 'Bibliotecário' | 'Estudante' | 'Professor';
    status: 'Ativo' | 'Bloqueado';
    enrollmentId?: string;
}

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

export interface Loan {
    id: string;
    book: Book;
    user: User;
    loanDate: string;
    dueDate: string;
    status: 'Em Dia' | 'Atrasado' | 'Devolvido';
}

export interface Reservation {
    id: string;
    book: Book;
    user: User;
    requestDate: string;
    expiryDate?: string;
    status: 'Aguardando' | 'Disponível' | 'Cancelado';
    queuePosition: number;
}

export interface StatCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendDirection?: 'up' | 'down' | 'neutral';
    icon: string;
    colorClass?: string;
}

export interface SidebarItem {
    label: string;
    icon: string;
    path: string;
}
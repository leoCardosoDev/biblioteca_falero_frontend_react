import type { User } from '@/domain/models/user'
import type { Book } from '@/domain/models/book'
import type { Loan } from '@/domain/models/loan'
import type { Reservation } from '@/domain/models/reservation'

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@falero.edu',
    rg: '12.345.678-9',
    cpf: '123.456.789-00',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzRlmmxN0hjp0HMm3Ln1ZaCSETnq0xkRc8ZxO7009MJ1Md-s24R1is5lgwxHUopkz_Yy7e6J-2MwfWK8hF02REkOrUzUEtDz2rx8RQrr2Dzcb6v4L7bpfy1lwQD94ls4AXz8CeJoA9Lm0Ni95DMzP7SOnFosDLo3MyFRsxKQC4tt5W_lNn-_wL8Xx6auhl4A3eWD3cxPuwVOgY_6TXliw0KES4iDWk9_CcFJa_tUSSSwBL1d8tjUBtCKbudLhXyBDd_I6uh65Ofdo3',
    role: 'STUDENT',
    status: 'ACTIVE',
    enrollmentId: '2023001'
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@falero.edu',
    rg: '98.765.432-1',
    cpf: '987.654.321-00',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAYJ53mQWhchr1DtByP6DY2wxF3lwmZZN8OyO30K8UVmRxfd5IFMIlZctg_7y5XTxptTn5J1tUbpb3JMgFSDq3okxLhpB7lcbflWa9Jyb7SDzAJahBUvsoHolOd6hbXZIeVlFDfaBxOEH_1n9JjgP90Kg6MulgKFRwMPSWoWVREkCKU9ReNr5UcJEfDEjefQZyimf6OMKPffo7zX4CzkUVoczkeHbvL4MksTjAK0lYAASXReRknIOzTRsjTyPLFtbBbEC9EPtbdKCPD',
    role: 'PROFESSOR',
    status: 'ACTIVE',
    enrollmentId: '2021056'
  },
  {
    id: '3',
    name: 'Mariana Costa',
    email: 'mariana.costa@falero.edu',
    rg: '11.222.333-4',
    cpf: '111.222.333-44',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAR_blIyCzAyVpEnsM6xb7NTOP4JN_PaTr-Nw2GAcTWnX6afgK14VsVeNH9iupDprTuF34NVg3JWC0sZksC4-YLeYY0EwTtYyq_sKtun3JTtjWJ0OV_Xjn3I2RMATqUmSZ4pN86JdFhtClTVyNmqBg5AtD6Lblx2wJLUX7FPPxrJAKWy_2fmOtkEDb8J9hQmIvk20wDE2jIon79QgGg8gdc52LDsACwXsEU86Agj2Dduka11G0wnQsucR7s4ecefs57MxvSUd-lyvZc',
    role: 'LIBRARIAN',
    status: 'ACTIVE',
    enrollmentId: 'ADM002'
  },
  {
    id: '4',
    name: 'João Pedro',
    email: 'joao.pedro@falero.edu',
    rg: '55.666.777-8',
    cpf: '555.666.777-88',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5_tqV5y6z7nL2wK8f9R3xQ1j4oM5pE6aS7bV8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2A3B4C5D6E7F8G9H0I1J2K3L4M5N6O7P8Q9R0S1T2U3V4W5X6Y7Z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z',
    role: 'STUDENT',
    status: 'BLOCKED',
    enrollmentId: '2023115'
  },
  {
    id: '5',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@falero.edu',
    rg: '99.000.111-2',
    cpf: '999.000.111-22',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1_d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O9P0Q1R2S3T4U5V6W7X8Y9Z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z',
    role: 'STUDENT',
    status: 'ACTIVE',
    enrollmentId: '2024042'
  }
]

export const MOCK_BOOKS: Book[] = [
  {
    id: '101',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    isbn: '978-85-359-1484-9',
    category: 'Romance',
    status: 'Disponível',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Q1BlOJfIWCtlLv793lb-cqtby23P5sS5EZZc-t6w4o2qJ1WA_HTmQqey9HNGHZdLLj2LdFmR5Cisa6lK-cOy-I2A_rBfgIgtgxgtWmcJpVpYL_5-R60HGfh2weK0BROu-ANA_jz6Fv4dPaTc8txiCWn-DEmqxf8HiXmzVhYDi3UbeVr56SCBRPkaREmTa7Gy53qq2ZB_mC4YGrmKmTMMOgkXbmX_I5V_QWLaMpqW2FH8QGd_sUj7lfKXKWr2-EmLDRAXu3vx2Qzk',
    location: 'Estante A1',
    year: 2008,
    publisher: 'Editora Globo',
    pages: 256
  },
  {
    id: '102',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    category: 'Ficção Científica',
    status: 'Emprestado',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATlhghusRI_bYejoqe3pfd6bwGdj3YHz2GTYCddLeGxNACkwzvcWjpLv-d4vroRwvxYX12842dHOGLb1VQ_HXDre5UzQLJgMJQyTtm_9cp1aGEfSg7fWU5b2kDfP9J_YF4nEHnthckipHjC2iPIzPb-yuV2wKuUR8R9ZxsO1z3NsxVHX4MG6HDSOg-Xu_r49eVELRRjh9qjP3GQFDD9SNARy6ABuUtyMQH_NbDjxTUzQQDe-zkL_0POTWnsjpKB7C2lhBILUZqdD3R',
    location: 'Estante B3'
  },
  {
    id: '103',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-01-323-5088-4',
    category: 'Tecnologia',
    status: 'Disponível',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASu5twKLEMORu6vri5cY-2xFHrC1OKbbMqOIuJCGIp3gp-htrl3wO0g44zZFu2Jt73dsgO6kVfWJpA91g0i3R4NdVQg0eLqlz9QdmkmE6J10d-cASYaitfHyRnnV8xuai2yoXdI1OeHluS88GqZ436mnaZHWVF1ODwMpYFJAsAdFJ8T61Da83mjULVowmmKzixkXxhJGbLaPqOn55tbHKNU-4JRNDnsuZkJgVqhwxDXVy5Nzfm9jxQFGRWmRhScggAsTvS1oLP4cwS',
    location: 'Estante C5'
  }
]

export const MOCK_LOANS: Loan[] = [
  {
    id: 'L001',
    book: MOCK_BOOKS[1],
    user: MOCK_USERS[0],
    loanDate: '10 Out, 2023',
    dueDate: '24 Out, 2023',
    status: 'Atrasado'
  },
  {
    id: 'L002',
    book: MOCK_BOOKS[2],
    user: MOCK_USERS[1],
    loanDate: '20 Out, 2023',
    dueDate: '03 Nov, 2023',
    status: 'Em Dia'
  }
]

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 'R001',
    book: MOCK_BOOKS[0],
    user: MOCK_USERS[1],
    requestDate: '05 Nov, 2023',
    status: 'Disponível',
    queuePosition: 1,
    expiryDate: '12 Nov, 2023'
  },
  {
    id: 'R002',
    book: MOCK_BOOKS[1],
    user: MOCK_USERS[4],
    requestDate: '08 Nov, 2023',
    status: 'Aguardando',
    queuePosition: 3
  },
  {
    id: 'R003',
    book: MOCK_BOOKS[2],
    user: MOCK_USERS[0],
    requestDate: '10 Nov, 2023',
    status: 'Aguardando',
    queuePosition: 1
  }
]

export const DASHBOARD_STATS = [
  {
    title: 'Total Exemplares',
    value: '12,450',
    trend: '+12%',
    trendDirection: 'up',
    icon: 'library_books',
    colorClass: 'text-slate-300'
  },
  {
    title: 'Disponíveis',
    value: '8,200',
    trend: '65% Vol',
    trendDirection: 'neutral',
    icon: 'check_circle',
    colorClass: 'text-slate-300'
  },
  {
    title: 'Emprestados',
    value: '3,908',
    trend: '',
    trendDirection: 'neutral',
    icon: 'outbound',
    colorClass: 'text-slate-300'
  },
  {
    title: 'Empréstimos Ativos',
    value: '342',
    trend: '+5%',
    trendDirection: 'up',
    icon: 'compare_arrows',
    colorClass: 'text-primary'
  },
  {
    title: 'Reservas Ativas',
    value: '15',
    trend: 'Pendente',
    trendDirection: 'neutral',
    icon: 'schedule',
    colorClass: 'text-warning'
  }
]

export const CHART_LOANS_BY_CATEGORY = [
  { name: 'Romance', value: 400 },
  { name: 'Ficção', value: 300 },
  { name: 'Tecnologia', value: 300 },
  { name: 'História', value: 200 },
  { name: 'Ciências', value: 150 },
  { name: 'Arte', value: 100 }
]

export const CHART_ACTIVITY_TRENDS = [
  { name: 'Seg', loans: 45, returns: 30 },
  { name: 'Ter', loans: 52, returns: 35 },
  { name: 'Qua', loans: 38, returns: 40 },
  { name: 'Qui', loans: 65, returns: 45 },
  { name: 'Sex', loans: 58, returns: 50 },
  { name: 'Sáb', loans: 25, returns: 10 }
]

export const AVAILABLE_REPORTS = [
  {
    id: 1,
    title: 'Empréstimos Mensais',
    category: 'Operacional',
    format: 'PDF',
    size: '2.4 MB',
    date: '01 Nov, 2023'
  },
  {
    id: 2,
    title: 'Livros Mais Populares',
    category: 'Analítico',
    format: 'XLSX',
    size: '1.1 MB',
    date: '01 Nov, 2023'
  },
  {
    id: 3,
    title: 'Multas Pendentes',
    category: 'Financeiro',
    format: 'PDF',
    size: '850 KB',
    date: '31 Out, 2023'
  },
  {
    id: 4,
    title: 'Novas Aquisições',
    category: 'Acervo',
    format: 'CSV',
    size: '500 KB',
    date: '30 Out, 2023'
  },
  {
    id: 5,
    title: 'Usuários Inativos',
    category: 'Administrativo',
    format: 'XLSX',
    size: '1.8 MB',
    date: '28 Out, 2023'
  },
  {
    id: 6,
    title: 'Inventário Geral',
    category: 'Acervo',
    format: 'PDF',
    size: '15 MB',
    date: '25 Out, 2023'
  }
]

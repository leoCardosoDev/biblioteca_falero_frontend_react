import type {
  DashboardStat,
  LoanFlowDataPoint,
  TopBookItem,
  AttentionItem
} from '../domain'
import type { DashboardRepository } from '../application'

const MOCK_STATS: DashboardStat[] = [
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

const MOCK_LOAN_FLOW: LoanFlowDataPoint[] = [
  { name: '01 Nov', loans: 400 },
  { name: '08 Nov', loans: 300 },
  { name: '15 Nov', loans: 200 },
  { name: '22 Nov', loans: 278 },
  { name: '29 Nov', loans: 189 }
]

const MOCK_TOP_BOOKS: TopBookItem[] = [
  { title: 'Dom Quixote', loans: 142, percentage: '85%', color: 'bg-primary' },
  { title: '1984', loans: 110, percentage: '65%', color: 'bg-indigo-500' },
  {
    title: 'O Pequeno Príncipe',
    loans: 98,
    percentage: '58%',
    color: 'bg-sky-500'
  },
  { title: 'Harry Potter', loans: 76, percentage: '45%', color: 'bg-teal-500' },
  { title: 'A Bíblia', loans: 42, percentage: '25%', color: 'bg-slate-500' }
]

const MOCK_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: '1',
    bookTitle: 'Harry Potter e a Pedra Filosofal',
    userName: 'João da Silva',
    userId: '8492',
    status: 'overdue',
    statusLabel: 'Atrasado (2 dias)',
    dueDate: '12 Nov 2023'
  },
  {
    id: '2',
    bookTitle: 'Clean Code',
    userName: 'Acervo Interno',
    userId: '3321',
    status: 'maintenance',
    statusLabel: 'Manutenção',
    dueDate: undefined
  }
]

export class MockDashboardRepository implements DashboardRepository {
  async loadStats(): Promise<DashboardStat[]> {
    return Promise.resolve(MOCK_STATS)
  }

  async loadLoanFlowData(): Promise<LoanFlowDataPoint[]> {
    return Promise.resolve(MOCK_LOAN_FLOW)
  }

  async loadTopBooks(): Promise<TopBookItem[]> {
    return Promise.resolve(MOCK_TOP_BOOKS)
  }

  async loadAttentionItems(): Promise<AttentionItem[]> {
    return Promise.resolve(MOCK_ATTENTION_ITEMS)
  }
}

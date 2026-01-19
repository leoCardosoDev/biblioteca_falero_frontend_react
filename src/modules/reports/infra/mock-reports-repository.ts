import type {
  Report,
  CategoryChartDataPoint,
  ActivityChartDataPoint
} from '../domain'
import type { ReportsRepository } from '../application'

const MOCK_REPORTS: Report[] = [
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

const MOCK_CATEGORY_DATA: CategoryChartDataPoint[] = [
  { name: 'Romance', value: 400 },
  { name: 'Ficção', value: 300 },
  { name: 'Tecnologia', value: 300 },
  { name: 'História', value: 200 },
  { name: 'Ciências', value: 150 },
  { name: 'Arte', value: 100 }
]

const MOCK_ACTIVITY_DATA: ActivityChartDataPoint[] = [
  { name: 'Seg', loans: 45, returns: 30 },
  { name: 'Ter', loans: 52, returns: 35 },
  { name: 'Qua', loans: 38, returns: 40 },
  { name: 'Qui', loans: 65, returns: 45 },
  { name: 'Sex', loans: 58, returns: 50 },
  { name: 'Sáb', loans: 25, returns: 10 }
]

export class MockReportsRepository implements ReportsRepository {
  async loadReports(): Promise<Report[]> {
    return Promise.resolve(MOCK_REPORTS)
  }

  async loadCategoryChartData(): Promise<CategoryChartDataPoint[]> {
    return Promise.resolve(MOCK_CATEGORY_DATA)
  }

  async loadActivityChartData(): Promise<ActivityChartDataPoint[]> {
    return Promise.resolve(MOCK_ACTIVITY_DATA)
  }
}

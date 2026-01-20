/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DashboardView } from '@/modules/dashboard/presentation/pages/DashboardView'
import type {
  DashboardStat,
  LoanFlowDataPoint,
  TopBookItem,
  AttentionItem
} from '@/modules/dashboard/domain'

const createMockStats = (): DashboardStat[] => [
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
  }
]

const createMockLoanFlow = (): LoanFlowDataPoint[] => [
  { name: '01 Nov', loans: 400 },
  { name: '08 Nov', loans: 300 }
]

const createMockTopBooks = (): TopBookItem[] => [
  { title: 'Dom Quixote', loans: 142, percentage: '85%', color: 'bg-primary' },
  { title: '1984', loans: 110, percentage: '65%', color: 'bg-indigo-500' }
]

const createMockAttentionItems = (): AttentionItem[] => [
  {
    id: '1',
    bookTitle: 'Harry Potter e a Pedra Filosofal',
    userName: 'João da Silva',
    userId: '8492',
    status: 'overdue',
    statusLabel: 'Atrasado (2 dias)',
    dueDate: '12 Nov 2023'
  }
]

describe('DashboardView', () => {
  const defaultProps = {
    stats: createMockStats(),
    loanFlowData: createMockLoanFlow(),
    topBooks: createMockTopBooks(),
    attentionItems: createMockAttentionItems()
  }

  describe('rendering', () => {
    it('should render the dashboard title', () => {
      render(<DashboardView {...defaultProps} />)

      expect(screen.getByText('Visão Geral')).toBeInTheDocument()
    })

    it('should render the dashboard subtitle', () => {
      render(<DashboardView {...defaultProps} />)

      expect(
        screen.getByText(
          'Acompanhamento em tempo real das operações da biblioteca.'
        )
      ).toBeInTheDocument()
    })

    it('should render action buttons', () => {
      render(<DashboardView {...defaultProps} />)

      expect(screen.getByText('Exportar Relatório')).toBeInTheDocument()
      expect(screen.getByText('Novo Empréstimo')).toBeInTheDocument()
    })

    it('should render stat cards for each stat', () => {
      render(<DashboardView {...defaultProps} />)

      expect(screen.getByText('Total Exemplares')).toBeInTheDocument()
      expect(screen.getByText('Disponíveis')).toBeInTheDocument()
    })
  })

  describe('empty state handling', () => {
    it('should render without crashing when stats array is empty', () => {
      render(<DashboardView {...defaultProps} stats={[]} />)

      expect(screen.getByText('Visão Geral')).toBeInTheDocument()
    })

    it('should render without crashing when loanFlowData is empty', () => {
      render(<DashboardView {...defaultProps} loanFlowData={[]} />)

      expect(screen.getByText('Visão Geral')).toBeInTheDocument()
    })

    it('should render without crashing when topBooks is empty', () => {
      render(<DashboardView {...defaultProps} topBooks={[]} />)

      expect(screen.getByText('Visão Geral')).toBeInTheDocument()
    })

    it('should render without crashing when attentionItems is empty', () => {
      render(<DashboardView {...defaultProps} attentionItems={[]} />)

      expect(screen.getByText('Visão Geral')).toBeInTheDocument()
    })

    it('should render without crashing when all arrays are empty', () => {
      render(
        <DashboardView
          stats={[]}
          loanFlowData={[]}
          topBooks={[]}
          attentionItems={[]}
        />
      )

      expect(screen.getByText('Visão Geral')).toBeInTheDocument()
    })
  })

  describe('data display', () => {
    it('should display stat values correctly', () => {
      render(<DashboardView {...defaultProps} />)

      expect(screen.getByText('12,450')).toBeInTheDocument()
      expect(screen.getByText('8,200')).toBeInTheDocument()
    })

    it('should display stat trends', () => {
      render(<DashboardView {...defaultProps} />)

      expect(screen.getByText('+12%')).toBeInTheDocument()
    })
  })
})

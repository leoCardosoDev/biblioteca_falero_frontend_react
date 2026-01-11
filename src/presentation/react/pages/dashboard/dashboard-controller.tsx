// TODO: Replace with HttpRepository when Backend Dashboard Task is complete
import { DASHBOARD_STATS } from '@/infra'
import { DashboardView } from './dashboard-view'

const data = [
  { name: '01 Nov', loans: 400 },
  { name: '08 Nov', loans: 300 },
  { name: '15 Nov', loans: 200 },
  { name: '22 Nov', loans: 278 },
  { name: '29 Nov', loans: 189 }
]

export function DashboardController() {
  return <DashboardView data={data} stats={DASHBOARD_STATS} />
}

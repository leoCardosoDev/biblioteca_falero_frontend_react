// TODO: Replace with HttpRepository when Backend Reporting Task is complete
import {
  CHART_LOANS_BY_CATEGORY,
  CHART_ACTIVITY_TRENDS,
  AVAILABLE_REPORTS
} from '@/infra'
import { ReportsView } from './reports-view'

export function ReportsController() {
  return (
    <ReportsView
      categoryData={CHART_LOANS_BY_CATEGORY}
      activityData={CHART_ACTIVITY_TRENDS}
      reports={AVAILABLE_REPORTS}
    />
  )
}

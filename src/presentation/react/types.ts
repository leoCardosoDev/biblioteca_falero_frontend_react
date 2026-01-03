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

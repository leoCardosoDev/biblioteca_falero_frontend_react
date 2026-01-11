import { Card, Icon } from '@/presentation/react/components/ui'
import { ProfileSettings } from './components/profile-settings'
import {
  NotificationSettings,
  NotificationToggles
} from './components/notification-settings'
import { SystemSettings } from './components/system-settings'

type Tab = 'profile' | 'notifications' | 'system'

interface SettingsViewProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  notificationToggles: NotificationToggles
  onNotificationToggle: (
    key: keyof NotificationToggles
  ) => (val: boolean) => void
}

export function SettingsView({
  activeTab,
  onTabChange,
  notificationToggles,
  onNotificationToggle
}: SettingsViewProps) {
  return (
    <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-8 md:flex-row">
      <Card className="flex w-full shrink-0 flex-col p-2 md:sticky md:top-6 md:w-64">
        <nav className="flex flex-col gap-1">
          <button
            onClick={() => onTabChange('profile')}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
              activeTab === 'profile'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon
              name="person"
              className={activeTab === 'profile' ? 'text-white' : ''}
            />
            Perfil
          </button>
          <button
            onClick={() => onTabChange('notifications')}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
              activeTab === 'notifications'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon
              name="notifications"
              className={activeTab === 'notifications' ? 'text-white' : ''}
            />
            Notificações
          </button>
          <button
            onClick={() => onTabChange('system')}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
              activeTab === 'system'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon
              name="settings"
              className={activeTab === 'system' ? 'text-white' : ''}
            />
            Sistema
          </button>
        </nav>
        <div className="mt-4 border-t border-white/5 px-2 pt-4">
          <p className="text-center font-mono text-[10px] uppercase tracking-widest text-slate-600">
            Falero v1.0.4
          </p>
        </div>
      </Card>

      <div className="w-full min-w-0 flex-1">
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'notifications' && (
          <NotificationSettings
            toggles={notificationToggles}
            onToggle={onNotificationToggle}
          />
        )}
        {activeTab === 'system' && <SystemSettings />}
      </div>
    </div>
  )
}

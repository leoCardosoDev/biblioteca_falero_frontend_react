import { useState } from 'react'
import { SettingsView } from './settings-view'
import { NotificationToggles } from './components/notification-settings'

type Tab = 'profile' | 'notifications' | 'system'

export function SettingsController() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [toggles, setToggles] = useState<NotificationToggles>({
    emailAlerts: true,
    browserPush: true,
    weeklyDigest: false,
    loanDue: true,
    newBooks: true,
    systemUpdates: false
  })

  const handleToggle = (key: keyof NotificationToggles) => (val: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: val }))
  }

  return (
    <SettingsView
      activeTab={activeTab}
      onTabChange={setActiveTab}
      notificationToggles={toggles}
      onNotificationToggle={handleToggle}
    />
  )
}

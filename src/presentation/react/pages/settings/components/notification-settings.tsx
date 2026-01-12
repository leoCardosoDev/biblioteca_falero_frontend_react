import { Button, Card, Icon, Switch } from '@/presentation/react/components/ui'

export interface NotificationToggles {
  emailAlerts: boolean
  browserPush: boolean
  weeklyDigest: boolean
  loanDue: boolean
  newBooks: boolean
  systemUpdates: boolean
}

interface NotificationSettingsProps {
  toggles: NotificationToggles
  onToggle: (key: keyof NotificationToggles) => (val: boolean) => void
}

export function NotificationSettings({
  toggles,
  onToggle
}: NotificationSettingsProps) {
  return (
    <div className="animate-in fade-in flex flex-col gap-6 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Notificações</h2>
        <p className="mt-1 text-sm text-slate-400">
          Escolha como e quando você deseja ser notificado.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
            <Icon name="mail" className="text-primary" /> Canais de Comunicação
          </h3>
          <div className="divide-y divide-white/5">
            <Switch
              label="Alertas por Email"
              description="Receba atualizações importantes diretamente na sua caixa de entrada."
              checked={toggles.emailAlerts}
              onChange={onToggle('emailAlerts')}
            />
            <Switch
              label="Notificações no Navegador"
              description="Permitir pop-ups de notificação enquanto estiver usando o sistema."
              checked={toggles.browserPush}
              onChange={onToggle('browserPush')}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
            <Icon name="event_note" className="text-success" /> Eventos
            Operacionais
          </h3>
          <div className="divide-y divide-white/5">
            <Switch
              label="Vencimento de Empréstimos"
              description="Notificar 2 dias antes do prazo de devolução."
              checked={toggles.loanDue}
              onChange={onToggle('loanDue')}
            />
            <Switch
              label="Novas Aquisições"
              description="Saber quando novos títulos forem adicionados ao acervo."
              checked={toggles.newBooks}
              onChange={onToggle('newBooks')}
            />
            <Switch
              label="Resumo Semanal"
              description="Relatório simplificado enviado toda segunda-feira."
              checked={toggles.weeklyDigest}
              onChange={onToggle('weeklyDigest')}
            />
          </div>
        </Card>
      </div>
      <div className="flex justify-end">
        <Button variant="secondary">Restaurar Padrões</Button>
      </div>
    </div>
  )
}

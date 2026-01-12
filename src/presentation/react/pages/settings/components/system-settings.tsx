import { Button, Card, Icon } from '@/presentation/react/components/ui'

export function SystemSettings() {
  return (
    <div className="animate-in fade-in flex flex-col gap-6 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Sistema & Segurança</h2>
        <p className="mt-1 text-sm text-slate-400">
          Configurações globais e proteção da conta.
        </p>
      </div>

      <Card className="border-l-4 border-l-primary p-6">
        <h3 className="mb-4 text-lg font-bold text-white">Alterar Senha</h3>
        <div className="grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-2">
            <label className="text-sm font-medium text-slate-300">
              Senha Atual
            </label>
            <input
              type="password"
              className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-surface-dark px-3 text-white outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">
              Nova Senha
            </label>
            <input
              type="password"
              className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-surface-dark px-3 text-white outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-surface-dark px-3 text-white outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="mt-6">
          <Button>Atualizar Senha</Button>
        </div>
      </Card>

      <Card className="border border-danger/20 p-6">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-danger">
          <Icon name="warning" /> Zona de Perigo
        </h3>
        <p className="mb-6 text-sm text-slate-400">
          Ações irreversíveis que afetam sua conta ou dados locais.
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border border-white/5 bg-surface-dark p-4">
            <div>
              <h4 className="text-sm font-medium text-white">
                Limpar Cache Local
              </h4>
              <p className="text-xs text-slate-500">
                Remove dados temporários armazenados no navegador.
              </p>
            </div>
            <Button variant="secondary" className="h-8 text-xs">
              Limpar
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-danger/10 bg-danger/5 p-4">
            <div>
              <h4 className="text-sm font-medium text-white">
                Desativar Conta
              </h4>
              <p className="text-xs text-slate-500">
                Sua conta será suspensa e requer contato com admin para
                reativar.
              </p>
            </div>
            <Button variant="danger" className="h-8 text-xs">
              Desativar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

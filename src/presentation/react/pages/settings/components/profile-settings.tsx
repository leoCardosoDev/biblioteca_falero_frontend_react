import { Button, Card, Icon, Avatar } from '@/presentation/react/components/ui'

export function ProfileSettings() {
  return (
    <div className="animate-in fade-in flex flex-col gap-6 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Perfil Público</h2>
        <p className="mt-1 text-sm text-slate-400">
          Gerencie como você aparece para outros usuários do sistema.
        </p>
      </div>

      <Card className="p-6">
        <div className="mb-8 flex flex-col items-start gap-6 border-b border-white/5 pb-8 md:flex-row md:items-center">
          <Avatar
            size="lg"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgS8E4UNjwCOwPAn2NQrSkwKFOFobY5P2AmjYrrCZEC4GQNrwZZM6hXOm4_68GTIgrRo6CKYCDC1mW6Igy52vsCB1SlqXqpen0vTpo_PORgkdShCWztX7aQKCncjZlz5IqN7TN4WfalmWcPDpPM9clz4-7AAMauY2aEWa1gWTA0oInr5LKwl_osCiCVRBQCrab3RidlyNJ-3NdnwlQCAVRKGNSUiqt4X_FTSaDUghasqlPpVGifozcUzCMKXlqGfjPR0mnvxqAdH9n"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">Sua Foto</h3>
            <p className="mb-3 text-sm text-slate-400">
              Isso será exibido no seu perfil e nas interações.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="h-9 px-3 text-xs">
                Alterar Foto
              </Button>
              <Button
                variant="ghost"
                className="h-9 px-3 text-xs text-danger hover:bg-danger/10 hover:text-danger"
              >
                Remover
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Nome Completo
            </label>
            <input
              className="h-10 rounded-lg border border-white/10 bg-surface-dark px-3 text-sm text-white outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
              defaultValue="Admin Falero"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <input
              className="h-10 rounded-lg border border-white/10 bg-surface-dark px-3 text-sm text-white outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
              defaultValue="admin@falero.edu"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Cargo</label>
            <div className="relative">
              <Icon
                name="lock"
                className="absolute left-3 top-2.5 text-[18px] text-slate-500"
              />
              <input
                disabled
                className="h-10 w-full cursor-not-allowed rounded-lg border border-white/5 bg-surface-dark/50 pl-10 pr-3 text-sm text-slate-500"
                defaultValue="Administrador do Sistema"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Departamento
            </label>
            <input
              className="h-10 rounded-lg border border-white/10 bg-surface-dark px-3 text-sm text-white outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
              defaultValue="Biblioteca Central"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end border-t border-white/5 pt-6">
          <Button>Salvar Alterações</Button>
        </div>
      </Card>
    </div>
  )
}

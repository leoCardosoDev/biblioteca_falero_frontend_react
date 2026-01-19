import { useBooks } from '@/modules/library/application/useBooks'
// Importing UI components - assuming they are in shared/ui or local components.
// For this migration, I will use the structure from the legacy view but update imports.
import { Button, Card, Badge } from '@/presentation/react/components/ui' // Keeping legacy import path for shared UI components as per consolidation state
// import { BookForm } from '@/presentation/react/components/forms' // Commented out until form forms are migrated or stubbed

export function BookListPage() {
  const { data: books, isLoading } = useBooks()
  // const [isModalOpen, setIsModalOpen] = useState(false) // Simplified for first pass

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-2xl flex-col gap-2">
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white">
            Acervo de Obras
          </h1>
          <p className="text-base text-text-secondary">
            Gerencie o catálogo conceitual da biblioteca e adicione novos
            títulos.
          </p>
        </div>
        <Button icon="add_circle" onClick={() => {}}>
          Cadastrar Obra
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-[#111a22]">
                <th className="w-20 px-6 py-4 text-xs font-bold uppercase text-text-secondary">
                  Capa
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-secondary">
                  Título
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-secondary">
                  Autor
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-secondary">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {books?.map((book) => (
                <tr
                  key={book.id}
                  className="group transition-colors hover:bg-[#1e2e3e]"
                >
                  <td className="px-6 py-4">
                    <div
                      className="h-16 w-12 rounded bg-cover bg-center shadow-md"
                      style={{ backgroundImage: `url('${book.coverUrl}')` }}
                    ></div>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{book.author}</td>
                  <td className="px-6 py-4">
                    <Badge
                      label={book.status}
                      color={book.isAvailable() ? 'success' : 'warning'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

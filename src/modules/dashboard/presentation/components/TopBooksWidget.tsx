import type { TopBookItem } from '../../domain'

import { Card } from '@/shared/presentation/ui'

interface TopBooksWidgetProps {
  books: TopBookItem[]
}

export function TopBooksWidget({ books }: TopBooksWidgetProps) {
  return (
    <Card className="flex flex-col p-6">
      <h3 className="mb-1 text-lg font-bold text-white">
        Top Obras Emprestadas
      </h3>
      <p className="mb-6 text-sm text-slate-400">Mais populares este mês</p>
      <div className="flex flex-1 flex-col justify-center gap-5">
        {books.map((item, index) => (
          <div className="group" key={index}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-white">{item.title}</span>
              <span className="text-slate-400">{item.loans}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full ${item.color} rounded-full`}
                style={{ width: item.percentage }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

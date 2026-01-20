import { createRoute, type AnyRoute } from '@tanstack/react-router'

import { BookListPage } from '@/modules/library/presentation/pages'
import { MockLibraryRepository } from '@/modules/library/infra'

const libraryRepository = new MockLibraryRepository()

export function createLibraryRoutes(rootRoute: AnyRoute) {
  const libraryRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/library',
    component: () => <BookListPage repository={libraryRepository} />
  })

  const booksRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/library/books',
    component: () => <BookListPage repository={libraryRepository} />
  })

  return {
    libraryRoute,
    booksRoute
  }
}

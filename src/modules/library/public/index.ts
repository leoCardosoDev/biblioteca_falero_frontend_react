import { createRoute } from '@tanstack/react-router'
import { BookListPage } from '../presentation/BookListPage'
import { LoanHistoryPage } from '../presentation/LoanHistoryPage'
import { BookDetailsPage } from '../presentation/BookDetailsPage'
// Assuming rootRoute is passed from main or defined in a shared way if strictly needed,
// but usually factories take the parent route as argument.

export const createLibraryRoutes = (parentRoute: any) => {
  const libraryRoute = createRoute({
    getParentRoute: () => parentRoute,
    path: 'library'
  })

  const booksRoute = createRoute({
    getParentRoute: () => libraryRoute,
    path: 'books',
    component: BookListPage
  })

  const bookDetailsRoute = createRoute({
    getParentRoute: () => libraryRoute,
    path: 'books/$bookId',
    component: BookDetailsPage
  })

  const loansRoute = createRoute({
    getParentRoute: () => libraryRoute,
    path: 'loans',
    component: LoanHistoryPage
  })

  return libraryRoute.addChildren([booksRoute, bookDetailsRoute, loansRoute])
}

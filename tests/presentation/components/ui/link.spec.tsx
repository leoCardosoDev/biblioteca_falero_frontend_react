import React from 'react'
import { render, screen } from '@testing-library/react'
import { Link, NavLink } from '@/presentation/react/components/ui/link'
import { BrowserRouter } from 'react-router-dom'

const makeSut = <P extends object>(
  Component: React.ComponentType<P>,
  props: P
) => {
  return render(
    <BrowserRouter>
      <Component {...props} />
    </BrowserRouter>
  )
}

describe('Link Component', () => {
  test('Should render an anchor tag with correct href', () => {
    makeSut(Link, { to: '/any_route', children: 'Link Text' })
    const link = screen.getByText('Link Text')
    expect(link.tagName).toBe('A')
    expect(link.getAttribute('href')).toBe('/any_route')
  })
})

describe('NavLink Component', () => {
  test('Should render an anchor tag with correct href', () => {
    makeSut(NavLink, { to: '/any_route', children: 'NavLink Text' })
    const link = screen.getByText('NavLink Text')
    expect(link.tagName).toBe('A')
    expect(link.getAttribute('href')).toBe('/any_route')
  })

  test('Should handle function children (render prop)', () => {
    render(
      <BrowserRouter>
        <NavLink to="/active">
          {({ isActive }) => <span>{isActive ? 'Active' : 'Inactive'}</span>}
        </NavLink>
      </BrowserRouter>
    )
    expect(screen.getByText('Inactive')).toBeTruthy()
  })
})

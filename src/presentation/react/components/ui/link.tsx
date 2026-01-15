import React from 'react'
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  type LinkProps as RouterLinkProps,
  type NavLinkProps as RouterNavLinkProps
} from 'react-router-dom'

export type LinkProps = RouterLinkProps
export type NavLinkProps = RouterNavLinkProps

export function Link(props: LinkProps) {
  return <RouterLink {...props} />
}

export function NavLink(props: NavLinkProps) {
  return <RouterNavLink {...props} />
}

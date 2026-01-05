import React from 'react'
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  LinkProps as RouterLinkProps,
  NavLinkProps as RouterNavLinkProps
} from 'react-router-dom'

export type LinkProps = RouterLinkProps
export type NavLinkProps = RouterNavLinkProps

export const Link: React.FC<LinkProps> = (props) => {
  return <RouterLink {...props} />
}

export const NavLink: React.FC<NavLinkProps> = (props) => {
  return <RouterNavLink {...props} />
}

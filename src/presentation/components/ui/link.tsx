import React from 'react'
import {
  Link as RRDLink,
  NavLink as RRDNavLink,
  LinkProps as RRDLinkProps,
  NavLinkProps as RRDNavLinkProps
} from 'react-router-dom'

export type LinkProps = RRDLinkProps
export type NavLinkProps = RRDNavLinkProps

export const Link: React.FC<LinkProps> = (props) => {
  return <RRDLink {...props} />
}

export const NavLink: React.FC<NavLinkProps> = (props) => {
  return <RRDNavLink {...props} />
}

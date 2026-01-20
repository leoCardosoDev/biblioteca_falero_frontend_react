import {
  Link as TanStackLink,
  type LinkProps as TanStackLinkProps
} from '@tanstack/react-router'

export type LinkProps = TanStackLinkProps

export function Link(props: LinkProps) {
  return <TanStackLink {...props} />
}

type NavLinkClassName = string | ((props: { isActive: boolean }) => string)
type NavLinkChildren =
  | React.ReactNode
  | ((props: { isActive: boolean }) => React.ReactNode)

export type NavLinkProps = Omit<LinkProps, 'className' | 'children'> & {
  className?: NavLinkClassName
  children?: NavLinkChildren
}

export function NavLink({ className, children, ...props }: NavLinkProps) {
  const baseClassName = typeof className === 'function' ? undefined : className
  const activeClassName =
    typeof className === 'function' ? className({ isActive: true }) : undefined
  const inactiveClassName =
    typeof className === 'function' ? className({ isActive: false }) : undefined

  return (
    <TanStackLink
      {...props}
      className={baseClassName}
      activeProps={activeClassName ? { className: activeClassName } : undefined}
      inactiveProps={
        inactiveClassName ? { className: inactiveClassName } : undefined
      }
    >
      {typeof children === 'function'
        ? children({ isActive: false })
        : children}
    </TanStackLink>
  )
}

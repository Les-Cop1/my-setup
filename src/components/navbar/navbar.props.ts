export type NavbarProps = Record<string, never>

export type NavbarItemProps = {
  label: string
  to: string
  isMobile?: boolean
  className?: string
}

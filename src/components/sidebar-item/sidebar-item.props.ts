import { IconType } from '@types'

export type SidebarItemProps = {
  label: string
  to: string
  isMobile?: boolean
  className?: string
  icon?: IconType
  onClick?: () => void
}

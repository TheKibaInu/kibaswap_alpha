import { Box } from './Box'
import { ReactNode } from 'react'

import * as styles from './MobileMenuIcon.css'

interface MobileMenuIconProps {
  children: ReactNode
  isActive?: boolean
  onClick: () => void
}

export const MobileMenuIcon = ({ children, isActive, onClick }: MobileMenuIconProps) => {
  return (
    <Box
      as="button"
      className={styles.mobilemenuIcon}
      background={isActive ? 'accentActiveSoft' : 'none'}
      color={isActive ? 'textPrimary' : 'textSecondary'}
      onClick={onClick}
      height="40"
    >
      {children}
    </Box>
  )
}
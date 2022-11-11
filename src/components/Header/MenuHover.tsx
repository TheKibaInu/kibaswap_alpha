import { Box } from '../AndyComponents/Box'
import { ReactNode } from 'react'

import * as styles from './MenuHover.css'

interface NavIconProps {
  children: ReactNode
  isActive?: boolean
  
  onClick: () => void
}

export const MenuHoverA = ({ children, isActive, onClick }: NavIconProps) => {
  return (
    <Box
      as="button"
      className={styles.MenuHoverA}
      background={isActive ? 'modalBackdrop' : 'none'}
      color={isActive ? 'textPrimary' : 'textPrimary'}
      onClick={onClick}
      height="40"
      fontWeight={isActive ? 'semibold' : 'normal'}
      fontSize="16"
      
     
    >
      {children}
    </Box>
  )
}

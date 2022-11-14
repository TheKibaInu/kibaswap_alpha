import { Box } from '../AndyComponents/Box'
import { ReactNode } from 'react'
import { sprinkles, vars } from 'theme/spinkles.css'

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

export const MenuHoverB = ({ children, isActive, onClick }: NavIconProps) => {
  return (
    <Box
      as="button"
      className={styles.MenuHoverB}
      background={isActive ? 'none' : 'none'}
      onClick={onClick}
      height="40"
      
     
    >
      {children}
    </Box>
  )
}

import { Box, BoxProps } from 'components/AndyComponents/Box'
import { useIsMobileSp } from 'components/AndyComponents/AndyHooks'
import { ForwardedRef, forwardRef } from 'react'

import * as styles from './NavDropdown.css'

export const NavDropdown = forwardRef((props: BoxProps, ref: ForwardedRef<HTMLElement>) => {
  const isMobile = useIsMobileSp()
  return <Box ref={ref} className={isMobile ? styles.mobileNavDropdown : styles.NavDropdown} {...props} />
})

NavDropdown.displayName = 'NavDropdown'

export const TopNavDropdown = forwardRef((props: BoxProps, ref: ForwardedRef<HTMLElement>) => {
  const isMobile = useIsMobileSp()
  return <Box ref={ref} className={isMobile ? styles.mobileNavDropdownTop : styles.NavDropdown} {...props} />
})

TopNavDropdown.displayName = 'TopNavDropdown'

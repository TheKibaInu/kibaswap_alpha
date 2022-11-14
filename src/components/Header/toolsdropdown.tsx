import { Trans } from '@lingui/macro'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { Box } from 'components/AndyComponents/Box'
import { FlRow, Column } from 'components/AndyComponents/Flex'
import {
  BarChartIcon,
  DiscordIconMenu,
  EllipsisIcon,
  GithubIconMenu,
  GovernanceIcon,
  TwitterIconMenu,
  ChevronUpIcon,
  ChevronDownBagIcon,
  MagnifyingGlassIcon,
  ToolsIcon,
} from 'components/AndyComponents/icons'
import { body, bodySmall } from 'components/AndyComponents/common.css'
import { themeVars } from 'theme/spinkles.css'
import { ReactNode, useReducer, useRef, useState } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Code,
  List,
  Moon,
  Star,
  Sun,
  Tool,
} from 'react-feather'
import * as styles from './MenuDropdown.css'
import { NavDropdown } from './NavDropdown'
import { NavIcon } from './NavIcon'
import { useDarkModeManager } from 'state/user/hooks'
import { MenuHoverA, MenuHoverB } from './MenuHover'
import { useIsMobileSp, useIsTabletSp } from 'components/AndyComponents/AndyHooks'
import { IconWrapper } from 'theme'






const PrimaryMenuRow = ({
  to,
  href,
  close,
  children,
}: {
  to?: NavLinkProps['to']
  href?: string
  close?: () => void
  children: ReactNode
}) => {
  return (
    <>
      {to ? (
        <NavLink to={to} className={styles.MenuRow}>
          <FlRow onClick={close}>{children}</FlRow>
        </NavLink>
      ) : (
        <FlRow as="a" href={href} target={'_blank'} rel={'noopener noreferrer'} className={styles.MenuRow}>
          {children}
        </FlRow>
      )}
    </>
  )
}

const PrimaryMenuRowText = ({ children }: { children: ReactNode }) => {
  return <Box className={`${styles.PrimaryText} ${body}`}>{children}</Box>
}

PrimaryMenuRow.Text = PrimaryMenuRowText


const ChevronWrapper = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0px 0px 0px 0px;

  :hover {
    
  }
  :hover,
  :active,
  :focus {
    border: none;
  }
`

interface MenuItemProps {
  isActive?: boolean
  children: ReactNode
}

const ToolsWrapper = ({ isActive, children }: MenuItemProps) => {
  return (
    <Box className={isActive ? styles.activeMenuItem : styles.menuItem}>
      {children}
    </Box>
  )
}
const MenuDivider = styled.div`
 
  margin: 0px;
  width: 2px;
`



const Icon = ({ href, children }: { href?: string; children: ReactNode }) => {
  return (
    <>
      <Box
        as={href ? 'a' : 'div'}
        href={href ?? undefined}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        display="flex"
        flexDirection="column"
        color="textPrimary"
        background="none"
        border="none"
        justifyContent="center"
        textAlign="center"
        marginRight="12"
      >
        {children}
      </Box>
    </>
  )
}

export const ToolsDropdown = () => {
  const [isOpen, toggleOpen] = useReducer((s) => !s, false)
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  const [menu, setMenu] = useState<'main' | 'lang'>('main')
  const isMobile = useIsMobileSp()



  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, isOpen ? toggleOpen : undefined)

  return (
    <>
      
      <Box position="relative" ref={ref} >

      {isMobile? <MenuHoverB isActive={isOpen} onClick={toggleOpen}>
          <ToolsWrapper isActive={isOpen}>
            <ToolsIcon/>
          </ToolsWrapper>
          </MenuHoverB>  
          : null
        }
      
  
        {isMobile? null : <MenuHoverA isActive={isOpen} onClick={toggleOpen}>
           <FlRow><Trans>Tools </Trans><ChevronWrapper>
            <MenuDivider/>
            {isOpen ? <ChevronUp size={24}/> : <ChevronDown size={20}/>}
          </ChevronWrapper></FlRow>
        </MenuHoverA>}

        {isOpen && (
          <NavDropdown top={{ sm: 'unset', lg: '56' }} bottom={{ sm: '56', lg: 'unset' }} right="0">
            <Column gap="16">
              <Column paddingX="8" gap="4">
                <PrimaryMenuRow to="/fomo" close={toggleOpen}>
                  <Icon>
                  <Star opacity={0.6} size={16} />
                  </Icon>
                  <PrimaryMenuRow.Text>
                    <Trans>KibaFomo</Trans>
                  </PrimaryMenuRow.Text>
                </PrimaryMenuRow>
                <PrimaryMenuRow to="/honeypot-checker" close={toggleOpen}>
                  <Icon>
                  <Code opacity={0.6} size={16} />
                  </Icon>
                  <PrimaryMenuRow.Text>
                    <Trans>Honeypot Checker</Trans>
                  </PrimaryMenuRow.Text>
                </PrimaryMenuRow>
                <PrimaryMenuRow to="/suite" close={toggleOpen}>
                  <Icon>
                  <Tool size={16} opacity={0.6} />
                  </Icon>
                  <PrimaryMenuRow.Text>
                    <Trans>KibaTools</Trans>
                  </PrimaryMenuRow.Text>
                </PrimaryMenuRow>
                <PrimaryMenuRow to="/details" close={toggleOpen}>
                  <Icon>
                  <List size={16} opacity={0.6} />
                  </Icon>
                  <PrimaryMenuRow.Text>
                    <Trans>Transactions</Trans>
                  </PrimaryMenuRow.Text>
                </PrimaryMenuRow>
              </Column>
              
              
            </Column>
          </NavDropdown>
        )}
      </Box>
     
    
    </>
  )
}

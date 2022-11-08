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
} from 'components/AndyComponents/icons'
import { body, bodySmall } from 'components/AndyComponents/common.css'
import { themeVars } from 'theme/spinkles.css'
import { ReactNode, useReducer, useRef, useState } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'
import {
  BarChart2,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Code,
  DollarSign,
  Info,
  List,
  Lock,
  MessageCircle,
  Moon,
  PieChart,
  Star,
  Sun,
  Tool,
  Twitter,
} from 'react-feather'


import { useToggleModal } from '../../state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import * as styles from './MenuDropdown.css'
import { NavDropdown } from './NavDropdown'
import { NavIcon } from './NavIcon'
import { useDarkModeManager } from 'state/user/hooks'

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

const SecondaryLinkedText = ({
  href,
  onClick,
  children,
}: {
  href?: string
  onClick?: () => void
  children: ReactNode
}) => {
  return (
    <Box
      as={href ? 'a' : 'div'}
      href={href ?? undefined}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={`${styles.SecondaryText} ${bodySmall}`}
      onClick={onClick}
      cursor="pointer"
    >
      {children}
    </Box>
  )
}

const ToggleMenuItem = styled.button`
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
`

const Separator = () => {
  return <Box className={styles.Separator} />
}

const IconRow = ({ children }: { children: ReactNode }) => {
  return <FlRow className={styles.IconRow}>{children}</FlRow>
}

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

export const MenuDropdown = () => {
  const [isOpen, toggleOpen] = useReducer((s) => !s, false)
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  const [menu, setMenu] = useState<'main' | 'lang'>('main')


  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, isOpen ? toggleOpen : undefined)

  return (
    <>
      <Box position="relative" ref={ref}>
        <NavIcon isActive={isOpen} onClick={toggleOpen}>
          <EllipsisIcon viewBox="0 0 20 20" width={24} height={24} />
        </NavIcon>

        {isOpen && (
          <NavDropdown top={{ sm: 'unset', lg: '56' }} bottom={{ sm: '56', lg: 'unset' }} right="0">
            <Column gap="16">
              <Column paddingX="8" gap="4">
                <PrimaryMenuRow to="/vote" close={toggleOpen}>
                  <Icon>
                    <GovernanceIcon width={24} height={24} />
                  </Icon>
                  <PrimaryMenuRow.Text>
                    <Trans>Vote in governance</Trans>
                  </PrimaryMenuRow.Text>
                </PrimaryMenuRow>
                <PrimaryMenuRow href="https://info.uniswap.org/#/">
                  <Icon>
                    <BarChartIcon width={24} height={24} />
                  </Icon>
                  <PrimaryMenuRow.Text>
                    <Trans>View more analytics</Trans>
                  </PrimaryMenuRow.Text>
                </PrimaryMenuRow>
              </Column>
              <Separator />
              <Box
                display="flex"
                flexDirection={{ sm: 'row', md: 'column' }}
                flexWrap="wrap"
                alignItems={{ sm: 'center', md: 'flex-start' }}
                paddingX="8"
              >
                <SecondaryLinkedText href="https://help.uniswap.org/en/">
                  <Trans>Help center</Trans> ↗
                </SecondaryLinkedText>
                <SecondaryLinkedText href="https://docs.kibainu.com/">
                  <Trans>Documentation</Trans> ↗
                </SecondaryLinkedText>
               
                
              </Box>
              <Box>
              <ToggleMenuItem onClick={() => toggleDarkMode()}>
                      <div>{darkMode ? <Trans>Light Theme</Trans> : <Trans>Dark Theme</Trans>}</div>
                      {darkMode ? <Moon opacity={0.6} size={16} /> : <Sun opacity={0.6} size={16} />}
                    </ToggleMenuItem>
                    <ToggleMenuItem onClick={() => setMenu('lang')}>
                      <div>
                        <Trans>Language</Trans>
                      </div>
                      <ChevronRight size={16} opacity={0.6} />
                    </ToggleMenuItem>
              </Box>
              <IconRow>
                <Icon href="https://discord.com/invite/FCfyBSbCU5">
                  <DiscordIconMenu
                    className={styles.hover}
                    width={24}
                    height={24}
                    color={themeVars.colors.textSecondary}
                  />
                </Icon>
                <Icon href="https://twitter.com/Uniswap">
                  <TwitterIconMenu
                    className={styles.hover}
                    width={24}
                    height={24}
                    color={themeVars.colors.textSecondary}
                  />
                </Icon>
                <Icon href="https://github.com/Uniswap">
                  <GithubIconMenu
                    className={styles.hover}
                    width={24}
                    height={24}
                    color={themeVars.colors.textSecondary}
                  />
                </Icon>
              </IconRow>
            </Column>
          </NavDropdown>
        )}
      </Box>
     
    
    </>
  )
}

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
} from 'components/AndyComponents/icons'
import { body, bodySmall } from 'components/AndyComponents/common.css'
import { themeVars } from 'theme/spinkles.css'
import { ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { NavLink, NavLinkProps, Link } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'
import {
  Check,
  ChevronDown,
  ChevronLeft,
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
import { MenuHoverA } from './MenuHover'
import { LOCALE_LABEL, SupportedLocale, SUPPORTED_LOCALES } from 'constants/locales'
import { useLocationLinkProps } from 'hooks/useLocationLinkProps'
import { useActiveLocale } from 'hooks/useActiveLocale'
import React from 'react'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { ScrollableRow } from 'pages/Swap'
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
export enum FlyoutAlignment {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}
const MenuFlyout = styled.span<{ flyoutAlignment?: FlyoutAlignment }>`
  min-width: 196px;
  max-height: 370px;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border: 1px solid ${({ theme }) => theme.bg0};
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  position: absolute;
  top: 3rem;
  z-index: 100;

  ${({ flyoutAlignment = FlyoutAlignment.RIGHT }) =>
    flyoutAlignment === FlyoutAlignment.RIGHT
      ? css`
          right: 0rem;
        `
      : css`
          left: 0rem;
        `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    bottom: unset;
    right: 0;
    left: unset;
  `};
`
const InternalLinkMenuItem = styled(Link)`
display: flex;
flex: 1;
flex-direction: row;
align-items: center;
padding: 0.5rem 0.5rem;
justify-content: space-between;
text-decoration:none;
color: ${({ theme }) => theme.text2};
:hover {
  color: ${({ theme }) => theme.text1};
  cursor: pointer;
  text-decoration: none;
}
`
function LanguageMenuItem({ locale, active, key }: { locale: SupportedLocale; active: boolean; key: string }) {
  const { to, onClick } = useLocationLinkProps(locale)

  if (!to) return null

  return (
    <InternalLinkMenuItem onClick={onClick} key={key} to={to}>
      <div>{LOCALE_LABEL[locale]}</div>
      {active && <Check opacity={0.6} size={16} />}
    </InternalLinkMenuItem>
  )
}

function LanguageMenu({ close }: { close: () => void }) {
  const activeLocale = useActiveLocale()

  return (
    <MenuFlyout>
    
    <Column paddingX="8" gap="4">
      <ToggleMenuItem onClick={close}>
        <ChevronLeft size={16} />
      </ToggleMenuItem>
      
        
          
      {SUPPORTED_LOCALES.map((locale) => (
        <LanguageMenuItem locale={locale} active={activeLocale === locale} key={locale} />
       
      ))}
      
     
    </Column>
    </MenuFlyout>
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
const MenuDivider = styled.div`
 
  margin: 0px;
  width: 2px;
`

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


export const MenuDropdown2= () => {
  
  const [isOpen, toggleOpen] = useReducer((s) => !s, false)
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  const [menu, setMenu] = useState<'main' | 'lang'>('main')


  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, isOpen ? toggleOpen : undefined)
  // const [isOpen, toggleOpen] = useReducer((s) => !s, false)
  // const open = useModalOpen(ApplicationModal.MENU)
  // const [darkMode, toggleDarkMode] = useDarkModeManager()
  // useEffect(() => {
  //   setMenu('main')
  // }, [open])
  // const ref = useRef<HTMLDivElement>(null)
  // useOnClickOutside(ref, isOpen ? toggleOpen : undefined)
  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <Box position="relative" ref={ref} >

        <MenuHoverA isActive={isOpen} onClick={toggleOpen}>
        <EllipsisIcon viewBox="0 0 20 20" width={24} height={24} />
        </MenuHoverA>

      {isOpen &&
        (() => {
          switch (menu) {
            case 'lang':
              return <LanguageMenu close={() => setMenu('main')} />
            case 'main':
            default:
              return (
                
                <NavDropdown top={{ sm: 'unset', lg: '56' }} bottom={{ sm: '56', lg: 'unset' }} right="0">
                <Column gap="16">
                  <Column paddingX="8" gap="4">
                    <PrimaryMenuRow href="" close={toggleOpen}>
                      <Icon>
                      <Star opacity={0.6} size={16} />
                      </Icon>
                      <PrimaryMenuRow.Text>
                        <Trans>Documentation</Trans>
                      </PrimaryMenuRow.Text>
                    </PrimaryMenuRow>
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
                  </Column>
                  <IconRow>
                <Icon href="https://discord.com/invite/TU8NGUquPc">
                  <DiscordIconMenu
                    className={styles.hover}
                    width={24}
                    height={24}
                    color={themeVars.colors.textSecondary}
                  />
                </Icon>
                <Icon href="https://twitter.com/kibainuworld">
                  <TwitterIconMenu
                    className={styles.hover}
                    width={24}
                    height={24}
                    color={themeVars.colors.textSecondary}
                  />
                </Icon>
                <Icon href="https://github.com/thekibainu">
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
                
              )
          }
        })()}

    </Box>
  )
}


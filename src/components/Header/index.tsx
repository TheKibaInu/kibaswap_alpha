import { AlertOctagon, CheckCircle, Eye, EyeOff } from 'react-feather'
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'
import React, { ReactNode, useState } from 'react'
import { ExternalLink } from '../../theme'
import Menu from '../Menu'
import NetworkCard from './NetworkCard'
import Row from '../Row'
import { SupportedChainId } from 'constants/chains'
import Swal from 'sweetalert2'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'
import Web3Status from '../Web3Status'
import { darken } from 'polished'
import logo from '../../assets/svg/logo.svg'
import styled from 'styled-components/macro'
import { useActiveWeb3React } from '../../hooks/web3'
import { useDarkModeManager } from 'state/user/hooks'
import { useETHBalances } from 'state/wallet/hooks'
import useInterval from 'hooks/useInterval'
import useTheme from 'hooks/useTheme'
import { Box } from 'components/AndyComponents/Box'
import { FlRow } from 'components/AndyComponents/Flex'
import * as styles from '../AndyComponents/style.css'
import { ToolsDropdown } from './toolsdropdown'
import { MenuDropdown } from './MenuDropdown'
import { SearchBarNav } from './HeaderPairSearch'




export type EmbedModel = {
  showTrending?: boolean
  showChartInfo?: boolean
  showChartTrades?: boolean
  embedMode: boolean
  theme?: string
}

export const useIsEmbedMode = (): EmbedModel => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const isEmbedMode = Boolean(params.get('embed'))
  if (isEmbedMode) {
    const trades = params.get('trades') || '1'
    const info = params.get('info') || '1'
    const trending = params.get('trending') || '1'
    const theme = params.get('theme') || 'dark'
    const model = {
      showChartInfo: info == '0' ? false : Boolean(info),
      showTrending: trending == '0' ? false : Boolean(trending),
      showChartTrades: trades == '0' ? false : Boolean(trades),
      embedMode: true,
      theme
    }

    return model
  }
  return {
    embedMode: false,
  }
}


interface MenuItemProps {
  href: string
  id?: NavLinkProps['id']
  isActive?: boolean
  children: ReactNode
}

const MenuItem = ({ href, id, isActive, children }: MenuItemProps) => {
  return (
    <NavLink
      to={href}
      className={isActive ? styles.activeMenuItem : styles.menuItem}
      id={id}
      style={{ textDecoration: 'none' }}
    >
      {children}
    </NavLink>
  )
}


const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  color:${props => props.theme.text1};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`


const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

const getQueryStringVal = (key: string): string | null => {
  return getQuery().get(key);
};


export const useQueryParam = (
  key: string,
  defaultVal: string
): [string, (val: string) => void] => {
  const [query, setQuery] = useState(getQueryStringVal(key) || defaultVal);

  const updateUrl = (newVal: string) => {
    setQuery(newVal);

    const query = getQuery();

    if (newVal.trim() !== '') {
      query.set(key, newVal);
    } else {
      query.delete(key);
    }

    // This check is necessary if using the hook with Gatsby
    if (typeof window !== 'undefined') {
      const { protocol, pathname, host } = window.location;
      const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  return [query, updateUrl];
};



const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`



const activeClassName = 'ACTIVE'
export const StyledAnchorLink = styled.a`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: .75rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: .75rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
    text-decoration: none;
  }
`
const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: .75rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 1rem;
  font-weight: 400;
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 6px;
    font-size: 0.9rem;
  `};

  &.${activeClassName} {
    border-radius: .75rem;
    font-weight: 600;
    justify-content: center;
    color: ${({ theme }) => theme.text1};
    
  }

  :hover {
    background-color: ${({ theme }) => theme.andyBG};
    color: ${({ theme }) => theme.text1};
  },
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const StyledNavLinkDrop = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: .75rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 6px;
    font-size: 0.9rem;
  `};

  &.${activeClassName} {
    
    
  }

  :hover {
    background-color: ${({ theme }) => theme.andyBG};
    color: ${({ theme }) => theme.text1};
  },
  :focus {
    
  }
`



export default function Header() {
  // state
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [showGasTt, setShowGasTt] = React.useState(false)
  const onMouseEnterGasIcon = () => setShowGasTt(true);
  const onMouseExitGasIcon = () => setShowGasTt(false)
  const [showETHValue, setShowETHValue] = React.useState(!!localStorage.getItem('show_balance'))
  const setEThVisible = () => setEthBalanceVisisbleCallback(!showETHValue);
  const isMobile: boolean = width <= 768
  const [gas, setGas] = React.useState<any>()
  const [showNotify, setShowNotify] = React.useState(!!localStorage.getItem('subscribed') && localStorage.getItem('subscribed') !== 'false');
  const dateString = localStorage.getItem('notificationDate') as string;
  const [lastNotified, setLastNotified] = React.useState<Date | undefined>(dateString ? new Date(+dateString) : undefined)

  // side effect
  React.useEffect(() => {
    const dateMath = lastNotified ? new Date(lastNotified?.getTime() + 5 * 60000) : undefined
    if (showNotify && Math.trunc(gas?.FastGasPrice) <= 85 && (!dateMath || dateMath < new Date())) {
      const dateNotified = new Date();
      localStorage.setItem('notificationDate', dateNotified.valueOf().toString())
      setLastNotified(dateNotified)
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        timer: 10000,
        showConfirmButton: false,
        timerProgressBar: true,
        icon: 'success',
        title: 'GWEI is currently at ' + Math.trunc(gas?.FastGasPrice)
      })
    }
  }, [gas, showNotify])

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  // callbacks
  const promise = React.useCallback(() => {
    const error = (e: unknown) => console.error(e)
    console.log(`fetching gas prices`)
    fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=2SIRTH18CHU6HM22AGRF1XE9M7AKDR9PM7`, { method: 'GET' })
      .then((res) => res.json())
      .then((response) => {
        setGas(response.result)
      }).catch(error)
  }, [])

  const handleWindowSizeChange = React.useCallback(() => {
    setWidth(window.innerWidth)
  }, [])

  const onNotify = React.useCallback(() => {
    Swal.fire({
      title: showNotify ? "Cancel notifications" : 'Subscribe to notifications',
      text: showNotify ? "Cancelling notifications will no longer alert you when GWEI is in optimal conditions ( GWEI < 85 )." : 'Subscribing to notifications will alert you in app when GWEI is in optimal conditions (GWEI < 85).',
      showConfirmButton: true,
      confirmButtonText: showNotify ? 'Unsubscribe' : "Subscribe",
      showCancelButton: true,
      icon: showNotify ? 'info' : 'question',
    }).then(({ isConfirmed }) => {
      if (showNotify && isConfirmed) {
        setShowNotify(() => false)
        localStorage.setItem('subscribed', 'false')
      } else if (!showNotify && isConfirmed) {
        setShowNotify(true)
        localStorage.setItem('subscribed', 'true')
      }
    })
  }, [showNotify])

  const setEthBalanceVisisbleCallback = React.useCallback((visible: boolean) => {
    if (!visible) localStorage.removeItem('show_balance')
    else localStorage.setItem('show_balance', visible.toString());
    setShowETHValue(visible);
  }, [])


  const MobileTabs = () => {
    const { pathname } = useLocation()
    const { chainId } = useActiveWeb3React()
   
  
    const isPoolActive =
      pathname.startsWith('/pool') ||
      pathname.startsWith('/add') ||
      pathname.startsWith('/remove') ||
      pathname.startsWith('/increase') ||
      pathname.startsWith('/find')

    const isChartsActive =
      pathname.startsWith('/selective') ||
      pathname.startsWith('/selective-charts') ||
      pathname.startsWith('/selective-charting')
  
    return (
      <>
        <MenuItem href="/swap" isActive={pathname.startsWith('/swap')}>
          <Trans>Swap</Trans>
        </MenuItem>
        
        
        <MenuItem href="/pool" id={'pool-nav-link'} isActive={isPoolActive}>
          <Trans>Pool</Trans>
        </MenuItem>

        <MenuItem href="/selective-charting" id={`chart-nav-link`} isActive={isChartsActive}>
            <Trans>Charts</Trans>
          </MenuItem>

          {isMobile? <ToolsDropdown /> : null }
          
        {isMobile? <MenuDropdown /> : null }

          


      </>
    )
  }

  // hooks
  useInterval(promise, 45000, true)
  const { account, chainId } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account?.toLowerCase() ?? '']
  const [darkMode] = useDarkModeManager()
  const theme = useTheme()

 
  
  return (
    <>
    <nav className={styles.nav}>
        <Box display="flex" height="full" flexWrap="nowrap" alignItems="stretch">
          <Box className={styles.leftSideContainer}>
            <Box as="a" href="#/swap" className={styles.logoContainer}>
            <img
              width={isMobile ? '35px' : '50px'}
              src={logo}
              alt="logo"
            />
            </Box>
            <FlRow gap="8" display={{ sm: 'none', lg: 'flex' }}>
        
          <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
            <Trans>Swap</Trans>
          </StyledNavLink>
          <StyledNavLink
            id={`pool-nav-link`}
            to={'/pool'}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/increase') ||
              pathname.startsWith('/find')
            }
          >
            <Trans>Pool</Trans>
          </StyledNavLink>

          {chainId && [SupportedChainId.MAINNET, SupportedChainId.BINANCE].includes(chainId) && (
            <StyledNavLink id={`stake-nav-link`} to={'/dashboard'}>
              <Trans>Stats</Trans>
            </StyledNavLink>
          )}

          <StyledNavLink isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/selective') ||
            pathname.startsWith('/selective-charts') ||
            pathname.startsWith('/selective-charting')
          } id={`chart-nav-link`} to={'/selective-charting'}>
            <Trans>Charts</Trans>
          </StyledNavLink>

          {isMobile? '' : <ToolsDropdown/>}
          
          </FlRow>
          </Box>

          

          {/* <div
            style={{
              position: 'relative',
              justifyContent: 'center',
              padding: 3,
              borderRadius: 12,
              display: 'flex',
              color: 'rgb(168,228,44)',
            }}
          >
            {' '}
            <span style={{ cursor: 'pointer', display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
              <img style={{ borderRadius: '50%', maxWidth: 25, }} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDCqNz9Kfr-ktZgHR_z8EwmZAkPeX4s6ifw&usqp=CAU'}
              />
              {gas && (
                <span style={{ color: theme.text1, marginLeft: 5, fontSize: 14, fontWeight: 'bold' }}>
                  {gas?.FastGasPrice}
                </span>
              )}
            </span>
            {gas && Math.trunc(gas?.FastGasPrice) > 85 ?
              <AlertOctagon fill={showNotify ? 'green' : 'red'}
                color={'#fff'}
                onClick={onNotify}
                style={{
                  cursor: 'pointer',
                  marginLeft: 5
                }}
                onMouseEnter={onMouseEnterGasIcon}
                onMouseLeave={onMouseExitGasIcon}
              /> :
              <CheckCircle fill={showNotify ? 'green' : 'red'}
                color={'#fff'}
                onClick={onNotify}
                style={{
                  cursor: 'pointer',
                  marginLeft: 5,
                  display: width <= 400 ? 'none' : 'inline-block'
                }} />
            }
          </div> */}
           
           <Box className={styles.middleContainer}>

        <SearchBarNav/>
        </Box>
        
        <Box className={styles.rightSideContainer}>
            <FlRow gap="12">
              <Box display={{ sm: 'flex', xl: 'none' }}>
                <SearchBarNav />
              </Box>
        
        {/* 
        <Box className={styles.rightSideContainer}>
            <FlRow gap="12">
              <Box display={{ sm: 'flex', xl: 'none' }}>
              <div><HeaderPairSearch /></div>
              </Box>
              
              </FlRow>
 */}


        
        <Box display={{ sm: 'none', lg: 'flex' }}>
              {isMobile? '' : <MenuDropdown />}
              </Box>
            <Box display={{ sm: 'flex', lg: 'flex' }}>
            {!!account ? <NetworkCard /> : ''}
            </Box>
            <Box display={{ sm: 'flex', lg: 'flex' }}>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              
              <Web3Status />

            </AccountElement>
            </Box>
            </FlRow>
          </Box>
        </Box>
      </nav>
      <Box className={styles.mobileBottomBar}>
        <MobileTabs />
        <Box marginY="4">
       
        </Box>
      </Box>
      
      
    </>
  )
}

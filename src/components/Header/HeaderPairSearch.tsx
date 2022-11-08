import * as ethers from 'ethers'

import { ArrowUpRight, CheckCircle, Settings, TrendingDown, TrendingUp, X } from 'react-feather'
import { t } from '@lingui/macro'
import { AutoColumn } from 'components/Column'
import { BlueCard } from 'components/Card'
import { CFormInput } from '@coreui/react'
import { Dots } from 'components/swap/styleds'
import { LoadingSkeleton } from 'pages/Pool/styleds'
import { MenuItem } from 'components/SearchModal/styleds'
import React from 'react'
import { useReducer, useRef } from 'react'
import { TYPE } from 'theme'
import Toggle from '../Toggle'
import Tooltip from 'components/Tooltip'
import axios from 'axios'
import { darken } from 'polished'
import { lighten } from 'polished'
import styled from 'styled-components/macro'
import { useActiveWeb3React } from 'hooks/web3'
import useDebounce from 'hooks/useDebounce'
import { useHistory } from 'react-router'
import useTheme from 'hooks/useTheme'
import { useUserSearchPrefManager } from 'state/user/hooks'
import { Box } from 'components/AndyComponents/Box'
import { FlRow } from 'components/AndyComponents/Flex'
import { ChevronLeftIcon, MagnifyingGlassIcon, NavMagnifyingGlassIcon } from 'components/AndyComponents/icons'
import clsx from 'clsx'
import { magicalGradientOnHover } from 'components/AndyComponents/common.css'
import { useIsMobileSp, useIsTabletSp } from 'components/AndyComponents/AndyHooks'
import { NavIcon } from './NavIcon'

import * as styles from './SearchBar.css'
import { useOnClickOutside } from 'hooks/useOnClickOutside'

type PluralProps = {
  one?: React.ReactNode;
  other?: React.ReactNode;
  value?: number;
}
export const useWeb3Endpoint = (chainId?: number | undefined) => {
  const { chainId: chain } = useActiveWeb3React()
  if (!chainId && chain)
    chainId = chain
  const WEB3_ENDPOINT = chainId == 1 ? 'https://cloudflare-eth.com' : chainId == 56 ? 'https://bsc-dataseed1.defibit.io' : 'https://cloudflare-eth.com'
  return WEB3_ENDPOINT
}
  ;
export interface Pair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    symbol: string;
    address: string;
    name: string;
  };
  priceNative: string;
  priceUsd?: string;
  txns: {
    m5: {
      buys: number;
      sells: number;
    };
    h1: {
      buys: number;
      sells: number;
    };
    h6: {
      buys: number;
      sells: number;
    };
    h24: {
      buys: number;
      sells: number;
    };
  };
  volume: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  liquidity?: {
    usd?: number;
    base: number;
    quote: number;
  };
  fdv?: number;
  pairCreatedAt?: number;
}

/* eslint-disable */
const Plural: React.FC<PluralProps> = React.memo((props: PluralProps) => {
  const { one, other, value } = props;
  if (!value) return null;
  if (!one || !other) return null;
  const renderer = <React.Fragment>{Boolean(value > 1) ? other : one}</React.Fragment>
  return renderer
})
export interface Pair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    symbol: string;
    address: string;
    name: string;
  };
  priceNative: string;
  priceUsd?: string;
  txns: {
    m5: {
      buys: number;
      sells: number;
    };
    h1: {
      buys: number;
      sells: number;
    };
    h6: {
      buys: number;
      sells: number;
    };
    h24: {
      buys: number;
      sells: number;
    };
  };
  volume: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  liquidity?: {
    usd?: number;
    base: number;
    quote: number;
  };
  fdv?: number;
  pairCreatedAt?: number;
}

type Props = {
  onPairSelect?: (selectedPair: Pair) => void;
  label?: string
}

export const HeaderPairSearch = (props: Props) => {
  const { onPairSelect } = props
  const [isOpen, toggleOpen] = useReducer((state: boolean) => !state, false)
  const searchRef = useRef<HTMLDivElement>(null)
  const { chainId } = useActiveWeb3React()
  const [searchTerm, setSearchTerm] = React.useState('')
  const searchTermDebounced = useDebounce(searchTerm, 500)
  const isMobile = useIsMobileSp()
  const isTablet = useIsTabletSp()
  const [fetching, setFetching] = React.useState(false)
  const [results, setResults] = React.useState<Pair[]>()
  const onTermChanged = (event: any) => setSearchTerm(event.target.value)
  const history = useHistory()
  const [routing, setRouting] = React.useState(false)
  const [searchSettings, setSearchSettings] = useUserSearchPrefManager()
  const chainImageMap = {
    'ethereum': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAmVBMVEVifur////BzPju7u+Bl+7t7e709PX5+fn7+/zAy/hjf+rK0/X7+/lee+q4xfbDzviHnO9Zd+lSculOb+lVdOnd4vpGaeiywPXm6vz39vNog+t2ju3H0fl7ku2hsfPs7/1wieyVp/GntvPz9f66w+6Ln+/T2fnFzOyrturO1PGuvPXX2+7T2fPP1vmRouyKnu/h5PE7YuejsvLvzmkkAAATgElEQVR4nNWde4OivM7AQQEVqbW0oBXxOrfHcdw98/0/3FtALoWCSjPuvPnn7HL2YfqbtkmahsQwc3GGV3GKR/kTe1Q8svNH4/zJqHjUfJVnmt4xCN7e3zevUbTbGamsIvHn/Wbx/h4ES49z855X9R3V0PgRQnvI+Whs27PDPF4xRhkjBCFiXAUJIYQlsoqtw9oZj/+fEXoef1vsd4z6PkFGtyDk05BEH7PAM71h41W/kvC4XMQuu80mcRKfuBH+PHI+tH83oYc3O8oegatSstUG//X4byXk5nYRhZTcZukQn1J3sfyNhHz0d2a5FBmuFqAh/nvkG/HUARkVHCEfTi9Uc/aqQijdfMET2lepvCt/VHlXLuW7nOFyZjA4vCskM2ZbjVEVjwwnl1Ehdz3KH3BzuSf9VMsNQQwdlp7n9RlV5ZHRnPNx08Dlc24PK1Mu/mpz57wKoaevFBbGwcOjSh+VU/4Y4bDyrlS9nC3/J6avFOJbwYOjqm3b/oQ251MLULu0MobW+Z8Qcue/2P95vpTRnwcVffkswuX+CfOXC6N74ek8lXC88NnT+DLGjyN/IuFnTJ/KJwTRaM2fRbjdU6TrnD0uLvIvW35T/12HXiEsTeT4KqXZHCsemebU9Z+OlwlDL2P1qHJxmo8e9dq4/Rr+rAXsEhTuH/faupZwcwWbmJLnL9BSXEIxb44K7mwxOv2IB/qIIHYYZbvtJwiPq6erUAUiXX1y+2cI341/PYGZIDQd/QjhN/0dgMk0Hjg8oRP/KxuhEj92ODDhaPU8L/QeIbuAO48SdthD7wsySoEgVjsiX15J2GUPc9Rh6bUVj4o3rB8K73aLyy4xxK+LkMIy6vulGNJIoHA8gXkfffHsFsIHoxgLUCvIFt70D8yapx8exBx6C1AliqKxN52sQFY98q+IeoSHENQRDQPTm+IDzCS64cHTJjzAOmrkIlbFdDCxgFQXTRF1CGchzEhyYceEcIIx1NIPPzxbh3BBYc9KdGamhAO8BzKwbqJuOgkLy1ghzMVcA58l0O54JRzgHdA6RcJolIRNt8UYtYsHDWiEn2ZBCLfBKfacdoour+0L2hVlG7MgHGAoZSMOxV+8VxRjBH2eJyunSjgBez1CwTWW+tDZYgx+mqBvZoVwgL/BfgDZOT0IYwYcckKWKREOJlDKRiDG/GHCbx86psa2NUIM5w+69JAwPUL4Dh5z8g9mjXCwfoXbCHTK7UcIjz8QdDo2CPEMbp0g9OncPOOXhCMY378ibng2G4RincItFbQaPTCHJ/A1SmJTQTgYRHC/Snriw5JwWBAqvDaO4e8G3aOSEM8AwyM+VnptTc/btOEDoxSbSkLhgcP9NhG982xhAmq4/GfvzDZCyEmk+/FdhBj2UG8k0YZlG+EAn+CCJG74wu8g3IKEMyVhe7OVcLAG88ATk7G9gxBwYxQ/+NhBiCeAP4ld+E3CT/gLNEnNNAiFsgEM5vlZOkMH4RjOG84FuV4n4WAA6F+g6FgnrNlD6MCMED8wuwnxAk55u/SD1+yhlMbAl/BXaP7JvEE4WF8gjaJnSnkakl9qO/BqBq3qgE1CPAFcOJnibvFL+X/waoa93SYc4APg2mFBByHItZckZN4AVBAO1oAeOJu3Edp8Cr8Li4N9NyGksjH8cxvhyAKfQrpoAqoIB+s/cBqAWC2E/Ax8R5Hc03p3EoIaxTBQEzrwU+g31UxJiOV1egL8XMMyPQUhP4PvQqZQMwXhZCYjrndwiH5QISzi+ya4IkVICaieQ1APnMReafGLY/8SfBf6k07Chj4FdDfC8kBaZptAXegVguLxQ4RinYIpG3ZoEi7h1cxSDVglnEgnRUBlg7Z1Qj6D9kj9TQugRDiT1imcKmCzOqEDHbtATGUKO1ep0D1gHjgyaoT8C3oK6wf7ewgHeAM3iV8yoXMB3obEalEznYSAyoZsZEIb+tjkKzxuibCiYyqGEZ/A1hK9HvMze+hMgQlZ42DfTogXVcRXKEQ6vRJm/wPskmZZJbdXKa7PoVinUB44iZxKpsIWOPxEzx2AlfvDRc1zS559Q00iWlY8b9j8ynqM+9Yc1pQNlFH0P3hJCBhDMLJw132EKgG7q0FuesBICT1Qp9tVHuy7CauTCZbyxv4Wc4hBw8CtHnc7obwhgZSNm30ilRLCeRKJZMlrdxM2z4pQ+bX+Jic87kBeeJUbaiYnnBX5GAp9OodBXB2vhEvQVHy3w5upEE469CnGMGNhn8O0aoS3APS63XB6C/CGLs2UDUhGlo+9pGqE7cWAtoK83gSsEEqnw+pZESbljURm6nlzSEUaOjcBK4StcwkTA09vLo0hf4O8gu3yuDtWaWMzYpDjHAlSwhfAy7tOj7udsOmgCs8GYJ36s4RwtAfbhtXktU7CxvQpLAaEkSYfCSHgzT273AV4Pk1KItX5Ivs/ALJQUDQWhDZcDIq1xQ+rsp0u5n8qjDJg5eQP8IUbYoLQCaCcUpd+3MQbB3gymM2teP49wSpbX/FwsH72mUsd0+BgHxeijuBTJsczFq4MFoSWFVv7hcxYd1AxgFGka9Mwwa7Q//e3m2/0lnlqGWEi+9m6AimZ//Qf6oel/AM3TCAvtyPGnS7P7WxS+No5obWzTgrHu0TUHhuxuAHls3V63OOllHBZEIrFOt8oN+R1neqODcXcOK5AAF363sq3DXD1BkYiTGSzWLdZDO3jvrs1AhiPhlhtfMd1zf1sEFrWa9VCVmWiG0FiARCh67d4M8e3WcNFaxJa8eW0VlqPk+YxShC+QRgLl34r8ZbrSfP4oCJMrIdQOk3GtebFMHs33iHmEK0UHvfovG7MXzuhQJzvm4x4pjcyIEI3/GrwOcFMMX8dhCllkxEftAbIFgaEC9/wuMdHvGg/3bYTCgu5P9SUjp4HTjYGxKcHpOZxC+un2H53EYp5/HPA1YnUS+YnewPg7BS+yOplolqe5SnpBmGyI7+rLuta57iPdob+lQXaVTxu5ws31UtKjPN5vEmYueXFpGt54CjSJ3Rpmbx2PCu1pxz9vYMwgdwXFhJrJJ8Lwp0moOHnama8HCjUy6Txl/sIE8nd8nXUe50ibb4iR9YL1soIWuNM9ABhbG0GyTyC5tc+Km5aB8J0VMtTsSMfI0wgN4mFxJvn1hKtCklS8Y9fs+ZUDdRXvA8SWlb0OpvgifvPKqmxpbB+Cu1ZJ648eJAwOUMeMOTdymOAGwcrnbP6s8Jg9CAUMl8AfuH2kJD4UD+9tkclrka/D6EV9T+oax7xEbVmEmMzwlsu0P5z2HsbopW2xXeRe5F85eLPycJ84PTUIbv+0wDh0yR1NzbXaZRUzmyivMJ+mDDWGRsMoYFYfEo9rOJesHGFjfsSxnolVhKvDaZyGplXTzwN9VrdnQ8R6g5PeG1Q6TkEXTrUaM85jPSH9Qpyxs+ERd+tsd3q1N5NGAFkDokzPqCzgEg8U8R2yyeZ3biXEGT/6EeiVlLdT4TmjdBuw0DeRRjvZBOIehoMXxBqxUvR64vcoqS0HKoteDdhzUIgeunptflvujFvhs2N3ObC352K7ag+cdwkrG1ARKx13+OTflQf0aX5tpPeIbZjPm+l0Zi03D0pAeUfQVYbjPvqQ0GomwBNklzLF1+K+JHVvr427z891TYg8S8Y495aNRobXPP+0E1zEbffTKq3j1Ztt0k3CCPpF+4i9iocv3XvRHsSewbXTdNHNK2ZsIylRGNEoknLrWAXYU1j0lRvacSE0dw0uP49Ps1iUWdD7oxELfU0thLGNQtIUKqXdSqC+QfTAKjgyf5kmevHg1z1W7EduwhrFoKwS3Yywf1jiUn+pWHa+iWFiny944bWGE9NR05NWLcQ1LrefWvl8NHz0DDH+iUuUViULwki6XWJI3eXxd/JLyS7QxHw1tETzE4IAU6IlauLMaay5XDrZ44m4bzuotF9PvV4puN+i3Eled4f+qcL199XLp82RF6q6CB/T1EnlH/FLmGv5dLubyjSH70fJYQziKQouq5csG3ntaUaVW/L6oQ1C+FHh/If42+twfkLnhAGIAnHcl7i20oamfAsy7wgiXBesxAMfUu/DL0dxN5SQg8kYs6sURXRXBjSLw6h7wluEsa1BUr2VRuKB5pBGpdn31to2JvK6Fgt4WRbax3Idrn6Lwjrh3jfktMVdfMvSeTZSdUID6g+eiM3cTmXnBzkR4vMR5mrXBjEopPs52nnJrKFl1aNGAKVaFPk7r27MiP6I6zjlbBuIVDdAcIz3TgGTXRD8qUzUPKeweaN7w4bjpwrznoJYe1EIyxEw8HT/647/XIgIeRQ8TZVqY/jH1JttIfQ7jR4jWVHEbF40cyG0i7Fl32wnhJOgFK9UaP4XGo5XGkXCH0Zd1mIYo3qjsbNih4khA7YN6Rkp0z1nrmSypDb8ghiVQgSoI1J6OWEtgdW+ZmpU6G3r6yl/jkic2UeNNb/fv5aujitqcDhSof/ryXPdHlRtU1EbNe4Yc0AATonXEsOZFUjltqvywW5bV+VnHeN8sTI2KjvAfQ3oZEkQGeEWQ0lsMIwLrXaPlU/nmrBY//SlqgPURUrz8u+Vo2Aq4vhltXlG+J8l8FjhOL2BPZXgK4FdMKr/S0cwE+BacdnCec4O1clG7D9I4QThOKjfx2pXhvgB+vKlOhCsOG3WYgcEKT8HskrCueEU8CMHPKng9A8bhC7tIaLE0KQGhbsq0ZoQjZDuPGhZdC6AVPADYjpcvPy7AUhSCwjF6by3grp/FodL0B+1Un8oka4hUxwZHEPwvTyBsOsUYMtm5Uh9bL+ZXFbvLfbc4jnIMNIgmwNQti6ibSj/EcHIT7AtLcJl0UfiLLzuAda+5JF7Sajo17bACaPFK3MsmdXPpm2F0DqGpfGD9Tcy+9PgTah4Z958dMqhMAFv9qL7rVXFQSqsE8sR11XP4CtYKousdtBCGQokhsn3tI5AHYSkfrA316htf9tvSzEGrX1mQGuvNdmMiTCSgoDVO1Gf8pbO+nAGKNCWg786jnEG6B4WNqDrY0wgJ1EtFIe+JWEIMf6VOh/HYTALVhcf9dBKH/DgKEqHbF92uWhJCws/mg8HpsecE1vZUWeK6EMCNTmObnm4wlO0bej1qWTf0A3j1WUklDVGIKqW5oX/Gvv0nmELaFoINI0GYoaQxiqeXte8K+9sxxfw65T6Ya/nXAO9XvNPf6O3nkcsOdLKs0Cbs0+MzDl2YxKwb+u7oDQPbsIut0rCKxvbnGF2UXIX2D7rrnE7SaEOtZLBf86OzyOgSvsu/XKNfU5BCuOXCn4d6OHJXT/w9qBv9Z3Da5wMLW7Ccv2j71zjtt+tBwjlrsDDqAMhcEwV3WtzlGHZZfOIQfuQ+r6Vjsh2KeT9KTuHi/7pSmh7Qyhe8m2dulcX6DsL1qNSsLuPqRje8g/oVslVJPCqp1WdSvsFILSfsP3zuHQ5tA9nclKRQhRku0qWZ2quwnFv4DshGbIVYhKQrFGgabQz17/ACF8D7ayGFhZdR6skEDeUPkRQscG7L+UCCoacxe91SdggHnQ6xFCmwew2sZluxohWMtqxHIgFaGia/X1Af8CXqf5gT/vaAXlHSJSlKlSda0etYrjvUD39fisEMJ1dQzXXjvFSOm1FSoBGBG5JSGeQd06C2+iWIgqr60kbC7hIf+A0uapuHRfEK6Bun+ngZncza4SKjxvBaHtfcA2hgjxlXANtQnDpD5Of0KBCGv5UVL4TBCCVWOhaX6SBmGCCHrkT274velgsgN5mxtmCVg6hMNkL4KM5jomccYRhECbkF67q+kRCkTQ7hD+2ZvqfQlTSNHu5U5Cu4XQhjUayHfWMJuw/BJJcw6HQ+8FLNKQHPj7flsvv4aQdWOgw5KweNThtdllXMf7IoAeHIi/S8iXl49zWFmITa8tR6173smj8j/kAfBJQ1NcsnMqK7FrId5HOLK5HcO3tO4vNLmAgSW0HX6ADqP2FpQFDGAJxV9H79DhqZ6CjHfzRwiHfLmCbgTZQ1yax5fhCYfO8KD/4bemIHoamT9GKKYRUwLcK/EhcUkltnwn4V32cFSxPHvVxy9PEhS+2lw5qpxQYQ+LnIUiKcNpPhpVHo1e0D+rQ+lOxQQoR1V/NCo7j1fwr2uz6bWV85t4gHx78dHzl6qLwv22fVTZo75+af1dfB09X6nS+LN7VJCEQ3788J+7VJm/GN8aFSShYPT29HmMhO6X94wKklDo2WDuP8cbJ378n8PvGhUkYfKusxX+PCMJrSnnN/XfzxCKebR+eB6Rb51H/MFRtREqrIV9+11BHP7cfiTh6uxwYdIfHVWVsLymKM1m49Go9ZHnecsD+hFvFTEi9AvvM6rqo8e9tmLKS/9oOzMY9GIlDM22Ysj9R3WVBz3vVh/3a0MpHCSh9PLlcO1RQRKKB9MI+cjQdedcgedak7+cg4wKklA8Wn4YoeZMEhrG063YfWCjgiS0haezxfsVZf3Cq4jR3QZ72at+KaEQzo+fi8glPkF3H0BcAyHmu/Fieay+6pcSJuKZXjD7iFhI/VuziRDxfUp3+5c37nmNV/1SwuurxmN7fbDiFWOUMSKmtAzViT8SwnyfsciaH/DZHo+EZrFbX/VLCRPhnP8Ngvf3xWa/i6K8wYH44+518/7+FgRjMW/ePa/qPar/AxQiv+R5h6pcAAAAAElFTkSuQmCC',
    'bsc': 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png'
  }
Plural.displayName = "PluralComponent"

const placeholderText = t`Search tokens`
const isMobileOrTablet = isMobile || isTablet

useOnClickOutside(searchRef, () => {
  isOpen && toggleOpen()
})


const MenuFlyout = styled.span<{ isMobile?: boolean }>`
min-width: 20.125rem;
background-color: ${({ theme }) => theme.bg1};
border: 1px solid ${({ theme }) => theme.bg3};
box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
  0px 24px 32px rgba(0, 0, 0, 0.01);
border-radius: 12px;
display: flex;
flex-direction: column;
font-size: 12px;
top: 4rem;
left: 0rem;
z-index: 100;
max-height: ${(props) => props.isMobile ? '230px' : '350px'};
overflow: auto;


${({ theme }) => theme.mediaWidth.upToMedium`
  min-width: 18.125rem;
`};

user-select: none;
}
`

const MenuItemStyled = styled(MenuItem)`
    padding:9px 14px;
    background:${props => props.theme.bg1};
    color:${props => props.theme.text1};
    &:hover {
        background: ${props => darken(0.05, props.theme.bg3)};
        transition: ease all 0.1s ;
    }
`




const SearchInput = styled(CFormInput)`
  &:focus, &:active, &:hover {
    border-color: #FFF !important;
  }
`


  const onPairClick = React.useCallback(async function (pair: Pair) {
    setRouting(true)
    // const abi = [
    //   'function name() view returns (string name)',
    //   'function symbol() view returns (string symbol)',
    //   'function decimals() view returns (uint8 decimals)',
    // ];
    // const { JsonRpcProvider } = ethers.providers;
    // const provider = new JsonRpcProvider(WEB3_ENDPOINT);
    // const contract = new ethers.Contract(pair.baseToken.address, abi, provider);
    // const [decimals] = await Promise.all([
    //   contract.decimals().catch(handleError),
    // ]);
    // const humanReadable = ethers.BigNumber.from(decimals).toNumber()
    onPairSelect && onPairSelect(pair)
    // history.push(`/selective-charts/${pair.baseToken.address}/${pair.baseToken.symbol}/${pair.baseToken.name}/${humanReadable}/${pair.pairAddress}`)
    history.push(`/selective-charts/${pair.chainId}/${pair.pairAddress}`)
    setSearchTerm('')
    setRouting(false)
  }, [onPairSelect])

  const fetchSearchTerm = async () => {
    setFetching(true)
    const settings = (searchSettings.networks || defaultNetworks).filter(a => a.includeInResults).map(a => a.network);
    const term = searchTermDebounced || searchTerm
    const query = `https://api.dexscreener.com/latest/dex/search/?q=${term}`
    axios.get(query)
      .then((response) => setResults(response.data?.pairs?.filter((pair: Pair) => settings.includes(pair.chainId))))
      .finally(() => setFetching(false))
  }

  React.useEffect(() => {
    if (searchTermDebounced || searchTerm) {
      fetchSearchTerm()
    } else {
      setResults([])
    }
  }, [searchTermDebounced])


  const toggleNetwork = (network: { chainId: number, network: string, includeInResults: boolean }) => {
    const newInclude = !network.includeInResults
    const updated = {
      ...network,
      includeInResults: newInclude
    }
    setSearchSettings({ ...searchSettings, networks: (searchSettings.networks || defaultNetworks).map((setting) => setting.network === network.network ? updated : setting) })
  }
  const defaultNetworks = [
    { chainId: 1, network: 'ethereum', includeInResults: true },
    { chainId: 56, network: 'bsc', includeInResults: true }
  ]
  const theme = useTheme()
  
  const showCenteredSearchContent =
  !isOpen && !isMobileOrTablet && searchTerm.length === 0

  const [settingsShow, settingsShowSet] = React.useState(false)
  const closeSettings = () => settingsShowSet(false)


  const isValidPair = (pair: Pair) => (searchSettings.networks || defaultNetworks).filter((network) => network.includeInResults).map(a => a.network).includes(pair.chainId)

  const navbarSearchEventProperties = {
    navbar_search_input_text: searchTermDebounced,
  }


  return (
    <Box position="relative">
      <Box
        position={{ sm: 'fixed', md: 'absolute' }}
        width={{ sm: isOpen ? 'viewWidth' : 'auto', md: 'auto' }}
        ref={searchRef}
        className={styles.searchBarContainer}
        display={{ sm: isOpen ? 'inline-block' : 'none', xl: 'inline-block' }}
      >
        <FlRow
          className={clsx(
            ` ${!isOpen && !isMobile && magicalGradientOnHover} ${
              isMobileOrTablet && (isOpen ? styles.visible : styles.hidden)
            }`
          )}
          borderRadius={isOpen || isMobileOrTablet ? undefined : '12'}
          borderTopRightRadius={isOpen && !isMobile ? '12' : undefined}
          borderTopLeftRadius={isOpen && !isMobile ? '12' : undefined}
          borderBottomWidth={isOpen || isMobileOrTablet ? '0px' : '1px'}
          onClick={() => !isOpen && toggleOpen()}
          gap="12"
        >
            <Box className={showCenteredSearchContent ? styles.searchContentCentered : styles.searchContentLeftAlign}>
            <Box display={{ sm: 'none', md: 'flex' }}>
              <MagnifyingGlassIcon />
            </Box>
            <Box display={{ sm: 'flex', md: 'none' }} color="textTertiary" onClick={toggleOpen}>
              <ChevronLeftIcon />
            </Box>
          </Box>
            <SearchInput 
            className={`${styles.searchBarInput} ${
              showCenteredSearchContent ? styles.searchContentCentered : styles.searchContentLeftAlign
            }`}
            autoFocus placeholder={"Search by name or address"} type="search" value={searchTerm} onChange={onTermChanged} />
              
        </FlRow>
        <Box className={clsx(isOpen ? styles.visible : styles.hidden)}>
          {isOpen && (
           <MenuFlyout isMobile={isMobile}>
           
                      {Boolean(fetching) && (
                       <LoadingSkeleton borderRadius={12} count={3} />
                     )}
           
                     {/* No Result */}
                     {Boolean(searchTermDebounced) &&
                       !Boolean(fetching) &&
                       !Boolean(routing) &&
                       Boolean(results?.length == 0) && (
                         <MenuItemStyled style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                           No Results Found
                         </MenuItemStyled>
                       )}
           
                     {/* Render Rows */}
                     {!Boolean(fetching) && Boolean(results?.length) && (
                       <React.Fragment>
                         {/* Routing to charts after selection */}
                         {Boolean(routing) && (
                           <div style={{ borderTop: `1px solid ${theme.text1}`, color: theme.text1, padding: 12 }}>
                             <Dots><CheckCircle color={theme.white} fill={'green'} /> Loading chart and data..</Dots>
                           </div>
                         )}
           
                         {/* Render results */}
                         {!routing && results?.filter(isValidPair).map((result) => (
                           <div style={{ alignItems: 'center', cursor: 'pointer' }} key={result.pairAddress} onClick={() => onPairClick(result)}>
                             <MenuItemStyled style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                               <div style={{ display: 'flex', alignItems: 'center' }}>
                                 <img src={(chainImageMap as any)[result.chainId] as string} style={{ marginRight: 10, width: 20, background: 'transparent', borderRadius: 25, border: "1px solid #444" }} />
                                 <span>
                                   {result?.baseToken?.name}
                                   <br />
                                   ({result?.baseToken?.symbol}/{result?.quoteToken?.symbol})
                                 </span>
                               </div>
                               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
           
                                 <span style={{ display: 'flex', flexFlow: 'row wrap', gap: 10, alignItems: 'center' }}>
                                   <ArrowUpRight />
                                 </span>
                               </div>
                             </MenuItemStyled>
                           </div>
                         ))}
                       </React.Fragment>
                     )}
                   </MenuFlyout>
          )}
        </Box>
      </Box>
      
    </Box>
  )
}

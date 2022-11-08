import { Trans } from '@lingui/macro'
import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import styled from 'styled-components/macro'
import { StyledInternalLink } from 'theme'

const BalancesCard = styled.div`
  box-shadow: ${({ theme }) => theme.shadow1};
  background-color: ${({ theme }) => theme.bg1};
  border: ${({ theme }) => `1px solid ${theme.bg2}`};
  border-radius: 16px;
  color: ${({ theme }) => theme.text1};
  display: none;
  font-size: 12px;
  height: fit-content;
  line-height: 16px;
  padding: 20px;
  width: 100%;

  // 768 hardcoded to match NFT-redesign navbar breakpoints
  // src/nft/css/sprinkles.css.ts
  // change to match theme breakpoints when this navbar is updated
  @media screen and (min-width: 768px) {
    display: flex;
  }
`
const BalanceSection = styled.div`
  height: fit-content;
  width: 100%;
`
const BalanceRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  justify-content: space-between;
  line-height: 28px;
  margin-top: 12px;
`
const BalanceItem = styled.div`
  display: flex;
`

const BalanceLink = styled(StyledInternalLink)`
  color: unset;
`





import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'
import { COMMON_BASES } from '../../constants/routing'
import { Currency } from '@uniswap/sdk-core'
import CurrencyLogo from '../CurrencyLogo'
import QuestionHelper from '../QuestionHelper'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'
import { currencyId } from '../../utils/currencyId'
import styled from 'styled-components/macro'

const MobileWrapper = styled(AutoColumn)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.bg2};
  }

  color: ${({ theme, disable }) => disable && theme.text3};
  background-color: ${({ theme, disable }) => disable && theme.bg3};
  filter: ${({ disable }) => disable && 'grayscale(1)'};
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: number
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const bases = typeof chainId !== 'undefined' ? COMMON_BASES[chainId] ?? [] : []
  return bases.length > 0 ? (
    <MobileWrapper gap="md">
      <AutoRow>
        <Text fontWeight={500} fontSize={14}>
          <Trans>Common bases</Trans>
        </Text>
        <QuestionHelper text={<Trans>These tokens are commonly paired with other tokens.</Trans>} />
      </AutoRow>
      <AutoRow gap="4px">
        {bases.map((currency: Currency) => {
          const isSelected = (selectedCurrency as any)?.address?.toLowerCase() === (currency as any)?.address?.toLowerCase()
          const currencyClick = () => !isSelected && onSelect(currency)

          return (
            <BaseWrapper
              onClick={currencyClick}
              disable={isSelected}
              key={currencyId(currency)}
            >
              <CurrencyLogo currency={currency} style={{ marginRight: 8 }} />
              <Text fontWeight={500} fontSize={16}>
                {currency.symbol}
              </Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </MobileWrapper>
  ) : null
}

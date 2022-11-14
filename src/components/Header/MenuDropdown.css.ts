import { style } from '@vanilla-extract/css'

import { sprinkles, themeVars, vars } from 'theme/spinkles.css'

export const subhead = sprinkles({ fontWeight: 'medium', fontSize: '16', lineHeight: '24' })


export const hover = style([
  sprinkles({
    transition: '250',
    borderRadius: '12',
  }),
  {
    ':hover': {
      background: vars.color.lightGrayOverlay,
    },
  },
])

export const MenuRow = style([
  hover,
  sprinkles({
    color: 'textPrimary',
    paddingY: '8',
    paddingX: '8',
    width: 'full',
    whiteSpace: 'nowrap',
  }),
  {
    lineHeight: '24px',
    textDecoration: 'none',
  },
])

export const PrimaryText = style([
  {
    lineHeight: '24px',
  },
])

export const SecondaryText = style([
  hover,
  sprinkles({
    paddingY: '8',
    paddingX: '8',
    color: 'textSecondary',
    width: 'full',
  }),
  {
    lineHeight: '20px',
  },
])

export const Separator = style([
  sprinkles({
    height: '0',
    marginX: '16',
  }),
  {
    borderTop: 'solid',
    borderColor: themeVars.colors.backgroundOutline,
    borderWidth: '1px',
  },
])

export const IconRow = style([
  sprinkles({
    paddingX: '16',
    justifyContent: { sm: 'center', md: 'flex-start' },
  }),
])

const baseMenuItem = style([
  subhead,
  sprinkles({
    paddingY: '16',
    paddingX: '16',
    marginY: '4',
    borderRadius: '12',
    transition: '250',
    height: 'min',
    width: 'full',
    textAlign: 'center',
  }),
  {
    lineHeight: '24px',
    textDecoration: 'none',
    ':hover': {
      background: 'none',
    },
  },
])

export const menuItem = style([
  baseMenuItem,
  sprinkles({
    color: 'textSecondary',
  }),
])

export const activeMenuItem = style([
  baseMenuItem,
  sprinkles({
    color: 'textPrimary',
    background: 'backgroundFloating',
  }),
])
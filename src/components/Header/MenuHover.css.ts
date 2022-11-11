import { style } from '@vanilla-extract/css'

import { sprinkles, vars } from 'theme/spinkles.css'

export const MenuHoverA = style([
  sprinkles({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '10',
    borderRadius: '12',
    transition: '250',
  }),
  {
    ':hover': {
      background: vars.color.modalBackdrop,
    },
    zIndex: 1,
  },
])

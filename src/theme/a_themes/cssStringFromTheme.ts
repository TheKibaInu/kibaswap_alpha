import { cssObjectFromTheme } from './cssObjectFromTheme'
import { Theme22 } from 'theme/spinkles.css'

export function cssStringFromTheme(theme: Theme22 | (() => Theme22), options: { extends?: Theme22 | (() => Theme22) } = {}) {
  return Object.entries(cssObjectFromTheme(theme, options))
    .map(([key, value]) => `${key}:${value};`)
    .join('')
}

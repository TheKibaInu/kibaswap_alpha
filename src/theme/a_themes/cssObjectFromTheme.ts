import { assignInlineVars } from '@vanilla-extract/dynamic'

import { Theme22, themeVars } from 'theme/spinkles.css'

const resolveTheme = (theme: Theme22 | (() => Theme22)) => (typeof theme === 'function' ? theme() : theme)

export function cssObjectFromTheme(
  theme: Theme22 | (() => Theme22),
  { extends: baseTheme }: { extends?: Theme22 | (() => Theme22) } = {}
) {
  const resolvedThemeVars = {
    ...assignInlineVars(themeVars, resolveTheme(theme)),
  }

  if (!baseTheme) {
    return resolvedThemeVars
  }

  const resolvedBaseThemeVars = assignInlineVars(themeVars, resolveTheme(baseTheme))

  const filteredVars = Object.fromEntries(
    Object.entries(resolvedThemeVars).filter(([varName, value]) => value !== resolvedBaseThemeVars[varName])
  )

  return filteredVars
}

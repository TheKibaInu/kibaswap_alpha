import React, { useMemo } from 'react'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled, {
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
} from 'styled-components/macro'

import { cssStringFromTheme } from './a_themes/cssStringFromTheme'
import { darkTheme22} from './a_themes/a_darktheme'
import { lightTheme22 } from './a_themes/a_lighttheme'
import { Acolors as ColorsPalette, colorsDark, colorsLight } from './colors'
import { opacify } from './utils'

import { AllColors, Colors, ThemeColors } from './styled'
import { useIsDarkMode } from '../state/user/hooks'

export * from './components'

type TextProps = Omit<TextPropsOriginal, 'css'>


export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
}

 const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ; (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

function uniswapThemeColors(darkMode: boolean): ThemeColors {
  return {
    userThemeColor: darkMode ? colorsDark.userThemeColor : colorsLight.userThemeColor,

    backgroundBackdrop: darkMode ? colorsDark.backgroundBackdrop : colorsLight.backgroundBackdrop,
    backgroundSurface: darkMode ? colorsDark.backgroundSurface : colorsLight.backgroundSurface,
    backgroundModule: darkMode ? colorsDark.backgroundModule : colorsLight.backgroundModule,
    backgroundFloating: darkMode ? colorsDark.backgroundFloating : colorsLight.backgroundFloating,
    backgroundInteractive: darkMode ? colorsDark.backgroundInteractive : colorsLight.backgroundInteractive,
    backgroundOutline: darkMode ? colorsDark.backgroundOutline : colorsLight.backgroundOutline,
    backgroundScrim: darkMode ? colorsDark.backgroundScrim : colorsLight.backgroundScrim,

    textPrimary: darkMode ? colorsDark.textPrimary : colorsLight.textPrimary,
    textSecondary: darkMode ? colorsDark.textSecondary : colorsLight.textSecondary,
    textTertiary: darkMode ? colorsDark.textTertiary : colorsLight.textTertiary,

    accentAction: darkMode ? colorsDark.accentAction : colorsLight.accentAction,
    accentActive: darkMode ? colorsDark.accentActive : colorsLight.accentActive,
    accentSuccess: darkMode ? colorsDark.accentSuccess : colorsLight.accentSuccess,
    accentWarning: darkMode ? colorsDark.accentWarning : colorsLight.accentWarning,
    accentFailure: darkMode ? colorsDark.accentFailure : colorsLight.accentFailure,
    accentCritical: darkMode ? colorsDark.accentCritical : colorsLight.accentCritical,

    accentActionSoft: darkMode ? colorsDark.accentActionSoft : colorsLight.accentActionSoft,
    accentActiveSoft: darkMode ? colorsDark.accentActiveSoft : colorsLight.accentActiveSoft,
    accentSuccessSoft: darkMode ? colorsDark.accentSuccessSoft : colorsLight.accentSuccessSoft,
    accentWarningSoft: darkMode ? colorsDark.accentWarningSoft : colorsLight.accentWarningSoft,
    accentFailureSoft: darkMode ? colorsDark.accentFailureSoft : colorsLight.accentFailureSoft,

    accentTextDarkPrimary: darkMode ? colorsDark.accentTextDarkPrimary : colorsLight.accentTextDarkPrimary,
    accentTextDarkSecondary: darkMode ? colorsDark.accentTextDarkSecondary : colorsLight.accentTextDarkSecondary,
    accentTextDarkTertiary: darkMode ? colorsDark.accentTextDarkTertiary : colorsLight.accentTextDarkTertiary,

    accentTextLightPrimary: darkMode ? colorsDark.accentTextLightPrimary : colorsLight.accentTextLightPrimary,
    accentTextLightSecondary: darkMode ? colorsDark.accentTextLightSecondary : colorsLight.accentTextLightSecondary,
    accentTextLightTertiary: darkMode ? colorsDark.accentTextLightTertiary : colorsLight.accentTextLightTertiary,

    white: ColorsPalette.white,
    black: ColorsPalette.black,

    // chain colors are same for light/dark mode
    chain_1: colorsDark.chain_1,
    chain_3: colorsDark.chain_3,
    chain_4: colorsDark.chain_4,
    chain_5: colorsDark.chain_5,
    chain_10: colorsDark.chain_10,
    chain_137: colorsDark.chain_137,
    chain_42: colorsDark.chain_42,
    chain_420: colorsDark.chain_420,
    chain_42161: colorsDark.chain_42161,
    chain_421611: colorsDark.chain_421611,
    chain_80001: colorsDark.chain_80001,

    shallowShadow: darkMode ? colorsDark.shallowShadow : colorsLight.shallowShadow,
    deepShadow: darkMode ? colorsDark.deepShadow : colorsLight.deepShadow,
    hoverState: opacify(24, ColorsPalette.blue200),
    hoverDefault: opacify(8, ColorsPalette.gray200),
    stateOverlayHover: darkMode ? colorsDark.stateOverlayHover : colorsLight.stateOverlayHover,
    stateOverlayPressed: darkMode ? colorsDark.stateOverlayPressed : colorsLight.stateOverlayPressed,
  }
}



function KibaColors(darkMode: boolean): Colors {
  return {
    darkMode,
    // base
    white,
    black,

    // text
    text1: darkMode ? '#fff' : '#0e121c',
    text2: darkMode ? '#fff' : '#565A69',
    text3: darkMode ? '#fff' : '#6E727D',
    text4: darkMode ? '#fff' : '#18181E',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',
    textPrimary: darkMode ? '#fff' : '#18181E',
    textSecondary: darkMode ? '#fff' : '#565A69',


    // backgrounds / greys
    bg0: darkMode ? '#252632' : '#f5f5f5',
    bg1: darkMode ? '#18181E' : '#f5f5f5',
    bg2: darkMode ? '#F76C1D' : '#eee',
    bg3: darkMode ? '#40444F' : '#fff',
    bg4: darkMode ? '#848484' : '#fff',
    bg5: darkMode ? '#4F4F62' : '#fff',
    bg6: darkMode ? '#30313D' : 'rgba(255,255,255,0.8)',
    bgSwapHeader: darkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.08)',
    bgmenu: darkMode ? '#F76C1D' : '#fff',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    andyBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.1)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#ea3627' : '#73b588',
    primary2: darkMode ? '#222' : '#c11d20',
    primary3: darkMode ? '#eee' : '#d9dc51',
    primary4: darkMode ? 'rgb(170, 64, 88)' : '#F6DDE8',
    primary5: darkMode ? '#FFF' : '#5288F4',

    // color text
    primaryText1: darkMode ? '#252632' : '#FFFFFF',

    // secondary colors
    secondary1: darkMode ? '#2172E5' : '#00203d',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#5288F4',

    // other
    red1: darkMode ? '#FF4343' : '#DA2D2B',
    red2: darkMode ? '#971B1C' : '#DF1F38',
    red3: '#D60000',
    green1: darkMode ? '#27AE60' : '#007D35',
    yellow1: '#E3A507',
    yellow2: '#FF8F00',
    yellow3: '#F3B71E',
    blue1: darkMode ? '#252632' : '#0068FC',
    blue2: darkMode ? '#5199FF' : '#0068FC',
    error: darkMode ? '#FD4040' : '#DF1F38',
    success: darkMode ? '#779681' : '#779681',
    warning: '#971B1C',

    // dont wanna forget these blue yet

    // uncomment below to make the background change on select of tokens
    //blue4: darkMode ? 'linear-gradient(to right, var(--color-output), var(--color-input))' : 'linear-gradient(-45deg, #B9CEF7, #F6FAF9)',
    blue4: darkMode ? 'linear-gradient(-45deg, #8D95AB, #0B0D12)' : 'linear-gradient(-45deg, #B9CEF7, #F6FAF9)',

    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',

    // interactive
    backgroundInteractive: darkMode ? '#293249' : '#E8ECFB',


  }
}

function theme(darkMode: boolean): DefaultTheme {
  return {
    ...uniswapThemeColors(darkMode),
    ...KibaColors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',
    chartTableBg: darkMode ? 'linear-gradient(rgb(35 40 55),rgb(17 19 32))' : 'linear-gradient(white, rgb(255 255 255))',
    chartSidebar: darkMode ? 'linear-gradient(rgb(27 31 42),rgb(17 19 32))' : 'linear-gradient(#f5f5f5,rgb(255 255 255))',

    chartBgLight: '#f5f5f5',
    chartBgDark: 'linear-gradient(rgb(35 40 55),rgb(17 19 32))',
    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}



const TextWrapper = styled(Text) <{ link?: boolean, font?: string, color: keyof Colors }>`
  color: ${props => ((props as any).theme[props?.color])};
  font-family: ${props => props.font ? props.font : 'inherit'};
  ${props => Boolean(props.link) && `&:hover {
    color: ${props.theme.blue2};
    transition: all ease in 0.1s;
  }`}
  `

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper style={{ cursor: 'pointer' }} link={true} fontWeight={500} color={'primary1'} {...props} />
  },
  label(props: TextProps) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper font={'"Poppins";'} fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} color={'text1'} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow3'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  },
}

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg1} !important;
}

a {
 color: ${({ theme }) => theme.blue1}; 
}

:root {
  ${({ theme }) => (theme.darkMode ? cssStringFromTheme(darkTheme22) : cssStringFromTheme(lightTheme22))}
}
`

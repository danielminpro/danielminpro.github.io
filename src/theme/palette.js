// SETUP COLORS

import { alpha, darken, lighten, rgbToHex } from '../utils/colorManipulate'

const GREY = {
  0: '#FFFFFF',
  100: '#FAFAFA', // White
  200: '#F2F2F2',
  300: '#D9D9D9', // Light Grey
  400: '#BFBFBF',
  500: '#8C8C8C',
  600: '#666666',
  700: '#404040', // Dark Grey
  800: '#262626',
  900: '#1a1a1a', // Black
}

const getColorPalette = (mainColor, contrastText) => ({
  lighter: rgbToHex(lighten(mainColor, 0.4)).toUpperCase(),
  light: rgbToHex(lighten(mainColor, 0.2)).toUpperCase(),
  main: mainColor,
  dark: rgbToHex(darken(mainColor, 0.2)).toUpperCase(),
  darker: rgbToHex(darken(mainColor, 0.4)).toUpperCase(),
  contrastText,
})

const PRIMARY = getColorPalette('#dbef52', GREY[700])
const SECONDARY = getColorPalette('#efbd52', GREY[100])
const INFO = getColorPalette('#52efe5', GREY[100])
const SUCCESS = getColorPalette('#b2ef52', GREY[100])
const WARNING = getColorPalette('#ef7352', GREY[700])
const ERROR = getColorPalette('#ef5252', GREY[100])
const FEATURE = getColorPalette('#d352ef', GREY[100])

const COMMON = {
  common: { black: '#000000', white: '#FFFFFF' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  feature: FEATURE,
  grey: GREY,
  divider: INFO.main,
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
}

export default function palette(themeMode) {
  // 'light' | 'dark'
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[700],
      neutral: GREY[500], // alpha(GREY[500], 0.16),
      disabled: alpha(GREY[700], 0.5),
      hover: '#ef5252',
    },
    background: { paper: GREY[0], default: GREY[100], neutral: GREY[300], card: { primary: GREY[200], secondary: GREY[300] } },
    action: {
      ...COMMON.action,
      active: INFO.main,
    },
  }

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: GREY[100],
      secondary: GREY[300],
      neutral: GREY[600], // alpha(GREY[600], 0.16),
      disabled: GREY[500],
      hover: '#b2ef52',
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: GREY[500], //alpha(GREY[500], 0.16),
      card: {
        primary: '#0a0a0a',
        secondary: GREY[800],
      },
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  }

  return themeMode === 'light' ? light : dark
}

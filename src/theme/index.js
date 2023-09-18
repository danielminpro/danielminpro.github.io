import palette from './palette'
import typography from './typography'

export const theme = (themeMode) => ({
  palette: palette(themeMode),
  typography,
})

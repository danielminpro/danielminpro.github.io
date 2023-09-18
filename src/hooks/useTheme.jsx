import palette from '../theme/palette'
import typography from '../theme/typography'
import { useMemo } from 'react'
import { useThemeSetting } from '../contexts/theme'

export const useTheme = () => {
  const themeSetting = useThemeSetting()

  const theme = useMemo(
    () => ({
      palette: palette(themeSetting.themeMode),
      typography,
    }),
    [themeSetting.themeMode]
  )

  return theme
}

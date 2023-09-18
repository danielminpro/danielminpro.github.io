import { createContext, useContext, useMemo, useState } from 'react'

export const ThemeContext = createContext({
  themeMode: 'dark',
  isDarkTheme: true,
  toggleTheme: () => {},
  applyTheme: (mode) => {},
})

export function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const themeMode = useMemo(() => (isDarkTheme ? 'dark' : 'light'), [isDarkTheme])
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme)
  const applyTheme = (mode) => setIsDarkTheme(mode === 'dark')
  return <ThemeContext.Provider value={{ isDarkTheme, themeMode, toggleTheme, applyTheme }}>{children}</ThemeContext.Provider>
}

export const useThemeSetting = () => useContext(ThemeContext)

import React from 'react'

export const defaultAppTheme = {
  maxWidth: 1200
}

export type AppTheme = typeof defaultAppTheme

const AppThemeContext = React.createContext(defaultAppTheme)

export default AppThemeContext
"use client"

import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { ServicesModeProvider } from './ServicesModeProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ServicesModeProvider>
      <ThemeProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </ThemeProvider>
    </ServicesModeProvider>
  )
}

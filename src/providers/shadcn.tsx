'use client'
import { ThemeProvider } from 'next-themes'

type ShadcnProviderProps = {
  children: React.ReactNode
}

export function ShadcnProvider({ children }: ShadcnProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}

import { ReactNode } from 'react'


import { UserContextProvider } from './UserContext'
import { SchoolContextProvider } from './AlunosContext'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserContextProvider>
      <SchoolContextProvider>{children}</SchoolContextProvider>
    </UserContextProvider>
  )
}
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import api from '../services/api'

export const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await api.get('/check-auth', { withCredentials: true, })
        const { role } = response.data

        if (response.status === 200 && role === 'admin' || role === 'prof') {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setIsAuthenticated(false)
      }
    }

    checkAuthentication()
  }, [])

  if (isAuthenticated === null) {
    return <div>Carregando...</div> // Mostra um loading enquanto verifica
  }

  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace /> // Corrigido para "/login"
  )
}

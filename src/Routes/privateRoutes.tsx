
import { Navigate, Outlet } from 'react-router-dom'
import { decodeToken } from '@/utils/DecodeToken'

export const PrivateRoutes = () => {

  const token = localStorage.getItem(
    'emam:userData1.0',
  )

  const dataUser = decodeToken(token)

  return token !== null && (dataUser?.role === 'prof' || dataUser?.role === 'admin') ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/admin" replace /> // Corrigido para "/login"
  )
}

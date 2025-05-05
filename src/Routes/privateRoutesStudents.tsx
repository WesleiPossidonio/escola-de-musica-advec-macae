
import { decodeToken } from '@/utils/DecodeToken'
import { Navigate, Outlet } from 'react-router-dom'


export const PrivateRoutesStudents = () => {
  const token = localStorage.getItem(
    'emam:userData1.0',
  )

  const dataUser = decodeToken(token)
  return token !== null && dataUser?.role === 'students' ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login-estudante" replace /> // Corrigido para "/login"
  )
}

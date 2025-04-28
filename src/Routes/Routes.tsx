import { Routes, Route } from 'react-router-dom'

import {
  Baixo,
  Bateria,
  Canto,
  Dashboard,
  DashboardStudents,
  Guitarra,
  Home,
  Login,
  Pandeiro,
  StudentsLogin,
  Teclado
} from '@/Pages'

import { RegisterProf } from '@/Pages/RegisterProf'
import { PrivateRoutes } from './privateRoutes'
import { PrivateRoutesStudents } from './privateRoutesStudents'

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/admin' element={<Login />} />
      <Route path='/bateria' element={<Bateria />} />
      <Route path='/guitarra' element={<Guitarra />} />
      <Route path='/teclado' element={<Teclado />} />
      <Route path='/baixo' element={<Baixo />} />
      <Route path='/canto' element={<Canto />} />
      <Route path='/pandeiro' element={<Pandeiro />} />
      <Route path='/cadastro-professor' element={<RegisterProf />} />
      <Route path='/login-estudante' element={<StudentsLogin />} />

      <Route path="/dashboard" element={<PrivateRoutes />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="/portal-aluno" element={<PrivateRoutesStudents />}>
        <Route index element={<DashboardStudents />} />
      </Route>
    </Routes>
  )
}
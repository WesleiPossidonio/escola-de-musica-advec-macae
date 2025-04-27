import { useNavigate } from "react-router-dom"

export const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="flex justify-around items-center p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold">EMAM Music</h1>
      <nav className="space-x-6">
        <a href="#about" className="hover:text-gray-600">Sobre Nós</a>
        <a href="#pricing" className="hover:text-gray-600">Aulas</a>
        <a className="hover:text-gray-600 cursor-pointer" onClick={() => navigate('/login-estudante')}>Portal Aluno</a>
      </nav>
    </header>
  )
}


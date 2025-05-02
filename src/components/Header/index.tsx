import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react" // Ícones para abrir/fechar o menu

export const Header = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  // Função para navegação e manipulação de âncoras
  const handleNavigate = (path: string) => {
    if (path.startsWith('#')) {
      if (window.location.pathname !== '/') {
        navigate(`/${path}`) // ex: navegando para /#about
      } else {
        window.location.hash = path // ex: #about
      }
    } else {
      navigate(path) // rotas como /login-estudante ou /admin
    }

    if (menuOpen) toggleMenu()
  }

  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => handleNavigate('/')}>EMAM Music</h1>

        <nav className="hidden md:flex space-x-6">
          <a className="hover:text-gray-600 cursor-pointer" onClick={() => handleNavigate('#about')}>Sobre Nós</a>
          <a className="hover:text-gray-600 cursor-pointer" onClick={() => handleNavigate('#pricing')} >Aulas</a>
          <button
            onClick={() => handleNavigate('/login-estudante')}
            className="hover:text-gray-600"
          >
            Portal Aluno
          </button>
          <button
            onClick={() => handleNavigate('/admin')}
            className="hover:text-gray-600"
          >
            Admin
          </button>
        </nav>

        {/* Ícone para menu mobile */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col items-center space-y-4">
          <a href="#about" onClick={toggleMenu} className="hover:text-gray-600">Sobre Nós</a>
          <a href="#pricing" onClick={toggleMenu} className="hover:text-gray-600">Aulas</a>
          <button
            onClick={() => {
              toggleMenu()
              handleNavigate('/login-estudante')
            }}
            className="hover:text-gray-600"
          >
            Portal Aluno
          </button>

          <button
            onClick={() => {
              toggleMenu()
              handleNavigate('/admin')
            }}
            className="hover:text-gray-600"
          >
            Admin
          </button>
        </nav>
      )}
    </header>
  )
}

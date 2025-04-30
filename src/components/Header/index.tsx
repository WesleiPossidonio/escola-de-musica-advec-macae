import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react" // Ícones para abrir/fechar o menu

export const Header = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">EMAM Music</h1>

        {/* Menu para telas grandes */}
        <nav className="hidden md:flex space-x-6">
          <a href="#about" className="hover:text-gray-600">Sobre Nós</a>
          <a href="#pricing" className="hover:text-gray-600">Aulas</a>
          <button
            onClick={() => navigate('/login-estudante')}
            className="hover:text-gray-600"
          >
            Portal Aluno
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
              navigate('/login-estudante')
            }}
            className="hover:text-gray-600"
          >
            Portal Aluno
          </button>
        </nav>
      )}
    </header>
  )
}

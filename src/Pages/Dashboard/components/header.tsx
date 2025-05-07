
import { useUser } from '@/hooks/userUser'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

// interface HeaderProps {
//   setHeaderLink: (data: string) => void
// }

interface HeaderProps {
  setHeaderLink: (data: string) => void
}

export const Header = ({ setHeaderLink }: HeaderProps) => {
  const { userDataLogin } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header className='w-full flex flex-col md:flex-row items-center justify-between pl-8 pr-5'>
      <div className='w-full flex items-center justify-between'>
        <p className='text-sm'>
          Olá <span className='font-semibold'>{userDataLogin.name}
          </span> | <span>Sair</span>
        </p>

        {/* Ícone para menu mobile */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>


      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col items-center space-y-4">
          <a href="#about" onClick={() => setHeaderLink('meus-alunos')} className="hover:text-gray-600">Escola</a>
          <a href="#pricing" onClick={() => setHeaderLink('adicionar-horario')} className="hover:text-gray-600">Horario</a>
        </nav>
      )}
    </header>
  )
}



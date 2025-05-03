
import { useUser } from '@/hooks/userUser'
import { Book, Menu, User, X } from 'lucide-react';
import { createElement, useState } from 'react';

interface HeaderProps {
  setHeaderLink: (data: string) => void
}

export const Header = ({ setHeaderLink }: HeaderProps) => {
  const menus = [
    { name: "Escola", section: "meus-alunos", icon: User },
    { name: "Horários", section: "adicionar-horario", icon: Book },
  ]

  const [menuOpen, setMenuOpen] = useState(false)

  const { userDataLogin } = useUser()

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const handleSelectedMenu = (data: string) => {
    setHeaderLink(data)
  }

  return (
    <header className='w-full flex flex-col md:flex-row items-center justify-between pl-8 pr-5'>
      <div className='w-full flex items-center justify-between'>
        <p className='text-sm'>
          Olá <span className='font-semibold'>{userDataLogin.name}
          </span> | <span>Sair</span>
        </p>

        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col items-center space-y-1">
          {
            menus.map((menu, index) => {
              return (
                <div key={index} onClick={() => handleSelectedMenu(menu.section)} className="flex items-center gap-2 text-xl px-4 py-2
                  hover:bg-neutral-100 cursor-pointer font-semibold">
                  <div>{createElement(menu?.icon, { size: "20" })}</div>
                  <h2 onClick={toggleMenu} className="hover:text-gray-600">{menu.name}</h2>
                </div>
              )
            }
            )}
        </nav>
      )}
    </header>
  )
}



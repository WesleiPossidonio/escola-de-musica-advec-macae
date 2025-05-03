
import { useUser } from '@/hooks/userUser'

// interface HeaderProps {
//   setHeaderLink: (data: string) => void
// }

export const Header = () => {
  const { userDataLogin } = useUser()

  return (
    <header className='w-full flex flex-col md:flex-row items-center justify-between pl-8 pr-5'>
      <div className='w-full flex items-center justify-between'>
        <p className='text-sm'>
          Olá <span className='font-semibold'>{userDataLogin.name}
          </span> | <span>Sair</span>
        </p>
      </div>
    </header>
  )
}



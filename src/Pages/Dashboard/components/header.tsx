import { Input } from '@/components/ui/input'
import { useUser } from '@/hooks/userUser'

export const Header = () => {
  const { userDataLogin } = useUser()
  return (
    <header className='w-full flex items-center justify-between pl-8 pr-5'>
      <Input className='w-1/3'></Input>
      <div>
        <p className='text-sm'>
          Olá <span className='font-semibold'>{userDataLogin.name}
          </span> | <span>Sair</span>
        </p>
      </div>
    </header>
  )
}



import * as zod from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@/hooks/userUser'

const confirmOrderLoginValidationSchema = zod.object({
  email: zod.string().email('Informe o seu email'),
  password: zod.string().min(4, 'Informe a Senha'),
})

export type OrderData = zod.infer<typeof confirmOrderLoginValidationSchema>

type ConfirmOrderFormLoginData = OrderData

export const Login = () => {

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<ConfirmOrderFormLoginData>({
    resolver: zodResolver(confirmOrderLoginValidationSchema),
  })

  const { handleLoginUser } = useUser()

  const handleLogin = (data: ConfirmOrderFormLoginData) => {
    const { email, password } = data
    const dataLogin = {
      email,
      password,
      typeSessions: "prof"
    }
    handleLoginUser(dataLogin)
    reset()
  }

  return (
    <main className='w-full h-dvh flex items-center justify-center'>

      <form className='w-1/2 h-90 flex flex-col items-center 
        justify-center space-y-2.5 p-8 border border-neutral-400 shadow-xl rounded-lg' onSubmit={handleSubmit(handleLogin)}>
        <div className='mb-8 text-center'>
          <h1 className="text-2xl font-bold">ADVEC Music</h1>
        </div>
        <Input className='h-10 ' type='text' placeholder='Email' {...register('email')} />
        <Input className='h-10' type='text' placeholder='Senha'{...register('password')} />
        <div className='w-full flex items-center justify-between'>
          <p className='text-sm text-neutral-600'>
            Esqueci a Senha? <span className='font-semibold'>Click Aqui</span>
          </p>

          <p className='text-sm text-neutral-600'>
            Cadastrar Usuário?
          </p>

        </div>
        <Button className='h-10 w-28 text-md self-start mt-2'>Entrar</Button>
      </form>
    </main>
  )
}



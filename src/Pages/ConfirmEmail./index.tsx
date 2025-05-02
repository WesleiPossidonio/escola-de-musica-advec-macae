import * as zod from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@/hooks/userUser'
import { useNavigate } from 'react-router-dom'

const confirmOrderLoginValidationSchema = zod.object({
  email: zod.string().email('Informe o seu email'),
})

export type OrderPasswordData = zod.infer<typeof confirmOrderLoginValidationSchema>

type ConfirmOrderPasswordFormLoginData = OrderPasswordData

export const ConfirmEmail = () => {

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<ConfirmOrderPasswordFormLoginData>({
    resolver: zodResolver(confirmOrderLoginValidationSchema),
  })

  const { confirmMail } = useUser()
  const navigate = useNavigate()

  const handleConfirmEmail = (data: ConfirmOrderPasswordFormLoginData) => {
    const { email } = data
    confirmMail({ email })
    reset()
  }

  return (
    <main className='w-full h-dvh flex items-center justify-center p-5'>

      <form className='w-full md:w-1/2 h-90 flex flex-col items-center 
        justify-center space-y-2.5 p-8 border border-neutral-400 shadow-xl rounded-lg' onSubmit={handleSubmit(handleConfirmEmail)}>
        <p className='self-end text-sm font-semibold cursor-pointer' onClick={() => navigate('/')}>Voltar a Home</p>
        <div className='mb-8 text-center'>
          <h1 className="text-2xl font-bold">Emam Music - Atualizar Senha</h1>
        </div>
        <Input className='h-10 ' type='text' placeholder='Email' {...register('email')} />
        <Button className='h-10 w-28 text-md self-start mt-2'>Enviar</Button>
      </form>
    </main>
  )
}



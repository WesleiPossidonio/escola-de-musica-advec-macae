import * as zod from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@/hooks/userUser'
import { useNavigate } from 'react-router-dom'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'

const confirmOrderLoginValidationSchema = zod.object({
  password: zod.string().min(6, 'Informe a Senha'),
  confirmPassword: zod.string().min(6, 'Confirme a Senha'),
  updateNumber: zod.string().min(6, 'Informe o numero de verificação').max(6, 'Informe o numero de verificação')
})

export type OrderEmailData = zod.infer<typeof confirmOrderLoginValidationSchema>

type ConfirmEmailOrderFormLoginData = OrderEmailData

export const UpdatePassowrd = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm<ConfirmEmailOrderFormLoginData>({
    resolver: zodResolver(confirmOrderLoginValidationSchema),
  })

  const { updatePassword } = useUser()
  const navigate = useNavigate()

  const handleUpdatePassword = (data: ConfirmEmailOrderFormLoginData) => {
    updatePassword(data)
    reset()
  }

  return (
    <main className='w-full h-dvh flex items-center justify-center p-5'>
      <form
        className='w-full md:w-1/2 h-90 flex flex-col items-center justify-center space-y-2.5 p-8 border border-neutral-400 shadow-xl rounded-lg'
        onSubmit={handleSubmit(handleUpdatePassword)}
      >
        <p className='self-end text-sm font-semibold cursor-pointer' onClick={() => navigate('/')}>Voltar a Home</p>
        <div className='mb-8 text-center'>
          <h1 className="text-2xl font-bold">Emam Music - Atualizar Senha</h1>
        </div>
        <InputOTP
          maxLength={6}
          value={String(watch('updateNumber') || '')}
          onChange={(newValue) => setValue('updateNumber', newValue, { shouldValidate: true })}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Input className='h-10' type='text' placeholder='Digite nova senha' {...register('confirmPassword')} />
        <Button className='h-10 w-28 text-md self-start mt-2'>Enviar</Button>
      </form>
    </main>
  )
}



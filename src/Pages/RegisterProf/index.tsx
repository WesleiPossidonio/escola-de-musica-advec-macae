import * as zod from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStudentsData } from '@/hooks/useStudents'
import { useState } from 'react'

const confirmOrderLoginValidationSchema = zod.object({
  name: zod.string().min(3, 'Informe o nome do usuário'),
  password: zod.string().min(4, 'Informe a Senha'),
  email: zod.string().email('Digite o seu email'),
  telefone_contato: zod.string().min(11, 'Informe o Numero de telefone'),
  instrumento_musical1: zod.string().min(4, 'Informe o seu Instrumento'),
  instrumento_musical2: zod.string().min(4, 'Informe o seu Instrumento').optional(),
})

export type OrderData = zod.infer<typeof confirmOrderLoginValidationSchema>

type ConfirmOrderFormRegisterData = OrderData

export const RegisterProf = () => {

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<ConfirmOrderFormRegisterData>({
    resolver: zodResolver(confirmOrderLoginValidationSchema),
  })

  const [music, setMusic] = useState('Não')

  const { handleCreateProf } = useStudentsData()

  const handleRegisterProf = (data: ConfirmOrderFormRegisterData) => {
    handleCreateProf(data)
    reset()
  }

  return (
    <main className='w-full h-dvh flex items-center justify-center'>

      <form className=' w-[90%] md:w-1/2 h-auto min-h-90 flex flex-col items-center 
        justify-center space-y-4 p-8 border border-neutral-400 shadow-xl rounded-lg' onSubmit={handleSubmit(handleRegisterProf)}>
        <div className='mb-8 text-center'>
          <h1 className="text-2xl font-bold">Emam Music <br /> Cadastro Professor </h1>
        </div>
        <Input className='h-10 bg-neutral-100 p-4' type='text' placeholder='Nome' {...register('name')} />
        <Input className='h-10 bg-neutral-100 p-4' type='text' placeholder='Senha'{...register('password')} />
        <Input className='h-10 bg-neutral-100 p-4' type='text' placeholder='email'{...register('email')} />
        <Input className='h-10 bg-neutral-100 p-4' type='text' placeholder='Telefone'{...register('telefone_contato')} />
        <Input className='h-10 bg-neutral-100 p-4' type='text' placeholder='Selecione o seu instrumento Musical'{...register('instrumento_musical1')} />

        <div className='self-start mb-4' onChange={(data) => setMusic((data.target as HTMLInputElement).value)}>
          <p className='text-neutral-800'>Vai adicionar mais um Instrumento ?</p>
          <label className='flex items-center justidy-start gap-4' htmlFor="radio" >
            <div className='flex items-center justify-start gap-2'>
              <input type="radio" value='Sim' name='inscricao-efetuada' />
              <p className='text-neutral-600'>Sim</p>
            </div>
            <div className='flex items-center justify-start gap-2'>
              <input type="radio" value='Não' name='inscricao-efetuada' />
              <p className='text-neutral-600'>Não</p>
            </div>
          </label>
        </div>
        {
          music === 'Sim' &&
          <Input className='h-10 bg-neutral-100 p-4' type='text' placeholder='Selecione o seu Segundo instrumento Musical'{...register('instrumento_musical2')} />
        }
        <Button className='h-10 w-28 text-md self-start mt-2'>Enviar</Button>
      </form>
    </main>
  )
}



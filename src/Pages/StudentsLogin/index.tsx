import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as zod from 'zod'

import ImageBanner from '@/assets/ImageHeroThree.jpg'
import { useUser } from "@/hooks/userUser"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ReCAPTCHA from "react-google-recaptcha"
import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const confirmOrderLoginValidationSchema = zod.object({
  email: zod.string().email('Informe o seu email'),
  password: zod.string().min(4, 'Informe a Senha'),
})

export type OrderData = zod.infer<typeof confirmOrderLoginValidationSchema>

type ConfirmOrderFormLoginData = OrderData

export const StudentsLogin = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<ConfirmOrderFormLoginData>({
    resolver: zodResolver(confirmOrderLoginValidationSchema),
  })

  const [captcha, setCaptcha] = useState<string | null>('')
  const { handleLoginUser } = useUser()

  const navigate = useNavigate()

  const handleCapcha = (token: string | null) => {
    setCaptcha(token)
  }

  const handleLogin = (data: ConfirmOrderFormLoginData) => {
    if (!captcha) {
      toast.error('Captcha pendente!', {
        position: 'top-right',
      })
      return
    }
    handleLoginUser(data)
    reset()
  }

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="w-full h-svh flex items-center justify-center relative">

        <p className="absolute top-10 left-4 font-semibold">Emam Music</p>
        <div className="w-3/4 md:w-1/2 space-y-5">

          <h1 className="text-3xl font-semibold text-center">Login</h1>
          <form action="" className="space-y-4 p-4 md:p-8" onSubmit={handleSubmit(handleLogin)}>
            <Input className="md:p-5" type="text" placeholder="Email" {...register('email')} />
            <Input className="md:p-5" type="password" placeholder="Senha" {...register('password')} />
            <div id="self-start sm:w-[80%]">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
                onChange={handleCapcha}
              />
            </div>

            <Button className="w-32 h-10 text-md">Entrar</Button>

            <div>
              <p className="text-sm">
                Esqueci senha ? {' '}
                <span className="font-semibold cursor-pointer hover:text-black transition ease-in duration-200" onClick={() => navigate('confirmar-email')}>
                  Clique Aqui!
                </span>
              </p>
              <p></p>
            </div>
          </form>
        </div>

        <img className=" w-1/4 md:w-1/2 h-full object-cover" src={ImageBanner} alt="" />
      </div>
    </main>
  )
}



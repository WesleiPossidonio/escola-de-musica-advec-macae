import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as zod from 'zod'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStudentsData } from "@/hooks/useStudents";
import { useUser } from "@/hooks/userUser";


const MAX_FILE_SIZE = 1200 * 1024 * 1024;
const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/avi']; // Tipos aceitos

const formValidationSchema = zod.object({
  url_pdf: zod
    .any()
    .refine((files) => files && files.length > 0, "O Comprovante é Obrigatório") // Verifica se algum arquivo foi selecionado
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "O tamanho maximo do arquivo é 1200MB.") // Verifica o tamanho do primeiro arquivo
    .refine((files) => ACCEPTED_VIDEO_TYPES.includes(files[0]?.type), "O arqui tem que ser .pdf ou .jpeg ou .png"), // Verifica o tipo do arquivo
  mes_referencia: zod.string().min(4, 'Selecione o Mês'),
})


type OrderPaymentFormData = zod.infer<typeof formValidationSchema>

export const PaymentSection = () => {
  const {
    control,
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<OrderPaymentFormData>({
    resolver: zodResolver(formValidationSchema),
  })

  const [textToCopy, setTextToCopy] = useState(false)
  const textPix = 'fdb89185-cc11-45bb-9df2-884d05a5de23'

  const { handleCreatePayment } = useStudentsData()
  const { userDataLogin } = useUser()

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(textPix);
      setTextToCopy(true);
      setTimeout(() => setTextToCopy(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar: ', err);
    }
  };

  const handlePayment = (data: OrderPaymentFormData) => {
    const { mes_referencia, url_pdf } = data
    const paiment = {
      mes_referencia,
      url_pdf,
      id_alunos: userDataLogin.id
    };

    handleCreatePayment(paiment);
    reset();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 p-8">
      <p className="text-black text-3xl">Pagamento</p>
      <Button className="  bg-black h-12 w-58" onClick={copyText}>
        {textToCopy ? 'Copiado!' : 'Copiar Código Pix'}
      </Button>

      <form className="space-y-4 w-full" action="" onSubmit={handleSubmit(handlePayment)}>
        <Controller
          control={control}
          name="mes_referencia"
          render={({ field }) => (
            <Select onValueChange={(value) => {
              field.onChange(value)
            }}
              value={field.value} >
              <SelectTrigger className="w-full border bg-white">
                <SelectValue className='text-white' placeholder="Adicione o Mês de Referencia" />
              </SelectTrigger>
              <SelectContent className='w-full border-none' {...register('mes_referencia')}>
                <SelectGroup className='bg-white'>
                  <SelectItem className='text-white' value='Maio'>Maio</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <Input className="text-white bg-white" type="file" placeholder="Adicione o Comprovante do pix" {...register('url_pdf')} />
      </form>
    </div>
  )
}



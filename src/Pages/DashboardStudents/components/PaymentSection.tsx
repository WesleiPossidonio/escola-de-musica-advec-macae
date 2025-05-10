import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as zod from 'zod'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStudentsData } from "@/hooks/useStudents";
import { useUser } from "@/hooks/userUser";

import ImageQrCode from '@/assets/QrcodePayment.png'

const MAX_FILE_SIZE = 1200 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const formValidationSchema = zod.object({
  url_pdf: zod
    .any()
    .refine((files) => files && files.length > 0, "O Comprovante é Obrigatório")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "O tamanho máximo do arquivo é 1200MB.")
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type), "O arquivo deve ser .pdf, .jpeg ou .png."),
  mes_referencia: zod.string().min(4, 'Selecione o Mês'),
})

type OrderPaymentFormData = zod.infer<typeof formValidationSchema>

export const PaymentSection = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderPaymentFormData>({
    resolver: zodResolver(formValidationSchema),
  })

  const [textToCopy, setTextToCopy] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null);
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
      url_pdf: url_pdf[0],
      id_alunos: userDataLogin.id
    };

    handleCreatePayment(paiment);
    reset();
    setFileName(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 md:p-8">
      <p className="text-black text-2xl md:text-3xl">Pagamento</p>

      <img className="w-60 md:w-70 rounded-3xl object-cover" src={ImageQrCode} alt="" />
      <Button className="bg-black h-12 w-58" onClick={copyText}>
        {textToCopy ? 'Copiado!' : 'Copiar Código Pix'}
      </Button>

      <form className="space-y-4 w-full" action="" onSubmit={handleSubmit(handlePayment)}>
        <Controller
          control={control}
          name="mes_referencia"
          render={({ field }) => (
            <>
              <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                <SelectTrigger className="w-full border bg-white">
                  <SelectValue className='text-white' placeholder="Adicione o Mês de Referência" />
                </SelectTrigger>
                <SelectContent className='w-full border-none' {...register('mes_referencia')}>
                  <SelectGroup className='bg-white'>
                    <SelectItem className='text-white' value='Maio'>Maio</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.mes_referencia && (
                <p className="text-red-500 text-sm mt-1">{errors.mes_referencia.message}</p>
              )}
            </>
          )}
        />

        <>
          <Input
            className="text-white bg-white"
            type="file"
            placeholder="Adicione o Comprovante do Pix"
            {...register('url_pdf')}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFileName(file.name);
              } else {
                setFileName(null);
              }
            }}
          />
          {fileName && (
            <p className="text-sm text-black mt-1">
              Arquivo selecionado: <strong>{fileName}</strong>
            </p>
          )}
          {errors.url_pdf && (
            <p className="text-red-500 text-sm mt-1">{errors.url_pdf?.message?.toString()}</p>
          )}
        </>

        <Button className='h-10 w-28 text-md self-start mt-2 bg-neutral-900 z-10' type="submit">
          Enviar
        </Button>
      </form>
    </div>
  )
}

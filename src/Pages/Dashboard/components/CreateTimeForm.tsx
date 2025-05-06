import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useUser } from "@/hooks/userUser"
import { useStudentsData } from "@/hooks/useStudents"
import { zodResolver } from "@hookform/resolvers/zod"

import { Controller, useForm } from "react-hook-form"
import * as zod from 'zod'

const confirmOrderTimeValidationSchema = zod.object({
  dia: zod.string().min(3, 'Informe o Dia da Aula'),
  horario: zod.string().min(4, 'Informe o Horário da aula'),
  turno: zod.string().min(4, 'Informe o Turno da aula'),
  quantidade_alunos: zod.string()
})

export type OrderData = zod.infer<typeof confirmOrderTimeValidationSchema>

type ConfirmOrderFormTimeData = OrderData

export const CreateTimeForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConfirmOrderFormTimeData>({
    resolver: zodResolver(confirmOrderTimeValidationSchema),
  })
  const { handleCreateTime, listDataProf } = useStudentsData()
  const { userDataLogin } = useUser()

  const profData = listDataProf.find(prof => prof.name === userDataLogin.name)

  const createTime = (data: ConfirmOrderFormTimeData) => {
    if (profData?.id) {
      const dataTime = {
        ...data, id_prof: profData.id
      }
      handleCreateTime(dataTime)
      reset()
    }
  }

  return (
    <form className="w-full space-y-3" onSubmit={handleSubmit(createTime)}>
      <p>Adicionar Horário</p>
      <Controller
        control={control}
        name="dia"
        render={({ field }) => (
          <Select onValueChange={(value) => {
            field.onChange(value)
          }}
            value={field.value} >
            <SelectTrigger className="w-full border text-black">
              <SelectValue className='text-white' placeholder="Selecione o Dia de Aula" />
            </SelectTrigger>
            <SelectContent className='w-full border-none'>
              <SelectGroup className='bg-black'>
                <SelectItem className='text-white' value='Segunda-Feira'>
                  Segunda-Feira
                </SelectItem>
                <SelectItem className='text-white' value='Terça-Feira'>
                  Terça-Feira
                </SelectItem>
                <SelectItem className='text-white' value='Quarta-Feira'>
                  Quarta-Feira
                </SelectItem>
                <SelectItem className='text-white' value='Quinta-Feira'>
                  Quinta-Feira
                </SelectItem>
                <SelectItem className='text-white' value='Sexta-Feira'>
                  Sexta-Feira
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      <p className="text-sm text-red-700">{errors.dia?.message}</p>
      <Input className='h-10 bg-white' type='text'
        placeholder='Horário'{...register('horario')} />
      <p className="text-sm text-red-700">{errors.horario?.message}</p>
      <Input className='h-10 bg-white' type='text'
        placeholder='Turno'{...register('turno')} />
      <p className="text-sm text-red-700">{errors.turno?.message}</p>
      <Input className='h-10 bg-white' type='text'
        placeholder='Quantidade de Alunos por aula'
        {...register('quantidade_alunos')} />
      <p className="text-sm text-red-700">{errors.quantidade_alunos?.message}</p>

      <Button className='h-10 w-28 text-md self-start mt-2 bg-neutral-900 z-10' type="submit">
        Enviar
      </Button>
    </form>
  )
}


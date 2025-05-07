import { DialogStudents } from "@/components"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { useUser } from "@/hooks/userUser"
import { useStudentsData } from "@/hooks/useStudents"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog } from "@radix-ui/react-dialog"
import { ClockIcon, User } from "lucide-react"
import { useState } from "react"

import { Controller, useForm } from "react-hook-form"
import * as zod from 'zod'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

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
  const { handleCreateTime, listDataProf, listDataSchedules } = useStudentsData()
  const { userDataLogin } = useUser()

  const [headerlinks, setHeaderLinks] = useState('adicionar-horario')

  const profData = listDataProf.find(prof => prof.name === userDataLogin.name)

  const schedules = listDataSchedules.filter(list => list.id_prof === userDataLogin.id)

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
    <div className="space-y-6">

      <div className="w-full flex flex-col md:flex-row gap-5 items-start justify-between">
        <div className="flex items-center justify-start gap-4">
          <p className="text-neutral-500 hover:text-neutral-700 border-0 
                hover:border-b-2 cursor-pointer hover:font-semibold" onClick={() => setHeaderLinks('adicionar-horario')}>
            Adicionar Horário
          </p>
          <p className="text-neutral-500 hover:text-neutral-700 border-0 
                hover:border-b-2 cursor-pointer hover:font-semibold" onClick={() => setHeaderLinks('meus-horarios')}>
            Meus Horários
          </p>
        </div>
      </div>
      {
        headerlinks === 'adicionar-horario' ?
          (
            <form className="w-full space-y-3" onSubmit={handleSubmit(createTime)}>
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
          ) : (
            <div className="space-y-3">
              <div className="w-full grid grid-cols-5 py-3 px-6
                    bg-white rounded-md shadow-md">
                <p className="col-span-1 md:col-span-1">Dia</p>
                <p className="col-span-2 md:col-span-1">Horário</p>
                <p className="col-span-2 md:col-span-1">Estado da Vaga</p>
                <p className="col-span-2 md:col-span-1">Vagas</p>
                <p className="col-span-2 md:col-span-1">Vagas Disponíveis</p>
              </div>

              {
                schedules.map(list => {
                  return (
                    <Dialog>
                      <DialogTrigger asChild>

                        <div key={list.id} className="grid grid-cols-5 p-4 bg-white shadow-md rounded-lg mb-2 space-y-1 md:space-y-0">
                          <div className="col-span-2 md:col-span-1 text-sm text-yellow-500">
                            <span className="font-semibold md:hidden  text-black">Dia:</span>
                            {' '}
                            {list.dia}
                          </div>
                          <div className="col-span-3 md:col-span-1 text-sm  flex items-center gap-1">
                            <span className="font-semibold md:hidden mr-1">Horário:</span>
                            <ClockIcon className="w-4 h-4" />
                            {list.horario}
                          </div>

                          <div className="col-span-2 md:col-span-1 text-sm  flex items-center gap-1">
                            <span className="font-semibold md:hidden mr-1">Estado:</span>
                            {list.disponibilidade_horario}
                          </div>

                          <div className="col-span-3 md:col-span-1 text-sm ms-1 flex items-center gap-1">
                            <span className="font-semibold md:hidden mr-1">Vagas:</span>
                            <User className="w-4 h-4" />
                            {list.quantidade_alunos}
                          </div>
                          <div className="col-span-5 md:col-span-1 text-sm  flex items-center gap-1">
                            <span className="font-semibold md:hidden mr-1">Vagas Disponíveis:</span>
                            <User className="w-4 h-4" />
                            {list.disponibilidade_alunos}
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md md:max-w-2xl lg:max-w-7xl">
                        <DialogStudents studentId={
                          list.id
                        } />
                      </DialogContent>
                    </Dialog>
                  )
                })}
            </div>
          )
      }

    </div>
  )
}


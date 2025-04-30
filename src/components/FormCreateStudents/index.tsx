import { useStudentsData } from "@/hooks/useStudents"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as zod from 'zod'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
interface FormCreateStudentsProps {
  instrument: string
}

const formValidationSchema = zod.object({
  id_prof: zod.string().min(8, 'É necessário escolher um Professor'),
  id_hours: zod.string().min(8, 'É necessário escolher um Horário'),
  password: zod.string().min(8, 'Informe a Senha'),
  name: zod.string().min(3, 'Nome é obrigatório'),
  email: zod.string().email('Email Invalidado').min(8, 'Email é Obrigatório'),
  telefone: zod.string().min(8, 'Telefone é obrigatório'),
  experiencia_com_musica: zod.string().min(3, 'Experiência com Musica é Obrigatória'),
  data_de_nascimento: zod.string().min(8, 'Data de Nascimento é obrigatória'),
  responsible_name: zod.string().min(3, 'Nome do responsavel é obrigatório'),
})

export type OrderFormData = zod.infer<typeof formValidationSchema>

export const FormCreateStudents = ({ instrument }: FormCreateStudentsProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(formValidationSchema),
  })

  const [idProf, setIdProf] = useState('')
  const [daySchool, setDaySchool] = useState('')
  const { handleCreateStudents, listDataProf, listDataSchedules, } = useStudentsData()

  const instrumentList = listDataProf.filter(item => item.instrumento_musical1 === instrument || item.instrumento_musical2 === instrument)
  const scheduleList = listDataSchedules.filter(item => item.id_prof === idProf && item.disponibilidade_horario === 'Disponível')
  const dayScheduleList = scheduleList.filter(item => item.dia === daySchool)

  const createStudentes = (data: OrderFormData) => {
    const {
      data_de_nascimento,
      email,
      id_hours,
      id_prof,
      name,
      responsible_name,
      telefone,
      password
    } = data

    const studeentsData = {
      data_de_nascimento,
      email,
      experiencia_com_musica: data.experiencia_com_musica === 'simm' ? true : false,
      id_hours,
      id_prof,
      name,
      responsible_name,
      telefone,
      password,
      instrumento_musical: instrument,
    }
    handleCreateStudents(studeentsData)
    reset()
  }

  return (
    <form className='space-y-5' onSubmit={handleSubmit(createStudentes)}>
      <h3 className='text-white font-semibold'>Informações do Aluno</h3>
      <Input className='text-white' placeholder='Nome Completo' {...register('name')} />
      <p className='text-white text-sm'>{errors.name?.message}</p>
      <Input className='text-white' placeholder='Nome do Reponsável' {...register('responsible_name')} />
      <p className='text-white text-sm'>{errors.responsible_name?.message}</p>
      <Input className='text-white' type='date' placeholder='Data de Nascimento' {...register('data_de_nascimento')} />
      <p className='text-white text-sm'>{errors.data_de_nascimento?.message}</p>
      <Input className='text-white' placeholder='Email'{...register('email')} />
      <p className='text-white text-sm'>{errors.email?.message}</p>
      <Input className='text-white' type="password" placeholder='Senha'{...register('password')} />
      <p className='text-white text-sm'>{errors.password?.message}</p>
      <Input className='text-white' placeholder='Telefone' {...register('telefone')} />
      <p className='text-white text-sm'>{errors.telefone?.message}</p>
      <div>
        <p className='text-white text-sm'>
          Já tem experiência com música?
        </p>

        <label className='flex items-center justidy-center gap-4' htmlFor="radio" >
          <div className='flex items-center justify-center gap-2'>
            <input type="radio" value='sim' {...register('experiencia_com_musica')} />
            <p className='text-white'>Sim</p>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <input type="radio" value='não' {...register('experiencia_com_musica')} />
            <p className='text-white'>Não</p>
          </div>

          <p className='text-white text-sm'>{errors.experiencia_com_musica?.message}</p>
        </label>
      </div>

      <h3 className='text-white font-semibold'>
        Escolha o Proferssor e o Horário
      </h3>

      <div className='text-white'>
        <Controller
          control={control}
          name="id_prof"
          render={({ field }) => (
            <Select onValueChange={(value) => {
              field.onChange(value)
              setIdProf(value)
            }}
              value={field.value} >
              <SelectTrigger className="w-full border ">
                <SelectValue className='text-white' placeholder="Selecione o Professor" />
              </SelectTrigger>
              <SelectContent className='w-full border-none' {...register('id_hours')}>
                <SelectGroup className='bg-black'>
                  {instrumentList.map(prof => {
                    return (
                      <SelectItem key={prof.id} className='text-white' value={prof.id}>{prof.name}</SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <p className='text-white text-sm'>{errors.id_hours?.message}</p>
      </div>

      <Select onValueChange={(value) => setDaySchool(value)} value={daySchool}>
        <SelectTrigger className="w-full border text-white">
          <SelectValue className='text-white' placeholder="Selecione o Dia de Aula" >{daySchool}</SelectValue>
        </SelectTrigger>
        <SelectContent className='w-full border-none'>
          <SelectGroup className='bg-black'>
            <SelectItem className='text-white' value='Segunda-Feira'>Segunda-Feira</SelectItem>
            <SelectItem className='text-white' value='Terça-Feira'>Terça-Feira</SelectItem>
            <SelectItem className='text-white' value='Quarta-Feira'>Quarta-Feira</SelectItem>
            <SelectItem className='text-white' value='Quinta-Feira'>Quinta-Feira</SelectItem>
            <SelectItem className='text-white' value='Sexta-Feira'>Sexta-Feira</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>


      <div className='text-white'>
        <Controller
          control={control}
          name="id_hours"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full border ">
                <SelectValue className='text-white' placeholder="Selecione o Horário" />
              </SelectTrigger>
              <SelectContent className='w-full border-none'>
                <SelectGroup className='bg-black'>
                  {
                    dayScheduleList.map(schedule => {
                      return (
                        <SelectItem key={schedule.id} className='text-white' value={schedule.id || 'Indisponivel'}>{schedule.horario || 'Horário Indisponível'}</SelectItem>
                      )
                    })
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <Button className='p-5 font-semibold text-md'>Cadastrar</Button>
    </form>
  )
}



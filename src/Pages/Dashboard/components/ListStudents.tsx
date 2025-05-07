
import { DialogStudents } from "@/components"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { GetStudentsProps } from "@/contexts/AlunosContext"

import { ClockIcon } from "lucide-react"
import { ChangeEvent, useState } from "react"

interface ListStudentsProps {
  dataStudents: GetStudentsProps[]
}

export const ListStudents = ({ dataStudents }: ListStudentsProps) => {
  const [searchStudents, setSearchStudents] = useState('')

  const handleSearchStudents = (name: ChangeEvent<HTMLInputElement>) => {
    const { value } = name.target

    setSearchStudents(value)
  }

  const filteredStudents = dataStudents.filter(students => students.name.toLowerCase().includes(searchStudents.toLowerCase()))

  return (
    <div className="w-full flex flex-col space-y-6">

      <div className="w-full flex flex-col md:flex-row gap-5 items-start justify-between">
        <div className="flex items-center justify-start gap-4">
          <p className="text-neutral-500 hover:text-neutral-700 border-0 
                hover:border-b-2 cursor-pointer hover:font-semibold">
            Meus Alunos
          </p>
          <p className="text-neutral-500 hover:text-neutral-700 border-0 
                hover:border-b-2 cursor-pointer hover:font-semibold">
            Atualizar Aluno (Dia de Aula)
          </p>
          {/* <p className="text-neutral-500 hover:text-neutral-700 border-0 
                hov er:border-b-2 cursor-pointer hover:font-semibold">
                Selecionar Sala
              </p> */}
        </div>

        <Input className='w-full md:w-2/4 bg-white' placeholder="Pesquise o aluno" onBlur={handleSearchStudents} />
      </div>


      <div className="w-full grid grid-cols-5 p-3 
        bg-white rounded-md shadow-md">
        <p className="col-span-1">Nome</p>
        <p className="col-span-1">Email</p>
        <p className="col-span-1">Idade</p>
        <p className="col-span-1">Dia</p>
        <p className="col-span-1">Horario</p>
      </div>

      {
        filteredStudents.length === 0 ? dataStudents.length > 0 && dataStudents.map(list => {
          return (
            <Dialog>
              <DialogTrigger asChild>

                <div key={list.id} className="grid grid-cols-5 p-4 bg-white shadow-md rounded-lg mb-2 space-y-1 md:space-y-0">
                  <div className="col-span-4 gap-2">
                    <span className="font-semibold md:hidden mr-1">Nome:</span>
                    <span>{list.name}</span>
                  </div>
                  <div className="col-span-4 text-sm text-black">
                    <span className="font-semibold md:hidden mr-1">Email:</span>
                    {list.email}
                  </div>
                  <div className="col-span-2 text-sm text-black ">
                    <span className="font-semibold md:hidden mr-1">Idade:</span>
                    {list.data_de_nascimento}
                  </div>
                  <div className="col-span-3 text-sm text-yellow-500">
                    <span className="font-semibold md:hidden ms-4 mr-1 text-black">Dia:</span>
                    {list.horarios_alunos.dia}
                  </div>
                  <div className="col-span-5 text-sm  flex items-center gap-1">
                    <span className="font-semibold md:hidden mr-1">Horário:</span>
                    <ClockIcon className="w-4 h-4" />
                    {list.horarios_alunos.horario}
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
        }) : filteredStudents.map(list => {
          return (
            <Dialog>
              <DialogTrigger asChild>
                <div key={list.id} className="grid grid-cols-5 p-4 bg-white shadow-md rounded-lg mb-2 space-y-1 md:space-y-0">
                  <div className="col-span-4 md:col-span-1 gap-2">
                    <span className="font-semibold md:hidden mr-1">Nome:</span>
                    <span>{list.name}</span>
                  </div>
                  <div className="col-span-4 md:col-span-1 text-sm text-black">
                    <span className="font-semibold md:hidden mr-1">Email:</span>
                    {list.email}
                  </div>
                  <div className="col-span-2 md:col-span-1 text-sm text-black ">
                    <span className="font-semibold md:hidden mr-1">Idade:</span>
                    {list.data_de_nascimento}
                  </div>
                  <div className="col-span-3 md:col-span-1 text-sm text-yellow-500">
                    <span className="font-semibold md:hidden ms-4 mr-1 text-black">Dia:</span>
                    {list.horarios_alunos.dia}
                  </div>
                  <div className="col-span-5 md:col-span-1 text-sm  flex items-center gap-1">
                    <span className="font-semibold md:hidden mr-1">Horário:</span>
                    <ClockIcon className="w-4 h-4" />
                    {list.horarios_alunos.horario}
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
        })
      }
    </div>
  )
}



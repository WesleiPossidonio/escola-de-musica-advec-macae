
import { Book, ClockIcon, Menu, User } from "lucide-react"
import { Header } from "./components"
import { useUser } from "@/hooks/userUser"
import { useStudentsData } from "@/hooks/useStudents"
import { MoneyFormatting } from "@/utils/MoneyFormatting"
import { ChangeEvent, createElement, useState } from "react"
import { CreateTimeForm } from "./components/CreateTimeForm"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DialogStudents } from "@/components"
import { Input } from "@/components/ui/input"

export const Dashboard = () => {
  const [headerLink, setHeaderLink] = useState('meus-alunos')
  const [open, setOpen] = useState(true);
  const [searchStudents, setSearchStudents] = useState('')

  const menus = [
    { name: "Meus Dados", section: "Meus-dados", icon: User },
    { name: "Escola", section: "Cursos", icon: Book },
  ]

  const { userDataLogin } = useUser()
  const { listDataStudents } = useStudentsData()

  const dataStudents = listDataStudents.filter(list => list.id_prof === userDataLogin.id)

  const paymentProfs = dataStudents.length * 150
  const paymentsChurch = dataStudents.length * 50

  const handleSearchStudents = (name: ChangeEvent<HTMLInputElement>) => {
    const { value } = name.target

    setSearchStudents(value)
  }

  const filteredStudents = dataStudents.filter(students => students.name.toLowerCase().includes(searchStudents.toLowerCase()))

  return (
    <main className='w-full flex'>
      <aside
        className={`bg-white min-h-screen ${open ? "w-72" : "w-20"
          } duration-500 px-4 hidden md:block`}
      >
        <div className=" py-3 flex justify-end">
          <Menu
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>


        <div className="mt-20 flex flex-col relative">

          {
            menus.map((menu, index) => {
              return (
                <div key={index} className="w-full h-15 group flex items-center gap-2 text-xl px-4 py-6
                  hover:bg-neutral-100 cursor-pointer font-semibold" onClick={() => setHeaderLink(menu.section)}>
                  <div>{createElement(menu?.icon, { size: "20" })}</div>
                  <h2 style={{
                    transitionDelay: `${index + 3}00ms`,
                  }}
                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}>
                    {menu.name}
                  </h2>
                  <h2
                    className={`${open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu?.name}
                  </h2>
                </div>
              )
            })
          }

        </div>
      </aside>

      {/* //mobile menu */}

      <aside
        className="bg-white min-h-screen w-16 duration-500 px-4 block md:hidden"
      >

        <div className="mt-20 flex flex-col gap-4 relative">

          {
            menus.map((menu, index) => {
              return (
                <div key={index} className="w-full h-15 group flex items-center gap-2 text-xl px-4 py-6
                  hover:bg-neutral-100 cursor-pointer font-semibold" onClick={() => setHeaderLink(menu.section)}>
                  <div>{createElement(menu?.icon, { size: "20" })}</div>
                </div>
              )
            })
          }

        </div>
      </aside>

      <section className="w-full md:col-span-3 py-8 md:pr-8 md:pb-8 space-y-5">
        <Header />

        <div className="w-full h-[94%] bg-neutral-100 rounded-r-2xl p-4 md:p-8 space-y-8">
          <h2 className="text-2xl font-semibold">Minhas Informações</h2>

          <div className="w-full flex flex-col md:flex-row gap-5 items-start justify-between">
            <div className="flex items-center justify-start gap-4">
              <p className="text-neutral-500 hover:text-neutral-700 border-0 
                hover:border-b-2 cursor-pointer hover:font-semibold" onClick={() => setHeaderLink('meus-alunos')}>
                Meus Alunos
              </p>
              <p className="text-neutral-500 hover:text-neutral-700 border-0 
                hover:border-b-2 cursor-pointer hover:font-semibold" onClick={() => setHeaderLink('adicionar-horario')}>
                Adicionar Horário
              </p>
              {/* <p className="text-neutral-500 hover:text-neutral-700 border-0 
                hover:border-b-2 cursor-pointer hover:font-semibold">
                Selecionar Sala
              </p> */}
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="min-w-35 md:min-w-43 w-auto h-26 p-4 bg-white rounded-xl">
                <p className="text-sm text-neutral-600">Total a Receber</p>
                <h1 className="text-center text-3xl mt-2">{MoneyFormatting(paymentProfs)}</h1>
              </div>
              <div className="min-w-35 md:min-w-43 w-auto h-26 p-4 bg-neutral-600 rounded-xl">
                <p className="text-sm text-neutral-100">Porcentegem Igreja</p>
                <h1 className="text-center text-white text-3xl mt-2">{MoneyFormatting(paymentsChurch)}</h1>
              </div>
            </div>
          </div>

          <Input className='w-full md:w-2/4 bg-white' placeholder="Pesquise o aluno" onBlur={handleSearchStudents} />

          {
            headerLink === 'meus-alunos' && (
              <div className="w-full space-y-3">
                <div className="w-full flex items-center  justify-between p-3 
                bg-white rounded-md shadow-md">
                  <p>Nome</p>
                  <p>Email</p>
                  <p>Idade</p>
                  <p>Dia</p>
                  <p>Horario</p>
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
                  })
                }

              </div>
            ) || headerLink === 'adicionar-horario' && (
              <CreateTimeForm />
            )
          }


        </div>
      </section>
    </main>
  )
}



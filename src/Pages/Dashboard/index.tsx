
import { ClockIcon } from "lucide-react"
import { Header } from "./components"
import { useUser } from "@/hooks/userUser"
import { useStudentsData } from "@/hooks/useStudents"
import { MoneyFormatting } from "@/utils/MoneyFormatting"
import { useState } from "react"
import { CreateTimeForm } from "./components/CreateTimeForm"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DialogStudents } from "@/components"

export const Dashboard = () => {
  const [headerLink, setHeaderLink] = useState('meus-alunos')
  const { userDataLogin } = useUser()
  const { listDataStudents } = useStudentsData()

  const dataStudents = listDataStudents.filter(list => list.id_prof === userDataLogin.id)

  const paymentProfs = dataStudents.length * 150
  const paymentsChurch = dataStudents.length * 50

  console.log(paymentProfs)

  return (
    <main className='w-full grid grid-cols-4'>
      <aside className=' h-svh bg-white col-span-1 px-5 pt-18'>
        <div>
          <h1 className="text-2xl font-bold text-center">ADVEC Music</h1>
        </div>

        <div className="text-xl mt-12 space-y-2">
          <p className="cursor-pointer font-semibold">Meus Dados</p>
          <p className="cursor-pointer font-semibold">Escola</p>
        </div>
      </aside>

      <section className="col-span-3 py-8 pr-8 pb-8 space-y-5">
        <Header />

        <div className="w-full h-[94%] bg-neutral-100 rounded-r-2xl p-8 space-y-8">
          <h2 className="text-2xl font-semibold">Minhas Informações</h2>

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <p className="text-neutral-500 hover:text-neutral-700 border-0 
                hover:border-b-2 cursor-pointer hover:font-semibold" onClick={() => setHeaderLink('meus-alunos')}>
                Meus Alunos
              </p>
              <p className="text-neutral-500 hover:text-neutral-700 border-0 
                hover:border-b-2 cursor-pointer hover:font-semibold" onClick={() => setHeaderLink('adicionar-horario')}>
                Adicionar Horário
              </p>
              <p className="text-neutral-500 hover:text-neutral-700 border-0 
                hover:border-b-2 cursor-pointer hover:font-semibold">
                Selecionar Sala
              </p>
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="min-w-43 w-auto h-26 p-4 bg-white rounded-xl">
                <p className="text-sm text-neutral-600">Total a Receber</p>
                <h1 className="text-center text-3xl mt-2">{MoneyFormatting(paymentProfs)}</h1>
              </div>
              <div className="min-w-43 w-auto h-26 p-4 bg-neutral-600 rounded-xl">
                <p className="text-sm text-neutral-100">Porcentegem Igreja</p>
                <h1 className="text-center text-white text-3xl mt-2">{MoneyFormatting(paymentsChurch)}</h1>
              </div>
            </div>
          </div>

          {
            headerLink === 'meus-alunos' && (
              <div className="space-y-3">
                <tr className="w-full flex items-center  justify-between p-3 
                bg-white rounded-md shadow-md">
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Idade</th>
                  <th>Dia</th>
                  <th>Horario</th>
                </tr>
                {
                  dataStudents.length > 9 && dataStudents.map(list => {
                    return (
                      <Dialog>
                        <DialogTrigger asChild>
                          <tr key={list.id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-2">
                            <td className="flex items-center gap-2">
                              <span>{list.name}</span>
                            </td>
                            <td className="text-sm">
                              {list.email}
                            </td>
                            <td className="text-sm">
                              {list.data_de_nascimento}
                            </td>
                            <td className="text-sm text-yellow-500">{list.horarios_alunos.dia}</td>
                            <td className="text-sm  flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              {list.horarios_alunos.horario}
                            </td>
                          </tr>
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




import { Book, Menu, User } from "lucide-react"
import { Header } from "./components"
import { useUser } from "@/hooks/userUser"
import { useStudentsData } from "@/hooks/useStudents"
import { MoneyFormatting } from "@/utils/MoneyFormatting"
import { createElement, useState } from "react"
import { CreateTimeForm } from "./components/CreateTimeForm"
import { ListStudents } from "./components/ListStudents"

export const Dashboard = () => {
  const [headerLink, setHeaderLink] = useState('meus-alunos')
  const [open, setOpen] = useState(true);

  const menus = [
    { name: "Escola", section: "meus-alunos", icon: User },
    { name: "Horários", section: "adicionar-horario", icon: Book },
  ]

  const { userDataLogin } = useUser()
  const { listDataStudents } = useStudentsData()

  const dataStudents = listDataStudents.filter(list => list.id_prof === userDataLogin.id)

  const paymentProfs = dataStudents.length * 150
  const paymentsChurch = dataStudents.length * 50

  return (
    <main className='w-full flex'>
      <aside
        className={`bg-white min-h-screen ${open ? "w-72" : "w-20"
          } duration-500 px-4 hidden md:block `}
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

      <section className="w-full md:col-span-3 py-8 md:pr-8 md:pb-8 space-y-5">
        <Header setHeaderLink={setHeaderLink} />

        <div className="w-full h-[94%] bg-neutral-100 rounded-r-2xl p-4 md:p-8 space-y-8">
          {
            headerLink === 'meus-alunos' ? <h2 className="text-2xl font-semibold">Informações Escolares</h2>
              : <h2 className="text-2xl font-semibold">Informações Horários</h2>
          }

          <div className="w-full flex flex-col md:flex-row gap-5 items-start justify-between">
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



          {
            headerLink === 'meus-alunos' && (
              <ListStudents dataStudents={dataStudents} />
            ) || headerLink === 'adicionar-horario' && (
              <CreateTimeForm />
            )
          }
        </div>
      </section>
    </main>
  )
}



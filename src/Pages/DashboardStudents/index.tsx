
import { Book, DollarSign, Menu, User } from "lucide-react"
import { CarouselCursos, Header, PaymentSection } from "./components"
import { createElement, useState } from "react"

export const DashboardStudents = () => {
  const [addPage, setAddPage] = useState('Cursos')
  const [open, setOpen] = useState(true);

  const menus = [
    { name: "Meus Dados", section: "Meus-dados", icon: User },
    { name: "Cursos", section: "Cursos", icon: Book },
    { name: "Financeiro", section: "Financeiro", icon: DollarSign },
  ]
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


        <div className="mt-20 flex flex-col gap-4 relative">

          {
            menus.map((menu, index) => {
              return (
                <div key={index} className="w-full h-15 group flex items-center gap-2 text-xl px-4 py-6
                  hover:bg-neutral-100 cursor-pointer font-semibold" onClick={() => setAddPage(menu.section)}>
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
                  hover:bg-neutral-100 cursor-pointer font-semibold" onClick={() => setAddPage(menu.section)}>
                  <div>{createElement(menu?.icon, { size: "20" })}</div>
                </div>
              )
            })
          }

        </div>
      </aside>

      <section className="w-full py-8 pr-8 pb-8 space-y-10 md:space-y-5">
        <Header />

        <div className="w-[95%] h-[94%] flex flex-col justify-center items-center bg-neutral-100 rounded-r-2xl p-8 space-y-8">
          {
            addPage === 'Cursos' && (
              <div className=" w-full">
                Cursos
                <h2 className="text-2xl font-semibold self-start mb-15">Nossos Cursos</h2>
                <CarouselCursos />
              </div>
            ) || addPage === 'Financeiro' && (
              <div className="w-full">
                Financeiro
                <h2 className="text-2xl font-semibold self-start mb-15">Financeiro</h2>
                <PaymentSection />
              </div>
            ) || addPage === 'Meus-dados' && (
              <div className="w-full">
                Meus Dados
                <h2 className="text-2xl font-semibold self-start mb-15">Meus Dados</h2>
              </div>
            )
          }

        </div>
      </section>
    </main>
  )
}



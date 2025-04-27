
import { Book, DollarSign, User } from "lucide-react"
import { CarouselCursos, Header, PaymentSection } from "./components"
import { useState } from "react"

export const DashboardStudents = () => {
  const [addPage, setAddPage] = useState('Cursos')

  return (
    <main className='w-full grid grid-cols-4'>
      <aside className=' h-svh bg-white col-span-1 pt-18'>
        <div className="px-5 ">
          <h1 className="text-2xl font-bold text-start">Emam Music</h1>
        </div>

        <div className=" flex flex-col gap-2 mt-12 ">
          <p className="w-full h-15 flex items-center gap-2 text-xl px-4 py-6
           hover:bg-neutral-100 cursor-pointer font-semibold" onClick={() => setAddPage('Meus-dados')}>
            <User className="size-10" />
            Meus Dados
          </p>
          <p className="w-full h-15 flex items-center gap-2 text-xl px-4 py-6
           hover:bg-neutral-100 cursor-pointer font-semibold" onClick={() => setAddPage('Cursos')}>
            <Book className="size-10" />
            Cursos
          </p>
          <p className="w-full h-15 flex items-center gap-2 text-xl px-4 py-6
           hover:bg-neutral-100 cursor-pointer font-semibold" onClick={() => setAddPage('Financeiro')}>
            <DollarSign className="size-10" />
            Financeiro
          </p>
        </div>
      </aside>

      <section className="col-span-3 py-8 pr-8 pb-8 space-y-5">
        <Header />

        <div className="w-full h-[94%] flex flex-col justify-center items-center bg-neutral-100 rounded-r-2xl p-8 space-y-8">

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



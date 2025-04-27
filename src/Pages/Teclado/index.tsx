import Image from '@/assets/ImageOne.jpg'
import { Camera, Clock, Users } from 'lucide-react'
import {
  AddInstrumentsStudentsForm,
  BannerPage,
  Footer,
  FormCreateStudents,
  Header,
  Timeline
} from '@/components'
import { useState } from 'react';


const timelineData = [
  {
    title: "Valores das Aulas",
    description: "Criamos este site para divulgar o projeto e servir como um banco de dados, disponibilizando os resultados dos anos de trabalho para a sociedade e a comunidade acadêmica.",
    icon: <Camera size={20} />,
    align: "left",
  },
  {
    title: "Duração das Aulas",
    description: "Durante as férias, membros do projeto se reuniram para discutir o progresso da estação meteorológica e realizar testes com sensores para Arduino. No entanto, devido à pandemia de Covid-19, as atividades presenciais foram interrompidas.",
    icon: <Clock size={20} />,
    align: "right",
  },
  {
    title: "Materiais para Estudo",
    description: "Em 2019, participamos novamente da SIAC, desta vez com a presença dos alunos da escola, e recebemos uma menção honrosa.",
    icon: <Users size={20} />,
    align: "left",
  },

  {
    title: "Objetivo do Curso",
    description: "Em 2019, participamos novamente da SIAC, desta vez com a presença dos alunos da escola, e recebemos uma menção honrosa.",
    icon: <Users size={20} />,
    align: "right",
  },
];

export const Teclado = () => {

  const [registrationMade, setRegistrationMade] = useState('Não')

  return (
    <main className="w-full  h-auto min-h-svh">
      <Header />
      <BannerPage urlImage={Image} instrumetal='Teclado' />

      <section className='w-full bg-white text-black py-16 px-4'>
        <div className='container mx-auto'>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Observações Finais</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-0 left-1/2 h-full w-1 bg-black -translate-x-1/2" />
            <div className="flex flex-col md:flex-row md:flex-wrap">
              {timelineData.map((item, index) => (
                <Timeline
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  align={item.align as "left" | "right"}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='w-[95%] h-auto container min-h-[30rem]
       bg-neutral-950 my-9 mx-auto rounded-xl'>
        <h1 className='text-white text-3xl'>Faça a sua Inscrição!</h1>

        <div className='mt-10 mb-4' onChange={(data) => setRegistrationMade((data.target as HTMLInputElement).value)}>
          <p className='text-white'>Já fez inscrição a outro instrumento ?</p>
          <label className='flex items-center justidy-center gap-4' htmlFor="radio" >
            <div className='flex items-center justify-center gap-2'>
              <input type="radio" value='Sim' name='inscricao-efetuada' />
              <p className='text-white'>Sim</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <input type="radio" value='Não' name='inscricao-efetuada' />
              <p className='text-white'>Não</p>
            </div>
          </label>
        </div>

        <form className='mt-10 mb-4'>
          <p className='text-white'>Já fez inscrição a outro instrumento ?</p>
          <label className='flex items-center justidy-center gap-4' htmlFor="radio" >
            <div className='flex items-center justify-center gap-2'>
              <input type="radio" value='sim' name='inscricao-efetuada' />
              <p className='text-white'>Sim</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <input type="radio" value='não' name='inscricao-efetuada' />
              <p className='text-white'>Não</p>
            </div>
          </label>
        </form>

        {
          registrationMade !== 'Sim' ? <FormCreateStudents instrument='Teclado' />
            : <AddInstrumentsStudentsForm instrument='Teclado' />
        }
      </section>

      <Footer />
    </main>
  )
}



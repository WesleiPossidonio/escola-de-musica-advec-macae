
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'

import Guitarra from '@/assets/Guitarra.svg'
import Bateria from '@/assets/Bateria.svg'
import Baixo from '@/assets/Baixo.svg'
import Canto from '@/assets/Canto.svg'
import teclado from '@/assets/Teclado.svg'
import Violão from '@/assets/Violao.svg'
import Pandeiro from '@/assets/Pandeiro.svg'


export const ProfSection = () => {

  const InstrumentalOptions = [
    { name: "Guitarra", id: 1, image: Guitarra },
    { name: "Baixo", id: 2, image: Baixo },
    { name: "Bateria", id: 13, image: Bateria },
    { name: "Teclado", id: 13, image: teclado },
    { name: "Canto", id: 13, image: Canto },
    { name: "Violão", id: 13, image: Violão },
    { name: "Pandeiro", id: 13, image: Pandeiro },
  ];

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section id="pricing" className="w-full flex flex-col items-center justify-center space-y-8 h-auto min-h-[35rem] text-center py-16 p-6 md:px-8">
      <div className='md:w-3/4 space-y-1'>
        <h2 className="text-3xl font-bold ">Aulas Disponíveis</h2>
        <p className='text-sm md:text-md'>
          Escolha o curso ideal para o seu talento e comece a jornada musical conosco!
        </p>
      </div>

      <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          InstrumentalOptions.map(list => {
            return (
              <div key={list.id} className="w-full h-56 p-6 flex flex-col items-center group justify-center gap-3 border
                border-neutral-400 rounded-md shadow-mm bg-white hover:bg-neutral-300 ease-in duration-75" data-aos="zoom-in">
                <img src={list.image} className="w-22" alt="" />
                <p className="text-2xl font-semibold">
                  {list.name}
                </p>
                <div className="flex flex-col items-start justify-center gap-3">
                </div>

              </div>

            )
          })
        }
      </div>
    </section>
  );
};
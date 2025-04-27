import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

import Guitarra from '@/assets/Guitarra.svg'
import Bateria from '@/assets/Bateria.svg'
import Baixo from '@/assets/Baixo.svg'
import Canto from '@/assets/Canto.svg'
import teclado from '@/assets/Teclado.svg'
import Violao from '@/assets/Violao.svg'
import Pandeiro from '@/assets/Pandeiro.svg'
import { Lock } from "lucide-react"


export const CarouselCursos = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center relative">
          <Lock className="absolute right-4 top-4" />
          <div className="w-full h-[35rem] p-6 flex flex-col items-center justify-center gap-6 rounded-md shadow-xl bg-white">
            <img className="w-40" src={Guitarra} alt="" />
            <p className="text-xl font-semibold">Guitarra</p>
          </div>
        </CarouselItem>

        <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center relative">
          <Lock className="absolute right-4 top-4" />
          <div className="w-full h-[35rem]  p-6 flex flex-col items-center justify-center gap-6 rounded-md shadow-xl bg-white">
            <img className="w-40" src={Bateria} alt="" />
            <p className="text-xl font-semibold">Bateria</p>
          </div>
        </CarouselItem>

        <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center relative">
          <Lock className="absolute right-4 top-4" />
          <div className="w-full h-[35rem]  p-6 flex flex-col items-center justify-center gap-6 rounded-md shadow-xl bg-white">
            <img className="w-40" src={Pandeiro} alt="" />
            <p className="text-xl font-semibold">Pandeiro</p>
          </div>
        </CarouselItem>

        <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center relative">
          <Lock className="absolute right-4 top-4" />
          <div className="w-full h-[35rem]  p-6 flex flex-col items-center justify-center gap-6 rounded-md shadow-xl bg-white">
            <img className="w-40" src={Baixo} alt="" />
            <p className="text-xl font-semibold">ContraBaixo</p>
          </div>
        </CarouselItem>

        <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center relative">
          <Lock className="absolute right-4 top-4" />
          <div className="w-full h-[35rem]  p-6 flex flex-col items-center justify-center gap-3 rounded-md shadow-xl bg-white">
            <img className="w-40" src={Canto} alt="" />
            <p className="text-xl font-semibold">Canto</p>
          </div>
        </CarouselItem>

        <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center relative">
          <Lock className="absolute right-4 top-4" />
          <div className="w-full h-[35rem]  p-6 flex flex-col items-center justify-center gap-3 rounded-md shadow-xl bg-white">
            <img className="w-40" src={teclado} alt="" />
            <p className="text-xl font-semibold">Teclado</p>
          </div>
        </CarouselItem>

        <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center relative">
          <Lock className="absolute right-4 top-4" />
          <div className="w-full h-[35rem]  p-6 flex flex-col items-center justify-center gap-3 rounded-md shadow-xl bg-white">
            <img className="w-40" src={Violao} alt="" />
            <p className="text-xl font-semibold">Violão</p>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}



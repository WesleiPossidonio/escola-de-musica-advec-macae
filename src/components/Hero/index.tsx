
import ImageThree from '../../assets/ImageHeroThree.jpg'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

import ImageOne from '../../assets/ImageOne.jpg'
import ImageTwo from '../../assets/ImageHero.jpg'

export const Hero = () => {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section className="w-full h-auto min-h-[42rem] flex items-center justify-center p-6 md:px-8 md:py-20">
      <div className='w-full container flex flex-col lg:flex-row items-center justify-between gap-8' >
        <div className="w-full lg:w-1/2" data-aos="zoom-in-left">
          <h3 className="text-3xl md:text-5xl xl:text-7xl">
            Transforme Seu Dom em Adoração!
          </h3>
          <p className='text-sm md:text-md mt-3'>
            Aprenda, pratique e aprimore suas habilidades musicais para servir com excelência. Junte-se à nossa escola de música e leve a adoração a um novo nível!
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center gap-4 md:gap-6 md:ml-27 lg:ml-0" data-aos="zoom-in-left">
          <img className='w-40 md:w-52 lg:w-74 rounded-lg' src={ImageOne} alt="" />

          <div className='flex flex-col gap-4 md:gap-6 w-96'>
            <img className='w-32 md:w-48 xl:w-64 xl:h-80 rounded-lg z-2' src={ImageTwo} alt="" />
            <img className='w-42 md:w-52 xl:w-72 -ms-16 rounded-lg z-3' src={ImageThree} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}


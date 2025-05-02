import PianoImage from '../../assets/TecladoImage.avif'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export const About = () => {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section id="about" className="w-full h-auto min-h-[38rem] flex flex-col justify-center items-center gap-12 pt-10 bg-black text-white">
      <div className="w-full container md:max-w-[85rem] h-auto min-h-[15rem] flex flex-col lg:flex-row items-center justify-center p-6 md:p-8">
        <h2 className=" lg:w-1/2 text-[1.7856rem] md:text-4xl text-center md:text-start font-semibold " data-aos="fade-right">Aprenda Música com Qualidade e Dedicação!</h2>
        <div className='lg:w-1/2 grid grid-cols-2 gap-2 mt-7'>
          <div className='col-span-2 md:col-span-1 mt-4 max-w-2xl' data-aos="zoom-in">
            <h1 className='text-lg font-semibold mb-1'>Metodologia Personalizada</h1>
            <p className='text-sm'>
              Nossas aulas são individuais para garantir um aprendizado focado e no seu ritmo. Apenas as aulas de <span className='font-semibold'> Pandeiro </span>
              e <span className='font-semibold'>Teoria Musical </span>  são oferecidas em turmas
            </p>
          </div>

          <div className='col-span-2 md:col-span-1 mt-4 max-w-2xl' data-aos="fade-left">
            <h1 className='text-lg font-semibold mb-1'>Frequência e Duração</h1>
            <p className='text-sm'>
              Cada aluno terá <span className='font-semibold'> uma hora de aula por semana, </span>
              garantindo um acompanhamento contínuo e eficaz no desenvolvimento musical.
            </p>
          </div>

          <div className='col-span-2 mt-4 max-w-2xl' data-aos="zoom-in">
            <h1 className='text-lg font-semibold mb-1'>Valor Acessível</h1>
            <p className='text-sm'>
              O investimento para qualquer curso é de <span className='font-semibold'> 250,00 para não membros e 200,00 para membros da Advec.</span> {' '}
              com um ensino de qualidade e professores capacitados para te ajudar a evoluir.
            </p>
          </div>

        </div>
      </div>

      <div className="w-full h-32 md:h-[17rem] xl:h-[22rem]" style={{ backgroundImage: `url(${PianoImage})` }} />
    </section>
  )
}

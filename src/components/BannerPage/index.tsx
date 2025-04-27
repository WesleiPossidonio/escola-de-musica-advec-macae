interface BannerImageProps {
  urlImage: string,
  instrumetal: string
}


export const BannerPage = (data: BannerImageProps) => {
  return (
    <section className="w-full h-56 md:h-[25rem] flex flex-col 
    items-start justify-center gap-2 grayscale bg-image bg-center 
    bg-cover bg-no-repeat px-6 md:px-16" style={{ backgroundImage: `url(${data.urlImage})` }}
    >
      <div className='container'>
        <h1 className='text-white text-2xl md:text-4xl shadow'>
          Formulário de Inscrição
        </h1>
        <h1 className='text-white text-2xl md:text-3xl font-semibold shadow'>
          Intrumento: {data.instrumetal}
        </h1>
      </div>
    </section>
  )
}

